"use client";

import { useCallback, useSyncExternalStore } from "react";

export const SIMPLE_MODE_KEY = "ki-lernportal-nim:simple-mode:v1";
const SIMPLE_MODE_EVENT = "ki-lernportal-nim:simple-mode-change";

function readSnapshot(): boolean {
  try {
    return window.localStorage.getItem(SIMPLE_MODE_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(onStoreChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === SIMPLE_MODE_KEY || event.key === null) {
      onStoreChange();
    }
  };

  const handleCustom = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SIMPLE_MODE_EVENT, handleCustom);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SIMPLE_MODE_EVENT, handleCustom);
  };
}

export function useSimpleMode() {
  const enabled = useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);

  const setEnabled = useCallback((next: boolean) => {
    try {
      window.localStorage.setItem(SIMPLE_MODE_KEY, next ? "1" : "0");
    } catch {
      // ignore quota / private mode
    }

    window.dispatchEvent(new Event(SIMPLE_MODE_EVENT));
  }, []);

  return { enabled, setEnabled };
}
