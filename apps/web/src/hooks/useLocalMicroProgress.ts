"use client";

import { useMemo, useSyncExternalStore } from "react";

export const microProgressStorageKey =
  "ki-lernportal-nim:micro-progress:v1";
const microProgressChangeEvent =
  "ki-lernportal-nim:micro-progress-change";

let memoryMicroProgressSnapshot = "[]";

function parseStoredMicroProgress(snapshot: string): string[] {
  try {
    const parsed = JSON.parse(snapshot) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function readStoredMicroProgressSnapshot(): string {
  if (typeof window === "undefined") return "[]";

  try {
    const stored = window.localStorage.getItem(microProgressStorageKey);
    memoryMicroProgressSnapshot = stored ?? "[]";
    return memoryMicroProgressSnapshot;
  } catch {
    return memoryMicroProgressSnapshot;
  }
}

function readServerMicroProgressSnapshot(): string {
  return "[]";
}

function subscribeToStoredMicroProgress(
  onStoreChange: () => void,
): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === microProgressStorageKey || event.key === null) {
      onStoreChange();
    }
  };

  const handleLocalChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(microProgressChangeEvent, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(
      microProgressChangeEvent,
      handleLocalChange,
    );
  };
}

function writeStoredMicroProgress(unitIds: string[]): void {
  const unique = [...new Set(unitIds)];
  memoryMicroProgressSnapshot = JSON.stringify(unique);

  try {
    window.localStorage.setItem(
      microProgressStorageKey,
      memoryMicroProgressSnapshot,
    );
  } catch {
    // Progress continues in memory when browser storage is unavailable.
  }

  window.dispatchEvent(new Event(microProgressChangeEvent));
}

export function useLocalMicroProgress() {
  const progressSnapshot = useSyncExternalStore(
    subscribeToStoredMicroProgress,
    readStoredMicroProgressSnapshot,
    readServerMicroProgressSnapshot,
  );

  const completedMicroUnitIds = useMemo(
    () => parseStoredMicroProgress(progressSnapshot),
    [progressSnapshot],
  );

  return {
    completedMicroUnitIds,
    setCompletedMicroUnitIds: writeStoredMicroProgress,
  };
}
