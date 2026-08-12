#!/usr/bin/env node
/**
 * Static + optional install checks for Railway Production model:
 * Root Directory = apps/web, package manager = npm.
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const webDir = path.join(repoRoot, "apps", "web");
const runInstall = process.argv.includes("--install");

const failures = [];
const passed = [];

function check(condition, message) {
  if (condition) passed.push(message);
  else failures.push(message);
}

const webPackage = JSON.parse(
  readFileSync(path.join(webDir, "package.json"), "utf8"),
);
const npmrc = readFileSync(path.join(webDir, ".npmrc"), "utf8");

check(
  webPackage.dependencies?.["@ki-lernportal-nim/auth"] ===
    "file:./vendor/auth",
  "web auth dependency uses vendored file:./vendor/auth",
);
check(
  webPackage.dependencies?.["@ki-lernportal-nim/contracts"] ===
    "file:./vendor/contracts",
  "web contracts dependency uses vendored file:./vendor/contracts",
);
check(
  webPackage.dependencies?.["@ki-lernportal-nim/domain"] ===
    "file:./vendor/domain",
  "web domain dependency uses vendored file:./vendor/domain",
);
check(
  !JSON.stringify(webPackage.dependencies).includes("../../packages"),
  "web dependencies do not point outside apps/web via ../../packages",
);
check(
  npmrc.includes("install-links=true"),
  "apps/web/.npmrc enables install-links=true",
);
check(
  webPackage.overrides?.postcss === "8.5.26" &&
    webPackage.overrides?.next?.postcss === "8.5.26",
  "web npm overrides pin postcss to 8.5.26",
);
check(
  webPackage.overrides?.sharp === "0.35.3" &&
    webPackage.overrides?.next?.sharp === "0.35.3",
  "web npm overrides pin sharp to 0.35.3",
);
check(
  existsSync(path.join(webDir, "vendor", "auth", "package.json")) &&
    existsSync(path.join(webDir, "vendor", "contracts", "package.json")) &&
    existsSync(path.join(webDir, "vendor", "domain", "package.json")),
  "vendored auth/contracts/domain packages exist under apps/web/vendor",
);

if (runInstall) {
  const staging = mkdtempSync(path.join(tmpdir(), "ki-rail-npm-"));
  try {
    const pack = spawnSync(
      "tar",
      [
        "-C",
        webDir,
        "--exclude=node_modules",
        "--exclude=.next",
        "-cf",
        "-",
        ".",
      ],
      { encoding: "buffer", maxBuffer: 64 * 1024 * 1024 },
    );
    if (pack.status !== 0) {
      failures.push("failed to archive apps/web for npm isolation");
    } else {
      const unpack = spawnSync("tar", ["-C", staging, "-xf", "-"], {
        input: pack.stdout,
        maxBuffer: 64 * 1024 * 1024,
      });
      if (unpack.status !== 0) {
        failures.push("failed to unpack apps/web archive");
      } else {
        const install = spawnSync("npm", ["install"], {
          cwd: staging,
          encoding: "utf8",
          env: { ...process.env, npm_config_fund: "false" },
        });
        if (install.status !== 0) {
          failures.push(
            `isolated npm install failed: ${install.stderr || install.stdout}`,
          );
        } else {
          passed.push("isolated apps/web npm install succeeds");

          const postcssPkg = path.join(
            staging,
            "node_modules",
            "next",
            "node_modules",
            "postcss",
            "package.json",
          );
          const sharpPkg = path.join(
            staging,
            "node_modules",
            "sharp",
            "package.json",
          );
          const nestedSharp = path.join(
            staging,
            "node_modules",
            "next",
            "node_modules",
            "sharp",
            "package.json",
          );

          if (existsSync(postcssPkg)) {
            const version = JSON.parse(readFileSync(postcssPkg, "utf8"))
              .version;
            check(
              version === "8.5.26",
              `isolated next/postcss is ${version} (want 8.5.26)`,
            );
          } else {
            // hoisted postcss
            const hoisted = path.join(
              staging,
              "node_modules",
              "postcss",
              "package.json",
            );
            if (existsSync(hoisted)) {
              const version = JSON.parse(readFileSync(hoisted, "utf8"))
                .version;
              check(
                version === "8.5.26",
                `isolated postcss is ${version} (want 8.5.26)`,
              );
            } else {
              failures.push("isolated install missing postcss package");
            }
          }

          const sharpPath = existsSync(sharpPkg)
            ? sharpPkg
            : existsSync(nestedSharp)
              ? nestedSharp
              : null;
          if (sharpPath) {
            const version = JSON.parse(readFileSync(sharpPath, "utf8"))
              .version;
            check(
              version === "0.35.3",
              `isolated sharp is ${version} (want 0.35.3)`,
            );
          } else {
            failures.push("isolated install missing sharp package");
          }
        }
      }
    }
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

console.log("===== Railway web npm isolation check =====");
for (const message of passed) console.log(`PASS: ${message}`);
if (failures.length > 0) {
  console.error("");
  for (const message of failures) console.error(`FAIL: ${message}`);
  console.error(`RAILWAY_WEB_NPM_ISOLATION_FAILURES=${failures.length}`);
  console.error("RAILWAY_WEB_NPM_ISOLATION=FAIL");
  process.exit(1);
}
console.log(`RAILWAY_WEB_NPM_ISOLATION_CHECKS=${passed.length}`);
console.log("RAILWAY_WEB_NPM_ISOLATION=PASS");
