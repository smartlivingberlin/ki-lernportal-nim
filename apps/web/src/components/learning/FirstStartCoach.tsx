"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

export const FIRST_VISIT_KEY = "ki-lernportal-nim:first-start-coach:v1";
const FIRST_VISIT_EVENT = "ki-lernportal-nim:first-start-coach-change";

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(FIRST_VISIT_KEY) === "dismissed";
  } catch {
    return false;
  }
}

function subscribe(onStoreChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === FIRST_VISIT_KEY || event.key === null) onStoreChange();
  };
  const onCustom = () => onStoreChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(FIRST_VISIT_EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(FIRST_VISIT_EVENT, onCustom);
  };
}

function useCoachDismissed() {
  return useSyncExternalStore(subscribe, readDismissed, () => false);
}

/** Ob der 3-Minuten-Coach ausgeblendet ist (localStorage). */
export function useFirstStartCoachDismissed(): boolean {
  return useCoachDismissed();
}

const steps = [
  {
    id: "check",
    title: "1. Selbstcheck machen",
    body: "Beantworte kurze Alltagsfragen. Du bekommst eine Themenwelt-Empfehlung — ohne Note und ohne Konto.",
    href: "#selbstcheck",
    cta: "Zum Selbstcheck",
  },
  {
    id: "path",
    title: "2. 60-Minuten-Pfad starten",
    body: "Folge den acht Stationen: Sicherheit, Scam, Prompts, Szenarien — am Ende ein lokaler Teilnahme-Nachweis.",
    href: "#literacy-pfad",
    cta: "Zum 60-Minuten-Pfad",
  },
  {
    id: "review",
    title: "3. Kurz wiederholen",
    body: "Aktives Üben statt nur lesen. Unsichere Karten kommen früher wieder — alles bleibt im Browser.",
    href: "#wiederholen",
    cta: "Zum Wiederholen",
  },
] as const;

type FirstStartCoachProps = {
  simpleMode?: boolean;
  forceOpen?: boolean;
};

export function FirstStartCoach({
  simpleMode = false,
  forceOpen = false,
}: FirstStartCoachProps) {
  const dismissed = useCoachDismissed();
  const [manualOpen, setManualOpen] = useState<boolean | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const visible = manualOpen ?? (forceOpen || !dismissed);

  const persistDismiss = useCallback(() => {
    try {
      window.localStorage.setItem(FIRST_VISIT_KEY, "dismissed");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(FIRST_VISIT_EVENT));
    setManualOpen(false);
  }, []);

  const reopen = useCallback(() => {
    try {
      window.localStorage.removeItem(FIRST_VISIT_KEY);
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(FIRST_VISIT_EVENT));
    setStepIndex(0);
    setManualOpen(true);
  }, []);

  if (!visible) {
    return (
      <section
        id="erststart"
        aria-label="Einstiegshilfe erneut öffnen"
        className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-4 shadow-[var(--shadow-lift)]"
      >
        <p className="text-sm font-medium text-[var(--nim-secondary)]">
          Einstiegshilfe ausgeblendet.
        </p>
        <button
          type="button"
          onClick={reopen}
          className="nim-interactive mt-3 min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
        >
          3-Minuten-Coach erneut zeigen
        </button>
      </section>
    );
  }

  const step = steps[stepIndex] ?? steps[0];
  const isLast = stepIndex >= steps.length - 1;

  return (
    <section
      id="erststart"
      aria-labelledby="erststart-title"
      data-explain="erststart"
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border-2 border-[var(--nim-primary)] bg-[var(--nim-primary-soft)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-6 lg:scroll-mt-36"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
            Erststart · 3 Minuten
          </p>
          <h2
            id="erststart-title"
            className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] md:text-3xl"
          >
            So startest du sicher
          </h2>
        </div>
        <button
          type="button"
          onClick={persistDismiss}
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-3 text-xs font-black text-[var(--nim-primary)]"
        >
          Später
        </button>
      </div>

      <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
        Ein Weg reicht zum Start. Drei kurze Schritte — du kannst jederzeit abbrechen.
        Ausführliche Hover-Hilfe startet erst, wenn du den Coach ausblendest (oder über die
        kleinen „?“-Buttons, falls vorhanden).
      </p>

      {!simpleMode ? (
        <ol className="mt-4 flex flex-wrap gap-2" aria-label="Fortschritt Einstieg">
          {steps.map((entry, index) => (
            <li key={entry.id}>
              <span
                className={[
                  "inline-flex min-h-9 items-center rounded-full px-3 text-xs font-black",
                  index === stepIndex
                    ? "bg-[var(--nim-primary)] text-white"
                    : index < stepIndex
                      ? "bg-[var(--nim-success-soft)] text-[var(--nim-success)]"
                      : "bg-[var(--nim-surface)] text-[var(--nim-secondary)]",
                ].join(" ")}
              >
                {index + 1}
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="mt-5 rounded-[var(--nim-radius-lg)] bg-[var(--nim-surface)] p-4">
        <h3 className="text-lg font-black text-[var(--nim-primary-strong)]">{step.title}</h3>
        <p className="mt-2 text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          {step.body}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={step.href}
            className="nim-interactive inline-flex min-h-11 items-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
          >
            {step.cta}
          </a>
          {!isLast ? (
            <button
              type="button"
              onClick={() => setStepIndex((value) => Math.min(value + 1, steps.length - 1))}
              className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
            >
              Nächster Schritt
            </button>
          ) : (
            <button
              type="button"
              onClick={persistDismiss}
              className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
            >
              Fertig — Coach ausblenden
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
