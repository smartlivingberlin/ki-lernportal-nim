#!/usr/bin/env node
/**
 * S52-D – Auth-Web implementation gate (D1 routes behind flag).
 * Login-UI remains NO; auth_runtime default remains false.
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
  "LOGIN_UI=NO",
  "FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false",
  "AUTH_RUNTIME_FLAG_FLIP=NO",
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
  "LOGIN_UI=NO",
  "S52_D",
  "AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY",
  "S52_D1",
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
  "LOGIN_UI=NO",
  "S52_D1_CODE_CHANGED=YES",
  "Slice D1",
  "Slice D2",
  "Slice D3",
]) {
  if (!plan.includes(marker)) {
    fail(`implementation plan missing marker: ${marker}`);
  }
}

const loginRoute = read("apps/web/src/app/api/auth/login/route.ts");
const logoutRoute = read("apps/web/src/app/api/auth/logout/route.ts");
for (const [label, source] of [
  ["login", loginRoute],
  ["logout", logoutRoute],
]) {
  if (!source.includes("FEATURE_DISABLED") && !source.includes("getAuthHttpHandlers")) {
    fail(`${label} route must use auth HTTP handlers / disabled gate`);
  }
}

console.log("S52-D auth-web impl scope contract PASS");
console.log(
  JSON.stringify(
    {
      implementationAuthorized: "YES",
      d1Routes: "YES",
      loginUi: "NO",
      authRuntimeDefault: false,
      railwayChange: "NO",
    },
    null,
    2,
  ),
);
