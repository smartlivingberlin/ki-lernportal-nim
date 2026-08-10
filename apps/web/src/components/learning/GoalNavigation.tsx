"use client";

import type { ThemeWorld } from "../../data/types";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";

type GoalNavigationProps = {
  worlds: ThemeWorld[];
  selectedWorldId: string | null;
  onSelectWorld: (world: ThemeWorld) => void;
  simpleMode: boolean;
  worldsReady?: ReadonlySet<string> | readonly string[];
};

export function GoalNavigation({
  worlds,
  selectedWorldId,
  onSelectWorld,
  simpleMode,
  worldsReady,
}: GoalNavigationProps) {
  const visibleWorlds = simpleMode
    ? worlds.filter((world) => world.status === "active").slice(0, 4)
    : worlds;
  const readySet = worldsReady
    ? new Set(worldsReady)
    : null;

  return (
    <section
      id="ziele"
      aria-labelledby="ziele-title"
      {...explainAttrs("ziele")}
      className="scroll-mt-52 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] lg:scroll-mt-32 md:p-7"
    >
      <ExplainHotspot tipId="ziele">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--nim-primary)]">
          Ziel wählen
        </p>
        <h2
          id="ziele-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
        >
          Was möchtest du heute mit KI schaffen?
        </h2>
        <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-[var(--nim-secondary)]">
          Such dir ein Ziel. Wir führen dich danach Schritt für Schritt — in klarer Sprache,
          mit Übungen und kurzen Challenges.
        </p>
      </ExplainHotspot>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visibleWorlds.map((world) => {
          const selected = selectedWorldId === world.id;
          const available =
            world.status === "active" &&
            (readySet ? readySet.has(world.id) : Boolean(world.starterLessonId));
          const accentClass =
            world.accent === "coral"
              ? "hover:border-[var(--nim-accent)] focus-visible:outline-[var(--nim-accent)]"
              : "hover:border-[var(--nim-primary)] focus-visible:outline-[var(--nim-primary)]";

          return (
            <li key={world.id}>
              <button
                type="button"
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
                    {available ? "Startklar" : "Demnächst"}
                  </span>
                </span>
                <span className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
                  {world.title}
                </span>
                <span
                  id={`world-${world.id}-desc`}
                  className="mt-2 text-sm font-medium leading-6 text-[var(--nim-secondary)]"
                >
                  {world.goalPrompt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
