#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const passed = [];
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function check(condition, message) {
  (condition ? passed : failures).push(message);
}

const requiredFiles = [
  ".github/CODEOWNERS",
  ".github/dependabot.yml",
  ".github/pull_request_template.md",
  ".github/workflows/ci.yml",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "scripts/check-github-governance.mjs",
  "scripts/check-supply-chain-policy.mjs",
];

for (const file of requiredFiles) {
  check(exists(file), `Required governance file exists: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));

check(
  packageJson.scripts?.["governance:check"] ===
    "node scripts/check-github-governance.mjs",
  "Governance check is registered in package.json",
);

const workflow = read(".github/workflows/ci.yml");

for (const trigger of [
  "pull_request_target",
  "workflow_run",
  "repository_dispatch",
  "issue_comment",
]) {
  check(
    !new RegExp(`^\\s*${trigger}\\s*:`, "m").test(workflow),
    `Privileged trigger is absent: ${trigger}`,
  );
}

check(
  /^\s*pull_request:\s*$/m.test(workflow),
  "Normal pull_request trigger is present",
);

check(
  /^\s*contents:\s*read\s*$/m.test(workflow),
  "Workflow token has contents read permission",
);

check(
  (workflow.match(/^\s*[a-z-]+:\s*write\s*$/gm) ?? []).length === 0,
  "Workflow contains no write permission",
);

check(
  !/\bsecrets\.[A-Za-z0-9_]+/.test(workflow),
  "Workflow contains no repository secret reference",
);

check(
  !/\bgithub\.token\b/.test(workflow),
  "Workflow does not explicitly expose github.token",
);

check(
  /persist-credentials:\s*false/.test(workflow),
  "Checkout does not persist Git credentials",
);

check(
  /fetch-depth:\s*1/.test(workflow),
  "Checkout fetch depth is explicitly minimal",
);

check(
  /^\s*concurrency:\s*$/m.test(workflow),
  "Workflow concurrency control is present",
);

check(
  /^\s*cancel-in-progress:\s*true\s*$/m.test(workflow),
  "Superseded workflow runs are cancelled",
);

check(
  /run:\s*pnpm governance:check/.test(workflow),
  "CI executes the governance policy gate",
);

check(
  /timeout-minutes:\s*20/.test(workflow),
  "CI job has a bounded timeout",
);

check(
  !/\bcurl[^\n|]*\|[^\n]*(?:sh|bash)/i.test(workflow),
  "Workflow contains no curl-to-shell command",
);

check(
  !/\bwget[^\n|]*\|[^\n]*(?:sh|bash)/i.test(workflow),
  "Workflow contains no wget-to-shell command",
);

check(
  !/(^|\s)eval\s/m.test(workflow),
  "Workflow contains no eval command",
);

const codeowners = read(".github/CODEOWNERS");

for (const rule of [
  "* @smartlivingberlin",
  "/.github/CODEOWNERS @smartlivingberlin",
  "/.github/dependabot.yml @smartlivingberlin",
  "/.github/workflows/ @smartlivingberlin",
  "/SECURITY.md @smartlivingberlin",
  "/scripts/check-github-governance.mjs @smartlivingberlin",
  "/scripts/check-supply-chain-policy.mjs @smartlivingberlin",
  "/pnpm-lock.yaml @smartlivingberlin",
]) {
  check(
    codeowners.includes(rule),
    `CODEOWNERS rule exists: ${rule}`,
  );
}

const security = read("SECURITY.md");

check(
  security.includes("Private Vulnerability Reporting"),
  "Security policy directs reporters to private reporting",
);

check(
  security.includes("nicht in öffentlichen"),
  "Security policy warns against public disclosure",
);

check(
  security.includes("keine Zahlungsaktivierung"),
  "Security policy preserves payment boundary",
);

const contributing = read("CONTRIBUTING.md");

for (const rule of [
  "pnpm governance:check",
  "pnpm supply-chain:check",
  "pnpm audit",
  "pnpm audit --prod",
  "pull_request_target",
  "Kein Deploy",
]) {
  check(
    contributing.includes(rule),
    `Contribution rule exists: ${rule}`,
  );
}

const template = read(".github/pull_request_template.md");

for (const item of [
  "Keine Secrets",
  "Keine neue ungepinnte GitHub Action",
  "pnpm governance:check",
  "pnpm supply-chain:check",
  "Kein Auto-Merge",
  "Kein Deploy",
  "Keine Zahlungsaktivierung",
]) {
  check(
    template.includes(item),
    `PR template contains check: ${item}`,
  );
}

console.log("===== GitHub Governance Policy Check =====");

for (const message of passed) {
  console.log(`PASS: ${message}`);
}

if (failures.length > 0) {
  console.error("");

  for (const message of failures) {
    console.error(`FAIL: ${message}`);
  }

  console.error("");
  console.error(`GITHUB_GOVERNANCE_FAILURES=${failures.length}`);
  console.error("GITHUB_GOVERNANCE_POLICY=FAIL");
  process.exit(1);
}

console.log("");
console.log(`GITHUB_GOVERNANCE_CHECKS=${passed.length}`);
console.log("GITHUB_GOVERNANCE_POLICY=PASS");
