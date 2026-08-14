#!/usr/bin/env node
/**
 * Static guard: planned Alltag/Prompting path bridges (no new lesson IDs).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const paths = read("apps/web/src/data/learning-paths.ts");
assert.match(paths, /path-daily-life/);
assert.match(paths, /path-prompting/);
assert.match(paths, /plannedPathBridges/);
assert.match(paths, /bridgeLessonIds: \['l6', 'l11'\]/);
assert.match(paths, /bridgeLessonIds: \['l4', 'l5'\]/);
assert.match(paths, /world-work-life/);
assert.match(paths, /world-chat-prompting/);
assert.match(paths, /lockedLearningPaths/);
assert.match(paths, /status === "locked"/);

const panel = read(
  "apps/web/src/components/learning/PlannedPathsPanel.tsx",
);
assert.match(panel, /data-testid="planned-paths-panel"/);
assert.match(panel, /id="weitere-pfade"/);
assert.match(panel, /data-testid=\{`planned-path-\$\{bridge\.pathId\}`\}/);
assert.match(panel, /plannedPathBridges/);
assert.match(panel, /Alltag & Prompting/);
assert.match(panel, /explainAttrs\("weitere-pfade"\)/);
assert.match(panel, /tipId="weitere-pfade"/);
assert.doesNotMatch(panel, /tipId="lernpfad"/);

// S-Product-C5: locked paths show as honest, non-clickable "Demnächst" cards.
assert.match(panel, /lockedLearningPaths/);
assert.match(
  panel,
  /data-testid=\{`planned-path-locked-\$\{path\.id\}`\}/,
);
assert.match(panel, /Demnächst/);
assert.doesNotMatch(
  panel,
  /<button[^>]*data-testid=\{`planned-path-locked/,
);

const tips = read("apps/web/src/data/help-tips.ts");
assert.match(tips, /id: "weitere-pfade"/);
assert.match(tips, /label: "Weitere Lernpfade"/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /PlannedPathsPanel/);
assert.match(page, /weitere-pfade|PlannedPathsPanel/);

const lessons = read("apps/web/src/data/lessons.ts");
const lessonIds = [...lessons.matchAll(/id:\s*'l(\d+)'/g)].map((m) => m[1]);
assert.equal(lessonIds.length, 12, "must keep exactly 12 seed lessons");
assert.equal(
  [...lessons.matchAll(/pathId:\s*'path-beginner'/g)].length,
  12,
  "all lessons stay on path-beginner",
);

console.log("PLANNED_PATHS_ALLTAG_PROMPTING_STATIC_OK=YES");
