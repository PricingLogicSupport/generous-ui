import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, ".visual-snapshots");

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
  const child = spawn(viteBin, ["--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
    cwd: root,
    env: { ...process.env, BROWSER: "none" },
    stdio: ["ignore", "pipe", "pipe"]
  });

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  child.once("exit", (code) => {
    if (code && code !== 0) process.stderr.write(output);
  });

  return child;
}

async function checkPage(page, label, screenshotName) {
  const metrics = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    primaryButtons: document.querySelectorAll(".gui-button-primary").length,
    bodyTextLength: document.body.innerText.length,
    width: window.innerWidth,
    height: window.innerHeight
  }));

  const screenshotPath = path.join(outputDir, screenshotName);
  const screenshot = await page.screenshot({ path: screenshotPath, fullPage: true });

  return {
    label,
    screenshot: path.relative(root, screenshotPath),
    screenshotBytes: screenshot.byteLength,
    ...metrics
  };
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const port = await findFreePort();
  const url = `http://127.0.0.1:${port}/`;
  const server = await startServer(port);
  const consoleErrors = [];
  const results = [];
  let browser;

  try {
    await waitForServer(url);
    browser = await chromium.launch();

    const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    desktop.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(`[desktop] ${message.text()}`);
    });
    await desktop.goto(url, { waitUntil: "networkidle" });
    results.push(await checkPage(desktop, "desktop", "desktop-full.png"));

    const mobile = await browser.newPage({ viewport: { width: 390, height: 1200 }, isMobile: true });
    mobile.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(`[mobile] ${message.text()}`);
    });
    await mobile.goto(url, { waitUntil: "networkidle" });
    results.push(await checkPage(mobile, "mobile", "mobile-full.png"));

    const rtl = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    rtl.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(`[rtl] ${message.text()}`);
    });
    await rtl.goto(url, { waitUntil: "networkidle" });
    await rtl.getByRole("button", { name: "Right to left" }).click();
    const rtlSection = rtl.locator('[aria-labelledby="layout-patterns-title"]');
    await rtlSection.screenshot({ path: path.join(outputDir, "rtl-layout-section.png") });
    results.push(await checkPage(rtl, "rtl-preview", "rtl-full.png"));
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }

  const failures = [];
  for (const result of results) {
    if (result.horizontalOverflow) failures.push(`${result.label}: horizontal overflow`);
    if (result.primaryButtons !== 1) failures.push(`${result.label}: expected 1 primary button, found ${result.primaryButtons}`);
    if (result.bodyTextLength < 500) failures.push(`${result.label}: page text looks unexpectedly sparse`);
    if (result.screenshotBytes < 5000) failures.push(`${result.label}: screenshot looks unexpectedly small`);
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
    console.log(`visual check ok: ${results.length} screenshots`);
    for (const result of results) console.log(`${result.label}: ${result.screenshot}`);
    console.log("report: .visual-snapshots/report.json");
  }
}

await main();
