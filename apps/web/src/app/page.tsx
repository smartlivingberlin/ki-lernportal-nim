"use client";

import { useMemo, useState } from "react";
import { seedGlossary } from "../data/glossary";
import { seedLearningPaths } from "../data/learning-paths";
import { seedResources } from "../data/resources";
import { publicSources } from "../data/sources";
import { LessonWorkspace } from "../components/learning/LessonWorkspace";
import { ModuleNavigation } from "../components/learning/ModuleNavigation";
import { PortalHero } from "../components/learning/PortalHero";
import { ResourceCard } from "../components/learning/ResourceCard";
import { useLocalProgress } from "../hooks/useLocalProgress";

type LearningPathItem = (typeof seedLearningPaths)[number];
type LessonItem = LearningPathItem["lessons"][number];
type LearningModule = {
  title: string;
  label: string;
  description: string;
  outcome: string;
  duration: string;
  lessonIds: string[];
};

const emptyLessons: LessonItem[] = [];

const publicSourceById = new Map(
  publicSources.map((source) => [source.id, source]),
);

const learningModules: LearningModule[] = [
  {
    title: "Modul 1",
    label: "Verstehen",
    description: "Was KI ist, wo sie hilft und wie du sicher anfängst.",
    outcome: "KI einfach einordnen und eine erste sichere Frage stellen.",
    duration: "ca. 18 Min.",
    lessonIds: ["l1", "l2", "l3"],
  },
  {
    title: "Modul 2",
    label: "Fragen stellen",
    description: "Prompts, bessere Formulierungen und sichere Textarbeit.",
    outcome: "Bessere Prompts schreiben und Texte bewusster prüfen.",
    duration: "ca. 20 Min.",
    lessonIds: ["l4", "l5", "l6"],
  },
  {
    title: "Modul 3",
    label: "Prüfen",
    description: "Ideen sortieren, Halluzinationen erkennen und Quellen prüfen.",
    outcome: "KI-Antworten nicht blind übernehmen, sondern einordnen.",
    duration: "ca. 21 Min.",
    lessonIds: ["l7", "l8", "l9"],
  },
  {
    title: "Modul 4",
    label: "Sicher nutzen",
    description: "Daten schützen, Grenzen erkennen und den Abschluss-Check machen.",
    outcome: "Vorsichtsbereiche erkennen und den eigenen Einstieg überprüfen.",
    duration: "ca. 20 Min.",
    lessonIds: ["l10", "l11", "l12"],
  },
];

const fallbackModule: LearningModule = learningModules[0] ?? {
  title: "Modul 1",
  label: "Verstehen",
  description: "Sicher mit KI starten.",
  outcome: "Einen einfachen ersten Lernschritt machen.",
  duration: "ca. 18 Min.",
  lessonIds: [],
};

const trustRules = [
  "Keine Passwörter, Bankdaten, Gesundheitsdaten oder vertrauliche Dokumente eingeben.",
  "Wichtige Antworten immer prüfen, besonders bei Recht, Medizin, Finanzen und Verträgen.",
  "KI als Lernhilfe nutzen, nicht als endgültige Entscheidung.",
];

const workSteps = ["Ziel", "Erklären", "Üben", "Prüfen", "Erledigen"];

