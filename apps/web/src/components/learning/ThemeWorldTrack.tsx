"use client";

import { useState } from "react";
import type { MicroLearningUnitV2 } from "../../data/types";
import {
  isMicroUnitCompleted,
  microUnitLayerLabel,
} from "../../data/micro-units";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";

const START_VISIBLE = 4;

type ThemeWorldTrackProps = {
  worldTitle: string;
  /** Kernweg-Welt (mit starterLessonId) oder reine Vertiefung („Später“). */
  worldLayer?: "kernweg" | "spaeter";
  learningOutcomes?: readonly string[];
  units: MicroLearningUnitV2[];
  activeUnitId: string | null;
  completedLessonIds: readonly string[];
  completedMicroUnitIds: readonly string[];
  onSelectUnit: (unit: MicroLearningUnitV2) => void;
};

function UnitButton({
  unit,
  selected,
  completed,
  onSelectUnit,
}: {
  unit: MicroLearningUnitV2;
  selected: boolean;
  completed: boolean;
  onSelectUnit: (unit: MicroLearningUnitV2) => void;
}) {
  const layer = microUnitLayerLabel(unit);

  return (
    <button
      type="button"
      id={`micro-pick-${unit.id}`}
      data-explain="themenwelt"
      data-layer={unit.lessonId ? "kernweg" : "vertiefung"}
      data-completed={completed ? "true" : "false"}
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
          {completed ? (
            <span className="sr-only">, erledigt</span>
          ) : (
            <span className="sr-only">, offen</span>
          )}
        </span>
        <span className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-surface)] px-2 py-1 text-[0.7rem] font-black text-[var(--nim-secondary)]">
          {layer}
          {completed ? " · erledigt" : ""} · {unit.estimatedMinutes} Min.
        </span>
      </span>
      <span className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
        {unit.title}
      </span>
      <span className="mt-2 text-sm leading-6 text-[var(--nim-secondary)]">
        {unit.oneSentence}
      </span>
    </button>
  );
}

/**
 * Überblick zuerst, dann Start-Einheiten; Rest hinter Disclosure —
 * verhindert „12–16 Kacheln auf einmal“.
 */
export function ThemeWorldTrack({
  worldTitle,
  worldLayer = "kernweg",
  learningOutcomes = [],
  units,
  activeUnitId,
  completedLessonIds,
  completedMicroUnitIds,
  onSelectUnit,
}: ThemeWorldTrackProps) {
  const totalMinutes = units.reduce(
    (sum, unit) => sum + unit.estimatedMinutes,
    0,
  );
  const startUnits = units.slice(0, START_VISIBLE);
  const moreUnits = units.slice(START_VISIBLE);
  const activeInMore = moreUnits.some((unit) => unit.id === activeUnitId);
  const [userOpenedMore, setUserOpenedMore] = useState(false);
  const moreOpen = activeInMore || userOpenedMore;
  const completedCount = units.filter((unit) =>
    isMicroUnitCompleted({
      unit,
      completedLessonIds,
      completedMicroUnitIds,
    }),
  ).length;
  const kernwegCount = units.filter((unit) => unit.lessonId).length;
  const vertiefungCount = units.length - kernwegCount;
  const isSpaeterWorld = worldLayer === "spaeter" || kernwegCount === 0;

  return (
    <section
      id="themenwelt"
      aria-labelledby="themenwelt-title"
      data-testid="theme-world-track"
      data-world-layer={isSpaeterWorld ? "spaeter" : "kernweg"}
      {...explainAttrs("themenwelt")}
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="themenwelt">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          {isSpaeterWorld
            ? "Später · reine Vertiefung"
            : "Vertiefung · Themenwelt"}
        </p>
        <h2
          id="themenwelt-title"
          tabIndex={-1}
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] outline-none"
        >
          {worldTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          Überblick: {units.length} Einheiten · ca. {totalMinutes} Min. ·{" "}
          {completedCount}/{units.length} erledigt.{" "}
          {isSpaeterWorld
            ? "Diese Welt gehört nicht zum 12er-Kernweg — kurze Micro-Einheiten zum optionalen Vertiefen."
            : `${kernwegCount} Kernweg (mit Lektion)${
                vertiefungCount > 0
                  ? ` · ${vertiefungCount} Vertiefung (direkt)`
                  : ""
              }. „Start hier“ zeigt zuerst Kernweg-Einheiten — der Rest bleibt zugeklappt, bis du bereit bist.`}
        </p>
      </ExplainHotspot>

      {isSpaeterWorld ? (
        <p
          data-testid="spaeter-world-banner"
          className="mt-4 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] px-4 py-3 text-sm font-semibold leading-6 text-[var(--nim-secondary)]"
        >
          Später-Welt: kein Muss. Du kannst jederzeit zum{" "}
          <a
            href="#pfad"
            className="font-black text-[var(--nim-primary)] underline underline-offset-2"
          >
            Kernpfad
          </a>{" "}
          oder zum{" "}
          <a
            href="#heute"
            className="font-black text-[var(--nim-primary)] underline underline-offset-2"
          >
            Nächsten Schritt
          </a>{" "}
          zurück.
        </p>
      ) : null}
      {learningOutcomes.length > 0 ? (
        <ul
          className="mt-4 grid gap-2 sm:grid-cols-3"
          aria-label="Lernziele dieser Themenwelt"
        >
          {learningOutcomes.slice(0, 3).map((outcome) => (
            <li
              key={outcome}
              className="rounded-[var(--nim-radius-md)] bg-[var(--nim-primary-soft)] px-3 py-2 text-xs font-semibold leading-5 text-[var(--nim-primary-strong)]"
            >
              {outcome}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
          Start hier
          {kernwegCount > 0 ? " · zuerst Kernweg" : ""}
        </p>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2">
          {startUnits.map((unit) => (
            <li key={unit.id}>
              <UnitButton
                unit={unit}
                selected={activeUnitId === unit.id}
                completed={isMicroUnitCompleted({
                  unit,
                  completedLessonIds,
                  completedMicroUnitIds,
                })}
                onSelectUnit={onSelectUnit}
              />
            </li>
          ))}
        </ol>
      </div>

      {moreUnits.length > 0 ? (
        <details
          className="mt-5 rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-4"
          open={moreOpen}
          onToggle={(event) => {
            const next = (event.currentTarget as HTMLDetailsElement).open;
            if (activeInMore && !next) {
              event.preventDefault();
              return;
            }
            setUserOpenedMore(next);
          }}
        >
          <summary className="nim-interactive flex min-h-11 cursor-pointer list-none items-center text-sm font-black text-[var(--nim-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]">
            Weitere Einheiten ({moreUnits.length})
            <span className="ml-2 text-xs font-semibold text-[var(--nim-secondary)]">
              {moreOpen ? "— zugeklappt antippen" : "— antippen zum Öffnen"}
            </span>
          </summary>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {moreUnits.map((unit) => (
              <li key={unit.id}>
                <UnitButton
                  unit={unit}
                  selected={activeUnitId === unit.id}
                  completed={isMicroUnitCompleted({
                    unit,
                    completedLessonIds,
                    completedMicroUnitIds,
                  })}
                  onSelectUnit={onSelectUnit}
                />
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </section>
  );
}
