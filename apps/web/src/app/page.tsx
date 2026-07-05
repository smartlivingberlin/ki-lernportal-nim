"use client";

import { useEffect, useMemo, useState } from "react";
import { seedGlossary } from "../data/glossary";
import { seedLearningPaths } from "../data/learning-paths";
import { seedResources } from "../data/resources";
import { seedSources } from "../data/sources";

type LearningPathItem = (typeof seedLearningPaths)[number];
type LessonItem = LearningPathItem["lessons"][number];
type ResourceItem = (typeof seedResources)[number];

const progressStorageKey = "ki-lernportal-nim:local-progress:v1";
const emptyLessons: LessonItem[] = [];

const entryOptions = [
  {
    id: "neu",
    label: "Ich bin ganz neu bei KI",
    title: "Wir fangen ohne Vorwissen an",
    description:
      "Du bekommst einfache Erklärungen, kurze Beispiele und eine erste sichere Übung mit KI.",
    target: "Für Menschen ohne KI-Vorkenntnisse",
    href: "#dashboard",
  },
  {
    id: "alltag",
    label: "Ich möchte KI im Alltag nutzen",
    title: "KI für einfache Aufgaben im Alltag",
    description:
      "Für E-Mails, kurze Texte, Planung, Ideen und einfache Erklärungen, die du besser verstehen möchtest.",
    target: "Für Alltag, Familie, Organisation und persönliche Aufgaben",
    href: "#lernreise",
  },
  {
    id: "beruf",
    label: "Ich möchte KI im Beruf ausprobieren",
    title: "Beruflich ausprobieren, ohne dich zu verrennen",
    description:
      "Für bessere Formulierungen, Vorbereitung, Struktur, Recherche und Organisation — mit klaren Grenzen.",
    target: "Für Beruf, Selbstständigkeit und Organisationen",
    href: "#lernreise",
  },
  {
    id: "prompts",
    label: "Ich will bessere Fragen stellen",
    title: "Besser fragen, verständlichere Antworten bekommen",
    description:
      "Du lernst, wie ein guter Prompt aufgebaut ist und wie du Antworten gezielter steuerst.",
    target: "Für alle, die KI-Antworten gezielter steuern möchten",
    href: "#lernreise",
  },
  {
    id: "kurz",
    label: "Ich habe nur ein paar Minuten",
    title: "Ein kleiner Anfang reicht",
    description:
      "Starte mit einer kurzen Übung und nimm einen sicheren ersten Schritt mit.",
    target: "Für schnelle Orientierung ohne langen Kursstart",
    href: "#zehn-minuten",
  },
];

const tenMinuteSteps = [
  "Was ist KI?",
  "Was kann KI gut — und was nicht?",
  "Was ist ein Prompt?",
  "Eine sichere Frage an KI stellen",
  "Antwort prüfen: Was stimmt, was muss kontrolliert werden?",
];

const trustRules = [
  {
    title: "Keine sensiblen Daten eingeben",
    text: "Gib keine Passwörter, Bankdaten, Gesundheitsdaten, Kundendaten oder vertraulichen Dokumente in KI-Systeme ein.",
  },
  {
    title: "Antworten nicht blind übernehmen",
    text: "KI kann überzeugend klingen und trotzdem falsch liegen. Prüfe wichtige Aussagen immer nach.",
  },
  {
    title: "Bei wichtigen Entscheidungen Fachquellen nutzen",
    text: "Recht, Medizin, Finanzen, Steuern und Verträge brauchen geeignete Quellen oder fachliche Prüfung.",
  },
];

function readStoredProgress() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(progressStorageKey);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

