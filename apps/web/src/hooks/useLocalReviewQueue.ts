"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { ConfidenceLevel } from "../data/types";
import { reviewCards } from "../data/review-cards";

const STORAGE_KEY = "ki-lernportal-nim:spaced-review:v1";
const CHANGE_EVENT = "ki-lernportal-nim:spaced-review-change";

export type ReviewScheduleEntry = {
  cardId: string;
  dueAt: number;
  intervalDays: number;
  repetitions: number;
};

type ReviewStore = { entries: ReviewScheduleEntry[] };

const DAY_MS = 24 * 60 * 60 * 1000;
let memorySnapshot = JSON.stringify({ entries: [] } satisfies ReviewStore);

function parseStore(raw: string): ReviewStore {
  try {
    const parsed = JSON.parse(raw) as ReviewStore;
    if (!parsed || !Array.isArray(parsed.entries)) return { entries: [] };
    return {
      entries: parsed.entries.filter(
        (entry) =>
          entry &&
          typeof entry.cardId === "string" &&
          typeof entry.dueAt === "number" &&
          typeof entry.intervalDays === "number",
      ),
    };
  } catch {
    return { entries: [] };
  }
}

function readSnapshot(): string {
  if (typeof window === "undefined") return memorySnapshot;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    memorySnapshot = stored ?? JSON.stringify({ entries: [] });
    return memorySnapshot;
  } catch {
    return memorySnapshot;
  }
}

function writeStore(store: ReviewStore): void {
  memorySnapshot = JSON.stringify(store);
  try {
    window.localStorage.setItem(STORAGE_KEY, memorySnapshot);
  } catch {
    // memory only
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange();
  };
  const onCustom = () => onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onCustom);
  };
}

function nextInterval(level: ConfidenceLevel, previousDays: number): number {
  if (level === "unclear") return 0;
  if (level === "unsure") return 1;
  return Math.max(3, Math.min(30, previousDays > 0 ? previousDays * 2 : 3));
}

export function useLocalReviewQueue() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () =>
    JSON.stringify({ entries: [] }),
  );
  const store = useMemo(() => parseStore(snapshot), [snapshot]);

  const recordConfidence = useCallback((cardId: string, level: ConfidenceLevel, nowMs: number) => {
    const current = parseStore(readSnapshot());
    const existing = current.entries.find((entry) => entry.cardId === cardId);
    const intervalDays = nextInterval(level, existing?.intervalDays ?? 0);
    const nextEntry: ReviewScheduleEntry = {
      cardId,
      dueAt: nowMs + intervalDays * DAY_MS,
      intervalDays,
      repetitions: (existing?.repetitions ?? 0) + 1,
    };
    writeStore({
      entries: [
        ...current.entries.filter((entry) => entry.cardId !== cardId),
        nextEntry,
      ],
    });
  }, []);

  const resetQueue = useCallback(() => {
    writeStore({ entries: [] });
  }, []);

  return {
    entries: store.entries,
    totalCards: reviewCards.length,
    cards: reviewCards,
    recordConfidence,
    resetQueue,
    countDue(nowMs = Date.now()) {
      return reviewCards.filter((card) => {
        const entry = store.entries.find((item) => item.cardId === card.id);
        return !entry || entry.dueAt <= nowMs;
      }).length;
    },
  };
}
