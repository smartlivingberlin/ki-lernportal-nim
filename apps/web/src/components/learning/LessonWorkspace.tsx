import type { Lesson, Source } from "../../data/types";
import { LearningBlock } from "./LearningBlock";

type LessonWorkspaceProps = {
  lesson: Lesson;
  sources: Source[];
  completed: boolean;
  nextLesson: Lesson | null;
  onToggleCompleted: () => void;
  onOpenLesson: (lessonId: string) => void;
};

export function LessonWorkspace({
  lesson,
  sources,
  completed,
  nextLesson,
  onToggleCompleted,
  onOpenLesson,
}: LessonWorkspaceProps) {
  return (
    <article
      className="min-w-0 overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-sm"
      id={`lesson-${lesson.id}`}
    >
      <div className="border-b border-slate-100 p-6 md:p-8">
        <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">
              Aktuelle Lektion · {completed ? "erledigt" : "offen"}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-nim-primary md:text-5xl">
              {lesson.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-nim-secondary">
              {lesson.description}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-black ${
              completed
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-100 text-nim-primary"
            }`}
          >
            {completed ? "✓ Erledigt" : `Lektion ${lesson.order}`}
          </span>
        </div>
      </div>

      <div className="grid min-w-0 gap-5 p-6 md:p-8 xl:grid-cols-[minmax(0,1fr)_minmax(240px,280px)]">
        <div className="min-w-0 space-y-5">
          <LearningBlock
            title="1. Ziel"
            text="Verstehe diese Lektion so gut, dass du sie einer anderen Person in einfachen Worten erklären kannst."
          />
          <LearningBlock
            title="2. Kurz erklärt"
            text={lesson.content ?? lesson.description ?? "Diese Lektion wird gerade vorbereitet."}
            large
          />
          <div className="grid gap-4 md:grid-cols-2">
            <LearningBlock
              title="3. Mini-Aufgabe"
              text="Formuliere in einem Satz: Was ist die wichtigste Idee dieser Lektion? Schreibe sie für dich auf, bevor du weitergehst."
            />
            <LearningBlock
              title="4. Checkfrage"
              text="Würdest du diese KI-Antwort blind übernehmen oder erst prüfen? Begründe deine Entscheidung kurz."
            />
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-sm leading-7 text-emerald-950">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-700">
              Sicher nutzen
            </p>
            <p className="mt-3 font-semibold">
              Prüfe wichtige Aussagen und gib keine vertraulichen Daten in KI-Systeme ein.
            </p>
          </div>

          <section
            data-testid="lesson-sources"
            aria-labelledby={`lesson-${lesson.id}-sources-title`}
            className="rounded-3xl border border-slate-200 bg-white p-5"
          >
            <h3
              id={`lesson-${lesson.id}-sources-title`}
              className="text-xs font-black uppercase tracking-widest text-nim-secondary"
            >
              Quellen dieser Lektion
            </h3>

            <p className="mt-3 text-sm leading-7 text-nim-secondary">
              Diese freigegebenen Primärquellen stützen die fachlichen Kernaussagen dieser Lektion.
            </p>

            <ul className="mt-4 space-y-3">
              {sources.map((source) => (
                <li key={source.id}>
                  <a
                    data-source-id={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block min-h-11 break-words rounded-2xl bg-slate-50 p-4 hover:bg-slate-100"
                  >
                    <span className="block text-sm font-black text-nim-primary">
                      {source.name}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-nim-secondary">
                      {source.publisher} · {source.sourceType}
                    </span>
                    <span className="mt-2 block text-xs text-nim-secondary">
                      Geprüft am {source.lastReviewed.split("-").reverse().join(".")}
                    </span>
                    <span className="sr-only">
                      {" "}– öffnet in einem neuen Tab
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">
              Aktion
            </p>
            <button
              type="button"
              onClick={onToggleCompleted}
              className="mt-4 w-full rounded-2xl bg-nim-primary px-5 py-4 text-sm font-black text-white hover:bg-nim-primary/90"
            >
              {completed ? "Erledigt zurücknehmen" : "Als erledigt markieren"}
            </button>

            {nextLesson && (
              <button
                type="button"
                onClick={() => onOpenLesson(nextLesson.id)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-nim-primary hover:border-nim-primary/30"
              >
                Danach: Lektion {nextLesson.order}
              </button>
            )}
          </div>

          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
            <p className="font-black text-amber-950">Merksatz</p>
            <p className="mt-2 font-semibold">
              Gute KI-Nutzung heißt: erst verstehen, dann ausprobieren, dann prüfen.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
