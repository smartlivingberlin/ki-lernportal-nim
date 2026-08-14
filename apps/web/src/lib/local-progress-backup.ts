/**
 * Browser-local progress backup (no server, no account).
 * Round-trips lesson, micro, literacy and spaced-review snapshots.
 */

export const PROGRESS_BACKUP_FORMAT =
  "ki-lernportal-nim-progress-backup" as const;
export const PROGRESS_BACKUP_VERSION = 1 as const;

export const progressStorageKeys = {
  lessons: "ki-lernportal-nim:local-progress:v1",
  micro: "ki-lernportal-nim:micro-progress:v1",
  literacy: "ki-lernportal-nim:literacy-path:v1",
  review: "ki-lernportal-nim:spaced-review:v1",
  selfCheck: "ki-lernportal-nim:self-check:v1",
  lessonConfidence: "ki-lernportal-nim:lesson-confidence:v1",
} as const;

export const progressChangeEvents = {
  lessons: "ki-lernportal-nim:progress-change",
  micro: "ki-lernportal-nim:micro-progress-change",
  literacy: "ki-lernportal-nim:literacy-path-change",
  review: "ki-lernportal-nim:spaced-review-change",
  selfCheck: "ki-lernportal-nim:self-check-change",
  lessonConfidence: "ki-lernportal-nim:lesson-confidence-change",
} as const;

export type ProgressBackupReviewEntry = {
  cardId: string;
  dueAt: number;
  intervalDays: number;
  repetitions: number;
};

export type ProgressBackupSelfCheck = {
  answers: Record<string, string>;
  submitted: boolean;
  recommendedWorldId: string | null;
};

const EMPTY_SELF_CHECK: ProgressBackupSelfCheck = {
  answers: {},
  submitted: false,
  recommendedWorldId: null,
};

export type ProgressBackupV1 = {
  format: typeof PROGRESS_BACKUP_FORMAT;
  version: typeof PROGRESS_BACKUP_VERSION;
  exportedAt: string;
  lessons: string[];
  microUnits: string[];
  literacyStations: string[];
  review: { entries: ProgressBackupReviewEntry[] };
  /** Additive (S-Product-C3): selbst gespeicherte Selbstcheck-Antworten. */
  selfCheck: ProgressBackupSelfCheck;
  /** Additive (S-Product-C4): Lektionen, die als „Noch unsicher“ markiert wurden. */
  unsureLessonIds: string[];
};

export type ProgressBackupParseResult =
  | { ok: true; value: ProgressBackupV1 }
  | { ok: false; error: string };

const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const MAX_IDS = 512;
const MAX_REVIEW_ENTRIES = 256;

function isStringIdList(value: unknown): value is string[] {
  if (!Array.isArray(value) || value.length > MAX_IDS) return false;
  const seen = new Set<string>();
  for (const entry of value) {
    if (typeof entry !== "string" || !ID_PATTERN.test(entry)) return false;
    if (seen.has(entry)) return false;
    seen.add(entry);
  }
  return true;
}

function isReviewEntry(value: unknown): value is ProgressBackupReviewEntry {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.cardId === "string" &&
    ID_PATTERN.test(record.cardId) &&
    typeof record.dueAt === "number" &&
    Number.isFinite(record.dueAt) &&
    typeof record.intervalDays === "number" &&
    Number.isFinite(record.intervalDays) &&
    typeof record.repetitions === "number" &&
    Number.isSafeInteger(record.repetitions) &&
    record.repetitions >= 0
  );
}

function parseIdListFromStorage(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id): id is string => typeof id === "string" && ID_PATTERN.test(id),
    );
  } catch {
    return [];
  }
}

function parseReviewFromStorage(raw: string | null): {
  entries: ProgressBackupReviewEntry[];
} {
  if (!raw) return { entries: [] };
  try {
    const parsed = JSON.parse(raw) as { entries?: unknown };
    if (!parsed || !Array.isArray(parsed.entries)) return { entries: [] };
    return {
      entries: parsed.entries.filter(isReviewEntry).slice(0, MAX_REVIEW_ENTRIES),
    };
  } catch {
    return { entries: [] };
  }
}

const MAX_SELF_CHECK_ANSWERS = 64;

function isSelfCheckAnswers(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > MAX_SELF_CHECK_ANSWERS) return false;
  return entries.every(
    ([key, entryValue]) =>
      ID_PATTERN.test(key) &&
      typeof entryValue === "string" &&
      ID_PATTERN.test(entryValue),
  );
}

function isSelfCheckValue(value: unknown): value is ProgressBackupSelfCheck {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return (
    isSelfCheckAnswers(record.answers) &&
    typeof record.submitted === "boolean" &&
    (record.recommendedWorldId === null ||
      (typeof record.recommendedWorldId === "string" &&
        ID_PATTERN.test(record.recommendedWorldId)))
  );
}

/** Tolerant read from localStorage — matches the soft-fail pattern of the other local stores. */
function parseSelfCheckFromStorage(raw: string | null): ProgressBackupSelfCheck {
  if (!raw) return EMPTY_SELF_CHECK;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return isSelfCheckValue(parsed) ? parsed : EMPTY_SELF_CHECK;
  } catch {
    return EMPTY_SELF_CHECK;
  }
}

