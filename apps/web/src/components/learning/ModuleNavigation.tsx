"use client";

import { useId, useState } from "react";
import type { Lesson } from "../../data/types";

type LearningModule = {
  title: string;
  label: string;
  description: string;
  outcome: string;
  duration: string;
  lessonIds: string[];
};

type ModuleNavigationProps = {
  module: LearningModule;
  lessons: Lesson[];
  completedCount: number;
  activeLessonId: string | null;
  completedLessonIds: string[];
  onOpenLesson: (lessonId: string) => void;
};

export function ModuleNavigation({
  module,
  lessons,
  completedCount,
  activeLessonId,
  completedLessonIds,
  onOpenLesson,
}: ModuleNavigationProps) {
  const panelId = useId();
  const containsActive = Boolean(
    activeLessonId && module.lessonIds.includes(activeLessonId),
  );
  /** Nutzer darf inaktive Module öffnen; aktives Modul bleibt immer sichtbar. */
  const [userOpened, setUserOpened] = useState(false);
  const open = containsActive || userOpened;

  return (
    <details
      open={open}
      data-explain="lernpfad"
      className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-4"
      onToggle={(event) => {
        const nextOpen = (event.currentTarget as HTMLDetailsElement).open;
        if (containsActive) {
          // Aktives Modul nicht zuklappen — Fokus behalten.
          if (!nextOpen) event.preventDefault();
          return;
        }
        setUserOpened(nextOpen);
      }}
    >
      <summary
        aria-controls={panelId}
        className="nim-interactive cursor-pointer list-none rounded-[var(--nim-radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]"
      >
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
              {module.title}
              <span className="sr-only">
                {open ? ", ausgeklappt" : ", zugeklappt"}
                {containsActive ? ", enthält die aktuelle Lektion" : ""}
              </span>
            </p>
            <h2 className="mt-1 font-black text-[var(--nim-primary)]">{module.label}</h2>
            <p className="mt-1 text-xs leading-5 text-[var(--nim-secondary)]">
              {module.duration} · {completedCount}/{lessons.length} erledigt
              {!open ? " · antippen zum Öffnen" : ""}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface)] px-3 py-1 text-xs font-black text-[var(--nim-primary)]"
          >
            {open ? "−" : "+"} {completedCount}/{lessons.length}
          </span>
        </div>
      </summary>

      <div id={panelId} className="mt-4 space-y-2">
        <p className="text-xs leading-5 text-[var(--nim-secondary)]">{module.description}</p>
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            type="button"
            data-explain="lektion"
            aria-current={activeLessonId === lesson.id ? "step" : undefined}
            onClick={() => onOpenLesson(lesson.id)}
            className={`nim-interactive flex w-full items-center gap-3 rounded-[var(--nim-radius-md)] p-3 text-left ${
              activeLessonId === lesson.id
                ? "bg-[var(--nim-primary-strong)] text-white"
                : "bg-[var(--nim-surface)] text-[var(--foreground)] hover:bg-[var(--nim-primary-soft)]"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--nim-radius-sm)] text-xs font-black ${
                completedLessonIds.includes(lesson.id)
                  ? "bg-[var(--nim-success)] text-white"
                  : activeLessonId === lesson.id
                    ? "bg-white text-[var(--nim-primary-strong)]"
                    : "bg-[var(--nim-surface-soft)] text-[var(--nim-primary)]"
              }`}
            >
              {completedLessonIds.includes(lesson.id) ? "✓" : lesson.order}
            </span>

            <span className="min-w-0">
              <span
                className={`block truncate text-sm font-black ${
                  activeLessonId === lesson.id ? "text-white" : "text-[var(--foreground)]"
                }`}
              >
                {lesson.title}
              </span>
              <span
                className={`block truncate text-xs font-semibold ${
                  activeLessonId === lesson.id ? "text-white" : "text-[var(--nim-secondary)]"
                }`}
              >
                {completedLessonIds.includes(lesson.id) ? "erledigt" : "offen"}
              </span>
            </span>
          </button>
        ))}
      </div>
    </details>
  );
}
