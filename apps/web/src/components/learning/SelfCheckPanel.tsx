"use client";

import { useMemo, useState } from "react";
import { themeWorlds } from "../../data/theme-worlds";
import {
  scoreSelfCheck,
  selfCheckMeta,
  selfCheckQuestions,
} from "../../data/self-check";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";
import { useLiteracyPathProgress } from "../../hooks/useLiteracyPathProgress";

type SelfCheckPanelProps = {
  onRecommendWorld: (worldId: string) => void;
  /** Blendet Einfache Ansicht aus und scrollt zur Themenwelt (auch wenn #ziele fehlte). */
  onRevealWorld: (worldId: string) => void;
};

export function SelfCheckPanel({
  onRecommendWorld,
  onRevealWorld,
}: SelfCheckPanelProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { markComplete } = useLiteracyPathProgress();

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === selfCheckQuestions.length;

  const ranking = useMemo(
    () => (submitted ? scoreSelfCheck(answers) : []),
    [answers, submitted],
  );
  const top = ranking[0] ?? null;
  const topWorld = top ? themeWorlds.find((world) => world.id === top.worldId) : null;

  const showRecommendation = () => {
    setSubmitted(true);
    markComplete("lit-selfcheck");
  };

  return (
    <section
      id="selbstcheck"
      aria-labelledby="selbstcheck-title"
      {...explainAttrs("self-check")}
      className="scroll-mt-72 space-y-4 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 sm:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="self-check">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          Einstieg · ohne Note
        </p>
        <h2
          id="selbstcheck-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          {selfCheckMeta.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          {selfCheckMeta.intro}
        </p>
      </ExplainHotspot>

      <ol className="space-y-4">
        {selfCheckQuestions.map((question, index) => (
          <li
            key={question.id}
            className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4"
          >
            <p className="text-sm font-black text-[var(--foreground)]">
              {index + 1}. {question.prompt}
            </p>
            <div role="radiogroup" aria-label={`Frage ${index + 1}`} className="mt-3 grid gap-2">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={[
                      "nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border px-4 py-3 text-left text-sm font-semibold",
                      selected
                        ? "border-[var(--nim-primary)] bg-[var(--nim-primary)] text-white"
                        : "border-[var(--nim-border)] bg-white text-[var(--foreground)]",
                    ].join(" ")}
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [question.id]: option.id }))
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!complete}
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={showRecommendation}
        >
          Empfehlung zeigen
        </button>
        <button
          type="button"
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
        >
          Zurücksetzen
        </button>
      </div>

      {submitted && topWorld ? (
        <div className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-success)]/40 bg-[var(--nim-success-soft)] p-5">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-success)]">
            Nächster Schritt · Empfehlung
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
            Weiter im Kurzpfad — optional später „{topWorld.title}“
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">
            Deine Themenwelt-Empfehlung: {topWorld.title}. Das ist Vertiefung. Zuerst den
            gemeinsamen Kernweg (Kurzpfad) fortsetzen — dieselbe Sprache wie in der Heute-Karte.
          </p>
          <p className="mt-2 text-sm font-medium text-[var(--nim-secondary)]">
            {selfCheckMeta.resultDisclaimer}
          </p>
          <p className="mt-2 text-xs font-semibold text-[var(--nim-secondary)]">
            Station „Selbstcheck“ im Kurzpfad wurde lokal als erledigt markiert.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#literacy-pfad"
              className="nim-interactive inline-flex min-h-11 items-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
            >
              Nächster Schritt: Kurzpfad
            </a>
            <button
              type="button"
              className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-4 text-sm font-black text-[var(--nim-primary)]"
              onClick={() => {
                onRecommendWorld(topWorld.id);
                onRevealWorld(topWorld.id);
              }}
            >
              Später vertiefen: {topWorld.shortLabel}
            </button>
          </div>
          {ranking.length > 1 ? (
            <p className="mt-4 text-xs font-semibold text-[var(--nim-secondary)]">
              Weitere passende Welten (Vertiefung):{" "}
              {ranking
                .slice(1, 3)
                .map((item) => themeWorlds.find((world) => world.id === item.worldId)?.shortLabel)
                .filter(Boolean)
                .join(" · ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