/** Build a backup object from current localStorage snapshots. */
export function buildProgressBackupFromStorage(
  storage: Pick<Storage, "getItem">,
  now = new Date(),
): ProgressBackupV1 {
  return {
    format: PROGRESS_BACKUP_FORMAT,
    version: PROGRESS_BACKUP_VERSION,
    exportedAt: now.toISOString(),
    lessons: parseIdListFromStorage(
      storage.getItem(progressStorageKeys.lessons),
    ),
    microUnits: parseIdListFromStorage(
      storage.getItem(progressStorageKeys.micro),
    ),
    literacyStations: parseIdListFromStorage(
      storage.getItem(progressStorageKeys.literacy),
    ),
    review: parseReviewFromStorage(
      storage.getItem(progressStorageKeys.review),
    ),
    selfCheck: parseSelfCheckFromStorage(
      storage.getItem(progressStorageKeys.selfCheck),
    ),
    unsureLessonIds: parseIdListFromStorage(
      storage.getItem(progressStorageKeys.lessonConfidence),
    ),
  };
}

export function serializeProgressBackup(backup: ProgressBackupV1): string {
  return `${JSON.stringify(backup, null, 2)}\n`;
}

export function parseProgressBackup(raw: string): ProgressBackupParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return { ok: false, error: "Die Datei ist keine gültige Fortschritts-Datei." };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, error: "Unerwartetes Dateiformat." };
  }

  const record = parsed as Record<string, unknown>;
  if (record.format !== PROGRESS_BACKUP_FORMAT) {
    return {
      ok: false,
      error: "Das ist keine Fortschritts-Datei von diesem Portal.",
    };
  }
  if (record.version !== PROGRESS_BACKUP_VERSION) {
    return {
      ok: false,
      error: "Diese Backup-Version wird hier nicht unterstützt.",
    };
  }
  if (typeof record.exportedAt !== "string" || !record.exportedAt) {
    return { ok: false, error: "Zeitstempel fehlt oder ist ungültig." };
  }
  if (!isStringIdList(record.lessons)) {
    return { ok: false, error: "Lektionsliste ist ungültig." };
  }
  if (!isStringIdList(record.microUnits)) {
    return { ok: false, error: "Vertiefungsliste ist ungültig." };
  }
  if (!isStringIdList(record.literacyStations)) {
    return { ok: false, error: "Kurzpfad-Liste ist ungültig." };
  }
  if (
    !record.review ||
    typeof record.review !== "object" ||
    Array.isArray(record.review)
  ) {
    return { ok: false, error: "Wiederholungsdaten fehlen." };
  }
  const reviewRecord = record.review as { entries?: unknown };
  if (
    !Array.isArray(reviewRecord.entries) ||
    reviewRecord.entries.length > MAX_REVIEW_ENTRIES ||
    !reviewRecord.entries.every(isReviewEntry)
  ) {
    return { ok: false, error: "Wiederholungsdaten sind ungültig." };
  }

  // Additive fields (S-Product-C3/C4): older backup files without them stay importable.
  let selfCheck: ProgressBackupSelfCheck = EMPTY_SELF_CHECK;
  if (record.selfCheck !== undefined) {
    if (!isSelfCheckValue(record.selfCheck)) {
      return { ok: false, error: "Selbstcheck-Daten sind ungültig." };
    }
    selfCheck = record.selfCheck;
  }

  let unsureLessonIds: string[] = [];
  if (record.unsureLessonIds !== undefined) {
    if (!isStringIdList(record.unsureLessonIds)) {
      return { ok: false, error: "Liste der unsicheren Lektionen ist ungültig." };
    }
    unsureLessonIds = record.unsureLessonIds;
  }

  return {
    ok: true,
    value: {
      format: PROGRESS_BACKUP_FORMAT,
      version: PROGRESS_BACKUP_VERSION,
      exportedAt: record.exportedAt,
      lessons: record.lessons,
      microUnits: record.microUnits,
      literacyStations: record.literacyStations,
      review: {
        entries: reviewRecord.entries as ProgressBackupReviewEntry[],
      },
      selfCheck,
      unsureLessonIds,
    },
  };
}

/** Write backup into storage and notify local progress hooks. */
export function applyProgressBackupToStorage(
  backup: ProgressBackupV1,
  storage: Pick<Storage, "setItem">,
  dispatch: (eventName: string) => void = (eventName) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(eventName));
    }
  },
): void {
  storage.setItem(
    progressStorageKeys.lessons,
    JSON.stringify(backup.lessons),
  );
  storage.setItem(
    progressStorageKeys.micro,
    JSON.stringify(backup.microUnits),
  );
  storage.setItem(
    progressStorageKeys.literacy,
    JSON.stringify(backup.literacyStations),
  );
  storage.setItem(
    progressStorageKeys.review,
    JSON.stringify({ entries: backup.review.entries }),
  );
  storage.setItem(
    progressStorageKeys.selfCheck,
    JSON.stringify(backup.selfCheck),
  );
  storage.setItem(
    progressStorageKeys.lessonConfidence,
    JSON.stringify(backup.unsureLessonIds),
  );

  dispatch(progressChangeEvents.lessons);
  dispatch(progressChangeEvents.micro);
  dispatch(progressChangeEvents.literacy);
  dispatch(progressChangeEvents.review);
  dispatch(progressChangeEvents.selfCheck);
  dispatch(progressChangeEvents.lessonConfidence);
}

export function countBackupItems(backup: ProgressBackupV1): number {
  return (
    backup.lessons.length +
    backup.microUnits.length +
    backup.literacyStations.length +
    backup.review.entries.length +
    backup.unsureLessonIds.length +
    (backup.selfCheck.submitted ? 1 : 0)
  );
}
