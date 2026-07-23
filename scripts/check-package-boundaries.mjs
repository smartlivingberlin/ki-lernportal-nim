import { spawnSync } from "node:child_process";
import { isBuiltin } from "node:module";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const scope = "@ki-lernportal-nim";

const approvedDatabaseProviders = [
  "drizzle-orm",
  "mysql2",
];

const forbiddenDatabaseProviders = [
  "@electric-sql/pglite",
  "@libsql/client",
  "@neondatabase/serverless",
  "@planetscale/database",
  "@prisma/client",
  "@supabase/supabase-js",
  "@upstash/redis",
  "@vercel/postgres",
  "better-sqlite3",
  "drizzle-kit",
  "dexie",
  "idb",
  "ioredis",
  "knex",
  "kysely",
  "mariadb",
  "mongodb",
  "mongoose",
  "mysql",
  "pg",
  "postgres",
  "postgres-js",
  "pouchdb",
  "prisma",
  "redis",
  "sequelize",
  "sqlite",
  "sqlite3",
  "typeorm",
];

const approvedExternalManifestDependencies = new Map([
  [
    "root",
    new Set([
      "@axe-core/playwright",
      "playwright",
    ]),
  ],
  [
    "app:web",
    new Set([
      "@tailwindcss/postcss",
      "@types/node",
      "@types/react",
      "@types/react-dom",
      "eslint",
      "eslint-config-next",
      "next",
      "react",
      "react-dom",
      "tailwindcss",
      "typescript",
    ]),
  ],
  [
    "package:db",
    new Set(approvedDatabaseProviders),
  ],
]);

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


const dependencyFields = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

function dependencyEntries(manifest) {
  return dependencyFields.flatMap(
    (field) =>
      Object.entries(
        manifest?.[field] ?? {},
      ).map(([name, target]) => ({
        field,
        name,
        target: String(target),
      })),
  );
}

