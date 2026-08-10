#!/usr/bin/env node
/**
 * S51D-B – read-only GitHub Deployments reverify for Railway Production.
 *
 * Does not call Railway API (no token in agent). Captures evidence that
 * railway-app[bot] deploys the production environment on main merges.
 *
 * Usage:
 *   node scripts/check-s51d-b-github-reverify.mjs
 *   S51D_B_EXPECT_SHA=<full-sha> node scripts/check-s51d-b-github-reverify.mjs
 */

import { execFileSync } from "node:child_process";

const REPO = "smartlivingberlin/ki-lernportal-nim";
const EXPECTED_ENV = "ki-lernportal-nim-private-demo / production";
const EXPECTED_PROJECT_ID = "f69a0054-8cd9-4481-a461-bd17ddde296d";
const EXPECTED_ENVIRONMENT_ID = "f30e6e3b-60b5-4b3e-8949-2ca868f4e2da";

function ghJson(args) {
  const stdout = execFileSync("gh", ["api", ...args], {
    encoding: "utf8",
  });
  return JSON.parse(stdout);
}

function fail(message) {
  console.error(`S51D-B reverify FAILED: ${message}`);
  process.exit(1);
}

function main() {
  const raw = ghJson([`repos/${REPO}/deployments?per_page=20`]);
  if (!Array.isArray(raw)) {
    fail("unexpected deployments payload");
  }

  const list = raw.filter((d) => d.environment === EXPECTED_ENV);
  if (list.length === 0) {
    fail(`no GitHub deployments for environment "${EXPECTED_ENV}"`);
  }

  const latest = list[0];
  const statuses = ghJson([
    `repos/${REPO}/deployments/${latest.id}/statuses`,
  ]);
  if (!Array.isArray(statuses) || statuses.length === 0) {
    fail(`no statuses for deployment ${latest.id}`);
  }

  const success =
    statuses.find((s) => s.state === "success") ?? statuses[0];
  const environmentUrl = success.environment_url ?? "";
  const creator = latest.creator?.login ?? "unknown";

  if (!environmentUrl.includes(EXPECTED_PROJECT_ID)) {
    fail(
      `environment_url missing project id ${EXPECTED_PROJECT_ID}: ${environmentUrl}`,
    );
  }
  if (!environmentUrl.includes(EXPECTED_ENVIRONMENT_ID)) {
    fail(
      `environment_url missing environment id ${EXPECTED_ENVIRONMENT_ID}: ${environmentUrl}`,
    );
  }

  const expectSha = process.env.S51D_B_EXPECT_SHA;
  if (expectSha && latest.sha !== expectSha) {
    fail(
      `latest deployment sha ${latest.sha} !== S51D_B_EXPECT_SHA ${expectSha}`,
    );
  }

  const apparentAutodeploy =
    creator === "railway-app[bot]" ? "YES" : "UNKNOWN";

  console.log("S51D-B GitHub reverify PASS");
  console.log(
    JSON.stringify(
      {
        environment: EXPECTED_ENV,
        latestSha: latest.sha,
        latestRef: latest.ref,
        creator,
        successState: success.state ?? null,
        railwayProjectId: EXPECTED_PROJECT_ID,
        railwayProductionEnvironmentId: EXPECTED_ENVIRONMENT_ID,
        apparentAutodeployOnMain: apparentAutodeploy,
        dashboardAutodeploy: "UNVERIFIED_DASHBOARD_REQUIRED",
        dashboardWaitForCi: "UNVERIFIED_DASHBOARD_REQUIRED",
        stagingEnvironmentCreated: "NO",
        railwayTokenInAgent: "NO",
      },
      null,
      2,
    ),
  );
}

main();
