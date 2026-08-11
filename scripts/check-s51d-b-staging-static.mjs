#!/usr/bin/env node
/**
 * S51D-B – static repository contract for staging execution package.
 * Does not call Railway or GitHub APIs (CI-safe; no github.token).
 *
 * Live GitHub reverify (operator/local):
 *   S51D_B_LIVE_GITHUB=1 node scripts/check-s51d-b-github-reverify.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function fail(message) {
  console.error(`S51D-B static check FAILED: ${message}`);
  process.exit(1);
}

function read(relPath) {
  const path = resolve(root, relPath);
  if (!existsSync(path)) {
    fail(`missing file ${relPath}`);
  }
  return readFileSync(path, "utf8");
}

const doc = read("docs/architecture/S51D_B_STAGING_EXECUTION.md");
for (const marker of [
  "S51D_B_EXECUTED=YES",
  "STAGING_ENVIRONMENT_CREATED=YES",
  "RAILWAY_TOKEN_IN_AGENT=NO",
  "S51D_B_DASHBOARD_REVERIFY_COMPLETE=YES",
  "APPARENT_AUTODEPLOY_ON_MAIN=YES",
  "CURRENT_PRODUCTION_AUTODEPLOY=DISABLED",
  "CURRENT_PRODUCTION_WAIT_FOR_CI=ON",
  "STAGING_AUTODEPLOY=DISABLED",
  "STAGING_WAIT_FOR_CI=ON",
  "CONFIG_SOURCE=/railway.staging.json",
  "ROOT_DIRECTORY=/",
  "PRODUCTION_CHANGED=AUTODEPLOY_DISABLED_AND_WAIT_FOR_CI_ENABLED_ONLY",
  "f69a0054-8cd9-4481-a461-bd17ddde296d",
  "f30e6e3b-60b5-4b3e-8949-2ca868f4e2da",
  "web-production-51d3c8.up.railway.app",
  "ki-lernportal-nim-staging.up.railway.app",
]) {
  if (!doc.includes(marker)) {
    fail(`execution doc missing marker: ${marker}`);
  }
}

const staging = JSON.parse(read("railway.staging.json"));
if (staging?.deploy?.healthcheckPath !== "/health") {
  fail("railway.staging.json healthcheckPath must be /health");
}
if (!staging?.build?.buildCommand?.includes("pnpm --filter web build")) {
  fail("railway.staging.json buildCommand must use pnpm --filter web build");
}

const liveScript = read("scripts/check-s51d-b-github-reverify.mjs");
if (!liveScript.includes("S51D_B_LIVE_GITHUB")) {
  fail("live reverify script must gate network calls behind S51D_B_LIVE_GITHUB");
}

if (!existsSync(resolve(root, "apps/web/src/app/health/route.ts"))) {
  fail("missing apps/web/src/app/health/route.ts");
}

console.log("S51D-B static repository contract PASS");
console.log(
  JSON.stringify(
    {
      stagingEnvironmentCreated: "YES",
      stagingPublicDomain: "ki-lernportal-nim-staging.up.railway.app",
      railwayTokenInAgent: "NO",
      dashboardAutodeploy: "DISABLED",
      dashboardWaitForCi: "ON",
      stagingAutodeploy: "DISABLED",
      stagingWaitForCi: "ON",
      dashboardReverifyComplete: "YES",
      liveGithubCheck: "operator-only via S51D_B_LIVE_GITHUB=1",
    },
    null,
    2,
  ),
);
