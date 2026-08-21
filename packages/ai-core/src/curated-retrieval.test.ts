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

ok(CURATED_PASSAGES.length >= 27, "corpus size");
same(listCuratedPassages("l1").length, 3, "l1 passages");
same(listCuratedPassages("l2").length, 3, "l2 passages");
same(listCuratedPassages("l3").length, 3, "l3 passages");
same(listCuratedPassages("l4").length, 3, "l4 passages");
same(listCuratedPassages("l5").length, 3, "l5 passages");
same(listCuratedPassages("l6").length, 3, "l6 passages");
same(listCuratedPassages("l7").length, 3, "l7 passages");
same(listCuratedPassages("l8").length, 3, "l8 passages");
same(listCuratedPassages("l9").length, 3, "l9 passages");
same(listCuratedPassages("l10").length, 3, "l10 passages");
same(listCuratedPassages("l11").length, 0, "unknown lesson empty");

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

ok(CURATED_UI_QUERIES.length >= 36, "ui query bank size");
same(listCuratedUiQueries("l1").length, 4, "l1 ui queries");
same(listCuratedUiQueries("l2").length, 4, "l2 ui queries");
same(listCuratedUiQueries("l3").length, 4, "l3 ui queries");
same(listCuratedUiQueries("l4").length, 4, "l4 ui queries");
same(listCuratedUiQueries("l5").length, 4, "l5 ui queries");
same(listCuratedUiQueries("l6").length, 4, "l6 ui queries");
same(listCuratedUiQueries("l7").length, 4, "l7 ui queries");
same(listCuratedUiQueries("l8").length, 4, "l8 ui queries");
same(listCuratedUiQueries("l9").length, 4, "l9 ui queries");
same(listCuratedUiQueries("l10").length, 4, "l10 ui queries");
same(listCuratedUiQueries("l11").length, 0, "unknown lesson ui empty");

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

const l4Hit = retrieveCurated({
  lessonId: "l4",
  query: listCuratedUiQueries("l4")[0]!.query,
});
same(l4Hit.status, "hit", "l4 ui query hits");
ok(l4Hit.citations[0]?.passageId.startsWith("l4-"), "l4 citation");

const l4AbstainQuery = listCuratedUiQueries("l4").find(
  (q) => q.id === "l4-q-abstain",
);
ok(l4AbstainQuery != null, "l4 abstain ui query exists");
const l4Abstain = retrieveCurated({
  lessonId: "l4",
  query: l4AbstainQuery.query,
});
same(l4Abstain.status, "abstain", "l4 abstain ui query abstains");

const l5Hit = retrieveCurated({
  lessonId: "l5",
  query: listCuratedUiQueries("l5")[0]!.query,
});
same(l5Hit.status, "hit", "l5 ui query hits");
ok(l5Hit.citations[0]?.passageId.startsWith("l5-"), "l5 citation");

const l5AbstainQuery = listCuratedUiQueries("l5").find(
  (q) => q.id === "l5-q-abstain",
);
ok(l5AbstainQuery != null, "l5 abstain ui query exists");
const l5Abstain = retrieveCurated({
  lessonId: "l5",
  query: l5AbstainQuery.query,
});
same(l5Abstain.status, "abstain", "l5 abstain ui query abstains");

const l6Hit = retrieveCurated({
  lessonId: "l6",
  query: listCuratedUiQueries("l6")[0]!.query,
});
same(l6Hit.status, "hit", "l6 ui query hits");
ok(l6Hit.citations[0]?.passageId.startsWith("l6-"), "l6 citation");

const l6AbstainQuery = listCuratedUiQueries("l6").find(
  (q) => q.id === "l6-q-abstain",
);
ok(l6AbstainQuery != null, "l6 abstain ui query exists");
const l6Abstain = retrieveCurated({
  lessonId: "l6",
  query: l6AbstainQuery.query,
});
same(l6Abstain.status, "abstain", "l6 abstain ui query abstains");

const l7Hit = retrieveCurated({
  lessonId: "l7",
  query: listCuratedUiQueries("l7")[0]!.query,
});
same(l7Hit.status, "hit", "l7 ui query hits");
ok(l7Hit.citations[0]?.passageId.startsWith("l7-"), "l7 citation");

const l7AbstainQuery = listCuratedUiQueries("l7").find(
  (q) => q.id === "l7-q-abstain",
);
ok(l7AbstainQuery != null, "l7 abstain ui query exists");
const l7Abstain = retrieveCurated({
  lessonId: "l7",
  query: l7AbstainQuery.query,
});
same(l7Abstain.status, "abstain", "l7 abstain ui query abstains");

const l8Hit = retrieveCurated({
  lessonId: "l8",
  query: listCuratedUiQueries("l8")[0]!.query,
});
same(l8Hit.status, "hit", "l8 ui query hits");
ok(l8Hit.citations[0]?.passageId.startsWith("l8-"), "l8 citation");

const l8AbstainQuery = listCuratedUiQueries("l8").find(
  (q) => q.id === "l8-q-abstain",
);
ok(l8AbstainQuery != null, "l8 abstain ui query exists");
const l8Abstain = retrieveCurated({
  lessonId: "l8",
  query: l8AbstainQuery.query,
});
same(l8Abstain.status, "abstain", "l8 abstain ui query abstains");

const l9Hit = retrieveCurated({
  lessonId: "l9",
  query: listCuratedUiQueries("l9")[0]!.query,
});
same(l9Hit.status, "hit", "l9 ui query hits");
ok(l9Hit.citations[0]?.passageId.startsWith("l9-"), "l9 citation");

const l9AbstainQuery = listCuratedUiQueries("l9").find(
  (q) => q.id === "l9-q-abstain",
);
ok(l9AbstainQuery != null, "l9 abstain ui query exists");
const l9Abstain = retrieveCurated({
  lessonId: "l9",
  query: l9AbstainQuery.query,
});
same(l9Abstain.status, "abstain", "l9 abstain ui query abstains");

const l10Hit = retrieveCurated({
  lessonId: "l10",
  query: listCuratedUiQueries("l10")[0]!.query,
});
same(l10Hit.status, "hit", "l10 ui query hits");
ok(l10Hit.citations[0]?.passageId.startsWith("l10-"), "l10 citation");

const l10AbstainQuery = listCuratedUiQueries("l10").find(
  (q) => q.id === "l10-q-abstain",
);
ok(l10AbstainQuery != null, "l10 abstain ui query exists");
const l10Abstain = retrieveCurated({
  lessonId: "l10",
  query: l10AbstainQuery.query,
});
same(l10Abstain.status, "abstain", "l10 abstain ui query abstains");

console.log("AI_CORE_CURATED_RETRIEVAL_OK=YES");
