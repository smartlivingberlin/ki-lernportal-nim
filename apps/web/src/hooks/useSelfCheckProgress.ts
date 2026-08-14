"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Lokale Persistenz für den Einstiegs-Selbstcheck (Antworten + Ergebnis).
 * Kein Server, kein Konto — nur dieser Browser. Additive Ergänzung zum
 * lokalen Fortschritts-Backup (S-Product-C3).
 */
export const selfCheckStorageKey = "ki-lernportal-nim:self-check:v1";
const selfCheckChangeEvent = "ki-lernportal-nim:self-check-change";

export type SelfCheckStore = {
  answers: Record<string, string>;
  submitted: boolean;
  recommendedWorldId: string | null;
};

const EMPTY_SELF_CHECK_STORE: SelfCheckStore = {
  answers: {},
  submitted: false,
  recommendedWorldId: null,
};

let memorySelfCheckSnapshot = JSON.stringify(EMPTY_SELF_CHECK_STORE);

function isValidAnswers(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value as Record<string, unknown>).every(
    (entry) => typeof entry === "string",
  );
}

function parseSelfCheckStore(snapshot: string): SelfCheckStore {
  try {
    const parsed = JSON.parse(snapshot) as Partial<SelfCheckStore> | null;
    if (!parsed || typeof parsed !== "object") return EMPTY_SELF_CHECK_STORE;
    return {
      answers: isValidAnswers(parsed.answers) ? parsed.answers : {},
      submitted: parsed.submitted === true,
      recommendedWorldId:
        typeof parsed.recommendedWorldId === "string"
          ? parsed.recommendedWorldId
          : null,
    };
  } catch {
    return EMPTY_SELF_CHECK_STORE;
  }
}

function readStoredSelfCheckSnapshot(): string {
  if (typeof window === "undefined") return memorySelfCheckSnapshot;

  try {
    const stored = window.localStorage.getItem(selfCheckStorageKey);
    memorySelfCheckSnapshot = stored ?? JSON.stringify(EMPTY_SELF_CHECK_STORE);
    return memorySelfCheckSnapshot;
  } catch {
    return memorySelfCheckSnapshot;
  }
}

function readServerSelfCheckSnapshot(): string {
  return JSON.stringify(EMPTY_SELF_CHECK_STORE);
}

function subscribeToStoredSelfCheck(onStoreChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === selfCheckStorageKey || event.key === null) {
      onStoreChange();
    }
  };

  const handleLocalChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(selfCheckChangeEvent, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(selfCheckChangeEvent, handleLocalChange);
  };
}

function writeSelfCheckStore(store: SelfCheckStore): void {
  memorySelfCheckSnapshot = JSON.stringify(store);

  try {
    window.localStorage.setItem(selfCheckStorageKey, memorySelfCheckSnapshot);
  } catch {
    // Antworten bleiben im Speicher, wenn Browser-Storage nicht verfügbar ist.
  }

  window.dispatchEvent(new Event(selfCheckChangeEvent));
}

export function useSelfCheckProgress() {
  const snapshot = useSyncExternalStore(
    subscribeToStoredSelfCheck,
    readStoredSelfCheckSnapshot,
    readServerSelfCheckSnapshot,
  );

  const store = useMemo(() => parseSelfCheckStore(snapshot), [snapshot]);

  const setAnswer = useCallback((questionId: string, optionId: string) => {
    const current = parseSelfCheckStore(readStoredSelfCheckSnapshot());
    writeSelfCheckStore({
      ...current,
      answers: { ...current.answers, [questionId]: optionId },
    });
  }, []);

  const submit = useCallback((recommendedWorldId: string | null) => {
    const current = parseSelfCheckStore(readStoredSelfCheckSnapshot());
    writeSelfCheckStore({ ...current, submitted: true, recommendedWorldId });
  }, []);

  const reset = useCallback(() => {
    writeSelfCheckStore(EMPTY_SELF_CHECK_STORE);
  }, []);

  return {
    answers: store.answers,
    submitted: store.submitted,
    recommendedWorldId: store.recommendedWorldId,
    setAnswer,
    submit,
    reset,
  };
}
