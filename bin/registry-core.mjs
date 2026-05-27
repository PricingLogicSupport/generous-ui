import { access, copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "generous-ui.registry.json");
const schemaPath = path.join(root, "generous-ui.registry.schema.json");
const configFileName = "generous-ui.json";

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function assertString(value, pathLabel, errors) {
  if (typeof value !== "string" || value.length === 0) errors.push(`${pathLabel} must be a non-empty string`);
}

function validateShape(registry, schema) {
  const errors = [];
  const required = schema.required ?? [];

  for (const key of required) {
    if (!(key in registry)) errors.push(`registry.${key} is required`);
  }

  assertString(registry.name, "registry.name", errors);
  assertString(registry.version, "registry.version", errors);
  assertString(registry.style, "registry.style", errors);
  assertString(registry.description, "registry.description", errors);
  assertString(registry.css, "registry.css", errors);

  if (!Array.isArray(registry.components) || registry.components.length === 0) {
    errors.push("registry.components must contain at least one component");
    return errors;
  }

  const allowedTypes = new Set(schema.properties.components.items.properties.type.enum);
  const names = new Set();

  registry.components.forEach((component, index) => {
    const prefix = `registry.components[${index}]`;
    assertString(component.name, `${prefix}.name`, errors);
    if (names.has(component.name)) errors.push(`${prefix}.name duplicates ${component.name}`);
    names.add(component.name);

    if (!allowedTypes.has(component.type)) {
      errors.push(`${prefix}.type must be one of ${Array.from(allowedTypes).join(", ")}`);
    }

    if (!Array.isArray(component.files) || component.files.length === 0) {
      errors.push(`${prefix}.files must contain at least one file`);
    }

    for (const file of component.files ?? []) assertString(file, `${prefix}.files[]`, errors);

    if (component.dependencies !== undefined) {
      if (!Array.isArray(component.dependencies)) {
        errors.push(`${prefix}.dependencies must be an array when provided`);
      } else {
        for (const dependency of component.dependencies) assertString(dependency, `${prefix}.dependencies[]`, errors);
      }
    }
  });

  return errors;
}

async function assertFilesExist(registry) {
  const paths = new Set([registry.css]);

  for (const component of registry.components) {
    for (const file of component.files ?? []) paths.add(file);
    for (const dependency of component.dependencies ?? []) paths.add(dependency);
  }

  const missing = [];
  for (const relativePath of paths) {
    try {
      await access(path.join(root, relativePath));
    } catch {
      missing.push(relativePath);
    }
  }

  return missing;
}

async function publicExports() {
  const indexPath = path.join(root, "src/index.ts");
  const sourceText = await readFile(indexPath, "utf8");
  const sourceFile = ts.createSourceFile("src/index.ts", sourceText, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const names = [];

  for (const statement of sourceFile.statements) {
    if (
      ts.isExportDeclaration(statement) &&
      !statement.isTypeOnly &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const element of statement.exportClause.elements) names.push(element.name.text);
    }
  }

  return names;
}

async function registryCoverage(registry) {
  const exportedNames = new Set(await publicExports());
  const registryNames = new Set(registry.components.map((component) => component.name));

  return {
    exportedNames,
    registryNames,
    missing: Array.from(exportedNames).filter((name) => !registryNames.has(name)).sort((a, b) => a.localeCompare(b)),
    stale: Array.from(registryNames).filter((name) => !exportedNames.has(name)).sort((a, b) => a.localeCompare(b))
  };
}

async function assertExportCoverage(registry) {
  const coverage = await registryCoverage(registry);
  return [
    ...coverage.missing.map((name) => `missing registry entry for export: ${name}`),
    ...coverage.stale.map((name) => `registry entry is not exported: ${name}`)
  ];
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

async function readLocalImports(relativePath) {
  const absolutePath = path.join(root, relativePath);
  const sourceText = await readFile(absolutePath, "utf8");
  const sourceFile = ts.createSourceFile(
    relativePath,
    sourceText,
    ts.ScriptTarget.Latest,
    false,
    relativePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const imports = [];

  for (const statement of sourceFile.statements) {
    const moduleSpecifier =
      (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) && statement.moduleSpecifier;

    if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier)) {
      const resolved = await resolveLocalImport(relativePath, moduleSpecifier.text);
      if (resolved) imports.push(resolved);
    }
  }

  return imports;
}

