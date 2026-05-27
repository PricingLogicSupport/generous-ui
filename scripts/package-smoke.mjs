import { mkdtemp, readFile, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workDir = await mkdtemp(path.join(tmpdir(), "generous-ui-package-"));
let tarballPath;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? root,
      env: { ...process.env, ...options.env },
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error([`Command failed: ${command} ${args.join(" ")}`, stdout, stderr].filter(Boolean).join("\n")));
    });
  });
}

async function fileText(relativePath) {
  return readFile(path.join(workDir, relativePath), "utf8");
}

try {
  const { stdout } = await run("npm", ["pack", "--json"], { cwd: root });
  const [pack] = JSON.parse(stdout);
  tarballPath = path.join(root, pack.filename);

  await run("npm", ["init", "-y"], { cwd: workDir });
  await run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarballPath], { cwd: workDir });

  await run("npx", ["generous-ui", "init"], { cwd: workDir });
  const config = JSON.parse(await fileText("generous-ui.json"));
  if (config.base !== "src/ui") throw new Error(`unexpected config base: ${config.base}`);
  if (config.withCss !== true) throw new Error("expected init to enable withCss");

  const { stdout: showOutput } = await run("npx", ["generous-ui", "show", "AlertDialog"], { cwd: workDir });
  if (!showOutput.includes("src/components/alert-dialog.tsx")) {
    throw new Error("show did not include AlertDialog source");
  }

  const { stdout: dryRunOutput } = await run("npx", ["generous-ui", "add", "AlertDialog", "--dry-run"], { cwd: workDir });
  if (!dryRunOutput.includes("src/ui/components/alert-dialog.tsx")) {
    throw new Error("dry run did not map AlertDialog into src/ui");
  }

  const { stdout: groupDryRunOutput } = await run("npx", ["generous-ui", "add", "--type", "form", "--dry-run"], {
    cwd: workDir
  });
  if (!groupDryRunOutput.includes("adding form components") || !groupDryRunOutput.includes("src/ui/components/input.tsx")) {
    throw new Error("type dry run did not include form components");
  }

  const { stdout: multiDryRunOutput } = await run("npx", ["generous-ui", "add", "Button", "Input", "--dry-run"], {
    cwd: workDir
  });
  if (!multiDryRunOutput.includes("adding 2 components") || !multiDryRunOutput.includes("src/ui/components/button.tsx")) {
    throw new Error("multi-component dry run did not include both components");
  }

  await run("npx", ["generous-ui", "add", "AlertDialog"], { cwd: workDir });
  const alertDialog = await fileText("src/ui/components/alert-dialog.tsx");
  const dialog = await fileText("src/ui/components/dialog.tsx");
  const styles = await fileText("src/ui/styles/styles.css");

  if (!alertDialog.includes('from "./button"') || !alertDialog.includes('from "./dialog"')) {
    throw new Error("AlertDialog imports were not rewritten to mapped paths");
  }

  if (!dialog.includes('from "lucide-react"')) {
    throw new Error("Dialog package import was not preserved");
  }

  if (!styles.includes(".gui-button")) {
    throw new Error("shared CSS was not copied");
  }

  const { stdout: doctorOutput } = await run("npx", ["generous-ui", "doctor"], { cwd: workDir });
  if (!doctorOutput.includes("doctor: 0 failures")) {
    throw new Error(`doctor did not pass:\n${doctorOutput}`);
  }

  console.log(`package smoke ok: ${pack.filename}`);
  console.log(`workspace: ${workDir}`);
} finally {
  if (tarballPath) await rm(tarballPath, { force: true });
  if (process.env.KEEP_GENEROUS_UI_SMOKE !== "1") await rm(workDir, { recursive: true, force: true });
}
