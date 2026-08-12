#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

assert.match(read("apps/web/src/data/next-step.ts"), /resolveNextStep/);
assert.match(read("apps/web/src/data/next-step.ts"), /eyebrow: "Nächster Schritt"/);
assert.match(read("apps/web/src/data/next-step.ts"), /nextDeepenMicroUnitId/);
assert.match(read("apps/web/src/data/next-step.ts"), /Optional: \$\{nextDeepenMicroTitle\}/);
assert.match(read("apps/web/src/components/learning/TodayStartCard.tsx"), /nextStep/);
assert.match(read("apps/web/src/components/learning/TodayStartCard.tsx"), /onOpenDeepenMicro/);
assert.match(read("apps/web/src/components/learning/GoalNavigation.tsx"), /Vertiefen · optional/);
assert.match(read("apps/web/src/components/learning/GoalNavigation.tsx"), /Später/);
assert.match(read("apps/web/src/components/learning/SelfCheckPanel.tsx"), /Nächster Schritt: Kurzpfad/);
assert.match(read("apps/web/src/components/learning/LiteracyPathPanel.tsx"), /literacyStationForMode/);
assert.match(read("apps/web/src/app/page.tsx"), /resolveNextStep/);
assert.match(read("apps/web/src/app/page.tsx"), /nextOpenDeepenMicroUnit/);
assert.match(read("apps/web/src/app/page.tsx"), /revealWorlds/);
assert.match(read("apps/web/src/data/theme-worlds.ts"), /sortThemeWorldsKernwegFirst/);
assert.match(read("apps/web/src/data/micro-units.ts"), /nextOpenDeepenMicroUnit/);

console.log("NEXT_STEP_CONTRACT_STATIC_OK=YES");