async function readImportSpecifiers(relativePath) {
  const absolutePath = path.join(root, relativePath);
  const sourceText = await readFile(absolutePath, "utf8");
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

async function readImportSpecifiersFromFile(filePath) {
  const sourceText = await readFile(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    false,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const specifiers = [];

  for (const statement of sourceFile.statements) {
    const moduleSpecifier =
      (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) && statement.moduleSpecifier;

    if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier)) specifiers.push(moduleSpecifier.text);
  }

  return specifiers;
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

async function assertLocalImportsResolve(registry) {
  const unresolved = [];
  const files = new Set();

  for (const component of registry.components) {
    for (const file of component.files ?? []) files.add(file);
    for (const dependency of component.dependencies ?? []) files.add(dependency);
  }

  for (const relativePath of files) {
    if (!/\.[cm]?[tj]sx?$/.test(relativePath)) continue;

    const absolutePath = path.join(root, relativePath);
    if (!(await pathExists(absolutePath))) continue;

    const sourceText = await readFile(absolutePath, "utf8");
    const sourceFile = ts.createSourceFile(
      relativePath,
      sourceText,
      ts.ScriptTarget.Latest,
      false,
      relativePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    );

    for (const statement of sourceFile.statements) {
      const moduleSpecifier =
        (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) && statement.moduleSpecifier;

      if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier) && moduleSpecifier.text.startsWith(".")) {
        const resolved = await resolveLocalImport(relativePath, moduleSpecifier.text);
        if (!resolved) unresolved.push(`${relativePath} -> ${moduleSpecifier.text}`);
      }
    }
  }

  return unresolved;
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

function listComponents(registry) {
  const groups = new Map();

  for (const component of registry.components) {
    if (!groups.has(component.type)) groups.set(component.type, []);
    groups.get(component.type).push(component.name);
  }

  for (const [type, names] of Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`${type}: ${names.sort((a, b) => a.localeCompare(b)).join(", ")}`);
  }
}

async function showCoverage(registry) {
  const coverage = await registryCoverage(registry);

  console.log(`exports: ${coverage.exportedNames.size}`);
  console.log(`registry: ${coverage.registryNames.size}`);
  console.log(`missing: ${coverage.missing.length ? coverage.missing.join(", ") : "none"}`);
  console.log(`stale: ${coverage.stale.length ? coverage.stale.join(", ") : "none"}`);
}

function findComponent(registry, name) {
  return registry.components.find((component) => component.name.toLowerCase() === name.toLowerCase());
}

function assertSafeRelativePath(relativePath) {
  return (
    typeof relativePath === "string" &&
    relativePath.length > 0 &&
    !path.isAbsolute(relativePath) &&
    !relativePath.split(/[\\/]/).includes("..")
  );
}

function parseAddArgs(rawArgs) {
  const options = {
    componentName: undefined,
    componentNames: [],
    typeName: undefined,
    all: false,
    targetDir: undefined,
    baseDir: undefined,
    componentsDir: undefined,
    patternsDir: undefined,
    libDir: undefined,
    themeDir: undefined,
    stylesDir: undefined,
    dryRun: false,
    force: false,
    withCss: false
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === "--to") {
      options.targetDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--base") {
      options.baseDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--components-dir") {
      options.componentsDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--patterns-dir") {
      options.patternsDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--lib-dir") {
      options.libDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--theme-dir") {
      options.themeDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--styles-dir") {
      options.stylesDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--with-css") {
      options.withCss = true;
    } else if (arg === "--all") {
      options.all = true;
    } else if (arg === "--type") {
      options.typeName = rawArgs[index + 1];
      index += 1;
    } else if (!arg.startsWith("--")) {
      options.componentNames.push(arg);
      options.componentName = options.componentNames[0];
    } else {
      fail(`Unknown argument: ${arg}`);
      return options;
    }
  }

  return options;
}

