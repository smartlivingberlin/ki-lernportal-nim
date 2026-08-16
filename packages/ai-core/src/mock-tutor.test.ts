import {
  MOCK_TUTOR_MODE,
  MOCK_TUTOR_PROMPTS,
  answerMockTutor,
  listMockTutorPrompts,
} from "./mock-tutor.ts";

function ok(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string): void {
  ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
  );
}

ok(MOCK_TUTOR_PROMPTS.length >= 3, "l1 bank has prompts");
same(listMockTutorPrompts("l1").length, 3, "list l1 prompts");
same(listMockTutorPrompts("l2").length, 0, "no l2 prompts yet");

const hit = answerMockTutor({ lessonId: "l1", promptId: "l1-what-is-ai" });
same(hit.status, "answered", "known prompt answered");
same(hit.mode, MOCK_TUTOR_MODE, "mode mock_curated");
ok(hit.answer.includes("Muster"), "answer from curated text");
ok(hit.honesty.includes("keine Live-KI"), "honesty present");
ok(!hit.answer.toLowerCase().includes("http"), "no url leak");

const miss = answerMockTutor({ lessonId: "l1", promptId: "unknown" });
same(miss.status, "abstain", "unknown prompt abstains");
ok(miss.sourceNote.includes("Enthaltung"), "abstain labeled");

const wrongLesson = answerMockTutor({
  lessonId: "l9",
  promptId: "l1-what-is-ai",
});
same(wrongLesson.status, "abstain", "wrong lesson abstains");

console.log("AI_CORE_MOCK_TUTOR_OK=YES");
