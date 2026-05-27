import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, ".behavior-results");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        if (address && typeof address === "object") resolve(address.port);
        else reject(new Error("Could not resolve free port"));
      });
    });
  });
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await wait(250);
    }
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function runRegistryDetails() {
  return new Promise((resolve, reject) => {
    const child = spawn("node", ["scripts/registry-details.mjs"], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(output || `registry details exited with ${code}`));
    });
  });
}

async function startServer(port) {
  await runRegistryDetails();
  const viteBin = path.join(root, "node_modules", ".bin", process.platform === "win32" ? "vite.cmd" : "vite");
  return spawn(viteBin, ["--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
    cwd: root,
    env: { ...process.env, BROWSER: "none" },
    stdio: ["ignore", "pipe", "pipe"]
  });
}

async function record(results, name, fn) {
  await fn();
  results.push({ name, ok: true });
}

async function expectCount(locator, count, label) {
  const actual = await locator.count();
  if (actual !== count) throw new Error(`${label}: expected ${count}, found ${actual}`);
}

async function expectVisible(locator, label) {
  if (!(await locator.isVisible())) throw new Error(`${label}: expected visible`);
}

async function expectHidden(locator, label) {
  if (await locator.count()) throw new Error(`${label}: expected hidden`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const port = await findFreePort();
  const url = `http://127.0.0.1:${port}/`;
  const server = await startServer(port);
  const results = [];
  const failures = [];
  const consoleErrors = [];
  let browser;

  try {
    await waitForServer(url);
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.goto(url, { waitUntil: "networkidle" });

    await record(results, "registry search selects component and updates command", async () => {
      const search = page.getByPlaceholder("Button", { exact: true });
      await expectCount(search, 1, "registry search");
      await search.fill("AlertDialog");
      const registryRows = page.locator(".demo-registry-list button");
      await expectCount(registryRows, 1, "filtered registry rows");
      await registryRows.first().click();
      await expectVisible(page.getByText("npx generous-ui@latest show AlertDialog", { exact: false }), "registry command");
    });

    await record(results, "dialog opens, escapes, and returns focus", async () => {
      const trigger = page.getByRole("button", { name: "Open dialog", exact: true });
      await expectCount(trigger, 1, "dialog trigger");
      await trigger.click();
      await expectVisible(page.getByRole("dialog", { name: "Clear destructive flows", exact: true }), "dialog");
      await page.keyboard.press("Escape");
      await expectHidden(page.getByRole("dialog", { name: "Clear destructive flows", exact: true }), "dialog after Escape");
      const activeText = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? "");
      if (activeText !== "Open dialog") throw new Error(`dialog focus returned to ${activeText || "nothing"}`);
    });

    await record(results, "tabs expose selected state and panel", async () => {
      const reviewTab = page.getByRole("tab", { name: "Review", exact: true });
      await expectCount(reviewTab, 1, "review tab");
      await reviewTab.click();
      const selected = await reviewTab.getAttribute("aria-selected");
      if (selected !== "true") throw new Error("review tab was not selected");
      await expectVisible(page.getByText("Default checks", { exact: true }), "review table caption");
    });

    await record(results, "menu opens, selects, closes, and emits toast", async () => {
      const toolsTab = page.getByRole("tab", { name: "Tools", exact: true });
      await toolsTab.click();
      const trigger = page.getByRole("button", { name: "Actions", exact: true });
      await expectCount(trigger, 1, "menu trigger");
      await trigger.click();
      if ((await trigger.getAttribute("aria-expanded")) !== "true") throw new Error("menu trigger did not expand");
      await expectVisible(page.getByRole("menu", { name: "Maintainer actions", exact: true }), "menu");
      await page.getByRole("menuitem", { name: "Open profile", exact: true }).click();
      await expectHidden(page.getByRole("menu", { name: "Maintainer actions", exact: true }), "menu after select");
      await expectVisible(page.getByText("Profile opened", { exact: true }), "profile toast");
    });

    await record(results, "popover opens and closes with Escape", async () => {
      const trigger = page.getByRole("button", { name: "Details", exact: true });
      await expectCount(trigger, 1, "popover trigger");
      await trigger.click();
      await expectVisible(page.getByRole("dialog", { name: "Maintainer details", exact: true }), "popover");
      await page.keyboard.press("Escape");
      await expectHidden(page.getByRole("dialog", { name: "Maintainer details", exact: true }), "popover after Escape");
    });

    await record(results, "accordion discloses one secondary section", async () => {
      const triggers = page.locator(".gui-accordion-trigger");
      await expectCount(triggers, 2, "accordion triggers");
      await triggers.nth(0).click();
      await expectVisible(page.getByText("They protect the user from hidden state", { exact: false }), "accordion content");
    });

    await record(results, "suggestion action removes row and emits toast", async () => {
      const rowsBefore = await page.locator(".gui-suggestion-row").count();
      if (rowsBefore < 1) throw new Error("expected at least one suggestion row");
      await page.getByRole("button", { name: "Accept suggestion", exact: true }).first().click();
      const rowsAfter = await page.locator(".gui-suggestion-row").count();
      if (rowsAfter !== rowsBefore - 1) throw new Error(`suggestion rows changed from ${rowsBefore} to ${rowsAfter}`);
      await expectVisible(page.getByText("Suggestion accepted", { exact: true }), "suggestion toast");
    });

    await record(results, "collapsible toggles state", async () => {
      const trigger = page.locator(".gui-collapsible-trigger");
      await expectCount(trigger, 1, "collapsible trigger");
      await trigger.click();
      await expectVisible(page.locator(".gui-collapsible-content"), "collapsible content");
    });

    await record(results, "alert dialog cancel and confirm paths work", async () => {
      const trigger = page.getByRole("button", { name: "Open alert dialog", exact: true });
      await expectCount(trigger, 1, "alert dialog trigger");
      await trigger.click();
      await expectVisible(page.getByRole("dialog", { name: "Remove generated draft?", exact: true }), "alert dialog");
      await page.getByRole("button", { name: "Cancel", exact: true }).click();
      await expectHidden(page.getByRole("dialog", { name: "Remove generated draft?", exact: true }), "alert dialog after cancel");
      await trigger.click();
      await page.getByRole("button", { name: "Remove draft", exact: true }).click();
      await expectHidden(page.getByRole("dialog", { name: "Remove generated draft?", exact: true }), "alert dialog after confirm");
      await expectVisible(page.getByText("Draft removed", { exact: true }), "draft removed toast");
    });

    await record(results, "resizable separator changes value with keyboard", async () => {
      const separator = page.getByRole("separator", { name: "Resize plan and review panels", exact: true });
      await expectCount(separator, 1, "resizable separator");
      const before = Number(await separator.getAttribute("aria-valuenow"));
      await separator.press("ArrowRight");
      const after = Number(await separator.getAttribute("aria-valuenow"));
      if (!(after > before)) throw new Error(`separator did not increase: ${before} -> ${after}`);
    });
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }

  failures.push(...consoleErrors.map((error) => `console error: ${error}`));

  const report = {
    url,
    generatedAt: new Date().toISOString(),
    results,
    consoleErrors,
    failures
  };

  await writeFile(path.join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`behavior check ok: ${results.length} checks`);
    console.log("report: .behavior-results/report.json");
  }
}

await main();
