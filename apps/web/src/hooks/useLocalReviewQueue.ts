"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { ConfidenceLevel } from "../data/types";
import { reviewCards } from "../data/review-cards";

const STORAGE_KEY = "ki-lernportal-nim:spaced-review:v1";
const CHANGE_EVENT = "ki-lernportal-nim:spaced-review-change";
/** First visit: only this many cards are due until the learner answers once. */
export const REVIEW_SOFT_START_LIMIT = 3;

const SOFT_START_CARD_IDS = new Set(
  reviewCards.slice(0, REVIEW_SOFT_START_LIMIT).map((card) => card.id),
);

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

function softStartStillActive(entries: ReviewScheduleEntry[]): boolean {
  if (entries.length === 0) return true;
  // Soft-start parking marker: first answer seeds non-pool cards with repetitions 0.
  // Legacy queues without that marker stay on the full due set.
  const hasSoftStartParking = entries.some(
    (entry) =>
      !SOFT_START_CARD_IDS.has(entry.cardId) && (entry.repetitions ?? 0) === 0,
  );
  if (!hasSoftStartParking) return false;
  return ![...SOFT_START_CARD_IDS].every((id) =>
    entries.some((entry) => entry.cardId === id && (entry.repetitions ?? 0) > 0),
  );
}

function isCardDue(
  cardId: string,
  entries: ReviewScheduleEntry[],
  nowMs: number,
): boolean {
  const entry = entries.find((item) => item.cardId === cardId);
  return !entry || entry.dueAt <= nowMs;
}

export function useLocalReviewQueue() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () =>
    JSON.stringify({ entries: [] }),
  );
  const store = useMemo(() => parseStore(snapshot), [snapshot]);
  const softStartActive = softStartStillActive(store.entries);

  const recordConfidence = useCallback((cardId: string, level: ConfidenceLevel, nowMs: number) => {
    const current = parseStore(readSnapshot());
    const wasEmpty = current.entries.length === 0;
    const existing = current.entries.find((entry) => entry.cardId === cardId);
    const intervalDays = nextInterval(level, existing?.intervalDays ?? 0);
    const nextEntry: ReviewScheduleEntry = {
      cardId,
      dueAt: nowMs + intervalDays * DAY_MS,
      intervalDays,
      repetitions: (existing?.repetitions ?? 0) + 1,
    };
    let entries = [
      ...current.entries.filter((entry) => entry.cardId !== cardId),
      nextEntry,
    ];
    // Soft-start: after the first answer, park cards outside the soft-start pool
    // for tomorrow so the queue does not jump from 3 to all 15 in one session.
    // Soft-start siblings that were not answered yet stay virgin (still due).
    if (wasEmpty) {
      const known = new Set(entries.map((entry) => entry.cardId));
      for (const card of reviewCards) {
        if (known.has(card.id)) continue;
        if (SOFT_START_CARD_IDS.has(card.id)) continue;
        entries.push({
          cardId: card.id,
          dueAt: nowMs + DAY_MS,
          intervalDays: 1,
          repetitions: 0,
        });
        known.add(card.id);
      }
    }
    writeStore({ entries });
  }, []);

  const resetQueue = useCallback(() => {
    writeStore({ entries: [] });
  }, []);

  const listDueCards = useCallback(
    (nowMs = Date.now()) => {
      const due = reviewCards.filter((card) => {
        if (softStartActive && !SOFT_START_CARD_IDS.has(card.id)) {
          return false;
        }
        return isCardDue(card.id, store.entries, nowMs);
      });
      return due;
    },
    [softStartActive, store.entries],
  );

  return {
    entries: store.entries,
    totalCards: reviewCards.length,
    cards: reviewCards,
    recordConfidence,
    resetQueue,
    listDueCards,
    softStartActive,
    softStartLimit: REVIEW_SOFT_START_LIMIT,
    countDue(nowMs = Date.now()) {
      return listDueCards(nowMs).length;
    },
  };
}