function uniqueComponents(components) {
  const seen = new Set();
  const unique = [];

  for (const component of components) {
    if (seen.has(component.name)) continue;
    seen.add(component.name);
    unique.push(component);
  }

  return unique;
}

function addSelectionLabel(options, components) {
  if (options.all) return "all components";
  if (options.typeName) return `${options.typeName} components`;
  if (components.length === 1) return components[0].name;
  return `${components.length} components`;
}

function selectComponentsForAdd(registry, options) {
  if (options.all && (options.typeName || options.componentNames.length)) {
    fail("Use either --all, --type, or component names, not a combination.");
    return [];
  }

  if (options.typeName && options.componentNames.length) {
    fail("Use either --type or component names, not both.");
    return [];
  }

  if (options.all) return registry.components;

  if (options.typeName) {
    const components = registry.components.filter((component) => component.type === options.typeName);
    if (!components.length) {
      const types = Array.from(new Set(registry.components.map((component) => component.type))).sort((a, b) =>
        a.localeCompare(b)
      );
      fail(`Unknown component type: ${options.typeName}. Available types: ${types.join(", ")}`);
      return [];
    }
    return components;
  }

  if (options.componentNames.length) {
    const components = [];
    for (const name of options.componentNames) {
      const component = findComponent(registry, name);
      if (!component) {
        fail(`Unknown component: ${name}`);
        return [];
      }
      components.push(component);
    }
    return uniqueComponents(components);
  }

  fail("Missing component name, --type, or --all. Example: generous-ui add Button");
  return [];
}

function parseInitArgs(rawArgs) {
  const options = {
    targetDir: ".",
    baseDir: "src/ui",
    componentsDir: undefined,
    patternsDir: undefined,
    libDir: undefined,
    themeDir: undefined,
    stylesDir: undefined,
    dryRun: false,
    force: false,
    withCss: true
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === "--to" || arg === "--target") {
      options.targetDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--base") {
      options.baseDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--components-dir") {
      options.componentsDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--patterns-dir") {
      options.patternsDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--lib-dir") {
      options.libDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--theme-dir") {
      options.themeDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--styles-dir") {
      options.stylesDir = rawArgs[index + 1];
      index += 1;
    } else if (arg === "--without-css") {
      options.withCss = false;
    } else if (arg === "--with-css") {
      options.withCss = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else {
      fail(`Unknown argument: ${arg}`);
      return options;
    }
  }

  return options;
}

function projectConfigPath(cwd) {
  return path.join(cwd, configFileName);
}

async function readProjectConfig(cwd) {
  const configPath = projectConfigPath(cwd);
  if (!(await pathExists(configPath))) return undefined;
  return readJson(configPath);
}

function applyProjectConfig(options, config) {
  if (!config) return options;

  return {
    ...options,
    targetDir: options.targetDir ?? config.target ?? config.targetDir,
    baseDir: options.baseDir ?? config.base ?? config.baseDir,
    componentsDir: options.componentsDir ?? config.componentsDir,
    patternsDir: options.patternsDir ?? config.patternsDir,
    libDir: options.libDir ?? config.libDir,
    themeDir: options.themeDir ?? config.themeDir,
    stylesDir: options.stylesDir ?? config.stylesDir,
    withCss: options.withCss || Boolean(config.withCss)
  };
}

