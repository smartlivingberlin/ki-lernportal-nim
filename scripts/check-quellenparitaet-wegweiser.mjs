#!/usr/bin/env node
/**
 * Static guard: Quellenparität on remaining Wegweiser surfaces.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const types = read("apps/web/src/data/types.ts");
assert.match(types, /interface LearningMethod[\s\S]*sourceIds: string\[]/);
assert.match(types, /interface GlossaryTerm[\s\S]*sourceIds: string\[]/);
assert.match(types, /interface InteractiveChallenge[\s\S]*sourceIds: string\[]/);

const methods = read("apps/web/src/data/learning-methods.ts");
assert.equal([...methods.matchAll(/sourceIds:/g)].length, 8);
assert.match(methods, /wcag-22/);

const glossary = read("apps/web/src/data/glossary.ts");
assert.equal([...glossary.matchAll(/sourceIds:/g)].length, 17);

const challenges = read("apps/web/src/data/interactive-challenges.ts");
assert.equal([...challenges.matchAll(/sourceIds:/g)].length, 37);

const sourceList = read(
  "apps/web/src/components/learning/SourceLinkList.tsx",
);
assert.match(sourceList, /data-source-id=\{source\.id\}/);
assert.match(sourceList, /rel="noopener noreferrer"/);
assert.match(sourceList, /Geprüft am/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /SourceLinkList/);
assert.match(page, /method-sources-\$/);
assert.match(page, /glossary-sources-\$/);

const challengeCard = read(
  "apps/web/src/components/learning/InteractiveChallengeCard.tsx",
);
assert.match(challengeCard, /challenge-sources/);
assert.match(challengeCard, /SourceLinkList/);

const micro = read(
  "apps/web/src/components/learning/MicroLearningUnitView.tsx",
);
assert.match(micro, /micro-unit-sources/);
assert.match(micro, /SourceLinkList/);

const review = read(
  "apps/web/src/components/learning/SpacedReviewQueue.tsx",
);
assert.match(review, /review-card-sources/);
assert.match(review, /SourceLinkList/);

console.log("QUELLENPARITAET_WEGWEISER_STATIC_OK=YES");
