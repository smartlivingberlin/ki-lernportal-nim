"use client";

import { useEffect, useMemo, useState } from "react";
import { seedGlossary } from "../data/glossary";
import { seedLearningPaths } from "../data/learning-paths";
import { seedResources } from "../data/resources";
import { publicSources } from "../data/sources";
import { themeWorlds } from "../data/theme-worlds";
import { learningMethods } from "../data/learning-methods";
import {
  challengesByDomain,
  challengesForLesson,
  challengesForWorld,
  interactiveChallenges,
} from "../data/interactive-challenges";
import {
  microUnitForLesson,
  microUnitsForWorld,
  worldHasMicroUnits,
  worldsWithMicroUnits,
} from "../data/micro-units";
import type { MicroLearningUnitV2, ThemeWorld } from "../data/types";
import { LessonWorkspace } from "../components/learning/LessonWorkspace";
import { ModuleNavigation } from "../components/learning/ModuleNavigation";
import { PortalHero } from "../components/learning/PortalHero";
import { TodayStartCard } from "../components/learning/TodayStartCard";
import { GuidedStartSteps } from "../components/learning/GuidedStartSteps";
import { LocalSearchPanel } from "../components/learning/LocalSearchPanel";
import { ResourceCard } from "../components/learning/ResourceCard";
import { GoalNavigation } from "../components/learning/GoalNavigation";
import { InteractiveChallengeCard } from "../components/learning/InteractiveChallengeCard";
import { SimpleModeToggle } from "../components/learning/SimpleModeToggle";
import { MobileBottomNav } from "../components/learning/MobileBottomNav";
import { ThemeWorldTrack } from "../components/learning/ThemeWorldTrack";
import { MicroLearningUnitView } from "../components/learning/MicroLearningUnitView";
import { ModelNavigator } from "../components/learning/ModelNavigator";
import { LearningWorkspaces } from "../components/learning/LearningWorkspaces";
import { FirstStartCoach } from "../components/learning/FirstStartCoach";
import { ExplainCloud } from "../components/learning/ExplainCloud";
import { InlineGlossaryText } from "../components/learning/InlineGlossary";
import { useLocalProgress } from "../hooks/useLocalProgress";
import { useSimpleMode } from "../hooks/useSimpleMode";
import { designSystemMeta } from "../design/tokens";

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
  const [lessonFocusRequest, setLessonFocusRequest] = useState<{ lessonId: string } | null>(null);
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>("world-no-fear");
  const [activeMicroUnitId, setActiveMicroUnitId] = useState<string | null>("mu-nofear-01");
  const { enabled: simpleMode, setEnabled: setSimpleMode } = useSimpleMode();
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
  const recommendedModule = nextOpenLesson
    ? learningModules.find((module) => module.lessonIds.includes(nextOpenLesson.id)) ?? fallbackModule
    : null;
  const activeLessonIdForAction = activeLesson?.id ?? null;
  const reviewedSources = publicSources.slice(0, 4);
  const beginnerResources = seedResources.slice(0, 3);
  const beginnerGlossary = seedGlossary.slice(0, 5);
  const lessonChallenges = activeLesson
    ? challengesForLesson(activeLesson.id)
    : interactiveChallenges.slice(0, 1);
  const scenarioChallenges = (() => {
    const lessonIds = new Set(lessonChallenges.map((challenge) => challenge.id));
    const worldPool = selectedWorldId
      ? challengesForWorld(selectedWorldId).filter(
          (challenge) => !lessonIds.has(challenge.id),
        )
      : [];
    const domainPool = [
      ...challengesByDomain("alltag"),
      ...challengesByDomain("beruf"),
      ...challengesByDomain("sicherheit"),
    ].filter((challenge) => !lessonIds.has(challenge.id));
    const pool = worldPool.length > 0 ? worldPool : domainPool;
    return simpleMode ? pool.slice(0, 2) : pool.slice(0, 6);
  })();
  const visibleMethods = simpleMode ? learningMethods.slice(0, 4) : learningMethods.slice(0, 6);
  const selectedWorld =
    themeWorlds.find((world) => world.id === selectedWorldId) ?? themeWorlds[0] ?? null;
  const worldUnits = selectedWorldId ? microUnitsForWorld(selectedWorldId) : [];
  const activeMicroUnit =
    worldUnits.find((unit) => unit.id === activeMicroUnitId) ??
    (activeLesson ? microUnitForLesson(activeLesson.id) : null) ??
    worldUnits[0] ??
    null;
  const activeMicroSources = activeMicroUnit
    ? activeMicroUnit.sourceIds.flatMap((sourceId) => {
        const source = publicSourceById.get(sourceId);
        return source ? [source] : [];
      })
    : [];

  useEffect(() => {
    document.body.classList.toggle("simple-mode", simpleMode);
  }, [simpleMode]);

  useEffect(() => {
    if (!lessonFocusRequest) return;

    const heading = document.getElementById(
      `lesson-${lessonFocusRequest.lessonId}-title`,
    );

    heading?.focus();
  }, [activeLessonId, lessonFocusRequest]);

  const openLesson = (lessonId: string) => {
    const lesson = allLessons.find((item) => item.id === lessonId);

    setActiveLessonId(lessonId);
    setLessonFocusRequest({ lessonId });
    setProgressAnnouncement(
      lesson
        ? `${lesson.title} wurde geöffnet.`
        : "Die ausgewählte Lektion wurde geöffnet.",
    );
  };

  const selectWorld = (world: ThemeWorld) => {
    setSelectedWorldId(world.id);
    if (worldHasMicroUnits(world.id)) {
      const firstUnit = microUnitsForWorld(world.id)[0] ?? null;
      setActiveMicroUnitId(firstUnit?.id ?? null);
      if (firstUnit?.lessonId) {
        openLesson(firstUnit.lessonId);
      }
      setProgressAnnouncement(
        `Themenwelt „${world.title}“ mit ${microUnitsForWorld(world.id).length} Einheiten geöffnet.`,
      );
      return;
    }
    if (world.starterLessonId) {
      openLesson(world.starterLessonId);
      setProgressAnnouncement(`${world.title}: Einstieg geöffnet.`);
    } else {
      setProgressAnnouncement(`${world.title}: Inhalte folgen.`);
    }
  };

  const selectMicroUnit = (unit: MicroLearningUnitV2) => {
    setActiveMicroUnitId(unit.id);
    setSelectedWorldId(unit.worldId);
    if (unit.lessonId) {
      openLesson(unit.lessonId);
    }
    setProgressAnnouncement(`Micro-Einheit „${unit.title}“ geöffnet.`);
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
    setLessonFocusRequest(null);
    setProgressAnnouncement("Der lokale Lernfortschritt wurde zurückgesetzt.");
  };

  return (
    <div className="min-h-screen pb-24 text-[var(--foreground)] md:pb-0">
      <a
        href="#lernraum"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:block focus:rounded-xl focus:bg-[var(--nim-surface)] focus:px-4 focus:py-3 focus:font-black focus:text-[var(--nim-primary)] focus:shadow-xl"
      >
        Direkt zum Lerninhalt
      </a>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {progressAnnouncement}
      </p>

      <header className="sticky top-0 z-50 border-b border-[var(--nim-border)] bg-[var(--nim-surface)]/95 backdrop-blur">
        <div className="mx-auto flex w-full min-w-0 max-w-[1500px] flex-col gap-2 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-6 lg:py-4">
          <div className="min-w-0">
            <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--nim-primary)] sm:text-2xl md:text-3xl">
              KI-Lernportal NIM
            </h1>
            <p className="mt-0.5 text-xs font-bold text-[var(--nim-secondary)] sm:text-sm">
              Kostenlos · verständlich · kein Konto · Fortschritt nur im Browser
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
            <SimpleModeToggle enabled={simpleMode} onChange={setSimpleMode} />
            <nav className="flex min-w-0 max-w-full flex-wrap gap-2 text-sm font-black text-[var(--nim-primary)]" aria-label="Portalnavigation">
              <a className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] px-3 py-2 hover:bg-[var(--nim-primary-soft)] sm:px-4" href="#lernraum">Lernraum</a>
              <a className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] px-3 py-2 hover:bg-[var(--nim-primary-soft)] sm:px-4" href="#pfad">Pfad</a>
              <a className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] px-3 py-2 hover:bg-[var(--nim-primary-soft)] sm:px-4" href="#coach">Coach</a>
              <a className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] px-3 py-2 hover:bg-[var(--nim-primary-soft)] sm:px-4" href="#quellen">Quellen</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full min-w-0 max-w-[1500px] gap-5 px-4 py-5 lg:px-6 xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)_minmax(280px,320px)]">
        <section
          id="lernraum"
          aria-labelledby="lernraum-title"
          tabIndex={-1}
          className="min-w-0 scroll-mt-72 space-y-5 focus:outline-none sm:scroll-mt-64 lg:scroll-mt-36 xl:col-start-2 xl:row-start-1"
        >
          <section
            aria-label="Willkommen"
            className="portal-hero-plane relative overflow-hidden rounded-[var(--nim-radius-xl)] text-white shadow-[var(--shadow-lift)]"
          >
            <div className="grid min-w-0 gap-5 p-6 md:grid-cols-[minmax(0,1fr)_minmax(220px,260px)] md:p-8">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white">
                  KI verstehen. KI ausprobieren. KI für dich nutzen.
                </p>
                <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight md:text-5xl">
                  Dein geführter KI-Lernraum.
                </h2>
                <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-white">
                  Für Menschen mit Respekt vor Technik: klare Sprache, sichere Übungen,
                  spielerische Challenges und Schritt-für-Schritt-Hilfen — kostenlos und ohne Druck.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#ziele"
                    className="nim-interactive inline-flex min-h-12 items-center justify-center rounded-[var(--nim-radius-md)] bg-white px-5 py-3 text-sm font-black text-[var(--nim-primary)] hover:bg-[var(--nim-accent-soft)]"
                  >
                    Ziel wählen
                  </a>
                  <button
                    type="button"
                    onClick={() => nextOpenLesson && openLesson(nextOpenLesson.id)}
                    className="nim-interactive inline-flex min-h-12 items-center justify-center rounded-[var(--nim-radius-md)] border-2 border-white/70 bg-white/10 px-5 py-3 text-sm font-black text-white hover:bg-white/20"
                  >
                    Hier weitermachen
                  </button>
                </div>
              </div>
              <TodayStartCard
                lesson={nextOpenLesson}
                moduleTitle={recommendedModule?.title ?? null}
                completedLessons={completedLessons}
                totalLessons={totalLessons}
                onOpenLesson={openLesson}
              />
            </div>
          </section>

          <FirstStartCoach simpleMode={simpleMode} />

          <GoalNavigation
            worlds={themeWorlds}
            selectedWorldId={selectedWorldId}
            onSelectWorld={selectWorld}
            simpleMode={simpleMode}
            worldsReady={worldsWithMicroUnits}
          />

          {selectedWorldId && worldHasMicroUnits(selectedWorldId) && worldUnits.length > 0 ? (
            <ThemeWorldTrack
              worldTitle={selectedWorld?.title ?? "Themenwelt"}
              units={worldUnits}
              activeUnitId={activeMicroUnit?.id ?? null}
              onSelectUnit={selectMicroUnit}
              simpleMode={simpleMode}
            />
          ) : null}

          {activeMicroUnit && !activeMicroUnit.lessonId ? (
            <MicroLearningUnitView
              unit={activeMicroUnit}
              sources={activeMicroSources}
            />
          ) : null}

          <LearningWorkspaces simpleMode={simpleMode} />

          <section className="overflow-hidden rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-6 shadow-[var(--shadow-lift)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--nim-primary)]">Heute im Lernraum</p>
            <h2 id="lernraum-title" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
              Lernen mit Methode — nicht nur lesen
            </h2>
            <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-[var(--nim-secondary)]">
              Worked Examples, Abrufübungen, Alltagsszenen und Confidence-Checks helfen dir,
              KI wirklich zu verstehen und sicher anzuwenden.
            </p>
            {!simpleMode ? (
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {visibleMethods.map((method) => (
                  <li
                    key={method.id}
                    className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4"
                  >
                    <p className="text-sm font-black text-[var(--nim-primary)]">{method.plainName}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--nim-secondary)]">{method.summary}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          <GuidedStartSteps
            lesson={nextOpenLesson}
            completedLessons={completedLessons}
            totalLessons={totalLessons}
            onOpenLesson={openLesson}
          />

          {!simpleMode ? (
            <LocalSearchPanel
              lessons={allLessons}
              resources={seedResources}
              glossary={seedGlossary}
              onOpenLesson={openLesson}
            />
          ) : null}

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
            <div className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-8 shadow-[var(--shadow-lift)]">
              <h2 className="text-2xl font-black text-[var(--nim-primary)]">Noch keine Lektion ausgewählt</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--nim-secondary)]">Wähle eine Lektion aus dem Lernpfad.</p>
            </div>
          )}

          <section id="challenge" aria-label="Interaktive Challenges" className="scroll-mt-72 space-y-4 sm:scroll-mt-64 lg:scroll-mt-36">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                Challenges zur aktuellen Lektion
              </h2>
              <ExplainCloud tipId="challenge" compact />
            </div>
            {lessonChallenges.map((challenge) => (
              <InteractiveChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </section>

          <section
            id="szenarien"
            aria-labelledby="szenarien-title"
            className="scroll-mt-72 space-y-4 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 lg:scroll-mt-36"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
                Szenarien · Alltag & Beruf
              </p>
              <h2
                id="szenarien-title"
                className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
              >
                Echte Situationen üben
              </h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[var(--nim-secondary)]">
                Spielerische Entscheidungen mit Erklärung — kein Highscore, sondern Verständnis.
              </p>
            </div>
            {scenarioChallenges.map((challenge) => (
              <InteractiveChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </section>

          {!simpleMode ? <ModelNavigator /> : null}

          <section className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)]">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">Lernablauf</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {workSteps.map((step, index) => (
                <span key={step} className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] px-4 py-2 text-sm font-black text-[var(--nim-primary)]">
                  {index + 1}. {step}
                </span>
              ))}
            </div>
          </section>
        </section>

        <aside
          id="pfad"
          aria-label="Lernpfad und Fortschritt"
          className="min-w-0 scroll-mt-72 space-y-5 sm:scroll-mt-64 lg:scroll-mt-36 xl:col-start-1 xl:row-start-1 xl:sticky xl:top-32 xl:max-h-[calc(100vh-8rem)] xl:self-start xl:overflow-y-auto xl:pb-1 xl:pr-1"
        >
          <PortalHero progressText={progressText} progressPercent={progressPercent} totalLessons={totalLessons} />

          <section className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-4 shadow-[var(--shadow-lift)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">Lernpfad</p>
                <h2 className="mt-1 text-2xl font-black text-[var(--nim-primary)]">KI-Start</h2>
              </div>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-3 py-2 text-xs font-black text-[var(--nim-primary)] hover:border-[var(--nim-primary)]"
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
          className="min-w-0 scroll-mt-72 space-y-5 sm:scroll-mt-64 lg:scroll-mt-36 xl:col-start-3 xl:row-start-1 xl:sticky xl:top-32 xl:max-h-[calc(100vh-8rem)] xl:self-start xl:overflow-y-auto xl:pb-1 xl:pr-1"
        >
          <section className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-success)]/30 bg-[var(--nim-success-soft)] p-5 shadow-[var(--shadow-lift)]">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary-strong)]">Sicherheits-Coach</p>
            <h2 className="mt-2 text-2xl font-black text-[var(--foreground)]">Erst prüfen, dann übernehmen.</h2>
            <div className="mt-5 space-y-3">
              {trustRules.map((rule) => (
                <p key={rule} className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface)]/90 p-4 text-sm font-semibold leading-7 text-[var(--foreground)]">
                  <InlineGlossaryText text={rule} />
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)]">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">Als nächstes offen</p>
            <h2 className="mt-2 text-2xl font-black text-[var(--nim-primary)]">
              {nextOpenLesson ? `Lektion ${nextOpenLesson.order}` : "Pfad abgeschlossen"}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">
              {nextOpenLesson
                ? `${nextOpenLesson.title} — markiere erledigte Lektionen, damit der nächste offene Schritt nach vorn springt.`
                : "Du hast alle Lektionen markiert. Wiederhole unsichere Stellen oder prüfe die Quellen."}
            </p>
            {nextOpenLesson && (
              <button
                type="button"
                onClick={() => openLesson(nextOpenLesson.id)}
                className="mt-4 w-full rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 py-3 text-sm font-black text-white hover:bg-[var(--nim-primary-strong)]"
              >
                Zu dieser Lektion
              </button>
            )}
          </section>

          <section
            id="quellen"
            aria-labelledby="quellen-title"
            className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 lg:scroll-mt-36"
          >
            <h2 id="quellen-title" className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
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
                  className="block min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4 text-sm hover:bg-[var(--nim-primary-soft)]"
                >
                  <span className="block font-black text-[var(--nim-primary)]">{source.name}</span>
                  <span className="mt-1 block text-xs text-[var(--nim-secondary)]">{source.sourceType}</span>
                  <span className="sr-only"> – öffnet in einem neuen Tab</span>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)]">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">Begriffe</p>
              <ExplainCloud tipId="glossar" compact />
            </div>
            <p className="mt-2 text-sm font-medium leading-6 text-[var(--nim-secondary)]">
              Antippe unterstrichene Wörter im Text — oder öffne hier die Kurzdefinitionen.
            </p>
            <div className="mt-4 space-y-3">
              {beginnerGlossary.map((item) => (
                <details key={item.id} className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4">
                  <summary className="flex min-h-11 cursor-pointer items-center text-sm font-black text-[var(--nim-primary)]">
                    {item.term}
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">{item.definition}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">
                    <strong>Beispiel:</strong> {item.example}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </aside>
      </main>

      {!simpleMode ? (
        <section
          aria-labelledby="weiterlernen-title"
          className="mx-auto max-w-[1500px] px-4 pb-10 lg:px-6"
        >
          <div className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-6 shadow-[var(--shadow-lift)]">
            <h2 id="weiterlernen-title" className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
              Weiterlernen ohne Überforderung
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {beginnerResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="border-t border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 py-8 lg:px-6">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-sm text-[var(--nim-secondary)] md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl leading-7">
            Öffentlich erreichbare Konzeptdemo mit wachsenden Inhalten. Der Lernfortschritt wird nur lokal im Browser gespeichert. Kein Konto,
            keine Lerndatenbank, kein Tracking und noch kein öffentlicher Produktlaunch.
            Barrierefreiheitsziel: {designSystemMeta.accessibilityTarget}.
          </p>
          <nav className="flex flex-wrap gap-3 font-black text-[var(--nim-primary)]" aria-label="Rechtliche Links">
            <a href="/impressum" className="inline-flex min-h-11 items-center hover:underline">Impressum</a>
            <a href="/datenschutz" className="inline-flex min-h-11 items-center hover:underline">Datenschutz</a>
            <a href="/kontakt" className="inline-flex min-h-11 items-center hover:underline">Kontakt</a>
          </nav>
        </div>
      </footer>

      <MobileBottomNav simpleMode={simpleMode} />
    </div>
  );
}
