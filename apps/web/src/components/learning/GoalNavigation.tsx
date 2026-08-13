"use client";

import type { ThemeWorld } from "../../data/types";
import {
  isMicroUnitCompleted,
  microUnitsForWorld,
} from "../../data/micro-units";
import { sortThemeWorldsKernwegFirst } from "../../data/theme-worlds";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";

export { sortThemeWorldsKernwegFirst } from "../../data/theme-worlds";

type GoalNavigationProps = {
  worlds: ThemeWorld[];
  selectedWorldId: string | null;
  onSelectWorld: (world: ThemeWorld) => void;
  simpleMode: boolean;
  worldsReady?: ReadonlySet<string> | readonly string[];
  completedLessonIds?: readonly string[];
  completedMicroUnitIds?: readonly string[];
};

function worldProgressLabel(options: {
  worldId: string;
  available: boolean;
  completedLessonIds: readonly string[];
  completedMicroUnitIds: readonly string[];
}): { fraction: string; state: "offen" | "in-arbeit" | "fertig" | "demnächst" } {
  const units = microUnitsForWorld(options.worldId);
  if (!options.available) {
    return { fraction: "0/0", state: "demnächst" };
  }
  if (units.length === 0) {
    return { fraction: "0/0", state: "offen" };
  }
  const completed = units.filter((unit) =>
    isMicroUnitCompleted({
      unit,
      completedLessonIds: options.completedLessonIds,
      completedMicroUnitIds: options.completedMicroUnitIds,
    }),
  ).length;
  if (completed <= 0) return { fraction: `0/${units.length}`, state: "offen" };
  if (completed >= units.length) {
    return { fraction: `${completed}/${units.length}`, state: "fertig" };
  }
  return { fraction: `${completed}/${units.length}`, state: "in-arbeit" };
}

function WorldTile({
  world,
  selected,
  available,
  isKernwegWorld,
  progressFraction,
  progressState,
  onSelectWorld,
}: {
  world: ThemeWorld;
  selected: boolean;
  available: boolean;
  isKernwegWorld: boolean;
  progressFraction: string;
  progressState: "offen" | "in-arbeit" | "fertig" | "demnächst";
  onSelectWorld: (world: ThemeWorld) => void;
}) {
  const accentClass =
    world.accent === "coral"
      ? "hover:border-[var(--nim-accent)] focus-visible:outline-[var(--nim-accent)]"
      : "hover:border-[var(--nim-primary)] focus-visible:outline-[var(--nim-primary)]";

  const layerBadge = isKernwegWorld
    ? available
      ? "Kernweg"
      : "Kernweg · demnächst"
    : available
      ? "Später · bereit"
      : "Später · demnächst";

  const progressBadge =
    progressState === "fertig"
      ? "Fertig"
      : progressState === "in-arbeit"
        ? "In Arbeit"
        : progressState === "demnächst"
          ? "Demnächst"
          : "Startklar";

  return (
    <li>
      <button
        type="button"
        data-world-layer={isKernwegWorld ? "kernweg" : "spaeter"}
        data-world-progress={progressState}
        data-testid={`world-tile-${world.id}`}
        {...explainAttrs("ziele-kachel")}
        onClick={() => onSelectWorld(world)}
        aria-pressed={selected}
        aria-describedby={`world-${world.id}-desc`}
        className={[
          "group nim-interactive flex min-h-[7.5rem] w-full flex-col rounded-[var(--nim-radius-lg)] border-2 bg-[var(--nim-surface-soft)] p-4 text-left transition-[transform,border-color,background-color,box-shadow] duration-280 ease-[var(--nim-ease)]",
          accentClass,
          selected
            ? "border-[var(--nim-primary)] bg-[var(--nim-surface)] shadow-[var(--shadow-lift)]"
            : "border-transparent",
        ].join(" ")}
      >
        <span className="flex items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
            {world.shortLabel}
          </span>
          <span className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-surface)] px-2 py-1 text-[0.7rem] font-black text-[var(--nim-secondary)]">
            {layerBadge}
          </span>
        </span>
        <span className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
          {world.title}
        </span>
        <span
          id={`world-${world.id}-desc`}
          className="mt-2 text-sm font-medium leading-6 text-[var(--nim-secondary)]"
        >
          {isKernwegWorld
            ? world.goalPrompt
            : `Später vertiefen: ${world.goalPrompt}`}
        </span>
        <span className="mt-3 flex items-center justify-between gap-2 text-[0.7rem] font-black uppercase tracking-wider text-[var(--nim-primary-strong)]">
          <span data-testid={`world-progress-${world.id}`}>
            {progressFraction} Einheiten · {progressBadge}
          </span>
        </span>
      </button>
    </li>
  );
}

