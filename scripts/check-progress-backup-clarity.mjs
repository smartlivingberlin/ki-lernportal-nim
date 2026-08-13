#!/usr/bin/env node
/**
 * Static guard: local progress backup + world progress chrome (no browser).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const backupLib = read("apps/web/src/lib/local-progress-backup.ts");
assert.match(backupLib, /ki-lernportal-nim-progress-backup/);
assert.match(backupLib, /PROGRESS_BACKUP_VERSION = 1/);
assert.match(backupLib, /applyProgressBackupToStorage/);

const panel = read(
  "apps/web/src/components/learning/ProgressBackupPanel.tsx",
);
assert.match(panel, /id="fortschritt-sichern"/);
assert.match(panel, /data-testid="progress-backup-panel"/);
assert.match(panel, /hashchange/);
assert.match(panel, /titleRef/);
assert.match(panel, /Herunterladen/);
assert.match(panel, /Datei laden/);

const reset = read(
  "apps/web/src/components/learning/ResetProgressConfirm.tsx",
);
assert.match(reset, /href="#fortschritt-sichern"/);
assert.match(reset, /data-testid="reset-progress-backup-link"/);

const helpTips = read("apps/web/src/data/help-tips.ts");
assert.match(helpTips, /href: "#fortschritt-sichern"/);
assert.match(helpTips, /label: "Fortschritt sichern"/);

const goals = read("apps/web/src/components/learning/GoalNavigation.tsx");
assert.match(goals, /id="ziele"/);
assert.match(goals, /data-world-progress/);
assert.match(goals, /Einheiten ·/);
assert.match(goals, /completedMicroUnitIds/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /ProgressBackupPanel/);
assert.match(page, /href="#suche"/);

const search = read(
  "apps/web/src/components/learning/LocalSearchPanel.tsx",
);
assert.match(search, /id="suche"/);
assert.match(search, /portal-search-title/);

const mobileNav = read(
  "apps/web/src/components/learning/MobileBottomNav.tsx",
);
assert.match(mobileNav, /href: "#ziele"/);
assert.match(mobileNav, /scrollIntoView/);

console.log("PROGRESS_BACKUP_CLARITY_STATIC_OK=YES");
