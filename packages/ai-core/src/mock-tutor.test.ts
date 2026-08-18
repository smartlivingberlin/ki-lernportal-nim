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

ok(MOCK_TUTOR_PROMPTS.length >= 18, "l1–l6 bank has prompts");
same(listMockTutorPrompts("l1").length, 3, "list l1 prompts");
same(listMockTutorPrompts("l2").length, 3, "list l2 prompts");
same(listMockTutorPrompts("l3").length, 3, "list l3 prompts");
same(listMockTutorPrompts("l4").length, 3, "list l4 prompts");
same(listMockTutorPrompts("l5").length, 3, "list l5 prompts");
same(listMockTutorPrompts("l6").length, 3, "list l6 prompts");
same(listMockTutorPrompts("l9").length, 0, "unknown lesson empty");

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

const l2Hit = answerMockTutor({ lessonId: "l2", promptId: "l2-strengths" });
same(l2Hit.status, "answered", "l2 prompt answered");
ok(l2Hit.answer.includes("strukturieren"), "l2 answer from curated text");

const l2WrongBank = answerMockTutor({
  lessonId: "l2",
  promptId: "l1-what-is-ai",
});
same(l2WrongBank.status, "abstain", "l1 prompt abstains on l2");

const l3Hit = answerMockTutor({
  lessonId: "l3",
  promptId: "l3-safe-question",
});
same(l3Hit.status, "answered", "l3 prompt answered");
ok(l3Hit.answer.includes("privaten"), "l3 answer from curated text");

const l3WrongBank = answerMockTutor({
  lessonId: "l3",
  promptId: "l2-strengths",
});
same(l3WrongBank.status, "abstain", "l2 prompt abstains on l3");

const l4Hit = answerMockTutor({
  lessonId: "l4",
  promptId: "l4-what-is-prompt",
});
same(l4Hit.status, "answered", "l4 prompt answered");
ok(l4Hit.answer.includes("Aufgabe"), "l4 answer from curated text");

const l4WrongBank = answerMockTutor({
  lessonId: "l4",
  promptId: "l3-safe-question",
});
same(l4WrongBank.status, "abstain", "l3 prompt abstains on l4");

const l5Hit = answerMockTutor({
  lessonId: "l5",
  promptId: "l5-formula",
});
same(l5Hit.status, "answered", "l5 prompt answered");
ok(l5Hit.answer.includes("Rolle"), "l5 answer from curated text");

const l5WrongBank = answerMockTutor({
  lessonId: "l5",
  promptId: "l4-what-is-prompt",
});
same(l5WrongBank.status, "abstain", "l4 prompt abstains on l5");

const l6Hit = answerMockTutor({
  lessonId: "l6",
  promptId: "l6-help",
});
same(l6Hit.status, "answered", "l6 prompt answered");
ok(l6Hit.answer.includes("freundlich"), "l6 answer from curated text");

const l6WrongBank = answerMockTutor({
  lessonId: "l6",
  promptId: "l5-formula",
});
same(l6WrongBank.status, "abstain", "l5 prompt abstains on l6");

console.log("AI_CORE_MOCK_TUTOR_OK=YES");
