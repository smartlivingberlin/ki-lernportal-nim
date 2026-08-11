#!/usr/bin/env node
/**
 * S52-D – Auth-Web implementation gate (D1 routes + D2 /anmelden).
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
  "S52_D2_LOGIN_UI_AUTHORIZED=YES",
  "S52_D2_CODE_CHANGED=YES",
  "LOGIN_UI=AUTHORIZED_BEHIND_FLAG",
  "LOGIN_UI_IMPLEMENTED=YES",
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
  "LOGIN_UI_IMPLEMENTED=YES",
  "S52_D",
  "AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY",
  "AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY",
]) {
  if (!authReadme.includes(marker)) {
    fail(`packages/auth/README.md missing marker: ${marker}`);
  }
}

const allowedAuthRoutes = new Set([
  "apps/web/src/app/api/auth/login/route.ts",
  "apps/web/src/app/api/auth/logout/route.ts",
  "apps/web/src/app/anmelden/page.tsx",
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
    fail(`missing authorized auth surface: ${required}`);
  }
}

const anmelden = read("apps/web/src/app/anmelden/page.tsx");
if (!anmelden.includes("LoginForm") || !anmelden.includes("AUTH_RUNTIME")) {
  fail("anmelden page must gate on AUTH_RUNTIME and render LoginForm");
}

const plan = read("docs/architecture/S52_D_IMPLEMENTATION_PLAN.md");
for (const marker of [
  "S52_D_IMPLEMENTATION_PLAN_DOCUMENTED=YES",
  "S52_D_IMPLEMENTATION_AUTHORIZED=YES",
  "S52_D2_LOGIN_UI_AUTHORIZED=YES",
  "S52_D2_CODE_CHANGED=YES",
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

const stagingDoc = read("docs/architecture/S52_D2B_STAGING_AUTH_RUNTIME.md");
for (const marker of [
  "S52_D2B_STAGING_FLAG_DECISION_DOCUMENTED=YES",
  "AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY",
  "HUMAN_SETS_STAGING_AUTH_RUNTIME=YES",
  "RAILWAY_CHANGE_IN_REPO=NO",
]) {
  if (!stagingDoc.includes(marker)) {
    fail(`staging flag decision doc missing marker: ${marker}`);
  }
}

console.log("S52-D auth-web impl scope contract PASS");
console.log(
  JSON.stringify(
    {
      d2LoginUiImplemented: "YES",
      anmeldenPage: "YES",
      authRuntimeFlagFlip: "STAGING_ONLY",
      authRuntimeDefault: false,
      railwayChangeInRepo: "NO",
    },
    null,
    2,
  ),
);