export default function Home() {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(seedLearningPaths[0]?.lessons[0]?.id ?? null);
  const [progressAnnouncement, setProgressAnnouncement] = useState("");
  const { completedLessonIds, setCompletedLessonIds } = useLocalProgress();

  const primaryPath = seedLearningPaths[0];
  const allLessons = primaryPath?.lessons ?? emptyLessons;
  const lessonIds = useMemo(() => allLessons.map((lesson) => lesson.id), [allLessons]);
  const validCompletedLessonIds = useMemo(
    () => completedLessonIds.filter((id, index, list) => lessonIds.includes(id) && list.indexOf(id) === index),
    [completedLessonIds, lessonIds],
  );
  const completedLessons = validCompletedLessonIds.length;
  const totalLessons = allLessons.length;
  const progressPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const progressText = `${completedLessons}/${totalLessons || 12}`;
  const activeLesson = allLessons.find((lesson) => lesson.id === activeLessonId) ?? allLessons[0] ?? null;
  const activeLessonSources = activeLesson
    ? activeLesson.sourceIds.flatMap((sourceId) => {
        const source = publicSourceById.get(sourceId);
        return source ? [source] : [];
      })
    : [];
  const activeLessonIndex = activeLesson ? allLessons.findIndex((lesson) => lesson.id === activeLesson.id) : -1;
  const nextLesson = activeLessonIndex >= 0 ? allLessons[activeLessonIndex + 1] ?? null : null;
  const nextOpenLesson = allLessons.find((lesson) => !validCompletedLessonIds.includes(lesson.id)) ?? null;
  const activeModule = activeLesson
    ? learningModules.find((module) => module.lessonIds.includes(activeLesson.id)) ?? fallbackModule
    : fallbackModule;
  const activeLessonIdForAction = activeLesson?.id ?? null;
  const reviewedSources = publicSources.slice(0, 4);
  const beginnerResources = seedResources.slice(0, 3);
  const beginnerGlossary = seedGlossary.slice(0, 5);

  const openLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
  };

  const toggleLessonDone = (lessonId: string) => {
    const lesson = allLessons.find((item) => item.id === lessonId);
    const wasCompleted = validCompletedLessonIds.includes(lessonId);
    const nextCompletedLessonIds = wasCompleted
      ? validCompletedLessonIds.filter((id) => id !== lessonId)
      : [...validCompletedLessonIds, lessonId];

    setCompletedLessonIds(nextCompletedLessonIds);
    setProgressAnnouncement(
      lesson
        ? `${lesson.title} wurde ${wasCompleted ? "wieder als offen markiert" : "als erledigt markiert"}.`
        : `Die Lektion wurde ${wasCompleted ? "wieder als offen markiert" : "als erledigt markiert"}.`,
    );
  };

  const resetProgress = () => {
    setCompletedLessonIds([]);
    setActiveLessonId(allLessons[0]?.id ?? null);
    setProgressAnnouncement("Der lokale Lernfortschritt wurde zurückgesetzt.");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <a
        href="#lernraum"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:block focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:font-black focus:text-nim-primary focus:shadow-xl"
      >
        Direkt zum Lerninhalt
      </a>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {progressAnnouncement}
      </p>

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full min-w-0 max-w-[1500px] flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div>
            <h1 className="text-xs font-black uppercase tracking-[0.28em] text-nim-primary">KI-Lernraum</h1>
            <p className="mt-1 text-sm font-bold text-nim-primary">Öffentlich erreichbare Konzeptdemo · kein Konto · Fortschritt nur im Browser</p>
          </div>
          <nav className="flex min-w-0 max-w-full flex-wrap gap-2 text-sm font-black text-nim-primary" aria-label="Portalnavigation">
            <a className="rounded-full bg-slate-100 px-4 py-2 hover:bg-slate-200" href="#lernraum">Lernraum</a>
            <a className="rounded-full bg-slate-100 px-4 py-2 hover:bg-slate-200" href="#pfad">Pfad</a>
            <a className="rounded-full bg-slate-100 px-4 py-2 hover:bg-slate-200" href="#coach">Coach</a>
            <a className="rounded-full bg-slate-100 px-4 py-2 hover:bg-slate-200" href="#quellen">Quellen</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid w-full min-w-0 max-w-[1500px] gap-5 px-4 py-5 lg:px-6 xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)_minmax(280px,320px)]">
        <section
          id="lernraum"
          aria-labelledby="lernraum-title"
          tabIndex={-1}
          className="min-w-0 scroll-mt-52 space-y-5 focus:outline-none lg:scroll-mt-32 xl:col-start-2 xl:row-start-1"
        >
          <section className="overflow-hidden rounded-[2.4rem] bg-nim-primary text-white shadow-xl">
            <div className="grid min-w-0 gap-5 p-6 md:grid-cols-[minmax(0,1fr)_minmax(220px,260px)] md:p-8">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white">Heute im Lernraum</p>
                <h2 id="lernraum-title" className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
                  Dein geführter KI-Lernraum.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white">
                  Starte mit einer Lektion, prüfe die wichtigsten Sicherheitsregeln und markiere deinen Fortschritt lokal im Browser.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-white">Aktuelles Modul</p>
                <p className="mt-3 text-2xl font-black">{activeModule.title}</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-white">{activeModule.outcome}</p>
              </div>
            </div>
          </section>

          {activeLesson ? (
            <LessonWorkspace
              lesson={activeLesson}
              sources={activeLessonSources}
              completed={validCompletedLessonIds.includes(activeLesson.id)}
              nextLesson={nextLesson}
              onToggleCompleted={() => activeLessonIdForAction && toggleLessonDone(activeLessonIdForAction)}
              onOpenLesson={openLesson}
            />
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black text-nim-primary">Noch keine Lektion ausgewählt</h2>
              <p className="mt-3 text-sm leading-7 text-nim-secondary">Wähle eine Lektion aus dem Lernpfad.</p>
            </div>
          )}

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Lernablauf</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {workSteps.map((step, index) => (
                <span key={step} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-nim-primary">
                  {index + 1}. {step}
                </span>
              ))}
            </div>
          </section>
        </section>

        <aside
          id="pfad"
          aria-label="Lernpfad und Fortschritt"
          className="min-w-0 scroll-mt-52 space-y-5 lg:scroll-mt-32 xl:col-start-1 xl:row-start-1 xl:sticky xl:top-[5.75rem] xl:self-start"
        >
          <PortalHero progressText={progressText} progressPercent={progressPercent} totalLessons={totalLessons} />

          <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Lernpfad</p>
                <h2 className="mt-1 text-2xl font-black text-nim-primary">KI-Start</h2>
              </div>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-black text-nim-primary hover:border-nim-primary/30"
              >
                Reset
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {learningModules.map((module) => {
                const moduleLessons = allLessons.filter((lesson) => module.lessonIds.includes(lesson.id));
                const moduleCompleted = moduleLessons.filter((lesson) => validCompletedLessonIds.includes(lesson.id)).length;
                return (
                  <ModuleNavigation
                    key={module.title}
                    module={module}
                    lessons={moduleLessons}
                    completedCount={moduleCompleted}
                    activeLessonId={activeLessonIdForAction}
                    completedLessonIds={validCompletedLessonIds}
                    onOpenLesson={openLesson}
                  />
                );
              })}
            </div>
          </section>
        </aside>

        <aside
          id="coach"
          aria-label="Sicherheits-Coach, nächste Lektion, Quellen und Begriffe"
          className="min-w-0 scroll-mt-52 space-y-5 lg:scroll-mt-32 xl:col-start-3 xl:row-start-1 xl:sticky xl:top-[5.75rem] xl:self-start"
        >
          <section className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Sicherheits-Coach</p>
            <h2 className="mt-2 text-2xl font-black text-emerald-950">Erst prüfen, dann übernehmen.</h2>
            <div className="mt-5 space-y-3">
              {trustRules.map((rule) => (
                <p key={rule} className="rounded-2xl bg-white/80 p-4 text-sm font-semibold leading-7 text-emerald-950">
                  {rule}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Als nächstes offen</p>
            <h2 className="mt-2 text-2xl font-black text-nim-primary">
              {nextOpenLesson ? `Lektion ${nextOpenLesson.order}` : "Pfad abgeschlossen"}
            </h2>
            <p className="mt-2 text-sm leading-7 text-nim-secondary">
              {nextOpenLesson
                ? `${nextOpenLesson.title} — markiere erledigte Lektionen, damit der nächste offene Schritt nach vorn springt.`
                : "Du hast alle Lektionen markiert. Wiederhole unsichere Stellen oder prüfe die Quellen."}
            </p>
            {nextOpenLesson && (
              <button
                type="button"
                onClick={() => openLesson(nextOpenLesson.id)}
                className="mt-4 w-full rounded-2xl bg-nim-primary px-4 py-3 text-sm font-black text-white hover:bg-nim-primary/90"
              >
                Zu dieser Lektion
              </button>
            )}
          </section>

          <section
            id="quellen"
            aria-labelledby="quellen-title"
            className="scroll-mt-52 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:scroll-mt-32"
          >
            <h2 id="quellen-title" className="text-xs font-black uppercase tracking-widest text-nim-secondary">
              Quellenraum
            </h2>
            <div className="mt-4 space-y-3">
              {reviewedSources.map((source) => (
                <a
                  key={source.id}
                  data-source-id={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block min-h-11 rounded-2xl bg-slate-50 p-4 text-sm hover:bg-slate-100"
                >
                  <span className="block font-black text-nim-primary">{source.name}</span>
                  <span className="mt-1 block text-xs text-nim-secondary">{source.sourceType}</span>
                  <span className="sr-only"> – öffnet in einem neuen Tab</span>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Begriffe</p>
            <div className="mt-4 space-y-3">
              {beginnerGlossary.map((item) => (
                <details key={item.id} className="rounded-2xl bg-slate-50 p-4">
                  <summary className="flex min-h-11 cursor-pointer items-center text-sm font-black text-nim-primary">
                    {item.term}
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-nim-secondary">{item.definition}</p>
                </details>
              ))}
            </div>
          </section>
        </aside>
      </main>

      <section
        aria-labelledby="weiterlernen-title"
        className="mx-auto max-w-[1500px] px-4 pb-10 lg:px-6"
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 id="weiterlernen-title" className="text-xs font-black uppercase tracking-widest text-nim-secondary">
            Weiterlernen ohne Überforderung
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {beginnerResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 lg:px-6">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-sm text-nim-secondary md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl leading-7">
            Öffentlich erreichbare Konzeptdemo mit statischen Inhalten. Der Lernfortschritt wird nur lokal im Browser gespeichert. Kein Konto,
            keine Lerndatenbank, kein Tracking und noch kein öffentlicher Produktlaunch.
          </p>
          <nav className="flex flex-wrap gap-3 font-black text-nim-primary" aria-label="Rechtliche Links">
            <a href="/impressum" className="inline-flex min-h-11 items-center hover:underline">Impressum</a>
            <a href="/datenschutz" className="inline-flex min-h-11 items-center hover:underline">Datenschutz</a>
            <a href="/kontakt" className="inline-flex min-h-11 items-center hover:underline">Kontakt</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
