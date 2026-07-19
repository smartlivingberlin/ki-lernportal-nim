import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const scope = "@ki-lernportal-nim";

const expectedPackages = [
  { dir: "ui", name: `${scope}/ui`, allowed: ["contracts", "domain"] },
  { dir: "contracts", name: `${scope}/contracts`, allowed: [] },
  { dir: "domain", name: `${scope}/domain`, allowed: [] },
  { dir: "db", name: `${scope}/db`, allowed: ["contracts", "domain"] },
  {
    dir: "auth",
    name: `${scope}/auth`,
    allowed: ["contracts", "domain", "db"],
  },
  {
    dir: "admin",
    name: `${scope}/admin`,
    allowed: ["contracts", "domain", "db", "auth"],
  },
  {
    dir: "ai-core",
    name: `${scope}/ai-core`,
    allowed: ["contracts", "domain"],
  },
  {
    dir: "testing",
    name: `${scope}/testing`,
    allowed: [
      "ui",
      "contracts",
      "domain",
      "db",
      "auth",
      "admin",
      "ai-core",
    ],
  },
];

const byDir = new Map(
  expectedPackages.map((pkg) => [pkg.dir, pkg]),
);

const byName = new Map(
  expectedPackages.map((pkg) => [pkg.name, pkg]),
);

const errors = [];
const checkedFiles = [];

function fail(message) {
  errors.push(message);
}

function toPosix(path) {
  return path.split(sep).join("/");
}

function rel(path) {
  return toPosix(relative(root, path));
}

function isDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function isFile(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

function readText(path) {
  checkedFiles.push(rel(path));
  return readFileSync(path, "utf8");
}

function readJson(path) {
  try {
    return JSON.parse(readText(path));
  } catch (error) {
    fail(`${rel(path)} is not valid JSON: ${error.message}`);
    return null;
  }
}

function listFiles(start, predicate) {
  if (!isDirectory(start)) {
    return [];
  }

  const result = [];
  const stack = [start];
  const ignored = new Set([
    ".git",
    ".next",
    "coverage",
    "dist",
    "node_modules",
  ]);

  while (stack.length > 0) {
    const current = stack.pop();

    for (const entry of readdirSync(current, {
      withFileTypes: true,
    })) {
      if (ignored.has(entry.name)) {
        continue;
      }

      const full = resolve(current, entry.name);

      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && predicate(full)) {
        result.push(full);
      }
    }
  }

  return result.sort();
}

function allDependencyNames(manifest) {
  const fields = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ];

  return new Set(
    fields.flatMap(
      (field) => Object.keys(manifest?.[field] ?? {}),
    ),
  );
}

function internalPackageName(specifier) {
  if (!specifier.startsWith(`${scope}/`)) {
    return null;
  }

  const parts = specifier.split("/");

  if (parts.length < 2) {
    return null;
  }

  return `${parts[0]}/${parts[1]}`;
}

function importSpecifiers(source) {
  const patterns = [
    /\b(?:import|export)\s+(?:type\s+)?(?:[\w*$,\s{}]+?\s+from\s+)?["']([^"']+)["']/g,
    /require\(\s*["']([^"']+)["']\s*\)/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
  ];

  const specifiers = [];

  for (const pattern of patterns) {
    let match;

    while ((match = pattern.exec(source)) !== null) {
      specifiers.push(match[1]);
    }
  }

  return [...new Set(specifiers)];
}

function sourceOwner(path) {
  const normalized = rel(path);
  const packageMatch = normalized.match(
    /^packages\/([^/]+)\//,
  );

  if (packageMatch) {
    return {
      kind: "package",
      dir: packageMatch[1],
    };
  }

  if (normalized.startsWith("apps/web/")) {
    return {
      kind: "web",
    };
  }

  return {
    kind: "other",
  };
}

function isTestFile(path) {
  const normalized = rel(path).toLowerCase();

  return (
    normalized.includes("/__tests__/") ||
    normalized.includes("/tests/") ||
    normalized.includes("/test/") ||
    /\.(test|spec)\.[cm]?[jt]sx?$/.test(normalized) ||
    normalized.includes("playwright")
  );
}

function matchesProvider(specifier, names) {
  return names.some(
    (name) =>
      specifier === name ||
      specifier.startsWith(`${name}/`),
  );
}