function projectConfigFromOptions(options) {
  const config = {
    $schema: "./node_modules/generous-ui/generous-ui.config.schema.json",
    target: options.targetDir,
    base: options.baseDir,
    withCss: options.withCss
  };

  if (options.componentsDir) config.componentsDir = options.componentsDir;
  if (options.patternsDir) config.patternsDir = options.patternsDir;
  if (options.libDir) config.libDir = options.libDir;
  if (options.themeDir) config.themeDir = options.themeDir;
  if (options.stylesDir) config.stylesDir = options.stylesDir;

  return config;
}

async function initProject(rawArgs, cwd = process.cwd()) {
  const options = parseInitArgs(rawArgs);
  if (process.exitCode) return;

  const configPath = projectConfigPath(cwd);
  const config = projectConfigFromOptions(options);
  const output = `${JSON.stringify(config, null, 2)}\n`;

  if (!options.force && (await pathExists(configPath))) {
    fail(`Refusing to overwrite ${configFileName}. Re-run with --force to replace it.`);
    return;
  }

  if (options.dryRun) {
    console.log(`write ${path.relative(cwd, configPath)}`);
    console.log(output.trimEnd());
    return;
  }

  await writeFile(configPath, output);
  console.log(`created ${configFileName}`);
  console.log(`components target: ${path.posix.join(options.baseDir, "components")}`);
  if (options.withCss) console.log("shared CSS will be copied when you add components");
}

function stripSlashes(value) {
  return value.replace(/^[/\\]+|[/\\]+$/g, "");
}

function mappedRoot(options, key, fallback) {
  return stripSlashes(options[key] ?? (options.baseDir ? path.posix.join(options.baseDir, fallback) : fallback));
}

function targetRelativePath(relativePath, options) {
  const normalized = relativePath.split(path.sep).join("/");

  if (!options.baseDir && !options.componentsDir && !options.patternsDir && !options.libDir && !options.themeDir && !options.stylesDir) {
    return normalized;
  }

  if (normalized === "src/styles.css") {
    return path.posix.join(mappedRoot(options, "stylesDir", "styles"), "styles.css");
  }

  const mappings = [
    { prefix: "src/components/", key: "componentsDir", fallback: "components" },
    { prefix: "src/patterns/", key: "patternsDir", fallback: "patterns" },
    { prefix: "src/lib/", key: "libDir", fallback: "lib" },
    { prefix: "src/theme/", key: "themeDir", fallback: "theme" }
  ];

  for (const mapping of mappings) {
    if (normalized.startsWith(mapping.prefix)) {
      return path.posix.join(mappedRoot(options, mapping.key, mapping.fallback), normalized.slice(mapping.prefix.length));
    }
  }

  return options.baseDir ? path.posix.join(stripSlashes(options.baseDir), normalized.replace(/^src\//, "")) : normalized;
}

function importSpecifierForTarget(fromTargetPath, toTargetPath) {
  let relativeSpecifier = path.posix.relative(path.posix.dirname(fromTargetPath), toTargetPath);
  if (!relativeSpecifier.startsWith(".")) relativeSpecifier = `./${relativeSpecifier}`;
  return relativeSpecifier.replace(/\.[cm]?[tj]sx?$/, "");
}

async function transformedSource(relativePath, targetMap) {
  if (!/\.[cm]?[tj]sx?$/.test(relativePath)) return undefined;

  const sourceText = await readFile(path.join(root, relativePath), "utf8");
  const sourceFile = ts.createSourceFile(
    relativePath,
    sourceText,
    ts.ScriptTarget.Latest,
    false,
    relativePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const replacements = [];

  for (const statement of sourceFile.statements) {
    const moduleSpecifier =
      (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) && statement.moduleSpecifier;

    if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier) || !moduleSpecifier.text.startsWith(".")) continue;

    const resolved = await resolveLocalImport(relativePath, moduleSpecifier.text);
    if (!resolved || !targetMap.has(resolved)) continue;

    replacements.push({
      start: moduleSpecifier.getStart(sourceFile) + 1,
      end: moduleSpecifier.getEnd() - 1,
      value: importSpecifierForTarget(targetMap.get(relativePath), targetMap.get(resolved))
    });
  }

  if (!replacements.length) return sourceText;

  let output = sourceText;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    output = `${output.slice(0, replacement.start)}${replacement.value}${output.slice(replacement.end)}`;
  }
  return output;
}

