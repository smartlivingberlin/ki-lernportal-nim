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
assert.equal(countBackupItems(backup), 5);

const serialized = serializeProgressBackup(backup);
const parsed = parseProgressBackup(serialized);
assert.equal(parsed.ok, true);
if (!parsed.ok) throw new Error("parse failed");
assert.deepEqual(parsed.value.lessons, backup.lessons);

const rejected = parseProgressBackup('{"format":"other","version":1}');
assert.equal(rejected.ok, false);

const events: string[] = [];
const target = createMemoryStorage();
applyProgressBackupToStorage(parsed.value, target, (name) => {
  events.push(name);
});

assert.equal(
  target.getItem(progressStorageKeys.lessons),
  JSON.stringify(["l1", "l2"]),
);
assert.deepEqual(events, [
  progressChangeEvents.lessons,
  progressChangeEvents.micro,
  progressChangeEvents.literacy,
  progressChangeEvents.review,
]);

console.log("LOCAL_PROGRESS_BACKUP_SELF_TEST=PASS");
