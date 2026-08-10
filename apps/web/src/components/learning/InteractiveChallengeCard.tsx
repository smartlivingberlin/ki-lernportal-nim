"use client";

import { useId, useState } from "react";
import type { ConfidenceLevel, InteractiveChallenge } from "../../data/types";

type InteractiveChallengeCardProps = {
  challenge: InteractiveChallenge;
  onConfidence?: (level: ConfidenceLevel) => void;
};

export function InteractiveChallengeCard({
  challenge,
  onConfidence,
}: InteractiveChallengeCardProps) {
  const baseId = useId();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [teachBack, setTeachBack] = useState("");
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);

  const selected = challenge.options.find((option) => option.id === selectedOptionId) ?? null;

  const choose = (optionId: string) => {
    setSelectedOptionId(optionId);
    setRevealed(true);
  };

  const setLevel = (level: ConfidenceLevel) => {
    setConfidence(level);
    onConfidence?.(level);
  };

  return (
    <article
      data-testid="interactive-challenge"
      data-challenge-id={challenge.id}
      aria-label={`Challenge: ${challenge.title}`}
      className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-accent-soft)] p-5 md:p-6"
    >
      <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
        Wissensblitz · spielerisch üben
      </p>
      <h3
        id={`${baseId}-title`}
        className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]"
      >
        {challenge.title}
      </h3>
      <p className="mt-3 text-sm font-medium leading-7 text-[var(--nim-secondary)]">
        {challenge.plainIntro}
      </p>
      <p className="mt-4 text-base font-black text-[var(--foreground)]">{challenge.prompt}</p>

      <div
        role="group"
        aria-label="Antwortoptionen"
        className="mt-4 grid gap-3"
      >
        {challenge.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => choose(option.id)}
              aria-pressed={isSelected}
              className={[
                "nim-interactive min-h-12 rounded-[var(--nim-radius-md)] border-2 px-4 py-3 text-left text-sm font-semibold leading-6 transition-[transform,background-color,border-color] duration-280 ease-[var(--nim-ease)]",
                isSelected
                  ? option.isGood
                    ? "border-[var(--nim-success)] bg-[var(--nim-success-soft)] text-[var(--foreground)]"
                    : "border-[var(--nim-accent)] bg-[var(--nim-surface)] text-[var(--foreground)]"
                  : "border-[var(--nim-border)] bg-[var(--nim-surface)] text-[var(--foreground)] hover:border-[var(--nim-primary)]",
              ].join(" ")}
            >
              <span className="mr-2 font-black text-[var(--nim-primary)]">
                {String.fromCharCode(65 + index)}.
              </span>
              {option.label}
            </button>
          );
        })}
      </div>

      {revealed && selected ? (
        <div
          className="mt-4 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-black text-[var(--nim-primary)]">
            {selected.isGood ? "Starke Wahl" : "Guter Denkversuch — so geht’s klarer"}
          </p>
          <p className="mt-2 text-sm font-medium leading-7 text-[var(--nim-secondary)]">
            {selected.feedback}
          </p>
        </div>
      ) : null}

      <div className="mt-5">
        <label
          htmlFor={`${baseId}-teachback`}
          className="text-sm font-black text-[var(--foreground)]"
        >
          Erklär es selbst
        </label>
        <p className="mt-1 text-sm leading-6 text-[var(--nim-secondary)]">
          {challenge.teachBackPrompt}
        </p>
        <textarea
          id={`${baseId}-teachback`}
          value={teachBack}
          onChange={(event) => setTeachBack(event.target.value.slice(0, 800))}
          rows={3}
          className="mt-3 w-full rounded-[var(--nim-radius-md)] border-2 border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none focus:border-[var(--nim-focus)] focus:ring-4 focus:ring-[color:rgb(10_92_122/0.15)]"
          placeholder="Schreib in Alltagssprache…"
        />
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-black text-[var(--foreground)]">
          Wie sicher fühlst du dich jetzt?
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
              onClick={() => setLevel(value)}
              aria-pressed={confidence === value}
              className={[
                "nim-interactive min-h-11 rounded-[var(--nim-radius-md)] px-4 py-2 text-sm font-black transition-[transform,background-color] duration-280 ease-[var(--nim-ease)]",
                confidence === value
                  ? "bg-[var(--nim-primary)] text-white"
                  : "bg-[var(--nim-surface)] text-[var(--nim-primary)] ring-2 ring-[var(--nim-border)] hover:ring-[var(--nim-primary)]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
    </article>
  );
}