function normalizeImportPath(specifier) {
  return specifier.replace(/[\\/]+/g, "/");
}

function hasDirectPackageSourcePath(specifier) {
  const normalized = normalizeImportPath(specifier);

  return expectedPackages.some(
    ({ dir }) =>
      normalized === `packages/${dir}` ||
      normalized.startsWith(`packages/${dir}/`) ||
      normalized.endsWith(`/packages/${dir}`) ||
      normalized.includes(`/packages/${dir}/`),
  );
}

function validateWorkspace() {
  const workspacePath = resolve(
    root,
    "pnpm-workspace.yaml",
  );

  if (!isFile(workspacePath)) {
    fail("pnpm-workspace.yaml is missing");
    return;
  }

  const workspace = readText(workspacePath);

  if (
    !/^\s*-\s*["']?packages\/\*["']?\s*$/m.test(
      workspace,
    )
  ) {
    fail(
      "pnpm-workspace.yaml does not include packages/*",
    );
  }
}

function validatePackageSkeletons() {
  const packagesRoot = resolve(root, "packages");

  if (!isDirectory(packagesRoot)) {
    fail("packages directory is missing");
    return;
  }

  const actualDirs = readdirSync(packagesRoot, {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const expectedDirs = expectedPackages
    .map((pkg) => pkg.dir)
    .sort();

  if (
    JSON.stringify(actualDirs) !==
    JSON.stringify(expectedDirs)
  ) {
    fail(
      `Package-Verzeichnisabweichung: erwartet ${expectedDirs.join(
        ", ",
      )}; vorhanden ${actualDirs.join(", ")}`,
    );
  }

  for (const pkg of expectedPackages) {
    const packageRoot = resolve(
      packagesRoot,
      pkg.dir,
    );

    const required = [
      "package.json",
      "README.md",
      "src/index.ts",
      "tsconfig.json",
    ];

    for (const requiredPath of required) {
      const full = resolve(
        packageRoot,
        requiredPath,
      );

      if (!isFile(full)) {
        fail(`${rel(full)} is missing`);
      }
    }

    const manifestPath = resolve(
      packageRoot,
      "package.json",
    );

    if (!isFile(manifestPath)) {
      continue;
    }

    const manifest = readJson(manifestPath);

    if (!manifest) {
      continue;
    }

    if (manifest.name !== pkg.name) {
      fail(
        `${rel(
          manifestPath,
        )} has unexpected name ${manifest.name}`,
      );
    }

    if (manifest.version !== "0.0.0") {
      fail(
        `${rel(
          manifestPath,
        )} must use version 0.0.0`,
      );
    }

    if (manifest.private !== true) {
      fail(
        `${rel(
          manifestPath,
        )} must set private: true`,
      );
    }

    if (manifest.type !== "module") {
      fail(
        `${rel(
          manifestPath,
        )} must set type: module`,
      );
    }

    if (manifest.sideEffects !== false) {
      fail(
        `${rel(
          manifestPath,
        )} must set sideEffects: false`,
      );
    }

    if ("publishConfig" in manifest) {
      fail(
        `${rel(
          manifestPath,
        )} must not define publishConfig`,
      );
    }

    const expectedExport = {
      types: "./src/index.ts",
      default: "./src/index.ts",
    };

    if (
      JSON.stringify(manifest.exports?.["."]) !==
      JSON.stringify(expectedExport)
    ) {
      fail(
        `${rel(
          manifestPath,
        )} must expose only ./src/index.ts`,
      );
    }

    for (const field of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      if (
        Object.keys(
          manifest[field] ?? {},
        ).length > 0
      ) {
        fail(
          `${rel(
            manifestPath,
          )} must not declare ${field} in S51A`,
        );
      }
    }

    const tsconfigPath = resolve(
      packageRoot,
      "tsconfig.json",
    );

    if (isFile(tsconfigPath)) {
      const tsconfig = readJson(tsconfigPath);

      if (
        tsconfig?.extends !==
        "../../tsconfig.base.json"
      ) {
        fail(
          `${rel(
            tsconfigPath,
          )} must extend ../../tsconfig.base.json`,
        );
      }

      if (
        JSON.stringify(tsconfig?.include) !==
        JSON.stringify(["src/**/*.ts"])
      ) {
        fail(
          `${rel(
            tsconfigPath,
          )} must include only src/**/*.ts`,
        );
      }
    }

    const readmePath = resolve(
      packageRoot,
      "README.md",
    );

    if (isFile(readmePath)) {
      const readme = readText(readmePath);

      for (const heading of [
        "## Zweck",
        "## Erlaubte Imports",
        "## Verbotene Imports",
        "## Öffentliche Exports",
        "## Status",
        "## Spätere Slices",
        "## Sicherheit und Datenschutz",
      ]) {
        if (!readme.includes(heading)) {
          fail(
            `${rel(
              readmePath,
            )} is missing heading ${heading}`,
          );
        }
      }

      if (
        !readme.includes(
          "Keine Runtime-Implementierung",
        )
      ) {
        fail(
          `${rel(
            readmePath,
          )} must state that no runtime implementation exists`,
        );
      }
    }
  }
}

function validateImportsAndGraph() {
  const webManifest = readJson(
    resolve(root, "apps/web/package.json"),
  );

  const manifests = new Map();

  for (const pkg of expectedPackages) {
    const manifest = readJson(
      resolve(
        root,
        "packages",
        pkg.dir,
        "package.json",
      ),
    );

    if (manifest) {
      manifests.set(pkg.dir, manifest);
    }
  }

  const packagesRoot = resolve(
    root,
    "packages",
  );

  const sourceFiles = [
    ...listFiles(
      packagesRoot,
      (path) => /\.[cm]?[jt]sx?$/.test(path),
    ),
    ...listFiles(
      resolve(root, "apps/web"),
      (path) => /\.[cm]?[jt]sx?$/.test(path),
    ),
  ];

  const aiProviders = [
    "openai",
    "@ai-sdk/openai",
    "@ai-sdk/anthropic",
    "@anthropic-ai/sdk",
    "anthropic",
    "cohere-ai",
    "@cohere-ai/cohere",
    "voyageai",
    "@pinecone-database/pinecone",
    "chromadb",
  ];

  for (const file of sourceFiles) {
    const owner = sourceOwner(file);
    const source = readText(file);

    for (const specifier of importSpecifiers(source)) {
      const internalName =
        internalPackageName(specifier);

      if (internalName) {
        const target = byName.get(internalName);

        if (!target) {
          fail(
            `${rel(
              file,
            )} imports unknown internal package ${specifier}`,
          );
          continue;
        }

        if (specifier !== internalName) {
          fail(
            `${rel(
              file,
            )} uses forbidden subpath import ${specifier}`,
          );
        }

        if (owner.kind === "package") {
          const importer = byDir.get(owner.dir);

          if (!importer) {
            fail(
              `${rel(
                file,
              )} belongs to unexpected package ${owner.dir}`,
            );
            continue;
          }

          if (target.dir === importer.dir) {
            continue;
          }

          if (
            target.dir === "testing" &&
            importer.dir !== "testing"
          ) {
            fail(
              `${rel(
                file,
              )} imports testing from production package`,
            );
          }

          if (
            !importer.allowed.includes(
              target.dir,
            )
          ) {
            fail(
              `${importer.name} may not import ${target.name}`,
            );
          }

          if (
            !allDependencyNames(
              manifests.get(importer.dir),
            ).has(target.name)
          ) {
            fail(
              `${importer.name} imports undeclared dependency ${target.name}`,
            );
          }
        } else if (owner.kind === "web") {
          if (
            target.dir === "testing" &&
            !isTestFile(file)
          ) {
            fail(
              `${rel(
                file,
              )} imports testing from web production code`,
            );
          }

          if (
            !allDependencyNames(
              webManifest,
            ).has(target.name)
          ) {
            fail(
              `apps/web imports undeclared dependency ${target.name}`,
            );
          }
        }
      }

      if (
        owner.kind !== "other" &&
        hasDirectPackageSourcePath(specifier)
      ) {
        fail(
          `${rel(
            file,
          )} imports package source directly through ${specifier}`,
        );
      }

      if (specifier.startsWith(".")) {
        const resolvedImport = resolve(
          dirname(file),
          specifier,
        );

        if (owner.kind === "package") {
          const importerRoot = resolve(
            packagesRoot,
            owner.dir,
          );

          if (
            !resolvedImport.startsWith(
              `${importerRoot}${sep}`,
            ) &&
            resolvedImport !== importerRoot
          ) {
            fail(
              `${rel(
                file,
              )} crosses package boundary through ${specifier}`,
            );
          }
        }

        if (
          owner.kind === "web" &&
          (
            resolvedImport === packagesRoot ||
            resolvedImport.startsWith(
              `${packagesRoot}${sep}`,
            )
          )
        ) {
          fail(
            `${rel(
              file,
            )} imports package source directly through ${specifier}`,
          );
        }
      }

      if (
        owner.kind !== "other" &&
        !(
          owner.kind === "package" &&
          owner.dir === "db"
        ) &&
        matchesProvider(
          specifier,
          ["drizzle-orm", "mysql2"],
        )
      ) {
        fail(
          `${rel(
            file,
          )} imports database SDK outside packages/db`,
        );
      }

      if (
        owner.kind !== "other" &&
        !(
          owner.kind === "package" &&
          owner.dir === "ai-core"
        ) &&
        matchesProvider(
          specifier,
          aiProviders,
        )
      ) {
        fail(
          `${rel(
            file,
          )} imports AI SDK outside packages/ai-core`,
        );
      }

      if (
        owner.kind === "package" &&
        owner.dir === "domain" &&
        matchesProvider(
          specifier,
          ["next", "react", "react-dom"],
        )
      ) {
        fail(
          `${rel(
            file,
          )} imports framework in packages/domain`,
        );
      }

      if (
        owner.kind === "package" &&
        owner.dir === "contracts" &&
        matchesProvider(
          specifier,
          ["next", "drizzle-orm", "mysql2"],
        )
      ) {
        fail(
          `${rel(
            file,
          )} imports forbidden dependency in packages/contracts`,
        );
      }
    }
  }

  const graph = new Map(
    expectedPackages.map(
      (pkg) => [pkg.dir, []],
    ),
  );

  for (const pkg of expectedPackages) {
    const dependencies = allDependencyNames(
      manifests.get(pkg.dir),
    );

    for (const dependency of dependencies) {
      const target = byName.get(dependency);

      if (target) {
        graph.get(pkg.dir).push(target.dir);
      }
    }
  }

  const visiting = new Set();
  const visited = new Set();

  function visit(node, trail) {
    if (visiting.has(node)) {
      fail(
        `cyclic package dependency: ${[
          ...trail,
          node,
        ].join(" -> ")}`,
      );
      return;
    }

    if (visited.has(node)) {
      return;
    }

    visiting.add(node);

    for (const next of graph.get(node) ?? []) {
      visit(next, [...trail, node]);
    }

    visiting.delete(node);
    visited.add(node);
  }

  for (const node of graph.keys()) {
    visit(node, []);
  }
}

function runTypecheck() {
  for (const pkg of expectedPackages) {
    const configFromWeb =
      `../../packages/${pkg.dir}/tsconfig.json`;

    const result = spawnSync(
      "pnpm",
      [
        "--filter",
        "web",
        "exec",
        "tsc",
        "--project",
        configFromWeb,
        "--noEmit",
        "--pretty",
        "false",
      ],
      {
        cwd: root,
        stdio: "inherit",
      },
    );

    if (result.error) {
      fail(
        `Unable to start TypeScript for ${pkg.name}: ${result.error.message}`,
      );
      return;
    }

    if (result.status !== 0) {
      fail(
        `TypeScript failed for ${pkg.name} with exit ${result.status}`,
      );
      return;
    }

    console.log(
      `PACKAGE_TYPECHECK|${pkg.name}=PASS`,
    );
  }
}

validateWorkspace();
validatePackageSkeletons();
validateImportsAndGraph();

if (
  process.argv.includes("--typecheck") &&
  errors.length === 0
) {
  runTypecheck();
}

if (errors.length > 0) {
  console.error(
    "S51A_PACKAGE_BOUNDARY_CHECK=FAIL",
  );

  for (const error of errors) {
    console.error(`ERROR=${error}`);
  }

  process.exit(1);
}

console.log(
  `S51A_PACKAGE_COUNT=${expectedPackages.length}`,
);

console.log(
  `S51A_CHECKED_FILE_COUNT=${
    new Set(checkedFiles).size
  }`,
);

console.log(
  "S51A_PACKAGE_BOUNDARY_CHECK=PASS",
);

if (process.argv.includes("--typecheck")) {
  console.log(
    "S51A_PACKAGE_TYPECHECK=PASS",
  );
}
