"use client";

import { useId, useState } from "react";
import type { ConfidenceLevel, MicroLearningUnitV2, Source } from "../../data/types";

type MicroLearningUnitViewProps = {
  unit: MicroLearningUnitV2;
  sources: Source[];
  onOpenLesson?: (lessonId: string) => void;
};

export function MicroLearningUnitView({
  unit,
  sources,
  onOpenLesson,
}: MicroLearningUnitViewProps) {
  const baseId = useId();
  const [teachBack, setTeachBack] = useState("");
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [showSample, setShowSample] = useState(false);

  return (
    <article
      data-testid="micro-learning-unit"
      data-unit-id={unit.id}
      aria-labelledby={`${baseId}-title`}
      className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] md:p-7"
    >
      <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
        Micro-Einheit {unit.order}
      </p>
      <h3
        id={`${baseId}-title`}
        className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
      >
        {unit.title}
      </h3>

      <dl className="mt-6 space-y-4">
        <div className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4">
          <dt className="text-sm font-black text-[var(--nim-primary)]">Warum nützlich?</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">{unit.whyUseful}</dd>
        </div>
        <div className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4">
          <dt className="text-sm font-black text-[var(--nim-primary)]">In einem Satz</dt>
          <dd className="mt-2 text-base font-semibold leading-7 text-[var(--foreground)]">
            {unit.oneSentence}
          </dd>
        </div>
        <div className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4">
          <dt className="text-sm font-black text-[var(--nim-primary)]">Alltag / Beruf</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">{unit.everydayExample}</dd>
        </div>
      </dl>

      <section className="mt-5" aria-labelledby={`${baseId}-steps`}>
        <h4 id={`${baseId}-steps`} className="text-sm font-black text-[var(--nim-primary)]">
          Schritt für Schritt
        </h4>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-[var(--nim-secondary)]">
          {unit.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-5 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] p-4">
        <h4 className="text-sm font-black text-[var(--nim-primary)]">Mach es selbst</h4>
        <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">{unit.practiceTask}</p>
        <button
          type="button"
          className="nim-interactive mt-3 min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 py-2 text-sm font-black text-white hover:bg-[var(--nim-primary-strong)]"
          aria-expanded={showSample}
          onClick={() => setShowSample((value) => !value)}
        >
          {showSample ? "Beispielweg verbergen" : "Beispielweg ansehen"}
        </button>
        {showSample ? (
          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]" role="status">
            {unit.samplePath}
          </p>
        ) : null}
      </section>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-[var(--nim-radius-md)] bg-[var(--nim-success-soft)] p-4">
          <p className="text-sm font-black text-[var(--nim-primary-strong)]">Warum funktioniert das?</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{unit.whyItWorks}</p>
        </div>
        <div className="rounded-[var(--nim-radius-md)] bg-[var(--nim-accent-soft)] p-4">
          <p className="text-sm font-black text-[var(--nim-primary-strong)]">Typischer Fehler</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{unit.commonMistake}</p>
        </div>
      </div>

      <p className="mt-4 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-4 text-sm font-semibold leading-7 text-[var(--foreground)]">
        Sicherheit: {unit.safetyNote}
      </p>

      <section className="mt-5">
        <h4 className="text-sm font-black text-[var(--nim-primary)]">Abruffragen</h4>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--nim-secondary)]">
          {unit.retrievalQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <div className="mt-5">
        <label htmlFor={`${baseId}-teachback`} className="text-sm font-black text-[var(--foreground)]">
          Erklär es selbst
        </label>
        <p className="mt-1 text-sm leading-6 text-[var(--nim-secondary)]">{unit.teachBackPrompt}</p>
        <textarea
          id={`${baseId}-teachback`}
          value={teachBack}
          onChange={(event) => setTeachBack(event.target.value.slice(0, 1000))}
          rows={3}
          className="mt-3 w-full rounded-[var(--nim-radius-md)] border-2 border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 py-3 text-sm leading-6 outline-none focus:border-[var(--nim-focus)] focus:ring-4 focus:ring-[color:rgb(10_92_122/0.15)]"
          placeholder="In Alltagssprache…"
        />
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-black text-[var(--foreground)]">Wie sicher fühlst du dich?</legend>
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
              onClick={() => setConfidence(value)}
              aria-pressed={confidence === value}
              className={[
                "nim-interactive min-h-11 rounded-[var(--nim-radius-md)] px-4 py-2 text-sm font-black",
                confidence === value
                  ? "bg-[var(--nim-primary)] text-white"
                  : "bg-[var(--nim-surface-soft)] text-[var(--nim-primary)] ring-2 ring-[var(--nim-border)]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {sources.length > 0 ? (
        <section className="mt-5">
          <h4 className="text-sm font-black text-[var(--nim-primary)]">Quellen</h4>
          <ul className="mt-3 space-y-2">
            {sources.map((source) => (
              <li key={source.id}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-sm font-bold text-[var(--nim-primary)] underline-offset-2 hover:underline"
                >
                  {source.name}
                  <span className="sr-only"> – öffnet in einem neuen Tab</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[var(--nim-secondary)]">Zuletzt geprüft: {unit.lastReviewed}</p>
        </section>
      ) : null}

      {unit.lessonId && onOpenLesson ? (
        <button
          type="button"
          onClick={() => onOpenLesson(unit.lessonId as string)}
          className="nim-interactive mt-6 min-h-12 w-full rounded-[var(--nim-radius-md)] bg-[var(--nim-accent)] px-4 py-3 text-sm font-black text-white hover:opacity-95"
        >
          Zur verknüpften Lektion im Lernraum
        </button>
      ) : null}
    </article>
  );
}
