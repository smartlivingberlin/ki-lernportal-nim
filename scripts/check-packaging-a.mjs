#!/usr/bin/env node
/**
 * Static guardrails for packaging slice A:
 * harder Simple Mode packing, module disclosure, honest reset, quiet first-visit hover.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /SimpleModePackHint/);
assert.match(page, /literacyPath\.reset/);
assert.match(page, /reviewQueue\.resetQueue/);
assert.match(page, /setCompletedMicroUnitIds/);
assert.match(page, /simpleMode \? \(\s*<SimpleModePackHint/);

const moduleNav = read("apps/web/src/components/learning/ModuleNavigation.tsx");
assert.match(moduleNav, /containsActive/);
assert.match(moduleNav, /aria-controls/);
assert.match(moduleNav, /onToggle/);

const reset = read("apps/web/src/components/learning/ResetProgressConfirm.tsx");
assert.match(reset, /Haken an den 12 Lektionen/);
assert.match(reset, /Vertiefungs-Einheiten/);
assert.match(reset, /60-Minuten-Kurzpfads/);
assert.match(reset, /Wiederholungs-Übungen/);

const explain = read("apps/web/src/components/learning/CursorExplainLayer.tsx");
assert.match(explain, /hoverExplainEnabled/);
assert.match(explain, /useFirstStartCoachDismissed/);
assert.match(explain, /useSimpleMode/);

const hint = read("apps/web/src/components/learning/SimpleModePackHint.tsx");
assert.match(hint, /nur ausgeblendet/);
assert.match(hint, /Mehr Bereiche einblenden/);
assert.match(hint, /Zum Einstieg bleiben/);
assert.match(hint, /Schalter oben/);
assert.match(hint, /Themenwelten/);
assert.match(hint, /Begriffe/);

const literacyPanel = read(
  "apps/web/src/components/learning/LiteracyPathPanel.tsx",
);
assert.match(literacyPanel, /ResetProgressConfirm/);
assert.match(literacyPanel, /data-testid="literacy-path-reset"/);
assert.match(literacyPanel, /Kurzpfad wirklich zurücksetzen/);

const spacedReview = read(
  "apps/web/src/components/learning/SpacedReviewQueue.tsx",
);
assert.match(spacedReview, /ResetProgressConfirm/);
assert.match(spacedReview, /data-testid="spaced-review-reset"/);
assert.match(spacedReview, /data-testid="spaced-review-soft-start"/);
assert.match(spacedReview, /listDueCards/);
assert.match(spacedReview, /Übungen zurücksetzen/);
assert.match(spacedReview, /Wiederholungs-Übungen wirklich zurücksetzen/);
assert.doesNotMatch(spacedReview, /Queue zurücksetzen/);
assert.doesNotMatch(spacedReview, /Confidence-Einträge/);

const reviewHook = read("apps/web/src/hooks/useLocalReviewQueue.ts");
assert.match(reviewHook, /REVIEW_SOFT_START_LIMIT = 3/);
assert.match(reviewHook, /SOFT_START_CARD_IDS/);
assert.match(reviewHook, /softStartStillActive/);
assert.match(reviewHook, /hasSoftStartParking/);
assert.match(reviewHook, /softStartActive/);

const selfCheck = read("apps/web/src/components/learning/SelfCheckPanel.tsx");
assert.match(selfCheck, /ResetProgressConfirm/);
assert.match(selfCheck, /data-testid="self-check-reset"/);
assert.match(selfCheck, /Selbstcheck wirklich zurücksetzen/);
assert.match(selfCheck, /unmark\("lit-selfcheck"\)/);
assert.doesNotMatch(selfCheck, /onClick=\{reset\}/);

const challenge = read(
  "apps/web/src/components/learning/InteractiveChallengeCard.tsx",
);
assert.match(challenge, /data-testid="challenge-confidence-ephemeral-note"/);
assert.match(challenge, /data-testid="challenge-teachback-ephemeral-note"/);
assert.match(challenge, /Nur für diese Ansicht/);
assert.match(challenge, /nicht in der Sicherung/);
assert.match(challenge, /aria-describedby=\{`\$\{baseId\}-teachback-note`\}/);
assert.match(challenge, /href="#wiederholen"/);

const microUnit = read(
  "apps/web/src/components/learning/MicroLearningUnitView.tsx",
);
assert.match(microUnit, /data-testid="micro-confidence-ephemeral-note"/);
assert.match(microUnit, /data-testid="micro-teachback-ephemeral-note"/);
assert.match(microUnit, /Nur für diese Ansicht/);
assert.match(microUnit, /nicht in der Sicherung/);
assert.match(microUnit, /aria-describedby=\{`\$\{baseId\}-teachback-note`\}/);
assert.match(microUnit, /href="#wiederholen"/);

assert.match(read("apps/web/src/app/page.tsx"), /revealWorlds/);
assert.match(read("apps/web/src/app/page.tsx"), /worldsFocusToken/);

console.log("PACKAGING_A_STATIC_OK=YES");
