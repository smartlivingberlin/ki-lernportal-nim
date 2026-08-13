#!/usr/bin/env node
/**
 * Static guard: Kernweg completion panel (no browser).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const panel = read(
  "apps/web/src/components/learning/KernwegCompletePanel.tsx",
);
assert.match(panel, /data-testid="kernweg-complete-panel"/);
assert.match(panel, /id="kernweg-abschluss"/);
assert.match(panel, /Kernweg abgeschlossen/);
assert.match(panel, /href="#wiederholen"/);
assert.match(panel, /href="#ziele"/);
assert.match(panel, /href="#fortschritt-sichern"/);
assert.match(panel, /data-testid="kernweg-complete-review"/);
assert.match(panel, /data-testid="kernweg-complete-worlds"/);
assert.match(panel, /data-testid="kernweg-complete-backup"/);
assert.doesNotMatch(panel, /api\/auth/);
assert.doesNotMatch(panel, /id:\s*'l1[3-9]'/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /KernwegCompletePanel/);
assert.match(page, /!nextOpenLesson && completedLessons > 0/);

const review = read(
  "apps/web/src/components/learning/SpacedReviewQueue.tsx",
);
assert.match(review, /id="wiederholen"/);

const goals = read("apps/web/src/components/learning/GoalNavigation.tsx");
assert.match(goals, /id="ziele"/);

const backup = read(
  "apps/web/src/components/learning/ProgressBackupPanel.tsx",
);
assert.match(backup, /id="fortschritt-sichern"/);

console.log("KERN_WEG_COMPLETE_STATIC_OK=YES");
