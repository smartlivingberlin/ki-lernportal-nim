#!/usr/bin/env node
/**
 * Drift guard: every localStorage key used by the web app must appear on
 * /datenschutz. Keeps the public privacy inventory honest without a browser.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const webSrc = join(root, "apps/web/src");
const privacyPath = "apps/web/src/app/datenschutz/page.tsx";
const backupPath = "apps/web/src/lib/local-progress-backup.ts";

/** Storage keys look like ki-lernportal-nim:name:v1 (not *-change events). */
const STORAGE_KEY_RE = /ki-lernportal-nim:[a-z0-9-]+:v\d+/g;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(full, out);
    } else if (/\.(ts|tsx|js|mjs|cjs)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

function keysIn(text) {
  return new Set(text.match(STORAGE_KEY_RE) ?? []);
}

const files = walk(webSrc);
const codeKeys = new Set();
const keySources = new Map();

for (const file of files) {
  // Privacy page lists keys; do not treat it as a producer.
  if (file.endsWith(`${join("app", "datenschutz", "page.tsx")}`)) continue;
  const text = readFileSync(file, "utf8");
  for (const key of keysIn(text)) {
    codeKeys.add(key);
    const rel = relative(root, file);
    const list = keySources.get(key) ?? [];
    list.push(rel);
    keySources.set(key, list);
  }
}

const privacy = readFileSync(join(root, privacyPath), "utf8");
const privacyKeys = keysIn(privacy);

assert.ok(
  codeKeys.size >= 8,
  `expected at least 8 storage keys in code, found ${codeKeys.size}`,
);

const missingOnPrivacy = [...codeKeys].filter((key) => !privacyKeys.has(key));
assert.deepEqual(
  missingOnPrivacy,
  [],
  `Datenschutz missing keys used in code:\n${missingOnPrivacy
    .map((key) => `  ${key} ← ${(keySources.get(key) ?? []).join(", ")}`)
    .join("\n")}`,
);

const listedButUnused = [...privacyKeys].filter((key) => !codeKeys.has(key));
assert.deepEqual(
  listedButUnused,
  [],
  `Datenschutz lists unused storage keys:\n  ${listedButUnused.join("\n  ")}`,
);

const backup = readFileSync(join(root, backupPath), "utf8");
const backupKeys = keysIn(backup);
assert.equal(backupKeys.size, 6, "backup must cover exactly six progress keys");
for (const key of backupKeys) {
  assert.ok(
    privacyKeys.has(key),
    `backup key ${key} must be listed on Datenschutz`,
  );
}

assert.match(privacy, /data-testid="datenschutz-storage-keys"/);
assert.match(privacy, /sechs\s+Lernstände/);
assert.match(privacy, /Einfache Ansicht und\s+Einstiegs-Coach/);
assert.match(privacy, /nicht dauerhaft gespeichert/);
assert.match(privacy, /Challenge|Teachback|Teach-Back/i);

console.log(
  `DATENSCHUTZ_STORAGE_KEYS_OK=YES keys=${[...codeKeys].sort().join(",")}`,
);