export function GoalNavigation({
  worlds,
  selectedWorldId,
  onSelectWorld,
  simpleMode,
  worldsReady,
  completedLessonIds = [],
  completedMicroUnitIds = [],
}: GoalNavigationProps) {
  const readySet = worldsReady ? new Set(worldsReady) : null;
  const baseWorlds = simpleMode
    ? worlds.filter((world) => world.status === "active").slice(0, 4)
    : worlds;
  const visibleWorlds = sortThemeWorldsKernwegFirst(baseWorlds);
  const kernwegWorlds = visibleWorlds.filter((world) => world.starterLessonId);
  const spaeterWorlds = visibleWorlds.filter((world) => !world.starterLessonId);

  return (
    <section
      id="ziele"
      aria-labelledby="ziele-title"
      {...explainAttrs("ziele")}
      className="scroll-mt-52 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] lg:scroll-mt-32 md:p-7"
    >
      <ExplainHotspot tipId="ziele">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--nim-primary)]">
          Vertiefen · optional
        </p>
        <h2
          id="ziele-title"
          tabIndex={-1}
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--foreground)] outline-none md:text-4xl"
        >
          Themenwelten — wenn du bereit bist
        </h2>
        <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-[var(--nim-secondary)]">
          Zuerst Welten mit Kernweg-Anbindung (Lektionen). Darunter reine
          Vertiefungswelten als „Später“ — erst nach dem Kernweg sinnvoll.
          Selbstcheck, Kurzpfad und Lektionen bleiben der rote Faden.
          {spaeterWorlds.length > 0
            ? ` ${spaeterWorlds.length} Welt${spaeterWorlds.length === 1 ? "" : "en"} sind als Später markiert.`
            : ""}
        </p>
      </ExplainHotspot>

      <div className="mt-6 space-y-8">
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
            Mit Kernweg · zuerst hier
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {kernwegWorlds.map((world) => {
              const available =
                world.status === "active" &&
                (readySet ? readySet.has(world.id) : true);
              const progress = worldProgressLabel({
                worldId: world.id,
                available,
                completedLessonIds,
                completedMicroUnitIds,
              });
              return (
                <WorldTile
                  key={world.id}
                  world={world}
                  selected={selectedWorldId === world.id}
                  available={available}
                  isKernwegWorld
                  progressFraction={progress.fraction}
                  progressState={progress.state}
                  onSelectWorld={onSelectWorld}
                />
              );
            })}
          </ul>
        </div>

        {spaeterWorlds.length > 0 ? (
          <div data-testid="spaeter-worlds-block">
            <h3
              id="ziele-spaeter-title"
              className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]"
            >
              Später · reine Vertiefung
            </h3>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[var(--nim-secondary)]">
              Keine Lektions-Anbindung im 12er-Pfad. Öffne diese Welten erst,
              wenn der Kernweg für dich klar genug ist — optional, ohne Druck.
            </p>
            <ul
              className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
              aria-labelledby="ziele-spaeter-title"
            >
              {spaeterWorlds.map((world) => {
                const available =
                  world.status === "active" &&
                  (readySet ? readySet.has(world.id) : false);
                const progress = worldProgressLabel({
                  worldId: world.id,
                  available,
                  completedLessonIds,
                  completedMicroUnitIds,
                });
                return (
                  <WorldTile
                    key={world.id}
                    world={world}
                    selected={selectedWorldId === world.id}
                    available={available}
                    isKernwegWorld={false}
                    progressFraction={progress.fraction}
                    progressState={progress.state}
                    onSelectWorld={onSelectWorld}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
