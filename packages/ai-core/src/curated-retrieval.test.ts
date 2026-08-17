import {
  CURATED_PASSAGES,
  CURATED_RETRIEVAL_MODE,
  CURATED_UI_QUERIES,
  listCuratedPassages,
  listCuratedUiQueries,
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

ok(CURATED_PASSAGES.length >= 9, "corpus size");
same(listCuratedPassages("l1").length, 3, "l1 passages");
same(listCuratedPassages("l2").length, 3, "l2 passages");
same(listCuratedPassages("l3").length, 3, "l3 passages");
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

const crossLesson = retrieveCurated({
  lessonId: "l2",
  query: "Erkennt KI Muster wie Software?",
});
same(crossLesson.status, "abstain", "l1 query abstains on l2 corpus");

ok(CURATED_UI_QUERIES.length >= 12, "ui query bank size");
same(listCuratedUiQueries("l1").length, 4, "l1 ui queries");
same(listCuratedUiQueries("l2").length, 4, "l2 ui queries");
same(listCuratedUiQueries("l3").length, 4, "l3 ui queries");
same(listCuratedUiQueries("l9").length, 0, "unknown lesson ui empty");

const uiHit = retrieveCurated({
  lessonId: "l1",
  query: listCuratedUiQueries("l1")[0]!.query,
});
same(uiHit.status, "hit", "first ui query hits");

const uiAbstainQuery = listCuratedUiQueries("l1").find(
  (q) => q.id === "l1-q-abstain",
);
ok(uiAbstainQuery != null, "abstain ui query exists");
const uiAbstain = retrieveCurated({
  lessonId: "l1",
  query: uiAbstainQuery.query,
});
same(uiAbstain.status, "abstain", "abstain ui query abstains");

const l2Hit = retrieveCurated({
  lessonId: "l2",
  query: listCuratedUiQueries("l2")[0]!.query,
});
same(l2Hit.status, "hit", "l2 ui query hits");
ok(l2Hit.citations[0]?.passageId.startsWith("l2-"), "l2 citation");

const l2AbstainQuery = listCuratedUiQueries("l2").find(
  (q) => q.id === "l2-q-abstain",
);
ok(l2AbstainQuery != null, "l2 abstain ui query exists");
const l2Abstain = retrieveCurated({
  lessonId: "l2",
  query: l2AbstainQuery.query,
});
same(l2Abstain.status, "abstain", "l2 abstain ui query abstains");

const l3Hit = retrieveCurated({
  lessonId: "l3",
  query: listCuratedUiQueries("l3")[0]!.query,
});
same(l3Hit.status, "hit", "l3 ui query hits");
ok(l3Hit.citations[0]?.passageId.startsWith("l3-"), "l3 citation");

const l3AbstainQuery = listCuratedUiQueries("l3").find(
  (q) => q.id === "l3-q-abstain",
);
ok(l3AbstainQuery != null, "l3 abstain ui query exists");
const l3Abstain = retrieveCurated({
  lessonId: "l3",
  query: l3AbstainQuery.query,
});
same(l3Abstain.status, "abstain", "l3 abstain ui query abstains");

console.log("AI_CORE_CURATED_RETRIEVAL_OK=YES");
