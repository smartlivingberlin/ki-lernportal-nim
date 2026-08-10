"use client";

import type { MicroLearningUnitV2 } from "../../data/types";
import { ExplainCloud } from "./ExplainCloud";

type ThemeWorldTrackProps = {
  worldTitle: string;
  units: MicroLearningUnitV2[];
  activeUnitId: string | null;
  onSelectUnit: (unit: MicroLearningUnitV2) => void;
  simpleMode?: boolean;
};

export function ThemeWorldTrack({
  worldTitle,
  units,
  activeUnitId,
  onSelectUnit,
  simpleMode = false,
}: ThemeWorldTrackProps) {
  const visible = simpleMode ? units.slice(0, 6) : units;

  return (
    <section
      id="themenwelt"
      aria-labelledby="themenwelt-title"
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-6 lg:scroll-mt-36"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          Themenwelt · Schema v2
        </p>
        <ExplainCloud tipId="themenwelt" compact />
      </div>
      <h2
        id="themenwelt-title"
        className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
      >
        {worldTitle}
      </h2>
      <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
        {units.length} Micro-Einheiten: Warum → Beispiel → Schritte → Üben → Prüfen.
        Einheiten mit Lektion öffnen den Lernraum; die anderen lernst du direkt hier.
      </p>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {visible.map((unit) => {
          const selected = activeUnitId === unit.id;
          return (
            <li key={unit.id}>
              <button
                type="button"
                onClick={() => onSelectUnit(unit)}
                aria-pressed={selected}
                className={[
                  "nim-interactive flex min-h-[5.5rem] w-full flex-col rounded-[var(--nim-radius-md)] border-2 p-4 text-left transition-[transform,border-color,background-color] duration-280 ease-[var(--nim-ease)]",
                  selected
                    ? "border-[var(--nim-primary)] bg-[var(--nim-surface)] shadow-[var(--shadow-lift)]"
                    : "border-[var(--nim-border)] bg-[var(--nim-surface-soft)] hover:border-[var(--nim-primary)]",
                ].join(" ")}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
                    Einheit {unit.order}
                  </span>
                  <span className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-surface)] px-2 py-1 text-[0.7rem] font-black text-[var(--nim-secondary)]">
                    {unit.lessonId ? "Mit Lektion" : "Direkt lernen"} · {unit.estimatedMinutes} Min.
                  </span>
                </span>
                <span className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                  {unit.title}
                </span>
                <span className="mt-2 text-sm leading-6 text-[var(--nim-secondary)]">
                  {unit.oneSentence}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