const learningModules = [
  {
    title: "Modul 1: Verstehen",
    description: "Du verstehst, was KI ist, wo sie hilft und wie du sicher anfängst.",
    outcome: "Ziel: KI einfach einordnen und eine erste sichere Frage stellen.",
    duration: "ca. 18 Minuten",
    lessonIds: ["l1", "l2", "l3"],
  },
  {
    title: "Modul 2: Fragen stellen",
    description: "Du lernst Prompts, bessere Formulierungen und sichere Textarbeit.",
    outcome: "Ziel: bessere Prompts schreiben und Texte bewusster prüfen.",
    duration: "ca. 20 Minuten",
    lessonIds: ["l4", "l5", "l6"],
  },
  {
    title: "Modul 3: Prüfen",
    description: "Du sortierst Ideen, erkennst Halluzinationen und prüfst Quellen.",
    outcome: "Ziel: KI-Antworten nicht blind übernehmen, sondern wichtige Aussagen prüfen.",
    duration: "ca. 21 Minuten",
    lessonIds: ["l7", "l8", "l9"],
  },
  {
    title: "Modul 4: Sicher nutzen",
    description: "Du schützt Daten, erkennst Grenzen und machst den Abschluss-Check.",
    outcome: "Ziel: klare Vorsichtsbereiche erkennen und den eigenen Einstieg überprüfen.",
    duration: "ca. 20 Minuten",
    lessonIds: ["l10", "l11", "l12"],
  },
];

