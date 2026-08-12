#!/usr/bin/env node
/**
 * Railway Production uses Root Directory `apps/web`, which means only that
 * folder is in the build context. Local `@ki-lernportal-nim/*` packages must
 * therefore be vendored under apps/web/vendor (not via ../../packages).
 *
 * Canonical sources remain packages/{auth,contracts,domain}.
 * Run: node scripts/sync-web-railway-vendor.mjs
 * Check: node scripts/sync-web-railway-vendor.mjs --check
 */
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const packages = ["auth", "contracts", "domain"];
const vendorRoot = path.join(repoRoot, "apps", "web", "vendor");

const checkOnly = process.argv.includes("--check");

function listFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      out.push(...listFiles(full));
      continue;
    }
    if (entry.name.endsWith(".test.ts")) continue;
    out.push(full);
  }
  return out.sort();
}

function fingerprint(dir) {
  const hash = createHash("sha256");
  for (const file of listFiles(dir)) {
    const rel = path.relative(dir, file).split(path.sep).join("/");
    hash.update(rel);
    hash.update("\0");
    hash.update(readFileSync(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function syncOne(name) {
  const source = path.join(repoRoot, "packages", name);
  const target = path.join(vendorRoot, name);
  if (!existsSync(source)) {
    throw new Error(`Missing source package: ${source}`);
  }

  const staging = path.join(vendorRoot, `.staging-${name}`);
  rmSync(staging, { recursive: true, force: true });
  mkdirSync(staging, { recursive: true });

  // package.json
  const manifest = JSON.parse(
    readFileSync(path.join(source, "package.json"), "utf8"),
  );
  if (name === "contracts") {
    manifest.dependencies = {
      "@ki-lernportal-nim/domain": "file:../domain",
    };
  } else {
    delete manifest.dependencies;
  }
  // Railway npm install does not need package test tooling.
  delete manifest.devDependencies;
  writeFileSync(
    path.join(staging, "package.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  if (existsSync(path.join(source, "tsconfig.json"))) {
    cpSync(
      path.join(source, "tsconfig.json"),
      path.join(staging, "tsconfig.json"),
    );
  }

  mkdirSync(path.join(staging, "src"), { recursive: true });
  for (const file of listFiles(path.join(source, "src"))) {
    const rel = path.relative(path.join(source, "src"), file);
    const dest = path.join(staging, "src", rel);
    mkdirSync(path.dirname(dest), { recursive: true });
    cpSync(file, dest);
  }

  // Vendor-local README explains why the copy exists.
  writeFileSync(
    path.join(staging, "README.md"),
    [
      `# Vendored @ki-lernportal-nim/${name}`,
      "",
      "Generated copy for Railway Production (Root Directory `apps/web`).",
      `Canonical source: \`packages/${name}\`.`,
      "",
      "Do not edit by hand. Run:",
      "",
      "```bash",
      "node scripts/sync-web-railway-vendor.mjs",
      "```",
      "",
    ].join("\n"),
    "utf8",
  );

  return { staging, target, source };
}

mkdirSync(vendorRoot, { recursive: true });

const planned = packages.map(syncOne);

if (checkOnly) {
  let ok = true;
  for (const { staging, target, source } of planned) {
    if (!existsSync(target)) {
      console.error(`MISSING vendor copy for packages/${path.basename(source)}`);
      ok = false;
      continue;
    }
    const a = fingerprint(staging);
    const b = fingerprint(target);
    if (a !== b) {
      console.error(
        `DRIFT apps/web/vendor/${path.basename(target)} != packages/${path.basename(source)}`,
      );
      ok = false;
    } else {
      console.log(
        `VENDOR_IN_SYNC=${path.basename(target)}`,
      );
    }
  }
  for (const { staging } of planned) {
    rmSync(staging, { recursive: true, force: true });
  }
  if (!ok) {
    console.error(
      "Run: node scripts/sync-web-railway-vendor.mjs",
    );
    process.exit(1);
  }
  console.log("RAILWAY_WEB_VENDOR_CHECK=PASS");
  process.exit(0);
}

for (const { staging, target } of planned) {
  rmSync(target, { recursive: true, force: true });
  cpSync(staging, target, { recursive: true });
  rmSync(staging, { recursive: true, force: true });
  console.log(`VENDOR_SYNCED=${path.basename(target)}`);
}

writeFileSync(
  path.join(vendorRoot, "README.md"),
  [
    "# Railway web vendor packages",
    "",
    "Railway Production Root Directory is `apps/web`, so the build context",
    "cannot see `../../packages/*`. These copies keep the concept demo",
    "buildable under that constraint.",
    "",
    "Sync from canonical packages:",
    "",
    "```bash",
    "node scripts/sync-web-railway-vendor.mjs",
    "node scripts/sync-web-railway-vendor.mjs --check",
    "```",
    "",
  ].join("\n"),
  "utf8",
);

console.log("RAILWAY_WEB_VENDOR_SYNC=DONE");
