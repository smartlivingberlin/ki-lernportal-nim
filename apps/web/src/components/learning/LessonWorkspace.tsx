import { microUnitForLesson } from "../../data/micro-units";
import { practiceByLessonId } from "../../data/practice";
import type { Lesson, Source } from "../../data/types";
import { LearningBlock } from "./LearningBlock";
import { LessonPracticePanel } from "./LessonPracticePanel";

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
  const practice =
    practiceByLessonId[
      lesson.id as keyof typeof practiceByLessonId
    ];
  const microUnit = microUnitForLesson(lesson.id);

  const explainText = microUnit
    ? [
        `Warum nützlich: ${microUnit.whyUseful}`,
        "",
        `In einem Satz: ${microUnit.oneSentence}`,
        "",
        `Beispiel: ${microUnit.everydayExample}`,
        "",
        "Schritte:",
        ...microUnit.steps.map((step, index) => `${index + 1}. ${step}`),
        "",
        `Typischer Fehler: ${microUnit.commonMistake}`,
        "",
        `Sicherheit: ${microUnit.safetyNote}`,
      ].join("\n")
    : (lesson.content ?? lesson.description ?? "Diese Lektion wird gerade vorbereitet.");

  return (
    <article
      data-explain="lektion"
      className="min-w-0 overflow-hidden rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] shadow-[var(--shadow-lift)]"
      id={`lesson-${lesson.id}`}
    >
      <div className="border-b border-[var(--nim-border)] p-6 md:p-8">
        <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
              Aktuelle Lektion · {completed ? "erledigt" : "offen"}
              {microUnit ? " · Schema v2" : ""}
            </p>
            <h2
              id={`lesson-${lesson.id}-title`}
              tabIndex={-1}
              className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--nim-primary)] outline-none md:text-5xl"
            >
              {lesson.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--nim-secondary)]">
              {microUnit?.whyUseful ?? lesson.description}
            </p>
          </div>

          <span
            className={`w-fit rounded-[var(--nim-radius-md)] px-4 py-2 text-sm font-black ${
              completed
                ? "bg-[var(--nim-success-soft)] text-[var(--nim-primary-strong)]"
                : "bg-[var(--nim-surface-soft)] text-[var(--nim-primary)]"
            }`}
          >
            {completed ? "Erledigt" : `Lektion ${lesson.order}`}
          </span>
        </div>
      </div>

      <div className="grid min-w-0 gap-5 p-6 md:p-8 xl:grid-cols-[minmax(0,1fr)_minmax(240px,280px)]">
        <div className="min-w-0 space-y-5">
          <LearningBlock
            title="1. Ziel"
            text={
              microUnit?.teachBackPrompt
                ? `Verstehe diese Lektion so gut, dass du sie erklären kannst: ${microUnit.teachBackPrompt}`
                : "Verstehe diese Lektion so gut, dass du sie einer anderen Person in einfachen Worten erklären kannst."
            }
          />
          <LearningBlock
            title="2. Kurz erklärt"
            text={explainText}
            large
          />
          {practice ? (
            <LessonPracticePanel
              key={lesson.id}
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              practice={practice}
            />
          ) : (
            <LearningBlock
              title="3. Übung"
              text="Für diese Lektion wird die Übung gerade vorbereitet."
            />
          )}
        </div>

        <div className="min-w-0 space-y-4">
          <div className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-success)]/30 bg-[var(--nim-success-soft)] p-5 text-sm leading-7 text-[var(--foreground)]">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
              Sicher nutzen
            </p>
            <p className="mt-3 font-semibold">
              {microUnit?.safetyNote ??
                "Prüfe wichtige Aussagen und gib keine vertraulichen Daten in KI-Systeme ein."}
            </p>
          </div>

          <section
            data-testid="lesson-sources"
            aria-labelledby={`lesson-${lesson.id}-sources-title`}
            className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5"
          >
            <h3
              id={`lesson-${lesson.id}-sources-title`}
              className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]"
            >
              Quellen dieser Lektion
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--nim-secondary)]">
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
                    className="block min-h-11 break-words rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4 hover:bg-[var(--nim-primary-soft)]"
                  >
                    <span className="block text-sm font-black text-[var(--nim-primary)]">
                      {source.name}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-[var(--nim-secondary)]">
                      {source.publisher} · {source.sourceType}
                    </span>
                    <span className="mt-2 block text-xs text-[var(--nim-secondary)]">
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

          <div className="rounded-[var(--nim-radius-lg)] bg-[var(--nim-surface-soft)] p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
              Aktion
            </p>
            <button
              type="button"
              onClick={onToggleCompleted}
              className="mt-4 w-full rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-5 py-4 text-sm font-black text-white hover:bg-[var(--nim-primary-strong)]"
            >
              {completed ? "Erledigt zurücknehmen" : "Als erledigt markieren"}
            </button>

            {nextLesson && (
              <button
                type="button"
                onClick={() => onOpenLesson(nextLesson.id)}
                className="mt-3 w-full rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-5 py-4 text-sm font-black text-[var(--nim-primary)] hover:border-[var(--nim-primary)]"
              >
                Danach: Lektion {nextLesson.order}
              </button>
            )}
          </div>

          <div className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-accent)]/30 bg-[var(--nim-accent-soft)] p-5 text-sm leading-7 text-[var(--foreground)]">
            <p className="font-black">Merksatz</p>
            <p className="mt-2 font-semibold">
              {microUnit?.oneSentence ??
                "Gute KI-Nutzung heißt: erst verstehen, dann ausprobieren, dann prüfen."}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
