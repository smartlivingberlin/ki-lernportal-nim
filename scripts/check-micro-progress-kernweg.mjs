#!/usr/bin/env node
/**
 * Static guard for local micro-unit progress + Kernweg/Vertiefung labels.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const hook = read("apps/web/src/hooks/useLocalMicroProgress.ts");
assert.match(hook, /ki-lernportal-nim:micro-progress:v1/);
assert.match(hook, /useLocalMicroProgress/);

const micros = read("apps/web/src/data/micro-units.ts");
assert.match(micros, /microUnitLearningLayer/);
assert.match(micros, /microUnitLayerLabel/);
assert.match(micros, /isMicroUnitCompleted/);

const track = read("apps/web/src/components/learning/ThemeWorldTrack.tsx");
assert.match(track, /Kernweg/);
assert.match(track, /Vertiefung/);
assert.match(track, /completedMicroUnitIds/);
assert.match(track, /data-layer/);

const view = read("apps/web/src/components/learning/MicroLearningUnitView.tsx");
assert.match(view, /micro-unit-complete/);
assert.match(view, /Diese Vertiefung als erledigt markieren/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /useLocalMicroProgress/);
assert.match(page, /setCompletedMicroUnitIds\(\[\]\)/);

const reset = read(
  "apps/web/src/components/learning/ResetProgressConfirm.tsx",
);
assert.match(reset, /Vertiefungs-Einheiten/);

const privacy = read("apps/web/src/app/datenschutz/page.tsx");
assert.match(privacy, /ki-lernportal-nim:micro-progress:v1/);

console.log("MICRO_PROGRESS_KERN_WEG_STATIC_OK=YES");
