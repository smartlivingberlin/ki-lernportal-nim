#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const passed = [];

function read(relativePath) {
  return fs.readFileSync(
    path.join(root, relativePath),
    "utf8",
  );
}

function pass(message) {
  passed.push(message);
}

function check(condition, message) {
  if (condition) {
    pass(message);
  } else {
    failures.push(message);
  }
}

function parseVersion(version) {
  const match = String(version).match(
    /^(\d+)\.(\d+)\.(\d+)/,
  );

  if (!match) {
    return null;
  }

  return match
    .slice(1)
    .map((part) => Number(part));
}

function versionAtLeast(actual, minimum) {
  const left = parseVersion(actual);
  const right = parseVersion(minimum);

  if (!left || !right) {
    return false;
  }

  for (let index = 0; index < 3; index += 1) {
    if (left[index] > right[index]) {
      return true;
    }

    if (left[index] < right[index]) {
      return false;
    }
  }

  return true;
}

function findDisallowedLockfiles(directory) {
  const blockedNames = new Set([
    "package-lock.json",
    "npm-shrinkwrap.json",
    "yarn.lock",
    "bun.lock",
    "bun.lockb",
  ]);

  const ignoredDirectories = new Set([
    ".git",
    ".next",
    "node_modules",
    "playwright-report",
    "test-results",
  ]);

  const findings = [];

  function walk(current) {
    for (
      const entry
      of fs.readdirSync(
        current,
        { withFileTypes: true },
      )
    ) {
      if (
        entry.isDirectory()
        && ignoredDirectories.has(entry.name)
      ) {
        continue;
      }

      const absolute = path.join(
        current,
        entry.name,
      );

      if (entry.isDirectory()) {
        walk(absolute);
        continue;
      }

      if (blockedNames.has(entry.name)) {
        findings.push(
          path.relative(root, absolute),
        );
      }
    }
  }

  walk(directory);

  return findings;
}

const rootPackage = JSON.parse(
  read("package.json"),
);

check(
  rootPackage.private === true,
  "Root package is private",
);

check(
  rootPackage.packageManager ===
    "pnpm@11.13.0",
  "Package manager is pinned to pnpm 11.13.0",
);

check(
  rootPackage.engines?.node === "22.22.1",
  "Node engine is pinned to 22.22.1",
);

check(
  rootPackage.engines?.pnpm === "11.13.0",
  "pnpm engine is pinned to 11.13.0",
);

check(
  rootPackage.scripts?.["supply-chain:check"] ===
    "node scripts/check-supply-chain-policy.mjs",
  "Supply-chain policy script is registered",
);

const playwrightVersion =
  rootPackage.devDependencies?.playwright;

check(
  versionAtLeast(
    playwrightVersion,
    "1.55.1",
  ),
  "Playwright meets the secure minimum 1.55.1",
);

const workspace = read(
  "pnpm-workspace.yaml",
);

const requiredWorkspaceRules = [
  '  "next>postcss": "8.5.10"',
  "nodeVersion: 22.22.1",
  "engineStrict: true",
  "strictDepBuilds: true",
  "blockExoticSubdeps: true",
  "minimumReleaseAge: 1440",
  '  "sharp@0.35.3": false',
  '  "unrs-resolver@1.12.2": false',
];

for (const rule of requiredWorkspaceRules) {
  check(
    workspace.includes(rule),
    `Workspace policy present: ${rule}`,
  );
}

check(
  !workspace.includes(
    "next@16.2.9>postcss",
  ),
  "PostCSS override is not tied to one Next patch",
);

const lockfile = read("pnpm-lock.yaml");

check(
  /lockfileVersion:\s*['"]?9\.0/.test(
    lockfile,
  ),
  "Lockfile format is version 9.0",
);

check(
  (lockfile.match(/\bintegrity:\s*/g) ?? [])
    .length > 0,
  "Lockfile contains package integrity hashes",
);

check(
  !lockfile.includes("http://"),
  "Lockfile contains no insecure HTTP source",
);

check(
  !/\bgit\+/.test(lockfile),
  "Lockfile contains no Git dependency source",
);

check(
  !/\btarball:\s*/.test(lockfile),
  "Lockfile contains no direct tarball source",
);

check(
  !/\bplaywright@1\.55\.0:/.test(
    lockfile,
  ),
  "Vulnerable Playwright 1.55.0 is absent",
);

