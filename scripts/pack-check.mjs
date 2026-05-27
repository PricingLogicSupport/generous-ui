import { spawn } from "node:child_process";

const requiredFiles = [
  "README.md",
  "BRAND.md",
  "CHANGELOG.md",
  "LICENSE",
  "RELEASE.md",
  "package.json",
  "bin/generous-ui.mjs",
  "bin/registry-core.mjs",
  "dist/index.d.ts",
  "dist/generous-ui.css",
  "dist/generous-ui.js",
  "dist/generous-ui.umd.cjs",
  "generous-ui.config.schema.json",
  "generous-ui.registry.json",
  "generous-ui.registry.schema.json",
  "src/components/button.tsx",
  "src/components/dialog.tsx",
  "src/lib/cn.ts",
  "src/styles.css"
];

const forbiddenPrefixes = [
  ".behavior-results/",
  ".visual-snapshots/",
  "docs/",
  "node_modules/",
  "scripts/"
];

function runPackDryRun() {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["pack", "--dry-run", "--json"], {
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
      if (code === 0) resolve(stdout);
      else reject(new Error(stderr || stdout || `npm pack exited with ${code}`));
    });
  });
}

const output = await runPackDryRun();
const [pack] = JSON.parse(output);
const packedFiles = new Set(pack.files.map((file) => file.path));
const failures = [];

for (const file of requiredFiles) {
  if (!packedFiles.has(file)) failures.push(`missing package file: ${file}`);
}

for (const file of packedFiles) {
  if (forbiddenPrefixes.some((prefix) => file.startsWith(prefix))) {
    failures.push(`unexpected package file: ${file}`);
  }
}

if (pack.entryCount !== pack.files.length) {
  failures.push(`entryCount mismatch: ${pack.entryCount} !== ${pack.files.length}`);
}

if (pack.unpackedSize > 1_000_000) {
  failures.push(`package unpacked size too large: ${pack.unpackedSize}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`pack check ok: ${pack.entryCount} files, ${pack.unpackedSize} bytes unpacked`);
  for (const file of pack.files) console.log(`  ${file.path}`);
}
