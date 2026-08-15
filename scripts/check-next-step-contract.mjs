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
assert.match(read("apps/web/src/app/page.tsx"), /starterLessonId/);
assert.match(
  read("apps/web/src/app/page.tsx"),
  /Auto-CTA nur Kernweg-Welten/,
);
assert.match(
  read("apps/web/src/app/page.tsx"),
  /validCompletedLessonIds\.includes\(lesson\.id\)/,
);
const nextStepSource = read("apps/web/src/data/next-step.ts");
assert.match(nextStepSource, /unsichere erledigte Lektion/);
assert.match(nextStepSource, /Erledigte Lektion mit „Noch unsicher“/);
const unsureBranch = nextStepSource.indexOf(
  "if (nextUnsureLessonId && nextUnsureLessonTitle)",
);
const openLessonBranch = nextStepSource.indexOf("if (nextOpenLesson)");
assert.ok(unsureBranch > 0, "unsure branch missing");
assert.ok(openLessonBranch > 0, "open-lesson branch missing");
assert.ok(
  unsureBranch < openLessonBranch,
  "unsure mid-path must rank before next open lesson",
);
assert.match(
  read("apps/web/src/components/learning/LessonWorkspace.tsx"),
  /Noch unsicher — Nächster Schritt erinnert dich/,
);
assert.match(
  read("apps/web/src/components/learning/LessonWorkspace.tsx"),
  /Noch unsicher merken/,
);
assert.match(
  read("apps/web/src/components/learning/LessonWorkspace.tsx"),
  /lesson-unsure-honesty/,
);
assert.match(
  read("apps/web/src/components/learning/LessonWorkspace.tsx"),
  /Erinnerung im „Nächsten Schritt“ erst nach/,
);
assert.match(
  read("apps/web/src/components/learning/TodayStartCard.tsx"),
  /today-unsure-review-link/,
);
assert.match(
  read("apps/web/src/components/learning/TodayStartCard.tsx"),
  /Nochmal ansehen/,
);
assert.match(
  read("apps/web/src/components/learning/SpacedReviewQueue.tsx"),
  /spaced-review-empty/,
);
assert.match(
  read("apps/web/src/components/learning/SpacedReviewQueue.tsx"),
  /getrennt vom Lektions-Haken/,
);
assert.match(
  read("apps/web/src/components/learning/ModuleNavigation.tsx"),
  /lessonCompleted/,
);
assert.match(
  read("apps/web/src/components/learning/ModuleNavigation.tsx"),
  /ring-\[var\(--nim-accent\)\]/,
);
const lessonWorkspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(lessonWorkspace, /data-testid="lesson-share-copy"/);
assert.match(lessonWorkspace, /buildAbsoluteLessonShareUrl/);
assert.match(lessonWorkspace, /Kein Konto, kein Fortschritt/);
assert.match(
  read("apps/web/src/lib/lesson-share-url.ts"),
  /buildAbsoluteLessonShareUrl/,
);
assert.match(read("apps/web/src/data/theme-worlds.ts"), /sortThemeWorldsKernwegFirst/);
assert.match(read("apps/web/src/data/micro-units.ts"), /nextOpenDeepenMicroUnit/);
assert.match(
  read("apps/web/src/data/micro-units.ts"),
  /nur Kernweg-Welten übergeben/,
);

console.log("NEXT_STEP_CONTRACT_STATIC_OK=YES");
