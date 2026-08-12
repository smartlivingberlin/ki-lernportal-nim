#!/usr/bin/env node
/**
 * Local / optional live monitoring smoke for the concept demo.
 * No analytics vendor. Uses curl-style fetch against BASE_URL.
 *
 * BASE_URL default: http://127.0.0.1:3000
 * Optional: EXPECT_BUILD_SHA=147fb43 (prefix match on /version build_sha)
 */
import assert from "node:assert/strict";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const expectShaPrefix = process.env.EXPECT_BUILD_SHA || "";

async function fetchText(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: "manual",
    headers: { Accept: "*/*" },
  });
  const body = await response.text();
  const headers = Object.fromEntries(response.headers.entries());
  return { status: response.status, body, headers };
}

function header(headers, name) {
  const key = Object.keys(headers).find(
    (entry) => entry.toLowerCase() === name.toLowerCase(),
  );
  return key ? headers[key] : undefined;
}

const passed = [];
function pass(message) {
  passed.push(message);
  console.log(`PASS: ${message}`);
}

const home = await fetchText("/");
assert.equal(home.status, 200, `GET / expected 200, got ${home.status}`);
pass("GET / = 200");
assert.match(home.body, /Jetzt starten/);
pass("SSR contains Jetzt starten");
assert.match(home.body, /Nächster Schritt|Selbstcheck|Heute/i);
pass("SSR contains beginner next-step vocabulary");
assert.doesNotMatch(home.body, />Abruf</);
pass("SSR does not expose legacy Abruf chrome");

for (const path of ["/health", "/live", "/ready", "/version"]) {
  const result = await fetchText(path);
  assert.equal(
    result.status,
    200,
    `GET ${path} expected 200, got ${result.status}`,
  );
  pass(`GET ${path} = 200`);
}

const health = await fetchText("/health");
assert.match(health.body, /^ok\s*$/m);
pass("/health body is ok");

const live = await fetchText("/live");
const liveJson = JSON.parse(live.body);
assert.equal(liveJson.status, "live");
pass("/live status=live");

const ready = await fetchText("/ready");
const readyJson = JSON.parse(ready.body);
assert.equal(readyJson.status, "ready");
assert.ok(Array.isArray(readyJson.checks));
const db = readyJson.checks.find((check) => check.name === "database");
assert.ok(db);
assert.equal(db.status, "not_configured");
pass("/ready database=not_configured");

const version = await fetchText("/version");
const versionJson = JSON.parse(version.body);
assert.equal(versionJson.service, "web");
assert.equal(versionJson.environment, "concept_demo");
assert.ok(
  versionJson.build_sha === null ||
    (typeof versionJson.build_sha === "string" &&
      versionJson.build_sha.length > 0),
  "build_sha must be null locally or a non-empty string",
);
pass(`/version build_sha=${versionJson.build_sha}`);
if (expectShaPrefix) {
  assert.equal(typeof versionJson.build_sha, "string");
  assert.ok(
    String(versionJson.build_sha).startsWith(expectShaPrefix),
    `build_sha ${versionJson.build_sha} does not start with ${expectShaPrefix}`,
  );
  pass(`build_sha matches EXPECT_BUILD_SHA prefix ${expectShaPrefix}`);
}

const robots = await fetchText("/robots.txt");
assert.equal(robots.status, 200);
assert.match(robots.body, /Disallow:\s*\//i);
pass("robots.txt disallows crawling (concept demo)");

const securityPaths = ["/", "/datenschutz"];
for (const path of securityPaths) {
  const result = await fetchText(path);
  assert.ok(
    header(result.headers, "strict-transport-security") ||
      baseUrl.startsWith("http://127.0.0.1") ||
      baseUrl.startsWith("http://localhost"),
    `${path}: missing HSTS outside local http`,
  );
  assert.equal(
    header(result.headers, "x-content-type-options")?.toLowerCase(),
    "nosniff",
  );
  assert.equal(
    header(result.headers, "x-frame-options")?.toUpperCase(),
    "DENY",
  );
  assert.ok(header(result.headers, "referrer-policy"));
  assert.ok(header(result.headers, "permissions-policy"));
  assert.equal(header(result.headers, "x-powered-by"), undefined);
  pass(`${path} security headers ok`);
}

console.log(`MASS_AUDIENCE_MONITOR_CHECKS=${passed.length}`);
console.log("MASS_AUDIENCE_MONITOR_SMOKE=PASS");
