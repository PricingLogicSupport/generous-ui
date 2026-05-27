import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "generous-ui.registry.json");
const outputPath = path.join(root, "docs", "registry-details.json");

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveLocalImport(fromRelativePath, specifier) {
  if (!specifier.startsWith(".")) return undefined;

  const fromDir = path.dirname(path.join(root, fromRelativePath));
  const absoluteBase = path.resolve(fromDir, specifier);
  const candidates = [
    absoluteBase,
    `${absoluteBase}.ts`,
    `${absoluteBase}.tsx`,
    `${absoluteBase}.js`,
    `${absoluteBase}.jsx`,
    `${absoluteBase}.css`,
    path.join(absoluteBase, "index.ts"),
    path.join(absoluteBase, "index.tsx")
  ];

  for (const candidate of candidates) {
    if (await pathExists(candidate)) return path.relative(root, candidate).split(path.sep).join("/");
  }

  return undefined;
}

async function readImportSpecifiers(relativePath) {
  const sourceText = await readFile(path.join(root, relativePath), "utf8");
  const sourceFile = ts.createSourceFile(
    relativePath,
    sourceText,
    ts.ScriptTarget.Latest,
    false,
    relativePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const specifiers = [];

  for (const statement of sourceFile.statements) {
    const moduleSpecifier =
      (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) && statement.moduleSpecifier;

    if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier)) specifiers.push(moduleSpecifier.text);
  }

  return specifiers;
}

async function readLocalImports(relativePath) {
  const imports = [];

  for (const specifier of await readImportSpecifiers(relativePath)) {
    const resolved = await resolveLocalImport(relativePath, specifier);
    if (resolved) imports.push(resolved);
  }

  return imports;
}

async function resolveFileClosure(seedFiles) {
  const seen = new Set();
  const ordered = [];
  const queue = [...seedFiles];

  while (queue.length) {
    const relativePath = queue.shift();
    if (!relativePath || seen.has(relativePath)) continue;

    seen.add(relativePath);
    ordered.push(relativePath);

    if (!/\.[cm]?[tj]sx?$/.test(relativePath)) continue;

    for (const importedPath of await readLocalImports(relativePath)) {
      if (!seen.has(importedPath)) queue.push(importedPath);
    }
  }

  return ordered;
}

function packageNameFromSpecifier(specifier) {
  if (specifier.startsWith(".") || specifier.startsWith("node:")) return undefined;
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

async function packageDependencies(files) {
  const packages = new Set();

  for (const relativePath of files) {
    if (!/\.[cm]?[tj]sx?$/.test(relativePath)) continue;

    for (const specifier of await readImportSpecifiers(relativePath)) {
      const packageName = packageNameFromSpecifier(specifier);
      if (packageName) packages.add(packageName);
    }
  }

  return Array.from(packages).sort((a, b) => a.localeCompare(b));
}

const registry = await readJson(registryPath);
const components = [];

for (const component of registry.components) {
  const closure = await resolveFileClosure([...(component.files ?? []), ...(component.dependencies ?? [])]);
  components.push({
    name: component.name,
    type: component.type,
    files: component.files,
    closure,
    closureWithCss: Array.from(new Set([...closure, registry.css])),
    packages: await packageDependencies(closure)
  });
}

const details = {
  name: registry.name,
  version: registry.version,
  css: registry.css,
  components
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(details, null, 2)}\n`);
console.log(`registry details ok: ${components.length} components -> ${path.relative(root, outputPath)}`);
