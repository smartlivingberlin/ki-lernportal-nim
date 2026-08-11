#!/usr/bin/env node
/**
 * S52-C – static Auth-Web boundary contract.
 * Docs + negative surface only; no network, no DB, no Railway.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function fail(message) {
  console.error(`S52-C auth-web scope check FAILED: ${message}`);
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

const doc = read("docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md");
for (const marker of [
  "S52_C_SCOPE_AUTHORIZED=YES",
  "S52_C_IMPLEMENTATION_AUTHORIZED=SCOPE_LOCK_ONLY",
  "AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY",
  "AUTH_WEB_SURFACE=DOCUMENTED_NOT_IMPLEMENTED",
  "LOGIN_UI=NO",
  "REGISTRATION_UI=NO",
  "FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false",
  "DATABASE_CONNECTION_AUTHORIZED=NO",
  "RAILWAY_CHANGE=NO",
  "AUTH_RUNTIME_FLAG_FLIP=NO",
]) {
  if (!doc.includes(marker)) {
    fail(`scope doc missing marker: ${marker}`);
  }
}

const operations = read("packages/contracts/src/operations.ts");
if (!operations.includes('auth_runtime: false')) {
  fail("packages/contracts must keep auth_runtime default false");
}
if (!operations.includes('"auth_runtime"')) {
  fail("packages/contracts must allowlist auth_runtime flag name");
}

const authReadme = read("packages/auth/README.md");
for (const marker of [
  "LOGIN_UI=NO",
  "AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY",
  "S52_C",
]) {
  if (!authReadme.includes(marker)) {
    fail(`packages/auth/README.md missing marker: ${marker}`);
  }
}

const appRoot = resolve(root, "apps/web/src/app");
const forbiddenName =
  /(^|\/)(login|register|signup|sign-in|sign-up|auth|session)(\/|$)/i;
const appFiles = walkFiles(appRoot);
for (const file of appFiles) {
  const rel = file.slice(root.length + 1).replaceAll("\\", "/");
  const pathWithoutFile = rel.replace(/\/[^/]+$/, "");
  if (forbiddenName.test(pathWithoutFile)) {
    fail(`forbidden auth web surface path present: ${rel}`);
  }
}

console.log("S52-C auth-web scope contract PASS");
console.log(
  JSON.stringify(
    {
      scopeLock: "YES",
      authWebSurface: "DOCUMENTED_NOT_IMPLEMENTED",
      loginUi: "NO",
      authRuntimeDefault: false,
      railwayChange: "NO",
    },
    null,
    2,
  ),
);
