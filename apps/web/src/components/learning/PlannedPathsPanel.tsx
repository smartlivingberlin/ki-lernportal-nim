"use client";

import { seedLessons } from "../../data/lessons";
import {
  plannedPathBridges,
  plannedPathById,
  type PlannedPathBridge,
} from "../../data/learning-paths";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";

type PlannedPathsPanelProps = {
  onOpenLesson: (lessonId: string) => void;
  onOpenWorld?: (worldId: string) => void;
  simpleMode?: boolean;
};

function BridgeCard({
  bridge,
  onOpenLesson,
  onOpenWorld,
}: {
  bridge: PlannedPathBridge;
  onOpenLesson: (lessonId: string) => void;
  onOpenWorld?: (worldId: string) => void;
}) {
  const path = plannedPathById(bridge.pathId);
  if (!path) return null;

  const lessons = bridge.bridgeLessonIds
    .map((id) => seedLessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));

  return (
    <article
      data-testid={`planned-path-${bridge.pathId}`}
      data-path-status={path.status}
      className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
          {path.title}
        </p>
        <span className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-surface)] px-2 py-1 text-[0.7rem] font-black text-[var(--nim-secondary)]">
          {bridge.badge}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium leading-6 text-[var(--nim-secondary)]">
        {path.description}
      </p>
      <p className="mt-3 text-sm font-semibold leading-6 text-[var(--foreground)]">
        {bridge.whyNow}
      </p>
      <p className="mt-2 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        {bridge.laterNote}
      </p>

      <ul className="mt-4 space-y-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <button
              type="button"
              data-testid={`planned-path-lesson-${lesson.id}`}
              onClick={() => onOpenLesson(lesson.id)}
              className="nim-interactive flex w-full min-h-11 items-start justify-between gap-3 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-3 py-3 text-left hover:border-[var(--nim-primary)]"
            >
              <span className="min-w-0">
                <span className="block text-xs font-black uppercase tracking-wider text-[var(--nim-secondary)]">
                  Kernweg · Lektion {lesson.order} · {lesson.estimatedMinutes} Min.
                </span>
                <span className="mt-1 block text-sm font-black text-[var(--nim-primary)]">
                  {lesson.title}
                </span>
                <span className="mt-1 block text-xs font-medium leading-5 text-[var(--nim-secondary)]">
                  {lesson.description}
                </span>
              </span>
              <span className="shrink-0 text-xs font-black text-[var(--nim-primary)]">
                Öffnen
              </span>
            </button>
          </li>
        ))}
      </ul>

      {onOpenWorld ? (
        <button
          type="button"
          data-testid={`planned-path-world-${bridge.bridgeWorldId}`}
          onClick={() => onOpenWorld(bridge.bridgeWorldId)}
          className="nim-interactive mt-3 inline-flex min-h-11 items-center rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-3 text-xs font-black text-[var(--nim-primary)]"
        >
          {bridge.worldCtaLabel}
        </button>
      ) : null}
    </article>
  );
}

/**
 * Zeigt geplante Pfade Alltag/Prompting mit Brücken in den 12er-Kernweg.
 * Keine neuen Lesson-IDs — Integrity-Gate bleibt intakt.
 */
export function PlannedPathsPanel({
  onOpenLesson,
  onOpenWorld,
  simpleMode = false,
}: PlannedPathsPanelProps) {
  const bridges = simpleMode
    ? plannedPathBridges.slice(0, 1)
    : plannedPathBridges;

  return (
    <section
      id="weitere-pfade"
      data-testid="planned-paths-panel"
      aria-labelledby="weitere-pfade-title"
      {...explainAttrs("lernpfad")}
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="lernpfad">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--nim-primary)]">
          Mehr Wege · ehrlich geplant
        </p>
        <h2
          id="weitere-pfade-title"
          tabIndex={-1}
          className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--foreground)] outline-none md:text-3xl"
        >
          Alltag & Prompting — jetzt schon starten
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          Eigene Pfade für Alltag und Prompting sind vorbereitet, aber noch ohne
          Extra-Lektionen. Du startest über bewährte Kernweg-Lektionen — ohne
          Warteschlange und ohne leere Versprechen.
        </p>
      </ExplainHotspot>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {bridges.map((bridge) => (
          <BridgeCard
            key={bridge.pathId}
            bridge={bridge}
            onOpenLesson={onOpenLesson}
            onOpenWorld={simpleMode ? undefined : onOpenWorld}
          />
        ))}
      </div>
    </section>
  );
}
