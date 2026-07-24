#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const passed = [];
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function check(condition, message) {
  if (condition) {
    passed.push(message);
  } else {
    failures.push(message);
  }
}

function hasForbiddenConfigKey(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  for (const [key, child] of Object.entries(value)) {
    if (/^(variables?|secrets?|tokens?|passwords?)$/i.test(key)) {
      return true;
    }

    if (hasForbiddenConfigKey(child)) {
      return true;
    }
  }

  return false;
}

const rootPackage = JSON.parse(read("package.json"));
const webPackage = JSON.parse(read("apps/web/package.json"));
const railway = JSON.parse(read("railway.json"));
const healthRoute = read("apps/web/src/app/health/route.ts");
const ci = read(".github/workflows/ci.yml");
const runbook = read("docs/S50D1_RAILWAY_STAGING_READINESS.md");

check(
  rootPackage.packageManager === "pnpm@11.13.0",
  "Root package manager is pinned to pnpm 11.13.0",
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
  webPackage.scripts?.build ===
    "next build && node scripts/prepare-standalone-assets.mjs",
  "Web build prepares standalone assets",
);
check(
  typeof webPackage.scripts?.start === "string" &&
    webPackage.scripts.start.includes(".next/standalone") &&
    webPackage.scripts.start.includes("server.js"),
  "Web start command runs the standalone server",
);

check(
  railway.$schema === "https://railway.com/railway.schema.json",
  "Railway configuration uses the official schema",
);
check(
  railway.build?.builder === "RAILPACK",
  "Railway uses Railpack",
);
check(
  railway.build?.buildCommand === "pnpm --filter web build",
  "Railway builds the web workspace with pnpm",
);
check(
  railway.deploy?.startCommand ===
    "HOSTNAME=0.0.0.0 pnpm --filter web start",
  "Railway starts the web workspace with pnpm",
);
check(
  railway.deploy?.healthcheckPath === "/health",
  "Railway healthcheck targets /health",
);
check(
  railway.deploy?.healthcheckTimeout === 120,
  "Railway healthcheck timeout is 120 seconds",
);
check(
  railway.deploy?.restartPolicyType === "ON_FAILURE",
  "Railway restarts only after failures",
);
check(
  railway.deploy?.restartPolicyMaxRetries === 10,
  "Railway restart retries are bounded",
);
check(
  !hasForbiddenConfigKey(railway),
  "Railway configuration contains no variables or secrets",
);

check(
  healthRoute.includes('export const dynamic = "force-dynamic"'),
  "Health route is evaluated dynamically",
);
check(
  healthRoute.includes('new Response("ok\\n"'),
  "Health route returns the minimal ok response",
);
check(
  healthRoute.includes('"Cache-Control": "no-store"'),
  "Health response is not cached",
);
check(
  healthRoute.includes(
    '"Content-Type": "text/plain; charset=utf-8"',
  ),
  "Health response uses the expected text content type",
);
check(
  !healthRoute.includes("process.env"),
  "Health response exposes no environment data",
);

check(
  ci.includes("node scripts/check-s50d1-railway-readiness.mjs"),
  "CI runs the Railway readiness policy check",
);
check(
  ci.includes("http://127.0.0.1:3000/health"),
  "CI probes the Railway health endpoint",
);
check(
  ci.includes("pnpm packages:boundaries"),
  "CI preserves the S51A package-boundary gate",
);
check(
  ci.includes("pnpm packages:typecheck"),
  "CI preserves the S51A package typecheck",
);
check(
  ci.includes("pnpm test:s51b-b-db-runtime"),
  "CI preserves the S51B-B database fake-runtime test",
);
check(
  ci.includes("pnpm supply-chain:check") &&
    ci.includes("pnpm governance:check"),
  "CI preserves governance and supply-chain gates",
);

check(
  runbook.includes("RAILWAY_PROJECT_CHANGED=NO") &&
    runbook.includes("DEPLOY=NO") &&
    runbook.includes("MERGE=NO"),
  "Runbook records the no-mutation boundary",
);
check(
  runbook.includes("HISTORICAL_RAILWAY_STATE=REVERIFY_BEFORE_MERGE"),
  "Runbook marks external Railway observations as time-bound",
);

console.log("===== S50D1 Railway Readiness Check =====");

for (const message of passed) {
  console.log(`PASS: ${message}`);
}

if (failures.length > 0) {
  console.error("");

  for (const message of failures) {
    console.error(`FAIL: ${message}`);
  }

  console.error("");
  console.error(`RAILWAY_READINESS_FAILURES=${failures.length}`);
  console.error("RAILWAY_READINESS=FAIL");
  process.exit(1);
}

console.log("");
console.log(`RAILWAY_READINESS_CHECKS=${passed.length}`);
console.log("RAILWAY_READINESS=PASS");
