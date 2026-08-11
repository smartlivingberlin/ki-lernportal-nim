#!/usr/bin/env node
/**
 * S52-D – Auth-Web implementation gate.
 * D1 routes required; D2 Login-UI authorized but not implemented yet.
 * auth_runtime default remains false; staging flag flip authorized only.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function fail(message) {
  console.error(`S52-D auth-web impl scope check FAILED: ${message}`);
  process.exit(1);
}

function read(relPath) {
  const path = resolve(root, relPath);
  if (!existsSync(path)) {
    fail(`missing file ${relPath}`);
  }
  return readFileSync(path, "utf8");
}

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) {
    return out;
  }
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkFiles(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const doc = read("docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md");
for (const marker of [
  "S52_D_SCOPE_AUTHORIZED=YES",
  "S52_D_IMPLEMENTATION_AUTHORIZED=YES",
  "S52_D1_ROUTES_AUTHORIZED=YES",
  "S52_D1_INTEGRATED_TO_MAIN=YES",
  "S52_D2_LOGIN_UI_AUTHORIZED=YES",
  "S52_D2_CODE_CHANGED=NO",
  "LOGIN_UI=AUTHORIZED_BEHIND_FLAG",
  "LOGIN_UI_IMPLEMENTED=NO",
  "FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false",
  "AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY",
  "DATABASE_CONNECTION_AUTHORIZED=NO",
  "RAILWAY_CHANGE=NO",
]) {
  if (!doc.includes(marker)) {
    fail(`scope doc missing marker: ${marker}`);
  }
}

const operations = read("packages/contracts/src/operations.ts");
if (!operations.includes("auth_runtime: false")) {
  fail("packages/contracts must keep auth_runtime default false");
}

const authReadme = read("packages/auth/README.md");
for (const marker of [
  "LOGIN_UI=AUTHORIZED_BEHIND_FLAG",
  "LOGIN_UI_IMPLEMENTED=NO",
  "S52_D",
  "AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY",
  "S52_D1",
  "AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY",
]) {
  if (!authReadme.includes(marker)) {
    fail(`packages/auth/README.md missing marker: ${marker}`);
  }
}

const allowedAuthRoutes = new Set([
  "apps/web/src/app/api/auth/login/route.ts",
  "apps/web/src/app/api/auth/logout/route.ts",
]);

const appRoot = resolve(root, "apps/web/src/app");
const forbiddenName =
  /(^|\/)(login|register|signup|sign-in|sign-up|auth|session|anmelden)(\/|$)/i;
for (const file of walkFiles(appRoot)) {
  const rel = file.slice(root.length + 1).replaceAll("\\", "/");
  if (allowedAuthRoutes.has(rel)) {
    continue;
  }
  const pathWithoutFile = rel.replace(/\/[^/]+$/, "");
  if (forbiddenName.test(pathWithoutFile)) {
    fail(`forbidden auth web surface path present: ${rel}`);
  }
}

for (const required of allowedAuthRoutes) {
  if (!existsSync(resolve(root, required))) {
    fail(`missing authorized D1 auth route: ${required}`);
  }
}

const plan = read("docs/architecture/S52_D_IMPLEMENTATION_PLAN.md");
for (const marker of [
  "S52_D_IMPLEMENTATION_PLAN_DOCUMENTED=YES",
  "S52_D_IMPLEMENTATION_AUTHORIZED=YES",
  "S52_D1_CODE_CHANGED=YES",
  "S52_D2_LOGIN_UI_AUTHORIZED=YES",
  "S52_D2_CODE_CHANGED=NO",
  "LOGIN_UI=AUTHORIZED_BEHIND_FLAG",
  "AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY",
  "Slice D1",
  "Slice D2",
  "Slice D3",
]) {
  if (!plan.includes(marker)) {
    fail(`implementation plan missing marker: ${marker}`);
  }
}

const status = read("docs/00_PROJECT_STATUS.md");
for (const marker of [
  "BASELINE_MAIN_SHA=d91514f1f08ad343cbd0d6e1e63e81833676ffd5",
  "PR142_S52_D1_AUTH_ROUTES_MERGED=YES",
  "S52_D2_LOGIN_UI_AUTHORIZED=YES",
  "AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY",
]) {
  if (!status.includes(marker)) {
    fail(`project status missing marker: ${marker}`);
  }
}

console.log("S52-D auth-web impl scope contract PASS");
console.log(
  JSON.stringify(
    {
      baseline: "d91514f",
      d1Integrated: "YES",
      d2LoginUiAuthorized: "YES",
      d2CodeChanged: "NO",
      loginUi: "AUTHORIZED_BEHIND_FLAG",
      authRuntimeFlagFlip: "STAGING_ONLY",
      authRuntimeDefault: false,
      railwayChange: "NO",
    },
    null,
    2,
  ),
);
