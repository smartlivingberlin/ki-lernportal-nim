"use client";

import { useMemo, useState } from "react";
import { publicSources } from "../../data/sources";
import { useLocalReviewQueue } from "../../hooks/useLocalReviewQueue";
import type { ConfidenceLevel, Source } from "../../data/types";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";
import { ResetProgressConfirm } from "./ResetProgressConfirm";
import { SourceLinkList } from "./SourceLinkList";

/**
 * Lokale Spaced-Review-Queue auf kuratierter Karten-"Datenbank" mit Quellenangaben.
 * Keine Server-DB, kein Tracking.
 */
export function SpacedReviewQueue({ simpleMode = false }: { simpleMode?: boolean }) {
  const { entries, totalCards, cards, recordConfidence, resetQueue } =
    useLocalReviewQueue();
  const [revealed, setRevealed] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
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
    ? (card.sourceIds
        .map((id) => publicSources.find((source) => source.id === id))
        .filter((source): source is Source => Boolean(source)) as Source[])
    : [];

  const answer = (level: ConfidenceLevel) => {
    if (!card) return;
    const stamped = nowMs + 1;
    recordConfidence(card.id, level, stamped);
    setNowMs(stamped);
    setRevealed(false);
  };

  const confirmReset = () => {
    resetQueue();
    setNowMs((value) => value + 1);
    setRevealed(false);
    setResetOpen(false);
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
            Wiederholen · lokal · Schritt 3
          </p>
          <p className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-accent-soft)] px-3 py-1 text-sm font-black text-[var(--nim-accent)]">
            Heute fällig: {dueCards.length} / {totalCards}
          </p>
        </div>
        <h2
          id="wiederholen-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          Kurz wiederholen — mit Abstand
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          Nach Selbstcheck und 60-Minuten-Pfad: aktiv üben statt nur lesen. Unsichere Karten
          kommen früher wieder — alles bleibt in deinem Browser (kuratiert, mit Quellenangaben,
          ohne Server-Datenbank).
        </p>
        <p className="mt-2 text-xs font-semibold text-[var(--nim-secondary)]">
          Tipp: Im 60-Minuten-Pfad ist „Wiederholen“ Station 7 — danach kannst du den lokalen
          Nachweis freischalten.
        </p>
      </ExplainHotspot>

      {!card ? (
        <p
          data-testid="spaced-review-empty"
          className="mt-5 rounded-[var(--nim-radius-md)] bg-[var(--nim-success-soft)] p-4 text-sm font-bold text-[var(--nim-success)]"
        >
          Gerade ist nichts fällig. Unsichere Karten kommen früher wieder —
          sichere erst später. Schau später noch einmal vorbei.
        </p>
      ) : (
        <div className="mt-5 rounded-[var(--nim-radius-lg)] bg-[var(--nim-surface-soft)] p-4">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
            Übungsfrage
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
              <SourceLinkList
                sources={sources}
                heading="Quellen zu dieser Karte"
                testId="review-card-sources"
                compact
              />
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
                <p className="mt-2 text-xs font-semibold leading-5 text-[var(--nim-secondary)]">
                  Wird in diesem Browser gespeichert und steuert, wann die Karte wieder kommt.
                  Das ist getrennt vom Lektions-Haken „Noch unsicher“.
                </p>
              </fieldset>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {card || resetOpen ? (
          <button
            type="button"
            data-testid="spaced-review-reset"
            aria-expanded={resetOpen}
            aria-controls="spaced-review-reset-confirm"
            onClick={() => setResetOpen(true)}
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-xs font-black text-[var(--nim-primary)]"
          >
            Übungen zurücksetzen
          </button>
        ) : (
          <button
            type="button"
            data-testid="spaced-review-reset"
            aria-expanded={resetOpen}
            aria-controls="spaced-review-reset-confirm"
            onClick={() => setResetOpen(true)}
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] px-2 text-xs font-bold text-[var(--nim-secondary)] underline decoration-[var(--nim-secondary)]/40 underline-offset-4 hover:text-[var(--nim-primary)] hover:decoration-[var(--nim-primary)]"
          >
            Alle Karten neu starten
          </button>
        )}
      </div>
      <div id="spaced-review-reset-confirm">
        <ResetProgressConfirm
          open={resetOpen}
          onCancel={() => setResetOpen(false)}
          onConfirm={confirmReset}
          titleId="spaced-review-reset-title"
          title="Wiederholungs-Übungen wirklich zurücksetzen?"
          items={[
            "Wiederholungs-Übungen (Karten und Einschätzungen)",
          ]}
          backupLinkTestId="spaced-review-reset-backup-link"
        />
      </div>
    </section>
  );
}
