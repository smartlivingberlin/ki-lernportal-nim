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
      className="rounded-[2rem] border border-sky-100 bg-sky-50 p-5 shadow-sm md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-widest text-sky-700">
            Neu hier?
          </p>

          <h2
            id="guided-start-title"
            className="mt-2 text-2xl font-black text-nim-primary"
          >
            So startest du in drei einfachen Schritten.
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">
            Du brauchst kein Konto und musst nichts einstellen. Nimm dir eine
            Lektion nach der anderen vor.
          </p>
        </div>

        <p
          aria-label={`${completedLessons} von ${safeTotalLessons} Lektionen erledigt`}
          className="w-fit shrink-0 rounded-full bg-white px-4 py-2 text-sm font-black text-nim-primary shadow-sm"
        >
          {completedLessons}/{safeTotalLessons} erledigt
        </p>
      </div>

      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            data-guided-step={index + 1}
            className="rounded-3xl border border-sky-100 bg-white p-5"
          >
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-nim-primary text-sm font-black text-white"
            >
              {index + 1}
            </div>

            <h3 className="mt-4 text-lg font-black text-nim-primary">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-nim-secondary">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-col gap-4 rounded-3xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold leading-7 text-nim-secondary">
          Dein Fortschritt bleibt ausschließlich in diesem Browser. Die
          Einstiegshilfe speichert keine zusätzlichen Angaben.
        </p>

        {lesson ? (
          <button
            type="button"
            data-testid="guided-start-open-lesson"
            onClick={() => onOpenLesson(lesson.id)}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-2xl bg-nim-primary px-5 py-3 text-sm font-black text-white hover:bg-nim-primary/90"
          >
            Empfohlene Lektion öffnen
          </button>
        ) : (
          <p
            data-testid="guided-start-complete"
            className="shrink-0 rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-black text-emerald-800"
          >
            Lernpfad abgeschlossen
          </p>
        )}
      </div>
    </section>
  );
}
