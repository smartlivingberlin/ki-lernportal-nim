import type { Lesson } from "../../data/types";

type GuidedStartStepsProps = {
  lesson: Lesson | null;
  completedLessons: number;
  totalLessons: number;
  onOpenLesson: (lessonId: string) => void;
};

export function GuidedStartSteps({
  lesson,
  completedLessons,
  totalLessons,
  onOpenLesson,
}: GuidedStartStepsProps) {
  const safeTotalLessons = totalLessons || 12;

  const steps = [
    {
      title: "Empfehlung öffnen",
      text: lesson
        ? `Öffne zuerst „${lesson.title}“. Das ist deine nächste noch offene Lektion.`
        : "Du hast alle Lektionen erledigt. Wähle ein Thema zum Wiederholen aus.",
    },
    {
      title: "Lesen und ausprobieren",
      text: "Lies die kurze Erklärung. Bearbeite danach die Mini-Aufgabe und die Checkfrage in deinen eigenen Worten.",
    },
    {
      title: "Fortschritt markieren",
      text: "Klicke am Ende auf „Als erledigt markieren“. Danach zeigt dir das Portal automatisch die nächste offene Lektion.",
    },
  ];

  return (
    <section
      data-testid="guided-start-steps"
      aria-labelledby="guided-start-title"
      className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-primary-soft)] p-5 shadow-[var(--shadow-lift)] md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">
            Nächste Lektion
          </p>

          <h2
            id="guided-start-title"
            className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]"
          >
            So bearbeitest du eine Lektion in drei Schritten.
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--nim-secondary)]">
            Das ist der Lektions-Ablauf — getrennt vom Portal-Einstieg
            (Selbstcheck → 60-Minuten-Pfad → Wiederholen). Kein Konto nötig.
          </p>
        </div>

        <p
          aria-label={`${completedLessons} von ${safeTotalLessons} Lektionen erledigt`}
          className="w-fit shrink-0 rounded-[var(--nim-radius-md)] bg-[var(--nim-surface)] px-4 py-2 text-sm font-black text-[var(--nim-primary)] shadow-sm"
        >
          {completedLessons}/{safeTotalLessons} erledigt
        </p>
      </div>

      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            data-guided-step={index + 1}
            className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5"
          >
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] text-sm font-black text-white"
            >
              {index + 1}
            </div>

            <h3 className="mt-4 text-lg font-black text-[var(--nim-primary)]">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-col gap-4 rounded-[var(--nim-radius-lg)] bg-[var(--nim-surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold leading-7 text-[var(--nim-secondary)]">
          Dein Fortschritt bleibt ausschließlich in diesem Browser. Die
          Einstiegshilfe speichert keine zusätzlichen Angaben.
        </p>

        {lesson ? (
          <button
            type="button"
            data-testid="guided-start-open-lesson"
            onClick={() => onOpenLesson(lesson.id)}
            className="nim-interactive inline-flex min-h-11 shrink-0 items-center justify-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-5 py-3 text-sm font-black text-white"
          >
            Empfohlene Lektion öffnen
          </button>
        ) : (
          <p
            data-testid="guided-start-complete"
            className="shrink-0 rounded-[var(--nim-radius-md)] bg-[var(--nim-success-soft)] px-4 py-3 text-sm font-black text-[var(--nim-success)]"
          >
            Lernpfad abgeschlossen
          </p>
        )}
      </div>
    </section>
  );
}
