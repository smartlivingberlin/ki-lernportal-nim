import {
  CURATED_PASSAGES,
  CURATED_RETRIEVAL_MODE,
  listCuratedPassages,
  retrieveCurated,
} from "./curated-retrieval.ts";

function ok(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string): void {
  ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
  );
}

ok(CURATED_PASSAGES.length >= 3, "corpus size");
same(listCuratedPassages("l1").length, 3, "l1 passages");
same(listCuratedPassages("l9").length, 0, "unknown lesson empty");

const hit = retrieveCurated({
  lessonId: "l1",
  query: "Erkennt KI Muster wie Software?",
});
same(hit.status, "hit", "keyword hit");
same(hit.mode, CURATED_RETRIEVAL_MODE, "mode");
ok(hit.citations.length === 1, "one citation");
ok(hit.citations[0]?.sourceId === "digcomp-30", "source id");
ok(hit.citations[0]?.passageId.length > 0, "passage id");
ok(hit.honesty.includes("keine Live-KI"), "honesty");
ok(!JSON.stringify(hit).toLowerCase().includes("http"), "no urls");

const abstain = retrieveCurated({
  lessonId: "l1",
  query: "Wie hoch ist der Bitcoin-Kurs heute?",
});
same(abstain.status, "abstain", "abstain without evidence");
same(abstain.citations.length, 0, "no citations on abstain");

const wrongLesson = retrieveCurated({
  lessonId: "l2",
  query: "Erkennt KI Muster?",
});
same(wrongLesson.status, "abstain", "wrong lesson abstains");

console.log("AI_CORE_CURATED_RETRIEVAL_OK=YES");
