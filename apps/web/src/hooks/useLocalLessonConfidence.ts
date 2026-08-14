"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Lokale „Noch unsicher“-Markierung pro Lektion (unabhängig vom Erledigt-Haken).
 * Additive Ergänzung zu useLocalProgress — kein neuer Backup-Versionssprung nötig.
 */
export const lessonConfidenceStorageKey =
  "ki-lernportal-nim:lesson-confidence:v1";
const lessonConfidenceChangeEvent = "ki-lernportal-nim:lesson-confidence-change";

let memoryLessonConfidenceSnapshot = "[]";

function parseStoredUnsureLessonIds(snapshot: string): string[] {
  try {
    const parsed = JSON.parse(snapshot) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function readStoredLessonConfidenceSnapshot(): string {
  if (typeof window === "undefined") return "[]";

  try {
    const stored = window.localStorage.getItem(lessonConfidenceStorageKey);
    memoryLessonConfidenceSnapshot = stored ?? "[]";
    return memoryLessonConfidenceSnapshot;
  } catch {
    return memoryLessonConfidenceSnapshot;
  }
}

function readServerLessonConfidenceSnapshot(): string {
  return "[]";
}

function subscribeToStoredLessonConfidence(
  onStoreChange: () => void,
): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === lessonConfidenceStorageKey || event.key === null) {
      onStoreChange();
    }
  };

  const handleLocalChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(lessonConfidenceChangeEvent, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(
      lessonConfidenceChangeEvent,
      handleLocalChange,
    );
  };
}

function writeStoredUnsureLessonIds(lessonIds: string[]): void {
  const unique = [...new Set(lessonIds)];
  memoryLessonConfidenceSnapshot = JSON.stringify(unique);

  try {
    window.localStorage.setItem(
      lessonConfidenceStorageKey,
      memoryLessonConfidenceSnapshot,
    );
  } catch {
    // Markierung bleibt im Speicher, wenn Browser-Storage nicht verfügbar ist.
  }

  window.dispatchEvent(new Event(lessonConfidenceChangeEvent));
}

export function useLocalLessonConfidence() {
  const snapshot = useSyncExternalStore(
    subscribeToStoredLessonConfidence,
    readStoredLessonConfidenceSnapshot,
    readServerLessonConfidenceSnapshot,
  );

  const unsureLessonIds = useMemo(
    () => parseStoredUnsureLessonIds(snapshot),
    [snapshot],
  );

  const toggleUnsure = (lessonId: string) => {
    const isUnsure = unsureLessonIds.includes(lessonId);
    writeStoredUnsureLessonIds(
      isUnsure
        ? unsureLessonIds.filter((id) => id !== lessonId)
        : [...unsureLessonIds, lessonId],
    );
  };

  return {
    unsureLessonIds,
    setUnsureLessonIds: writeStoredUnsureLessonIds,
    toggleUnsure,
  };
}
