import assert from "node:assert/strict";
import {
  PROGRESS_BACKUP_FORMAT,
  PROGRESS_BACKUP_VERSION,
  applyProgressBackupToStorage,
  buildProgressBackupFromStorage,
  countBackupItems,
  parseProgressBackup,
  progressChangeEvents,
  progressStorageKeys,
  serializeProgressBackup,
} from "./local-progress-backup.ts";

function createMemoryStorage(
  initial: Record<string, string> = {},
): Storage {
  const map = new Map<string, string>(Object.entries(initial));
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.has(key) ? (map.get(key) as string) : null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, String(value));
    },
  } as Storage;
}

const storage = createMemoryStorage({
  [progressStorageKeys.lessons]: JSON.stringify(["l1", "l2"]),
  [progressStorageKeys.micro]: JSON.stringify(["mu-a"]),
  [progressStorageKeys.literacy]: JSON.stringify(["station-1"]),
  [progressStorageKeys.review]: JSON.stringify({
    entries: [
      {
        cardId: "card-1",
        dueAt: 1_700_000_000_000,
        intervalDays: 3,
        repetitions: 1,
      },
    ],
  }),
  [progressStorageKeys.selfCheck]: JSON.stringify({
    answers: { "scq-1": "a" },
    submitted: true,
    recommendedWorldId: "world-no-fear",
  }),
  [progressStorageKeys.lessonConfidence]: JSON.stringify(["l3"]),
});

const backup = buildProgressBackupFromStorage(
  storage,
  new Date("2026-08-13T12:00:00.000Z"),
);

assert.equal(backup.format, PROGRESS_BACKUP_FORMAT);
assert.equal(backup.version, PROGRESS_BACKUP_VERSION);
assert.deepEqual(backup.lessons, ["l1", "l2"]);
assert.deepEqual(backup.microUnits, ["mu-a"]);
assert.deepEqual(backup.literacyStations, ["station-1"]);
assert.equal(backup.review.entries.length, 1);
assert.deepEqual(backup.selfCheck, {
  answers: { "scq-1": "a" },
  submitted: true,
  recommendedWorldId: "world-no-fear",
});
assert.deepEqual(backup.unsureLessonIds, ["l3"]);
assert.equal(countBackupItems(backup), 7);

const serialized = serializeProgressBackup(backup);
const parsed = parseProgressBackup(serialized);
assert.equal(parsed.ok, true);
if (!parsed.ok) throw new Error("parse failed");
assert.deepEqual(parsed.value.lessons, backup.lessons);
assert.deepEqual(parsed.value.selfCheck, backup.selfCheck);
assert.deepEqual(parsed.value.unsureLessonIds, backup.unsureLessonIds);

const rejected = parseProgressBackup('{"format":"other","version":1}');
assert.equal(rejected.ok, false);

// Backward compatibility: older backup files without selfCheck/unsureLessonIds
// (S-Product-C3/C4 additive fields) must still import successfully.
const legacyBackup = {
  format: PROGRESS_BACKUP_FORMAT,
  version: PROGRESS_BACKUP_VERSION,
  exportedAt: "2026-07-01T00:00:00.000Z",
  lessons: ["l1"],
  microUnits: [],
  literacyStations: [],
  review: { entries: [] },
};
const legacyParsed = parseProgressBackup(JSON.stringify(legacyBackup));
assert.equal(legacyParsed.ok, true);
if (!legacyParsed.ok) throw new Error("legacy parse failed");
assert.deepEqual(legacyParsed.value.selfCheck, {
  answers: {},
  submitted: false,
  recommendedWorldId: null,
});
assert.deepEqual(legacyParsed.value.unsureLessonIds, []);

const legacyRejected = parseProgressBackup(
  JSON.stringify({ ...legacyBackup, unsureLessonIds: ["not valid id!"] }),
);
assert.equal(legacyRejected.ok, false);

const events: string[] = [];
const target = createMemoryStorage();
applyProgressBackupToStorage(parsed.value, target, (name) => {
  events.push(name);
});

assert.equal(
  target.getItem(progressStorageKeys.lessons),
  JSON.stringify(["l1", "l2"]),
);
assert.equal(
  target.getItem(progressStorageKeys.selfCheck),
  JSON.stringify(backup.selfCheck),
);
assert.equal(
  target.getItem(progressStorageKeys.lessonConfidence),
  JSON.stringify(["l3"]),
);
assert.deepEqual(events, [
  progressChangeEvents.lessons,
  progressChangeEvents.micro,
  progressChangeEvents.literacy,
  progressChangeEvents.review,
  progressChangeEvents.selfCheck,
  progressChangeEvents.lessonConfidence,
]);

console.log("LOCAL_PROGRESS_BACKUP_SELF_TEST=PASS");
