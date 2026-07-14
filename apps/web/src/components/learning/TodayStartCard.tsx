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
      className="rounded-[2rem] border border-white/15 bg-white/10 p-5"
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
            className="mt-2 text-2xl font-black leading-tight text-white"
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
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-nim-primary hover:bg-slate-100"
          >
            Heute hier weitermachen
          </button>
        </>
      ) : (
        <>
          <p
            id="today-start-title"
            className="mt-3 text-2xl font-black text-white"
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
