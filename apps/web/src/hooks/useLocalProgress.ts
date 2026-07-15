"use client";

import { useMemo, useSyncExternalStore } from "react";

const progressStorageKey = "ki-lernportal-nim:local-progress:v1";
const progressChangeEvent = "ki-lernportal-nim:progress-change";

let memoryProgressSnapshot = "[]";

function parseStoredProgress(snapshot: string): string[] {
  try {
    const parsed = JSON.parse(snapshot) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function readStoredProgressSnapshot(): string {
  if (typeof window === "undefined") return "[]";

  try {
    const stored = window.localStorage.getItem(progressStorageKey);

    memoryProgressSnapshot = stored ?? "[]";
    return memoryProgressSnapshot;
  } catch {
    // Use the in-memory fallback only when browser storage is unavailable.
    return memoryProgressSnapshot;
  }
}

function readServerProgressSnapshot(): string {
  return "[]";
}

function subscribeToStoredProgress(onStoreChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === progressStorageKey || event.key === null) {
      onStoreChange();
    }
  };

  const handleLocalChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(progressChangeEvent, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(progressChangeEvent, handleLocalChange);
  };
}

function writeStoredProgress(lessonIds: string[]): void {
  memoryProgressSnapshot = JSON.stringify(lessonIds);

  try {
    window.localStorage.setItem(progressStorageKey, memoryProgressSnapshot);
  } catch {
    // Progress continues in memory when browser storage is unavailable.
  }

  window.dispatchEvent(new Event(progressChangeEvent));
}

export function useLocalProgress() {
  const progressSnapshot = useSyncExternalStore(
    subscribeToStoredProgress,
    readStoredProgressSnapshot,
    readServerProgressSnapshot,
  );

  const completedLessonIds = useMemo(
    () => parseStoredProgress(progressSnapshot),
    [progressSnapshot],
  );

  return {
    completedLessonIds,
    setCompletedLessonIds: writeStoredProgress,
  };
}
