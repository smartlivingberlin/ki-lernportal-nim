import assert from "node:assert/strict";
import {
  buildLessonShareUrl,
  readLessonIdFromLocation,
} from "./lesson-share-url.ts";

assert.equal(
  readLessonIdFromLocation({ search: "?lesson=l8", hash: "" }),
  "l8",
);
assert.equal(
  readLessonIdFromLocation({ search: "", hash: "#lesson-l8" }),
  "l8",
);
assert.equal(
  readLessonIdFromLocation({ search: "?other=1", hash: "" }),
  null,
);
assert.equal(readLessonIdFromLocation({ search: "", hash: "#pfad" }), null);
// Query wins over hash when both are present.
assert.equal(
  readLessonIdFromLocation({ search: "?lesson=l3", hash: "#lesson-l9" }),
  "l3",
);

assert.equal(
  buildLessonShareUrl({ pathname: "/", search: "" }, "l8"),
  "/?lesson=l8",
);
assert.equal(
  buildLessonShareUrl({ pathname: "/", search: "?utm=demo" }, "l8"),
  "/?utm=demo&lesson=l8",
);
assert.equal(
  buildLessonShareUrl({ pathname: "/", search: "?lesson=l1" }, "l8"),
  "/?lesson=l8",
);

console.log("LESSON_SHARE_URL_SELF_TEST=PASS");