function allDependencyNames(manifest) {
  return new Set(
    dependencyEntries(manifest).map(
      ({ name }) => name,
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


function moduleSpecifierStringStartsHere(prefix) {
  const tail = prefix.slice(-240);

  return /(?:\bfrom|\bimport|\brequire\s*\(|\bimport\s*\()\s*$/.test(
    tail,
  );
}

function maskNonModuleText(source) {
  let result = "";
  let state = "code";
  let escaped = false;
  let preserveString = false;

  for (
    let index = 0;
    index < source.length;
    index += 1
  ) {
    const character = source[index];
    const next = source[index + 1];

    if (state === "line-comment") {
      if (character === "\n") {
        result += "\n";
        state = "code";
      } else {
        result += " ";
      }

      continue;
    }

    if (state === "block-comment") {
      if (
        character === "*" &&
        next === "/"
      ) {
        result += "  ";
        index += 1;
        state = "code";
      } else {
        result +=
          character === "\n"
            ? "\n"
            : " ";
      }

      continue;
    }

    if (
      state === "single-quote" ||
      state === "double-quote" ||
      state === "template"
    ) {
      result +=
        preserveString
          ? character
          : (
              character === "\n"
                ? "\n"
                : " "
            );

      if (escaped) {
        escaped = false;
        continue;
      }

      if (character === "\\") {
        escaped = true;
        continue;
      }

      const closesString =
        (
          state === "single-quote" &&
          character === "'"
        ) ||
        (
          state === "double-quote" &&
          character === '"'
        ) ||
        (
          state === "template" &&
          character === "`"
        );

      if (closesString) {
        state = "code";
        preserveString = false;
      }

      continue;
    }

    if (
      character === "/" &&
      next === "/"
    ) {
      result += "  ";
      index += 1;
      state = "line-comment";
      continue;
    }

    if (
      character === "/" &&
      next === "*"
    ) {
      result += "  ";
      index += 1;
      state = "block-comment";
      continue;
    }

    if (
      character === "'" ||
      character === '"' ||
      character === "`"
    ) {
      preserveString =
        moduleSpecifierStringStartsHere(
          result,
        );

      result +=
        preserveString
          ? character
          : " ";

      if (character === "'") {
        state = "single-quote";
      } else if (character === '"') {
        state = "double-quote";
      } else {
        state = "template";
      }

      continue;
    }

    result += character;
  }

  return result;
}

function importSpecifiers(source) {
  const moduleText =
    maskNonModuleText(source);

  const patterns = [
    /\b(?:import|export)\s+(?:type\s+)?(?:[\w*$,\s{}]+?\s+from\s+)?["']([^"']+)["']/g,
    /require\(\s*["']([^"']+)["']\s*\)/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
    /import\(\s*`([^`$]+)`\s*\)/g,
  ];

  const specifiers = [];

  for (const pattern of patterns) {
    let match;

    while (
      (
        match =
          pattern.exec(moduleText)
      ) !== null
    ) {
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

  const appMatch = normalized.match(
    /^apps\/([^/]+)\//,
  );

  if (appMatch) {
    return {
      kind: "app",
      dir: appMatch[1],
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

function manifestOwnerKey(owner) {
  if (owner.kind === "app") {
    return `app:${owner.dir}`;
  }

  if (owner.kind === "package") {
    return `package:${owner.dir}`;
  }

  return "root";
}

function isApprovedManifestExternalDependency(
  owner,
  specifier,
) {
  const approved =
    approvedExternalManifestDependencies.get(
      manifestOwnerKey(owner),
    );

  return approved?.has(specifier) ?? false;
}

function isExternalModuleSpecifier(specifier) {
  return (
    !specifier.startsWith(".") &&
    !specifier.startsWith("/") &&
    !specifier.startsWith("#") &&
    internalPackageName(specifier) === null &&
    !isBuiltin(specifier)
  );
}

function databaseImportViolation(
  owner,
  specifier,
) {
  const isDbPackage =
    owner.kind === "package" &&
    owner.dir === "db";

  const approvedProvider =
    matchesProvider(
      specifier,
      approvedDatabaseProviders,
    );

  const forbiddenProvider =
    matchesProvider(
      specifier,
      forbiddenDatabaseProviders,
    );

  if (isDbPackage) {
    if (approvedProvider) {
      return null;
    }

    if (forbiddenProvider) {
      return "UNAPPROVED_DATABASE_SDK_IN_DB";
    }

    if (
      isExternalModuleSpecifier(specifier)
    ) {
      return "UNAPPROVED_EXTERNAL_IN_DB";
    }

    return null;
  }

  if (
    approvedProvider ||
    forbiddenProvider
  ) {
    return "DATABASE_SDK_OUTSIDE_DB";
  }

  return null;
}

function databaseViolationsForSpecifiers(
  owner,
  specifiers,
) {
  return specifiers
    .map((specifier) => ({
      specifier,
      violation: databaseImportViolation(
        owner,
        specifier,
      ),
    }))
    .filter(
      ({ violation }) =>
        violation !== null,
    );
}

function databaseSourceViolations(
  path,
  source,
) {
  return databaseViolationsForSpecifiers(
    sourceOwner(path),
    importSpecifiers(source),
  );
}

function dependencyTargetSpecifier(target) {
  if (
    typeof target !== "string" ||
    !target.startsWith("npm:")
  ) {
    return null;
  }

  const alias = target.slice(4);

  if (alias.startsWith("@")) {
    const slashIndex =
      alias.indexOf("/");

    if (slashIndex < 0) {
      return null;
    }

    const versionIndex =
      alias.indexOf(
        "@",
        slashIndex + 1,
      );

    return versionIndex < 0
      ? alias
      : alias.slice(0, versionIndex);
  }

  const versionIndex =
    alias.indexOf("@");

  return versionIndex < 0
    ? alias
    : alias.slice(0, versionIndex);
}

function manifestSpecifierViolation(
  owner,
  specifier,
) {
  const databaseViolation =
    databaseImportViolation(
      owner,
      specifier,
    );

  if (databaseViolation) {
    return databaseViolation;
  }

  if (
    isExternalModuleSpecifier(specifier) &&
    !isApprovedManifestExternalDependency(
      owner,
      specifier,
    )
  ) {
    return "UNAPPROVED_EXTERNAL_DEPENDENCY";
  }

  return null;
}

function databaseManifestViolations(
  owner,
  manifest,
) {
  const violations = [];

  for (
    const {
      field,
      name,
      target,
    } of dependencyEntries(manifest)
  ) {
    const candidates = [
      {
        source: "name",
        subject: name,
      },
    ];

    const targetSpecifier =
      dependencyTargetSpecifier(target);

    if (
      targetSpecifier &&
      targetSpecifier !== name
    ) {
      candidates.push({
        source: "target",
        subject: targetSpecifier,
      });
    }

    for (
      const {
        source,
        subject,
      } of candidates
    ) {
      const violation =
        manifestSpecifierViolation(
          owner,
          subject,
        );

      if (!violation) {
        continue;
      }

      violations.push({
        dependency: name,
        field,
        source,
        subject,
        target,
        violation,
      });
    }
  }

  return violations;
}


function reportDatabaseViolation(
  path,
  subject,
  violation,
) {
  if (
    violation ===
    "DATABASE_SDK_OUTSIDE_DB"
  ) {
    fail(
      `${rel(path)} declares or imports database SDK ` +
      `${subject} outside packages/db`,
    );
    return;
  }

  if (
    violation ===
    "UNAPPROVED_DATABASE_SDK_IN_DB"
  ) {
    fail(
      `${rel(path)} declares or imports unapproved ` +
      `database SDK ${subject} in packages/db; ` +
      "only drizzle-orm and mysql2 are allowed",
    );
    return;
  }

  if (
    violation ===
    "UNAPPROVED_EXTERNAL_IN_DB"
  ) {
    fail(
      `${rel(path)} declares or imports unapproved ` +
      `external module ${subject} in packages/db; ` +
      "external imports fail closed to drizzle-orm " +
      "and mysql2",
    );
    return;
  }

  if (
    violation ===
    "UNAPPROVED_EXTERNAL_DEPENDENCY"
  ) {
    fail(
      `${rel(path)} declares unapproved external ` +
      `dependency ${subject}; new external ` +
      "dependencies require a separately authorized " +
      "allowlist change",
    );
  }
}


function validateDatabaseManifest(
  path,
  owner,
  manifest,
) {
  if (!manifest) {
    return;
  }

  for (
    const {
      subject,
      violation,
    } of databaseManifestViolations(
      owner,
      manifest,
    )
  ) {
    reportDatabaseViolation(
      path,
      subject,
      violation,
    );
  }
}

function runDatabaseBoundarySelfTests() {
  const cases = [
    {
      label: "web_mysql2_blocked",
      owner: {
        kind: "app",
        dir: "web",
      },
      specifier: "mysql2",
      expected: "DATABASE_SDK_OUTSIDE_DB",
    },
    {
      label: "web_pg_blocked",
      owner: {
        kind: "app",
        dir: "web",
      },
      specifier: "pg",
      expected: "DATABASE_SDK_OUTSIDE_DB",
    },
    {
      label: "contracts_drizzle_blocked",
      owner: {
        kind: "package",
        dir: "contracts",
      },
      specifier: "drizzle-orm",
      expected: "DATABASE_SDK_OUTSIDE_DB",
    },
    {
      label: "domain_prisma_blocked",
      owner: {
        kind: "package",
        dir: "domain",
      },
      specifier: "@prisma/client",
      expected: "DATABASE_SDK_OUTSIDE_DB",
    },
    {
      label: "repository_script_mysql2_blocked",
      owner: { kind: "other" },
      specifier: "mysql2",
      expected: "DATABASE_SDK_OUTSIDE_DB",
    },
    {
      label: "db_pg_blocked",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "pg",
      expected: "UNAPPROVED_DATABASE_SDK_IN_DB",
    },
    {
      label: "db_prisma_blocked",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "prisma",
      expected: "UNAPPROVED_DATABASE_SDK_IN_DB",
    },
    {
      label: "db_drizzle_kit_blocked",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "drizzle-kit",
      expected: "UNAPPROVED_DATABASE_SDK_IN_DB",
    },
    {
      label: "db_unknown_external_blocked",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "unknown-db-client",
      expected: "UNAPPROVED_EXTERNAL_IN_DB",
    },
    {
      label: "db_node_builtin_allowed",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "node:crypto",
      expected: null,
    },
    {
      label: "db_drizzle_allowed",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "drizzle-orm",
      expected: null,
    },
    {
      label: "db_mysql2_allowed",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "mysql2",
      expected: null,
    },
    {
      label: "db_mysql2_subpath_allowed",
      owner: {
        kind: "package",
        dir: "db",
      },
      specifier: "mysql2/promise",
      expected: null,
    },
  ];

  let passed = 0;

  for (const testCase of cases) {
    const actual = databaseImportViolation(
      testCase.owner,
      testCase.specifier,
    );

    if (actual !== testCase.expected) {
      fail(
        `database boundary self-test ${testCase.label} ` +
        `expected ${String(testCase.expected)} ` +
        `but received ${String(actual)}`,
      );
      continue;
    }

    passed += 1;

    console.log(
      "S51B_DATABASE_BOUNDARY_SELF_TEST|" +
      `CASE=${testCase.label}|RESULT=PASS`,
    );
  }

  console.log(
    `S51B_DATABASE_BOUNDARY_SELF_TEST_COUNT=${cases.length}`,
  );

  console.log(
    passed === cases.length
      ? "S51B_DATABASE_BOUNDARY_SELF_TESTS=PASS"
      : "S51B_DATABASE_BOUNDARY_SELF_TESTS=FAIL",
  );
}

function runDatabaseEndToEndSelfTests() {
  const cases = [
    {
      label: "web_static_import_blocked",
      path: resolve(
        root,
        "apps/web/src/db-check.ts",
      ),
      source:
        'im' + 'port mysql from "mysql2";',
      expected: [
        "mysql2:DATABASE_SDK_OUTSIDE_DB",
      ],
    },
    {
      label: "future_app_template_import_blocked",
      path: resolve(
        root,
        "apps/admin/src/db-check.ts",
      ),
      source:
        "const db = await im" + "port(`pg`);",
      expected: [
        "pg:DATABASE_SDK_OUTSIDE_DB",
      ],
    },
    {
      label: "db_drizzle_import_allowed",
      path: resolve(
        root,
        "packages/db/src/client.ts",
      ),
      source:
        'im' + 'port { sql } from "drizzle-orm";',
      expected: [],
    },
    {
      label: "db_mysql_template_import_allowed",
      path: resolve(
        root,
        "packages/db/src/client.ts",
      ),
      source:
        "const mysql = await im" +
        "port(`mysql2/promise`);",
      expected: [],
    },
    {
      label: "db_drizzle_kit_import_blocked",
      path: resolve(
        root,
        "packages/db/src/tooling.ts",
      ),
      source:
        'im' + 'port "drizzle-kit";',
      expected: [
        "drizzle-kit:UNAPPROVED_DATABASE_SDK_IN_DB",
      ],
    },
    {
      label: "db_unknown_static_import_blocked",
      path: resolve(
        root,
        "packages/db/src/client.ts",
      ),
      source:
        'im' +
        'port client from "unknown-db-client";',
      expected: [
        "unknown-db-client:UNAPPROVED_EXTERNAL_IN_DB",
      ],
    },
    {
      label: "ordinary_string_import_text_ignored",
      path: resolve(
        root,
        "scripts/example.mjs",
      ),
      source:
        'const example = \'im' +
        'port "mysql2";\';',
      expected: [],
    },
    {
      label: "line_comment_import_ignored",
      path: resolve(
        root,
        "scripts/example.mjs",
      ),
      source:
        '// im' +
        'port "mysql2";\nexport const ok = true;',
      expected: [],
    },
    {
      label: "block_comment_require_ignored",
      path: resolve(
        root,
        "scripts/example.cjs",
      ),
      source:
        '/* req' +
        'uire("pg"); */\nmodule.exports = true;',
      expected: [],
    },
  ];

  let passed = 0;

  for (const testCase of cases) {
    const actual = databaseSourceViolations(
      testCase.path,
      testCase.source,
    )
      .map(
        ({ specifier, violation }) =>
          `${specifier}:${violation}`,
      )
      .sort();

    const expected = [...testCase.expected].sort();

    if (
      JSON.stringify(actual) !==
      JSON.stringify(expected)
    ) {
      fail(
        `database end-to-end self-test ` +
        `${testCase.label} expected ` +
        `${JSON.stringify(expected)} but received ` +
        `${JSON.stringify(actual)}`,
      );
      continue;
    }

    passed += 1;

    console.log(
      "S51B_DATABASE_END_TO_END_SELF_TEST|" +
      `CASE=${testCase.label}|RESULT=PASS`,
    );
  }

  console.log(
    `S51B_DATABASE_END_TO_END_SELF_TEST_COUNT=${cases.length}`,
  );

  console.log(
    passed === cases.length
      ? "S51B_DATABASE_END_TO_END_SELF_TESTS=PASS"
      : "S51B_DATABASE_END_TO_END_SELF_TESTS=FAIL",
  );
}

function runDatabaseManifestSelfTests() {
  const cases = [
    {
      label: "web_mysql2_dependency_blocked",
      owner: {
        kind: "app",
        dir: "web",
      },
      manifest: {
        dependencies: {
          mysql2: "0.0.0",
        },
      },
      expected: [
        "mysql2:DATABASE_SDK_OUTSIDE_DB",
      ],
    },
    {
      label: "domain_pg_dependency_blocked",
      owner: {
        kind: "package",
        dir: "domain",
      },
      manifest: {
        devDependencies: {
          pg: "0.0.0",
        },
      },
      expected: [
        "pg:DATABASE_SDK_OUTSIDE_DB",
      ],
    },
    {
      label: "db_pg_dependency_blocked",
      owner: {
        kind: "package",
        dir: "db",
      },
      manifest: {
        dependencies: {
          pg: "0.0.0",
        },
      },
      expected: [
        "pg:UNAPPROVED_DATABASE_SDK_IN_DB",
      ],
    },
    {
      label: "db_drizzle_kit_dependency_blocked",
      owner: {
        kind: "package",
        dir: "db",
      },
      manifest: {
        devDependencies: {
          "drizzle-kit": "0.0.0",
        },
      },
      expected: [
        "drizzle-kit:UNAPPROVED_DATABASE_SDK_IN_DB",
      ],
    },
    {
      label: "db_drizzle_dependency_allowed",
      owner: {
        kind: "package",
        dir: "db",
      },
      manifest: {
        dependencies: {
          "drizzle-orm": "0.0.0",
        },
      },
      expected: [],
    },
    {
      label: "db_mysql2_dependency_allowed",
      owner: {
        kind: "package",
        dir: "db",
      },
      manifest: {
        dependencies: {
          mysql2: "0.0.0",
        },
      },
      expected: [],
    },
    {
      label: "web_unknown_dependency_blocked",
      owner: {
        kind: "app",
        dir: "web",
      },
      manifest: {
        dependencies: {
          "unknown-db-client": "1.0.0",
        },
      },
      expected: [
        "unknown-db-client:UNAPPROVED_EXTERNAL_DEPENDENCY",
      ],
    },
    {
      label: "web_alias_target_mysql2_blocked",
      owner: {
        kind: "app",
        dir: "web",
      },
      manifest: {
        dependencies: {
          next: "npm:mysql2@3.11.0",
        },
      },
      expected: [
        "mysql2:DATABASE_SDK_OUTSIDE_DB",
      ],
    },
    {
      label: "db_alias_target_pg_blocked",
      owner: {
        kind: "package",
        dir: "db",
      },
      manifest: {
        dependencies: {
          mysql2: "npm:pg@8.13.1",
        },
      },
      expected: [
        "pg:UNAPPROVED_DATABASE_SDK_IN_DB",
      ],
    },
    {
      label: "root_prisma_dependency_blocked",
      owner: { kind: "other" },
      manifest: {
        optionalDependencies: {
          prisma: "0.0.0",
        },
      },
      expected: [
        "prisma:DATABASE_SDK_OUTSIDE_DB",
      ],
    },
  ];

  let passed = 0;

  for (const testCase of cases) {
    const actual = databaseManifestViolations(
      testCase.owner,
      testCase.manifest,
    )
      .map(
        ({ subject, violation }) =>
          `${subject}:${violation}`,
      )
      .sort();

    const expected = [...testCase.expected].sort();

    if (
      JSON.stringify(actual) !==
      JSON.stringify(expected)
    ) {
      fail(
        `database manifest self-test ` +
        `${testCase.label} expected ` +
        `${JSON.stringify(expected)} but received ` +
        `${JSON.stringify(actual)}`,
      );
      continue;
    }

    passed += 1;

    console.log(
      "S51B_DATABASE_MANIFEST_SELF_TEST|" +
      `CASE=${testCase.label}|RESULT=PASS`,
    );
  }

  console.log(
    `S51B_DATABASE_MANIFEST_SELF_TEST_COUNT=${cases.length}`,
  );

  console.log(
    passed === cases.length
      ? "S51B_DATABASE_MANIFEST_POLICY_SELF_TESTS=PASS"
      : "S51B_DATABASE_MANIFEST_POLICY_SELF_TESTS=FAIL",
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

    if (pkg.dir === "db") {
      const actualDependencies = Object.keys(
        manifest.dependencies ?? {},
      ).sort();

      const expectedDependencies = [
        ...approvedDatabaseProviders,
      ].sort();

      if (
        JSON.stringify(actualDependencies) !==
        JSON.stringify(expectedDependencies)
      ) {
        fail(
          `${rel(
            manifestPath,
          )} must declare exactly drizzle-orm and mysql2 ` +
          "as normal dependencies in S51B-B",
        );
      }

      for (const field of [
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
            )} must not declare ${field} in S51B-B`,
          );
        }
      }
    } else {
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
            )} must not declare ${field} before a ` +
            "separately authorized implementation slice",
          );
        }
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

      if (pkg.dir === "db") {
        for (const requiredText of [
          "S51B-B",
          "keine echte Datenbankverbindung",
        ]) {
          if (!readme.includes(requiredText)) {
            fail(
              `${rel(
                readmePath,
              )} is missing S51B-B runtime status text: ` +
              requiredText,
            );
          }
        }
      } else if (
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
  const rootManifestPath = resolve(
    root,
    "package.json",
  );
  const rootManifest = readJson(rootManifestPath);
  const appManifests = new Map();
  const manifests = new Map();

  const appsRoot = resolve(root, "apps");

  if (isDirectory(appsRoot)) {
    for (const entry of readdirSync(appsRoot, {
      withFileTypes: true,
    })) {
      if (!entry.isDirectory()) {
        continue;
      }

      const manifestPath = resolve(
        appsRoot,
        entry.name,
        "package.json",
      );

      if (!isFile(manifestPath)) {
        continue;
      }

      const manifest = readJson(manifestPath);

      if (manifest) {
        appManifests.set(entry.name, {
          manifest,
          path: manifestPath,
        });
      }
    }
  }

  for (const pkg of expectedPackages) {
    const manifestPath = resolve(
      root,
      "packages",
      pkg.dir,
      "package.json",
    );
    const manifest = readJson(manifestPath);

    if (manifest) {
      manifests.set(pkg.dir, {
        manifest,
        path: manifestPath,
      });
    }
  }

  validateDatabaseManifest(
    rootManifestPath,
    { kind: "other" },
    rootManifest,
  );

  for (
    const [
      appDir,
      { manifest, path },
    ] of appManifests
  ) {
    validateDatabaseManifest(
      path,
      {
        kind: "app",
        dir: appDir,
      },
      manifest,
    );
  }

  for (
    const [
      packageDir,
      { manifest, path },
    ] of manifests
  ) {
    validateDatabaseManifest(
      path,
      {
        kind: "package",
        dir: packageDir,
      },
      manifest,
    );
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
      appsRoot,
      (path) => /\.[cm]?[jt]sx?$/.test(path),
    ),
    ...listFiles(
      resolve(root, "scripts"),
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
    const specifiers = importSpecifiers(source);

    for (
      const {
        specifier,
        violation,
      } of databaseViolationsForSpecifiers(
        owner,
        specifiers,
      )
    ) {
      reportDatabaseViolation(
        file,
        specifier,
        violation,
      );
    }

    for (const specifier of specifiers) {
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
              manifests.get(importer.dir)?.manifest,
            ).has(target.name)
          ) {
            fail(
              `${importer.name} imports undeclared dependency ${target.name}`,
            );
          }
        } else if (owner.kind === "app") {
          if (
            target.dir === "testing" &&
            !isTestFile(file)
          ) {
            fail(
              `${rel(
                file,
              )} imports testing from app production code`,
            );
          }

          if (
            !allDependencyNames(
              appManifests.get(owner.dir)?.manifest,
            ).has(target.name)
          ) {
            fail(
              `apps/${owner.dir} imports undeclared ` +
              `dependency ${target.name}`,
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
          owner.kind === "app" &&
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
      manifests.get(pkg.dir)?.manifest,
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
        "--allowImportingTsExtensions",
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

runDatabaseBoundarySelfTests();
runDatabaseEndToEndSelfTests();
runDatabaseManifestSelfTests();
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
