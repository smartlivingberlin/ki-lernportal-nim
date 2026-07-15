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
  return (
    <details open className="rounded-3xl bg-slate-50 p-4">
      <summary className="cursor-pointer list-none">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">
              {module.title}
            </p>
            <h2 className="mt-1 font-black text-nim-primary">
              {module.label}
            </h2>
            <p className="mt-1 text-xs leading-5 text-nim-secondary">
              {module.duration} · {completedCount}/{lessons.length} erledigt
            </p>
          </div>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-nim-primary">
            {completedCount}/{lessons.length}
          </span>
        </div>
      </summary>

      <div className="mt-4 space-y-2">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            type="button"
            aria-current={
              activeLessonId === lesson.id ? "step" : undefined
            }
            onClick={() => onOpenLesson(lesson.id)}
            className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ${
              activeLessonId === lesson.id
                ? "bg-nim-primary text-white"
                : "bg-white hover:bg-slate-100"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                completedLessonIds.includes(lesson.id)
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-nim-primary"
              }`}
            >
              {completedLessonIds.includes(lesson.id) ? "✓" : lesson.order}
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-black">
                {lesson.title}
              </span>
              <span className="block truncate text-xs font-semibold">
                {completedLessonIds.includes(lesson.id) ? "erledigt" : "offen"}
              </span>
            </span>
          </button>
        ))}
      </div>
    </details>
  );
}
