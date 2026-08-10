"use client";

import { useMemo, useSyncExternalStore } from "react";

const storageKey = "ki-lernportal-nim:literacy-path:v1";
const changeEvent = "ki-lernportal-nim:literacy-path-change";

let memorySnapshot = "[]";

function parseIds(snapshot: string): string[] {
  try {
    const parsed = JSON.parse(snapshot) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function readSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    const stored = window.localStorage.getItem(storageKey);
    memorySnapshot = stored ?? "[]";
    return memorySnapshot;
  } catch {
    return memorySnapshot;
  }
}

function subscribe(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) onChange();
  };
  const onLocal = () => onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onLocal);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onLocal);
  };
}

function writeIds(ids: string[]) {
  memorySnapshot = JSON.stringify(ids);
  try {
    window.localStorage.setItem(storageKey, memorySnapshot);
  } catch {
    // memory fallback
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function useLiteracyPathProgress() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => "[]");
  const completedStationIds = useMemo(() => parseIds(snapshot), [snapshot]);

  const markComplete = (stationId: string) => {
    if (completedStationIds.includes(stationId)) return;
    writeIds([...completedStationIds, stationId]);
  };

  const unmark = (stationId: string) => {
    writeIds(completedStationIds.filter((id) => id !== stationId));
  };

  const reset = () => writeIds([]);

  return { completedStationIds, markComplete, unmark, reset };
}
