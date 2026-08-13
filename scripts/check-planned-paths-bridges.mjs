#!/usr/bin/env node
/**
 * Static guard: planned bridges + locked-path honesty (no new lesson IDs).
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
assert.match(paths, /lockedPathHonesty/);
assert.match(paths, /path-sources-rag/);
assert.match(paths, /path-business/);
assert.match(paths, /path-admin/);
assert.match(paths, /bridgeLessonIds: \['l6', 'l11'\]/);
assert.match(paths, /bridgeLessonIds: \['l4', 'l5'\]/);
assert.match(paths, /Gesperrt · später/);
assert.match(paths, /Gesperrt · nicht für Einsteiger/);

const panel = read(
  "apps/web/src/components/learning/PlannedPathsPanel.tsx",
);
assert.match(panel, /data-testid="planned-paths-panel"/);
assert.match(panel, /id="weitere-pfade"/);
assert.match(panel, /data-testid=\{`planned-path-\$\{bridge\.pathId\}`\}/);
assert.match(panel, /data-testid=\{`locked-path-\$\{entry\.pathId\}`\}/);
assert.match(panel, /data-testid="locked-paths-block"/);
assert.match(panel, /Kein Start-Button/);
assert.match(panel, /Weitere Lernpfade/);
assert.doesNotMatch(panel, /Alltag & Prompting — jetzt schon starten/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /PlannedPathsPanel/);

const lessons = read("apps/web/src/data/lessons.ts");
const lessonIds = [...lessons.matchAll(/id:\s*'l(\d+)'/g)].map((m) => m[1]);
assert.equal(lessonIds.length, 12, "must keep exactly 12 seed lessons");
assert.equal(
  [...lessons.matchAll(/pathId:\s*'path-beginner'/g)].length,
  12,
  "all lessons stay on path-beginner",
);

console.log("PLANNED_PATHS_ALLTAG_PROMPTING_STATIC_OK=YES");
console.log("LOCKED_PATHS_HONESTY_STATIC_OK=YES");
