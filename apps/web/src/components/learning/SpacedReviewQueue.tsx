"use client";

import { useMemo, useState } from "react";
import { publicSources } from "../../data/sources";
import { useLocalReviewQueue } from "../../hooks/useLocalReviewQueue";
import type { ConfidenceLevel } from "../../data/types";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";

/**
 * Lokale Spaced-Review-Queue auf kuratierter Karten-"Datenbank" mit Quellenangaben.
 * Keine Server-DB, kein Tracking.
 */
export function SpacedReviewQueue({ simpleMode = false }: { simpleMode?: boolean }) {
  const { entries, totalCards, cards, recordConfidence, resetQueue } =
    useLocalReviewQueue();
  const [revealed, setRevealed] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const dueCards = useMemo(
    () =>
      cards.filter((card) => {
        const entry = entries.find((item) => item.cardId === card.id);
        return !entry || entry.dueAt <= nowMs;
      }),
    [cards, entries, nowMs],
  );

  const card = dueCards[0] ?? null;
  const sources = card
    ? card.sourceIds
        .map((id) => publicSources.find((source) => source.id === id))
        .filter(Boolean)
    : [];

  const answer = (level: ConfidenceLevel) => {
    if (!card) return;
    const stamped = nowMs + 1;
    recordConfidence(card.id, level, stamped);
    setNowMs(stamped);
    setRevealed(false);
  };

  return (
    <section
      id="wiederholen"
      aria-labelledby="wiederholen-title"
      {...explainAttrs("wiederholen")}
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="wiederholen" className="mb-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
            Wiederholen · lokal
          </p>
          <p className="text-sm font-black text-[var(--nim-secondary)]">
            Fällig: {dueCards.length} / {totalCards}
          </p>
        </div>
        <h2
          id="wiederholen-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          Kurze Abruf-Übungen mit Abstand
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          Statt nur zu lesen: aktiv abrufen. Unsichere Karten kommen früher wieder —
          alles bleibt in deinem Browser. Die Karten sind kuratiert und mit Quellenangaben versehen
          (keine Server-Datenbank).
        </p>
      </ExplainHotspot>

      {!card ? (
        <p className="mt-5 rounded-[var(--nim-radius-md)] bg-[var(--nim-success-soft)] p-4 text-sm font-bold text-[var(--nim-success)]">
          Gerade ist nichts fällig. Komm später wieder — oder setze die Queue zurück, um erneut zu üben.
        </p>
      ) : (
        <div className="mt-5 rounded-[var(--nim-radius-lg)] bg-[var(--nim-surface-soft)] p-4">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
            Abruffrage
          </p>
          <p className="mt-2 text-lg font-black text-[var(--foreground)]">{card.prompt}</p>

          {!revealed ? (
            <button
              type="button"
              className="nim-interactive mt-4 min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
              onClick={() => setRevealed(true)}
            >
              Antwort anzeigen
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium leading-7 text-[var(--nim-secondary)]">
                {card.answer}
              </p>
              {!simpleMode ? (
                <p className="text-xs font-medium leading-6 text-[var(--nim-secondary)]">
                  {card.sourceNote}
                </p>
              ) : null}
              {sources.length > 0 ? (
                <ul className="space-y-1">
                  {sources.map((source) =>
                    source ? (
                      <li key={source.id}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-[var(--nim-primary)] underline-offset-2 hover:underline"
                        >
                          {source.name}
                          <span className="sr-only"> – öffnet in einem neuen Tab</span>
                        </a>
                      </li>
                    ) : null,
                  )}
                </ul>
              ) : null}
              <fieldset>
                <legend className="text-sm font-black text-[var(--foreground)]">
                  Wie sicher war das?
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    [
                      ["sure", "Sicher"],
                      ["unsure", "Etwas unsicher"],
                      ["unclear", "Noch unklar"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => answer(value)}
                      className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-surface)] px-4 text-sm font-black text-[var(--nim-primary)] ring-2 ring-[var(--nim-border)]"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            resetQueue();
            setNowMs((value) => value + 1);
            setRevealed(false);
          }}
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-xs font-black text-[var(--nim-primary)]"
        >
          Queue zurücksetzen
        </button>
      </div>
    </section>
  );
}