export default function Home() {
  const [selectedEntryId, setSelectedEntryId] = useState(entryOptions[0].id);
  const [openLessonId, setOpenLessonId] = useState<string | null>(
    seedLearningPaths[0]?.lessons[0]?.id ?? null,
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(readStoredProgress);

  const selectedEntry = entryOptions.find((entry) => entry.id === selectedEntryId) ?? entryOptions[0];
  const primaryPath = seedLearningPaths[0];
  const publicLearningPaths = seedLearningPaths.filter((path) => path.id !== "path-admin");
  const allLessons = primaryPath?.lessons ?? emptyLessons;
  const lessonIds = useMemo(() => allLessons.map((lesson) => lesson.id), [allLessons]);
  const validCompletedLessonIds = useMemo(
    () => completedLessonIds.filter((id, index, list) => lessonIds.includes(id) && list.indexOf(id) === index),
    [completedLessonIds, lessonIds],
  );
  const completedLessons = validCompletedLessonIds.length;
  const totalLessons = allLessons.length;
  const currentLesson = allLessons.find((lesson) => lesson.id === openLessonId) ?? allLessons[0];
  const currentLessonIndex = currentLesson ? allLessons.findIndex((lesson) => lesson.id === currentLesson.id) : -1;
  const followingLesson = currentLessonIndex >= 0 ? allLessons[currentLessonIndex + 1] ?? null : allLessons[0] ?? null;
  const nextOpenLesson = allLessons.find((lesson) => !validCompletedLessonIds.includes(lesson.id)) ?? allLessons[0];
  const progressText = `${completedLessons}/${totalLessons || 12}`;
  const progressPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const beginnerResources = seedResources.slice(0, 4);
  const beginnerGlossary = seedGlossary.slice(0, 6);
  const reviewedSources = seedSources.slice(0, 5);

  useEffect(() => {
    try {
      window.localStorage.setItem(progressStorageKey, JSON.stringify(validCompletedLessonIds));
    } catch {
      // Progress still works in memory when localStorage is unavailable.
    }
  }, [validCompletedLessonIds]);

  const markLessonDone = (lessonId: string) => {
    setCompletedLessonIds((previous) => {
      if (previous.includes(lessonId)) return previous.filter((id) => id !== lessonId);
      return [...previous, lessonId];
    });
  };

  const resetProgress = () => {
    setCompletedLessonIds([]);
    setOpenLessonId(allLessons[0]?.id ?? null);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-nim-primary focus:shadow-lg"
      >
        Zum Inhalt springen
      </a>

      <header className="sticky top-0 z-50 border-b border-nim-border bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-nim-secondary">
              KI-Lernportal NIM
            </p>
            <p className="mt-1 text-sm font-semibold text-nim-primary">
              Kostenlose KI-Hilfe. Ruhig erklärt. Sicher ausprobiert.
            </p>
          </div>

          <nav className="flex flex-wrap gap-2 text-sm font-bold text-nim-primary" aria-label="Hauptnavigation">
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#dashboard">
              Dashboard
            </a>
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#lernreise">
              Lernen
            </a>
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#zehn-minuten">
              5-Minuten-Hilfe
            </a>
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#ressourcen">
              Quellen
            </a>
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#vertrauen">
              Grenzen
            </a>
          </nav>
        </div>
      </header>

      <main id="inhalt" className="mx-auto max-w-7xl space-y-14 px-5 py-8 md:px-8 md:py-12">
        <section className="relative overflow-hidden rounded-[2rem] premium-gradient px-6 py-10 text-white shadow-2xl md:px-12 md:py-16">
          <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/80">
            Private Demo — noch kein öffentlicher Launch
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex rounded-full border border-white/15 bg-white/15 px-3 py-2 text-xs font-black uppercase tracking-widest">
                Portal-Demo für den sicheren KI-Einstieg
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                KI verstehen — als Lernreise, nicht als Textwand.
              </h1>

              <p className="max-w-2xl text-lg font-medium leading-8 text-white/85 md:text-xl">
                Dieses private Demo-Portal führt dich durch 12 kurze Lektionen. Du startest ohne Konto,
                lernst sichere Prompts und siehst direkt, wo KI hilft — und wo du prüfen musst.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href="#dashboard"
                  className="inline-flex justify-center rounded-2xl bg-white px-6 py-4 text-base font-black text-nim-primary shadow-lg transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Zum Dashboard
                </a>
                <a
                  href="#lernreise"
                  className="inline-flex justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-black text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  12 Lektionen ansehen
                </a>
              </div>
            </div>

            <PortalStatusCard totalLessons={totalLessons} progressText={progressText} progressPercent={progressPercent} />
          </div>
        </section>

        <section id="dashboard" className="grid gap-6 scroll-mt-28 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="depth-card rounded-[2rem] p-7 md:p-8">
            <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Dein Lern-Dashboard</p>
            <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black leading-tight text-nim-primary md:text-4xl">
                  {primaryPath?.title ?? "KI-Start für absolute Anfänger"}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-8 text-nim-secondary">
                  Dein Fortschritt wird nur lokal in diesem Browser gespeichert. Es gibt kein Konto,
                  keine Datenbank und keine Übertragung an einen Server.
                </p>
              </div>
              <div className="rounded-3xl border border-nim-border bg-white p-5 text-center shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Fortschritt</p>
                <p className="mt-2 text-4xl font-black text-nim-primary">{progressText}</p>
                <p className="mt-1 text-xs font-semibold text-nim-secondary">
                  {completedLessons} von {totalLessons || 12} Lektionen erledigt
                </p>
              </div>
            </div>

            <div className="mt-7 h-3 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
              <div className="h-full rounded-full bg-nim-primary transition-all" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <DashboardStat title="Lernpfad" value={`${totalLessons || 12} Lektionen`} text="kompletter Anfängerpfad" />
              <DashboardStat title="Aktuelle Station" value={currentLesson ? `Lektion ${currentLesson.order}` : "Lektion 1"} text={currentLesson?.title ?? "Was ist KI?"} />
              <DashboardStat title="Erledigt" value={`${progressPercent}%`} text="nur lokal gespeichert" />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={nextOpenLesson ? `#lesson-${nextOpenLesson.id}` : "#lernreise"}
                onClick={() => nextOpenLesson && setOpenLessonId(nextOpenLesson.id)}
                className="inline-flex justify-center rounded-2xl bg-nim-primary px-6 py-4 text-sm font-black text-white transition hover:bg-nim-primary/90"
              >
                {nextOpenLesson ? `Weiterlernen: Lektion ${nextOpenLesson.order}` : "Lernreise öffnen"}
              </a>
              <button
                type="button"
                onClick={resetProgress}
                className="inline-flex justify-center rounded-2xl border border-nim-border bg-white px-6 py-4 text-sm font-black text-nim-primary transition hover:border-nim-primary/30"
              >
                Fortschritt zurücksetzen
              </button>
            </div>
          </article>

          <article className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7 md:p-8">
            <p className="text-xs font-black uppercase tracking-widest text-blue-700">Aktive Lektion</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-blue-950">
              {currentLesson?.title ?? "Was ist KI?"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-blue-900">
              {currentLesson?.description ?? "Eine einfache Einführung in die Welt der künstlichen Intelligenz."}
            </p>
            <div className="mt-5 rounded-2xl bg-white/70 p-4 text-sm font-semibold leading-7 text-blue-950">
              Erst verstehen. Dann ausprobieren. Danach abhaken, wenn du die Lektion nachvollziehen kannst.
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={currentLesson ? `#lesson-${currentLesson.id}` : "#lernreise"}
                className="inline-flex justify-center rounded-2xl bg-blue-950 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-900"
              >
                Aktive Lektion öffnen
              </a>
              {followingLesson && (
                <a
                  href={`#lesson-${followingLesson.id}`}
                  onClick={() => setOpenLessonId(followingLesson.id)}
                  className="inline-flex justify-center rounded-2xl border border-blue-200 bg-white/70 px-5 py-4 text-sm font-black text-blue-950 transition hover:bg-white"
                >
                  Danach: Lektion {followingLesson.order}
                </a>
              )}
            </div>
          </article>
        </section>

        <section id="einstieg" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Was möchtest du heute schaffen?"
            title="Wähle deinen Startpunkt im Portal."
            description="Du musst nicht wissen, wo du anfangen sollst. Das Portal schlägt dir einen passenden Einstieg vor."
          />

          <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid gap-3">
              {entryOptions.map((entry) => {
                const active = selectedEntryId === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedEntryId(entry.id)}
                    className={`rounded-3xl border p-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nim-accent ${
                      active
                        ? "border-nim-primary bg-nim-primary text-white shadow-lg"
                        : "border-nim-border bg-white hover:border-nim-primary/30 hover:shadow-sm"
                    }`}
                  >
                    <span className={`text-xs font-black uppercase tracking-widest ${active ? "text-white/70" : "text-nim-secondary"}`}>
                      {entry.target}
                    </span>
                    <span className="mt-2 block text-lg font-black">{entry.label}</span>
                  </button>
                );
              })}
            </div>

            <article className="depth-card rounded-3xl p-7">
              <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Empfohlener Start</p>
              <h3 className="mt-2 text-3xl font-black text-nim-primary">{selectedEntry.title}</h3>
              <p className="mt-4 text-base leading-8 text-nim-secondary">{selectedEntry.description}</p>
              <a
                href={selectedEntry.href}
                className="mt-6 inline-flex rounded-2xl bg-nim-primary px-5 py-4 text-sm font-black text-white transition hover:bg-nim-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nim-accent"
              >
                Diesen Weg öffnen
              </a>

              <div className="mt-7 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
                <span className="font-black">Merksatz:</span> Du musst nicht alles verstehen, bevor du anfängst.
                Wichtig ist ein kleiner, sicherer erster Schritt.
              </div>
            </article>
          </div>
        </section>

        <section id="zehn-minuten" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Soforthilfe"
            title="Die 5-Minuten-Hilfe"
            description="Eine kurze Hilfe, die nicht überfordert: erst verstehen, dann ausprobieren, dann prüfen."
          />

          <div className="rounded-[2rem] border border-nim-border bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-2xl font-black text-nim-primary">Nach 5 Minuten kannst du drei Dinge besser:</h3>
            <ol className="mt-5 grid gap-3 text-sm font-semibold leading-7 text-nim-secondary md:grid-cols-3">
              <li className="rounded-2xl bg-slate-50 p-4">Du kannst in einfachen Worten erklären, was KI ist.</li>
              <li className="rounded-2xl bg-slate-50 p-4">Du weißt, wofür KI nützlich ist — und wo du vorsichtig sein musst.</li>
              <li className="rounded-2xl bg-slate-50 p-4">Du kannst eine erste sichere Frage stellen, ohne private Daten einzugeben.</li>
            </ol>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Du musst danach kein Experte sein. Ziel ist nur: sicher anfangen, nicht alles auf einmal verstehen.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {tenMinuteSteps.map((step, index) => (
              <div key={step} className="depth-card rounded-3xl p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-nim-primary text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-black leading-6 text-nim-primary">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="begleiter" className="grid gap-6 scroll-mt-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-nim-primary p-8 text-white">
            <p className="text-xs font-black uppercase tracking-widest text-white/70">Der Lernbegleiter-Gedanke</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Erst verstehen. Dann ausprobieren. Dann prüfen.
            </h2>
            <p className="mt-5 leading-8 text-white/80">
              Das Portal ist so aufgebaut, dass es dich Schritt für Schritt begleitet. Ein echter interaktiver
              KI-Begleiter ist für spätere Ausbaustufen vorgesehen.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard
              icon="💬"
              title="Erklärt einfacher"
              text="Begriffe werden in normaler Sprache und mit Beispielen erklärt."
            />
            <InfoCard
              icon="🧭"
              title="Gibt nächste Schritte"
              text="Du bekommst kleine, machbare Schritte statt einer großen Theorieübersicht."
            />
            <InfoCard
              icon="🛡️"
              title="Erinnert an Grenzen"
              text="Du lernst, was du prüfen solltest und welche Daten nicht in KI-Systeme gehören."
            />
          </div>
        </section>

        <section id="lernpfade" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Mehr Hilfe finden"
            title="Wenn du weiterlernen möchtest"
            description="Die Pfade bleiben erhalten, aber der aktive Anfängerpfad steht jetzt als Lernreise im Vordergrund."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {publicLearningPaths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <section id="lernreise" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Lernreise"
            title="12 Lektionen für den sicheren KI-Einstieg"
            description="Die Lektionen sind in vier einfache Module gegliedert. Du kannst jede Lektion lokal als erledigt markieren und den Fortschritt jederzeit zurücksetzen."
          />

          <div className="grid gap-5">
            {learningModules.map((module, moduleIndex) => {
              const moduleLessons = allLessons.filter((lesson) => module.lessonIds.includes(lesson.id));
              const firstOpenModuleLesson = moduleLessons.find((lesson) => !validCompletedLessonIds.includes(lesson.id)) ?? moduleLessons[0];
              const moduleCompletedCount = moduleLessons.filter((lesson) => validCompletedLessonIds.includes(lesson.id)).length;
              return (
                <article key={module.title} className="rounded-[2rem] border border-nim-border bg-white p-5 shadow-sm md:p-6">
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.55fr] lg:items-start">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">{module.title}</p>
                      <h3 className="mt-2 text-2xl font-black text-nim-primary">{module.description}</h3>
                      <p className="mt-3 text-sm font-semibold leading-7 text-nim-secondary">{module.outcome}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <div className="grid gap-3 text-sm font-bold text-nim-primary sm:grid-cols-3 lg:grid-cols-1">
                        <span>{moduleCompletedCount}/{moduleLessons.length} erledigt</span>
                        <span>{module.duration}</span>
                        <span>Modul {moduleIndex + 1} von {learningModules.length}</span>
                      </div>
                      {firstOpenModuleLesson && (
                        <a
                          href={`#lesson-${firstOpenModuleLesson.id}`}
                          onClick={() => setOpenLessonId(firstOpenModuleLesson.id)}
                          className="mt-4 inline-flex rounded-2xl bg-nim-primary px-4 py-3 text-sm font-black text-white transition hover:bg-nim-primary/90"
                        >
                          Modul fortsetzen
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {moduleLessons.map((lesson, index) => (
                      <LessonAccordion
                        key={lesson.id}
                        lesson={lesson}
                        lessonNumber={lesson.order}
                        moduleLessonNumber={index + 1}
                        open={openLessonId === lesson.id}
                        completed={validCompletedLessonIds.includes(lesson.id)}
                        onToggle={() => setOpenLessonId(openLessonId === lesson.id ? null : lesson.id)}
                        onToggleCompleted={() => markLessonDone(lesson.id)}
                      />
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="glossar" className="grid gap-6 scroll-mt-28 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow="Wörterbuch"
            title="Fachwörter erst dann, wenn sie dir helfen"
            description="Begriffe wie Prompt, Halluzination oder Quellenbezug werden nicht am Anfang vorausgesetzt. Sie werden kurz erklärt."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {beginnerGlossary.map((item) => (
              <div key={item.id} className="rounded-2xl border border-nim-border bg-white p-5 shadow-sm">
                <h3 className="font-black text-nim-primary">{item.term}</h3>
                <p className="mt-2 text-sm leading-7 text-nim-secondary">{item.definition}</p>
                <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-6 text-slate-600">
                  <span className="font-black">Beispiel:</span> {item.example}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="ressourcen" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Quellenraum"
            title="Seriöse Quellen und Lernangebote zum Weiterlernen"
            description="Diese Links führen zu externen Angeboten. Prüfe dort immer selbst, ob ein Konto nötig ist, ob Kosten entstehen und welche Datenschutzregeln gelten."
          />

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm font-semibold leading-7 text-blue-900">
            Tipp: Starte nicht mit zu vielen Quellen. Wähle erst ein Angebot, das zu deinem aktuellen Ziel passt.
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {beginnerResources.map((resource) => (
              <ResourceMiniCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>

        <section id="vertrauen" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Vertrauen & Grenzen"
            title="Sicherer Umgang mit KI beginnt mit drei Regeln"
            description="KI kann helfen. Trotzdem solltest du wichtige Antworten prüfen und sensible Daten schützen."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {trustRules.map((rule) => (
              <div key={rule.title} className="rounded-3xl border border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
                <h3 className="font-black text-amber-950">{rule.title}</h3>
                <p className="mt-2 font-semibold">{rule.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-nim-border bg-white p-6 shadow-sm">
            <h3 className="font-black text-nim-primary">Quellenstatus</h3>
            <p className="mt-2 text-sm leading-7 text-nim-secondary">
              Die folgenden Referenzen zeigen, welche Grundlagen im Portal eingeordnet werden. Der private Demo-Stand ersetzt keine Prüfung im Einzelfall.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {reviewedSources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm transition hover:border-nim-primary/30 hover:bg-white"
                >
                  <span className="block font-black text-nim-primary">{source.name}</span>
                  <span className="mt-1 block text-xs text-nim-secondary">{source.sourceType}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-nim-border bg-white px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-nim-secondary md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-lg font-black text-nim-primary">KI-Lernportal NIM</h2>
            <p className="mt-2 max-w-2xl leading-7">
              Lern- und Orientierungsportal für KI-Kompetenz in Alltag, Beruf und Organisation. Aktueller Stand:
              private Demo mit statischen Inhalten, ohne Nutzerkonto und mit Fortschritt nur im Browser.
            </p>
            <p className="mt-2 text-xs leading-6">
              Inhalte sorgfältig prüfen. Externe Links führen aus dem Portal heraus.
            </p>
          </div>

          <nav className="flex flex-col gap-2 font-bold md:items-end" aria-label="Rechtliche Links">
            <a href="#inhalt" className="text-nim-primary hover:underline">Nach oben</a>
            <a href="/impressum" className="text-nim-primary hover:underline">Impressum</a>
            <a href="/datenschutz" className="text-nim-primary hover:underline">Datenschutz</a>
            <a href="/kontakt" className="text-nim-primary hover:underline">Kontakt & Fehler melden</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-nim-secondary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-nim-primary md:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-8 text-nim-secondary">{description}</p>
    </div>
  );
}

function PortalStatusCard({
  totalLessons,
  progressText,
  progressPercent,
}: {
  totalLessons: number;
  progressText: string;
  progressPercent: number;
}) {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
      <p className="text-xs font-black uppercase tracking-widest text-white/70">Portalstatus</p>
      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <span className="block text-3xl font-black">{progressText}</span>
          <span className="mt-1 block text-sm font-semibold text-white/75">Fortschritt nur in diesem Browser</span>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <span className="block text-3xl font-black">{progressPercent}%</span>
          <span className="mt-1 block text-sm font-semibold text-white/75">lokal erledigt</span>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <span className="block text-3xl font-black">{totalLessons || 12}</span>
          <span className="mt-1 block text-sm font-semibold text-white/75">Lektionen im Anfängerpfad</span>
        </div>
      </div>
    </div>
  );
}

function DashboardStat({ title, value, text }: { title: string; value: string; text: string }) {
  return (
    <div className="rounded-3xl border border-nim-border bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">{title}</p>
      <p className="mt-2 text-xl font-black text-nim-primary">{value}</p>
      <p className="mt-1 text-sm leading-6 text-nim-secondary">{text}</p>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <article className="depth-card rounded-3xl p-6">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-lg font-black text-nim-primary">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-nim-secondary">{text}</p>
    </article>
  );
}

function PathCard({ path }: { path: LearningPathItem }) {
  const disabled = path.status !== "active";

  return (
    <article className={`depth-card rounded-3xl p-6 ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-nim-secondary">
          {path.difficulty}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-nim-secondary">
          {path.lessons.length} Lektionen
        </span>
      </div>
      <h3 className="mt-4 text-xl font-black leading-tight text-nim-primary">{path.title}</h3>
      <p className="mt-3 text-sm leading-7 text-nim-secondary">{path.description}</p>
      <a
        href={disabled ? "#lernpfade" : "#lernreise"}
        className="mt-5 inline-flex rounded-xl bg-nim-primary px-4 py-3 text-sm font-black text-white transition hover:bg-nim-primary/90"
      >
        {disabled ? "Vorschau ansehen" : "Pfad ansehen"}
      </a>
    </article>
  );
}

function LessonAccordion({
  lesson,
  lessonNumber,
  moduleLessonNumber,
  open,
  completed,
  onToggle,
  onToggleCompleted,
}: {
  lesson: LessonItem;
  lessonNumber: number;
  moduleLessonNumber: number;
  open: boolean;
  completed: boolean;
  onToggle: () => void;
  onToggleCompleted: () => void;
}) {
  const contentId = `lesson-panel-${lesson.id}`;
  const anchorId = `lesson-${lesson.id}`;

  return (
    <article id={anchorId} className="rounded-3xl border border-nim-border bg-white shadow-sm scroll-mt-28">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full flex-col gap-3 p-5 text-left md:flex-row md:items-center md:justify-between"
      >
        <div className="flex gap-4">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white ${completed ? "bg-emerald-600" : "bg-nim-primary"}`}>
            {completed ? "✓" : lessonNumber}
          </span>
          <span>
            <span className="text-[10px] font-black uppercase tracking-widest text-nim-secondary">
              Lernkarte {moduleLessonNumber} im Modul · {completed ? "erledigt" : "offen"}
            </span>
            <span className="block text-lg font-black text-nim-primary">{lesson.title}</span>
            <span className="mt-1 block text-sm leading-6 text-nim-secondary">{lesson.description}</span>
          </span>
        </div>
        <span className="font-black text-nim-primary">{open ? "Schließen" : "Öffnen"}</span>
      </button>

      {open && (
        <div id={contentId} className="border-t border-nim-border p-5">
          <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-8 text-foreground">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-nim-secondary">Lektionskarte</p>
            <div className="whitespace-pre-line">{lesson.content}</div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onToggleCompleted}
              className="inline-flex justify-center rounded-2xl bg-nim-primary px-5 py-4 text-sm font-black text-white transition hover:bg-nim-primary/90"
            >
              {completed ? "Erledigt zurücknehmen" : "Als erledigt markieren"}
            </button>
            <a
              href="#dashboard"
              className="inline-flex justify-center rounded-2xl border border-nim-border bg-white px-5 py-4 text-sm font-black text-nim-primary transition hover:border-nim-primary/30"
            >
              Zurück zum Dashboard
            </a>
          </div>
        </div>
      )}
    </article>
  );
}

function ResourceMiniCard({ resource }: { resource: ResourceItem }) {
  return (
    <article className="rounded-3xl border border-nim-border bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">{resource.provider}</p>
      <h3 className="mt-2 text-xl font-black text-nim-primary">{resource.title}</h3>
      <p className="mt-3 text-sm leading-7 text-nim-secondary">{resource.benefit}</p>
      <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-600">
        <span className="font-black text-nim-primary">Geeignet für:</span> {resource.targetAudience}
      </p>
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex rounded-xl bg-nim-primary px-4 py-3 text-sm font-black text-white transition hover:bg-nim-primary/90"
      >
        Externes Angebot öffnen
      </a>
    </article>
  );
}