check(
  !/\bplaywright-core@1\.55\.0:/.test(
    lockfile,
  ),
  "Vulnerable Playwright Core 1.55.0 is absent",
);

check(
  !/\bpostcss@8\.4\.31:/.test(
    lockfile,
  ),
  "Vulnerable PostCSS 8.4.31 is absent",
);

const ci = read(
  ".github/workflows/ci.yml",
);

const rawUses =
  ci.match(/^\s*uses:\s*.+$/gm) ?? [];

const immutableUses = [
  ...ci.matchAll(
    /^\s*uses:\s*([^@\s]+)@([0-9a-f]{40})\s+#\s+(v\d+)\s*$/gm,
  ),
];

const actionAllowlist = new Set([
  "actions/checkout",
  "actions/setup-node",
  "pnpm/action-setup",
]);

check(
  rawUses.length === 3,
  "CI contains exactly three action references",
);

check(
  immutableUses.length === rawUses.length,
  "All GitHub Actions use immutable commit SHAs",
);

for (
  const [, action, sha, major]
  of immutableUses
) {
  check(
    actionAllowlist.has(action),
    `Action is allowlisted: ${action}`,
  );

  check(
    /^[0-9a-f]{40}$/.test(sha),
    `Action uses full SHA: ${action}`,
  );

  check(
    /^v\d+$/.test(major),
    `Action has readable major comment: ${action}`,
  );
}

check(
  ci.includes(
    "node-version: 22.22.1",
  ),
  "CI uses Node 22.22.1",
);

check(
  ci.includes(
    "version: 11.13.0",
  ),
  "CI uses pnpm 11.13.0",
);

check(
  ci.includes(
    "pnpm install --frozen-lockfile",
  ),
  "CI requires a frozen lockfile",
);

check(
  ci.includes(
    "run: pnpm supply-chain:check",
  ),
  "CI executes the supply-chain policy gate",
);

check(
  ci.includes(
    "run: pnpm audit",
  ),
  "CI audits all dependencies",
);

check(
  ci.includes(
    "run: pnpm audit --prod",
  ),
  "CI audits production dependencies",
);

const dependabot = read(
  ".github/dependabot.yml",
);

check(
  /^version:\s*2\s*$/m.test(
    dependabot,
  ),
  "Dependabot schema version is 2",
);

check(
  (
    dependabot.match(
      /package-ecosystem:/g,
    ) ?? []
  ).length === 2,
  "Dependabot manages two ecosystems",
);

check(
  dependabot.includes(
    'package-ecosystem: "npm"',
  ),
  "Dependabot manages npm/pnpm dependencies",
);

check(
  dependabot.includes(
    'package-ecosystem: "github-actions"',
  ),
  "Dependabot manages GitHub Actions",
);

check(
  dependabot.includes(
    'timezone: "Europe/Berlin"',
  ),
  "Dependabot uses Europe/Berlin timezone",
);

check(
  dependabot.includes(
    '"version-update:semver-patch"',
  ),
  "Normal npm updates are limited to patches",
);

check(
  !dependabot.includes("target-branch:"),
  "Dependabot uses the repository default branch",
);

const disallowedLockfiles =
  findDisallowedLockfiles(root);

check(
  disallowedLockfiles.length === 0,
  disallowedLockfiles.length === 0
    ? "No competing package-manager lockfile exists"
    : `Disallowed lockfiles: ${
        disallowedLockfiles.join(", ")
      }`,
);

console.log(
  "===== Supply-Chain Policy Check =====",
);

for (const message of passed) {
  console.log(`PASS: ${message}`);
}

if (failures.length > 0) {
  console.error("");

  for (const message of failures) {
    console.error(`FAIL: ${message}`);
  }

  console.error("");
  console.error(
    `SUPPLY_CHAIN_POLICY_FAILURES=${failures.length}`,
  );
  console.error(
    "SUPPLY_CHAIN_POLICY=FAIL",
  );

  process.exit(1);
}

console.log("");
console.log(
  `SUPPLY_CHAIN_POLICY_CHECKS=${passed.length}`,
);
console.log(
  `GITHUB_ACTIONS_IMMUTABLE=${immutableUses.length}`,
);
console.log(
  "SUPPLY_CHAIN_POLICY=PASS",
);