async function componentFiles(registry, component, withCss = false) {
  const files = new Set(
    await resolveFileClosure([...(component.files ?? []), ...(component.dependencies ?? [])])
  );
  if (withCss) files.add(registry.css);
  return Array.from(files);
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function showComponent(registry, name) {
  const component = findComponent(registry, name);
  if (!component) {
    fail(`Unknown component: ${name}`);
    return;
  }

  console.log(`${component.name} (${component.type})`);
  const files = await componentFiles(registry, component);
  console.log("files:");
  for (const file of files) console.log(`  ${file}`);

  const packages = await packageDependencies(files);
  if (packages.length) {
    console.log("packages:");
    for (const packageName of packages) console.log(`  ${packageName}`);
  }
}

async function addComponent(registry, rawArgs, cwd = process.cwd()) {
  const options = applyProjectConfig(parseAddArgs(rawArgs), await readProjectConfig(cwd));
  if (process.exitCode) return;

  if (!options.targetDir) {
    fail(`Missing --to target directory. Run "generous-ui init" or pass --to.`);
    return;
  }

  const components = uniqueComponents(selectComponentsForAdd(registry, options));
  if (process.exitCode || !components.length) return;

  const targetRoot = path.resolve(cwd, options.targetDir);
  const files = Array.from(
    new Set(
      (
        await Promise.all(
          components.map((component) => componentFiles(registry, component, false))
        )
      ).flat()
    )
  );
  if (options.withCss) files.push(registry.css);
  const targetMap = new Map(files.map((file) => [file, targetRelativePath(file, options)]));
  const unsafePath = files.find((file) => !assertSafeRelativePath(file));
  if (unsafePath) {
    fail(`Unsafe registry path: ${unsafePath}`);
    return;
  }

  const missingSources = [];
  const existingTargets = [];

  for (const relativePath of files) {
    const source = path.join(root, relativePath);
    const targetPath = targetMap.get(relativePath);
    const target = path.join(targetRoot, targetPath);

    if (!(await pathExists(source))) missingSources.push(relativePath);
    if (!options.force && (await pathExists(target))) existingTargets.push(path.relative(cwd, target));
  }

  if (missingSources.length) {
    fail(missingSources.map((file) => `missing source: ${file}`).join("\n"));
    return;
  }

  if (existingTargets.length) {
    fail(
      [
        "Refusing to overwrite existing files. Re-run with --force to replace:",
        ...existingTargets.map((file) => `  ${file}`)
      ].join("\n")
    );
    return;
  }

  console.log(`adding ${addSelectionLabel(options, components)} (${components.length} registry entries, ${files.length} files)`);

  for (const relativePath of files) {
    const source = path.join(root, relativePath);
    const targetPath = targetMap.get(relativePath);
    const target = path.join(targetRoot, targetPath);
    const displayTarget = path.relative(cwd, target);

    if (options.dryRun) {
      console.log(`copy ${relativePath} -> ${displayTarget}`);
    } else {
      await mkdir(path.dirname(target), { recursive: true });
      const transformed = await transformedSource(relativePath, targetMap);
      if (transformed === undefined) await copyFile(source, target);
      else await writeFile(target, transformed);
      console.log(`copied ${relativePath} -> ${displayTarget}`);
    }
  }

  const packages = await packageDependencies(files);
  if (packages.length) console.log(`packages needed: ${packages.join(", ")}`);
}

function manifestHasPackage(manifest, packageName) {
  return Boolean(
    manifest.dependencies?.[packageName] ||
      manifest.devDependencies?.[packageName] ||
      manifest.peerDependencies?.[packageName] ||
      manifest.optionalDependencies?.[packageName]
  );
}

async function installedPackagePath(cwd, packageName) {
  const packagePath = path.join(cwd, "node_modules", ...packageName.split("/"), "package.json");
  return (await pathExists(packagePath)) ? packagePath : undefined;
}

async function collectSourceFiles(dir) {
  if (!(await pathExists(dir))) return [];

  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(entryPath)));
    } else if (/\.[cm]?[tj]sx?$/.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

async function doctorProject(registry, cwd = process.cwd()) {
  const results = [];
  const warnings = [];
  const failures = [];
  const addOk = (message) => results.push(`[ok] ${message}`);
  const addWarn = (message) => {
    warnings.push(message);
    results.push(`[warn] ${message}`);
  };
  const addFail = (message) => {
    failures.push(message);
    results.push(`[fail] ${message}`);
  };

  const configPath = projectConfigPath(cwd);
  const config = await readProjectConfig(cwd);

  if (config) addOk(`${configFileName} found`);
  else addFail(`${configFileName} not found. Run "generous-ui init".`);

  const packageJsonPath = path.join(cwd, "package.json");
  const manifest = (await pathExists(packageJsonPath)) ? await readJson(packageJsonPath) : undefined;
  if (manifest) addOk("package.json found");
  else addFail("package.json not found");

  const options = config ? applyProjectConfig(parseAddArgs([]), config) : undefined;
  const targetRoot = options?.targetDir ? path.resolve(cwd, options.targetDir) : cwd;

  if (options) {
    const pathEntries = [
      ["target", options.targetDir],
      ["base", options.baseDir],
      ["componentsDir", options.componentsDir],
      ["patternsDir", options.patternsDir],
      ["libDir", options.libDir],
      ["themeDir", options.themeDir],
      ["stylesDir", options.stylesDir]
    ].filter(([, value]) => value !== undefined);

    for (const [label, value] of pathEntries) {
      if (assertSafeRelativePath(value)) addOk(`${label} path is safe: ${value}`);
      else addFail(`${label} path is unsafe: ${value}`);
    }
  }

  const packageNames = new Set(["react", "react-dom"]);
  const sourceFiles = [];

  if (options) {
    const sourceRoots = [
      targetRelativePath("src/components/__doctor__.tsx", options).replace(/\/__doctor__\.tsx$/, ""),
      targetRelativePath("src/patterns/__doctor__.tsx", options).replace(/\/__doctor__\.tsx$/, ""),
      targetRelativePath("src/lib/__doctor__.ts", options).replace(/\/__doctor__\.ts$/, ""),
      targetRelativePath("src/theme/__doctor__.tsx", options).replace(/\/__doctor__\.tsx$/, "")
    ];

    for (const relativeRoot of Array.from(new Set(sourceRoots))) {
      sourceFiles.push(...(await collectSourceFiles(path.join(targetRoot, relativeRoot))));
    }

    for (const file of sourceFiles) {
      for (const specifier of await readImportSpecifiersFromFile(file)) {
        const packageName = packageNameFromSpecifier(specifier);
        if (packageName) packageNames.add(packageName);
      }
    }

    if (sourceFiles.length) addOk(`${sourceFiles.length} copied source files found`);
    else addWarn("no copied component source files found yet");

    if (options.withCss) {
      const cssTarget = path.join(targetRoot, targetRelativePath(registry.css, options));
      if (await pathExists(cssTarget)) addOk(`shared CSS found at ${path.relative(cwd, cssTarget)}`);
      else if (sourceFiles.length) addFail(`shared CSS missing at ${path.relative(cwd, cssTarget)}`);
      else addWarn(`shared CSS not copied yet: ${path.relative(cwd, cssTarget)}`);
    }
  }

  const declaredOrInstalled = [];
  const missingPackages = [];

  for (const packageName of Array.from(packageNames).sort((a, b) => a.localeCompare(b))) {
    const declared = manifest ? manifestHasPackage(manifest, packageName) : false;
    const installed = Boolean(await installedPackagePath(cwd, packageName));
    if (declared || installed) declaredOrInstalled.push(packageName);
    else missingPackages.push(packageName);
  }

  if (declaredOrInstalled.length) addOk(`packages available: ${declaredOrInstalled.join(", ")}`);
  for (const packageName of missingPackages) addFail(`missing package: ${packageName}`);

  const hasTsConfig = await pathExists(path.join(cwd, "tsconfig.json"));
  const hasTypescript = Boolean(
    (manifest && manifestHasPackage(manifest, "typescript")) || (await installedPackagePath(cwd, "typescript"))
  );

  if (hasTsConfig) addOk("tsconfig.json found");
  else addWarn("tsconfig.json not found");

  if (hasTypescript) addOk("TypeScript available");
  else addWarn("TypeScript is not declared or installed");

  for (const result of results) console.log(result);
  console.log(`doctor: ${failures.length} failures, ${warnings.length} warnings`);

  if (failures.length) process.exitCode = 1;
}

function printHelp() {
  console.log(`Usage: generous-ui <command> [options]

Commands:
  init                       Create generous-ui.json in the current project
  add <component...>         Copy component source closures into your project
  list                       List registry entries by type
  show <component>           Show files and package imports for a component
  doctor                     Check a consuming project for install issues
  validate                   Validate the registry
  coverage                   Compare public exports with registry entries

Init options:
  --to, --target <dir>       Project root to copy into later (default: .)
  --base <dir>               Base path for mapped files (default: src/ui)
  --without-css              Do not copy shared CSS by default
  --dry-run                  Print the config without writing it
  --force                    Replace an existing generous-ui.json

Add options:
  --to <dir>                 Target project root
  --type <type>              Add every component in a registry type bucket
  --all                      Add every registry component
  --base <dir>               Map files into <dir>/components, <dir>/patterns, etc.
  --components-dir <dir>     Override component destination
  --patterns-dir <dir>       Override pattern destination
  --lib-dir <dir>            Override lib destination
  --theme-dir <dir>          Override theme destination
  --styles-dir <dir>         Override stylesheet destination
  --with-css                 Copy the shared stylesheet too
  --dry-run                  Preview copied files without writing them
  --force                    Overwrite existing files`);
}

async function validateRegistry(registry, schema) {
  const shapeErrors = validateShape(registry, schema);
  const missingFiles = await assertFilesExist(registry);
  const unresolvedImports = await assertLocalImportsResolve(registry);
  const coverageErrors = await assertExportCoverage(registry);
  const errors = [
    ...shapeErrors,
    ...missingFiles.map((file) => `missing file: ${file}`),
    ...unresolvedImports.map((importPath) => `unresolved local import: ${importPath}`),
    ...coverageErrors
  ];

  if (errors.length) {
    fail(errors.join("\n"));
  } else {
    console.log(`registry ok: ${registry.components.length} components`);
  }
}

export async function runRegistryCommand(rawArgv = process.argv.slice(2), options = {}) {
  process.exitCode = 0;
  const cwd = options.cwd ?? process.cwd();
  const command = rawArgv[0] ?? "help";
  const args = rawArgv.slice(1);

  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "init") {
    await initProject(args, cwd);
    return;
  }

  const registry = await readJson(registryPath);
  const schema = await readJson(schemaPath);

  if (command === "list") {
    listComponents(registry);
  } else if (command === "coverage") {
    await showCoverage(registry);
  } else if (command === "show") {
    if (!args[0]) fail("Missing component name. Example: generous-ui show Button");
    else await showComponent(registry, args[0]);
  } else if (command === "add") {
    await addComponent(registry, args, cwd);
  } else if (command === "doctor") {
    await doctorProject(registry, cwd);
  } else if (command === "validate") {
    await validateRegistry(registry, schema);
  } else {
    fail(`Unknown command: ${command}`);
    printHelp();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runRegistryCommand();
}
