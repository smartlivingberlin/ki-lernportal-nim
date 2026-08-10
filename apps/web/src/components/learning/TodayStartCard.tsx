"use client";

import type { Lesson } from "../../data/types";

type TodayStartCardProps = {
  lesson: Lesson | null;
  moduleTitle: string | null;
  completedLessons: number;
  totalLessons: number;
  onOpenLesson: (lessonId: string) => void;
};

export function TodayStartCard({
  lesson,
  moduleTitle,
  completedLessons,
  totalLessons,
  onOpenLesson,
}: TodayStartCardProps) {
  return (
    <section
      data-testid="today-start-card"
      aria-labelledby="today-start-title"
      data-explain="heute"
      className="rounded-[var(--nim-radius-xl)] border border-white/25 bg-white/12 p-5 backdrop-blur-sm"
    >
      <p className="text-xs font-black uppercase tracking-widest text-white">
        Heute empfohlen
      </p>

      {lesson ? (
        <>
          <p className="mt-3 text-sm font-black text-white">
            {moduleTitle ?? "KI-Start"} · Lektion {lesson.order}
          </p>
          <p
            id="today-start-title"
            className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-white"
          >
            {lesson.title}
          </p>
          <p className="mt-3 text-sm font-semibold leading-6 text-white">
            {lesson.estimatedMinutes} Minuten · aus deinem lokalen Fortschritt ausgewählt
          </p>
          <p className="mt-2 text-xs font-semibold text-white">
            {completedLessons}/{totalLessons || 12} Lektionen erledigt
          </p>
          <button
            type="button"
            onClick={() => onOpenLesson(lesson.id)}
            className="nim-interactive mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[var(--nim-radius-md)] bg-white px-4 py-3 text-sm font-black text-[var(--nim-primary)] hover:bg-[var(--nim-accent-soft)]"
          >
            Heute hier weitermachen
          </button>
        </>
      ) : (
        <>
          <p
            id="today-start-title"
            className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white"
          >
            Lernpfad abgeschlossen
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-white">
            Alle Lektionen sind lokal als erledigt markiert. Wiederhole unsichere Themen oder prüfe die Quellen.
          </p>
        </>
      )}
    </section>
  );
}
