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
assert.match(panel, /Sicherungsdatei/);
assert.match(panel, /lokal sichern/);
assert.match(panel, /anderes Gerät/);
assert.match(panel, /data-testid="progress-backup-import-confirm"/);
assert.match(panel, /data-testid="progress-backup-import-confirm-yes"/);
assert.match(panel, /Ja, Stand ersetzen/);
assert.match(panel, /pendingImport/);
assert.match(panel, /confirmPendingImport/);
assert.doesNotMatch(panel, /JSON-Datei/);
const importHandler = panel.slice(
  panel.indexOf("const handleImportFile"),
  panel.indexOf("const cancelPendingImport"),
);
assert.doesNotMatch(
  importHandler,
  /applyProgressBackupToStorage/,
  "file pick must not apply before confirm",
);
assert.match(
  panel.slice(panel.indexOf("const confirmPendingImport")),
  /applyProgressBackupToStorage/,
);

const backupErrors = read("apps/web/src/lib/local-progress-backup.ts");
assert.match(backupErrors, /keine gültige Fortschritts-Datei/);
assert.doesNotMatch(backupErrors, /kein gültiges JSON/);

const reset = read(
  "apps/web/src/components/learning/ResetProgressConfirm.tsx",
);
assert.match(reset, /href="#fortschritt-sichern"/);
assert.match(reset, /data-testid=\{backupLinkTestId\}|data-testid="reset-progress-backup-link"/);

const helpTips = read("apps/web/src/data/help-tips.ts");
assert.match(helpTips, /href: "#fortschritt-sichern"/);
assert.match(helpTips, /label: "Fortschritt sichern"/);
assert.match(helpTips, /Sicherungsdatei herunterladen/);
assert.match(helpTips, /Ja, Stand ersetzen/);
assert.doesNotMatch(helpTips, /JSON-Datei/);

const goals = read("apps/web/src/components/learning/GoalNavigation.tsx");
assert.match(goals, /id="ziele"/);
assert.match(goals, /data-world-progress/);
assert.match(goals, /Einheiten ·/);
assert.match(goals, /completedMicroUnitIds/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /ProgressBackupPanel/);
assert.match(page, /href="#suche"/);
assert.match(page, /hero-secondary-backup/);
assert.match(page, /href="#fortschritt-sichern"/);

const guided = read(
  "apps/web/src/components/learning/GuidedStartSteps.tsx",
);
assert.match(guided, /guided-start-backup-link/);
assert.match(guided, /href="#fortschritt-sichern"/);

const search = read(
  "apps/web/src/components/learning/LocalSearchPanel.tsx",
);
assert.match(search, /id="suche"/);
assert.match(search, /portal-search-title/);

const mobileNav = read(
  "apps/web/src/components/learning/MobileBottomNav.tsx",
);
assert.match(mobileNav, /href: "#ziele"/);
assert.match(mobileNav, /navigatePortalHash/);

console.log("PROGRESS_BACKUP_CLARITY_STATIC_OK=YES");
