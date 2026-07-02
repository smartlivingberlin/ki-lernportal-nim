"use client";

import { useState } from "react";
import { seedGlossary } from "../data/glossary";
import { seedLearningPaths } from "../data/learning-paths";
import { seedResources } from "../data/resources";
import { seedSources } from "../data/sources";

type LearningPathItem = (typeof seedLearningPaths)[number];
type LessonItem = LearningPathItem["lessons"][number];
type ResourceItem = (typeof seedResources)[number];

const entryOptions = [
  {
    id: "neu",
    label: "Ich bin neu und brauche Orientierung",
    title: "Wir fangen ganz ruhig an",
    description:
      "Du bekommst einfache Erklärungen, kurze Beispiele und einen ersten sicheren Schritt mit KI.",
    target: "Für Menschen ohne KI-Vorkenntnisse",
    href: "#zehn-minuten",
  },
  {
    id: "alltag",
    label: "Ich möchte etwas einfach erklärt bekommen",
    title: "Ein Thema in normaler Sprache verstehen",
    description:
      "Für Begriffe, Texte, Fragen, E-Mails, Recherchen und Situationen, die du besser verstehen möchtest.",
    target: "Für Alltag, Familie, Organisation und persönliche Aufgaben",
    href: "#lernpfade",
  },
  {
    id: "beruf",
    label: "Ich will KI im Alltag oder Beruf ausprobieren",
    title: "Ausprobieren, ohne dich zu verrennen",
    description:
      "Du lernst, wobei KI helfen kann, welche Grenzen wichtig sind und wie du Antworten prüfst.",
    target: "Für Beruf, Selbstständigkeit und Organisationen",
    href: "#lernpfade",
  },
  {
    id: "prompts",
    label: "Ich will bessere Fragen an KI stellen",
    title: "Besser fragen, verständlichere Antworten bekommen",
    description:
      "Du lernst, wie du KI klare Aufgaben gibst, ohne komplizierte Fachsprache zu brauchen.",
    target: "Für alle, die KI-Antworten gezielter steuern möchten",
    href: "#lektionen",
  },
  {
    id: "kurz",
    label: "Ich habe nur ein paar Minuten",
    title: "Ein kleiner Anfang reicht",
    description:
      "Ein kleiner Anfang: eine Idee verstehen, eine Frage stellen und eine Antwort prüfen.",
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

const trustNotes = [
  "Keine Passwörter, Kundendaten, Gesundheitsdaten oder Vertragsdetails in KI-Systeme eingeben.",
  "KI-Antworten können überzeugend klingen und trotzdem falsch sein.",
  "Wichtige Fakten immer mit geeigneten Quellen oder Fachpersonen prüfen.",
];

export default function Home() {
  const [selectedEntryId, setSelectedEntryId] = useState(entryOptions[0].id);
  const [openLessonId, setOpenLessonId] = useState<string | null>(
    seedLearningPaths[0]?.lessons[0]?.id ?? null,
  );

  const selectedEntry = entryOptions.find((entry) => entry.id === selectedEntryId) ?? entryOptions[0];
  const primaryPath = seedLearningPaths[0];
  const publicLearningPaths = seedLearningPaths.filter((path) => path.id !== "path-admin");
  const starterLessons = primaryPath?.lessons.slice(0, 5) ?? [];
  const beginnerResources = seedResources.slice(0, 4);
  const beginnerGlossary = seedGlossary.slice(0, 6);
  const reviewedSources = seedSources.slice(0, 5);

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
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#einstieg">
              Ich bin neu
            </a>
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#zehn-minuten">
              5-Minuten-Hilfe
            </a>
            <a className="rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200" href="#lernpfade">
              Mehr Hilfe finden
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
            Privater Demo-Stand
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex rounded-full border border-white/15 bg-white/15 px-3 py-2 text-xs font-black uppercase tracking-widest">
              Kostenlose Orientierung für den KI-Einstieg
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
              KI verstehen, ohne dich überfordert zu fühlen.
            </h1>

            <p className="max-w-2xl text-lg font-medium leading-8 text-white/85 md:text-xl">
              Dieses kostenlose Begleitportal holt dich dort ab, wo du gerade stehst. Du bekommst einfache Erklärungen,
              kleine Schritte, praktische Beispiele und klare Hinweise, worauf du bei KI achten solltest.
            </p>

            <div className="grid gap-3 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-4">
              <span className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">Ohne Konto starten</span>
              <span className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">Einfache Beispiele</span>
              <span className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">Kurze Übungen</span>
              <span className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">Risiken mitdenken</span>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href="#zehn-minuten"
                className="inline-flex justify-center rounded-2xl bg-white px-6 py-4 text-base font-black text-nim-primary shadow-lg transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                5-Minuten-Hilfe starten
              </a>
              <a
                href="#einstieg"
                className="inline-flex justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-black text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Passende Hilfe wählen
              </a>
            </div>
          </div>
        </section>

        <section id="einstieg" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Was möchtest du heute schaffen?"
            title="Du musst nicht wissen, wo du anfangen sollst."
            description="Wähle einfach aus, wobei du Hilfe brauchst. Das Portal führt dich dann mit kleinen, verständlichen Schritten weiter."
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

          {starterLessons[0] && <FeaturedLesson lesson={starterLessons[0]} />}
        </section>

        <section id="begleiter" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] scroll-mt-28">
          <div className="rounded-[2rem] bg-nim-primary p-8 text-white">
            <p className="text-xs font-black uppercase tracking-widest text-white/70">Der Lernbegleiter</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Nicht Belehrung. Sondern freundliche Begleitung.
            </h2>
            <p className="mt-5 leading-8 text-white/80">
              Der KI-Begleiter soll dir helfen, Dinge einfacher zu verstehen, Antworten einzuordnen und den nächsten kleinen Schritt zu finden.
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
              text="Du bekommst nicht alles auf einmal, sondern eine sinnvolle Reihenfolge."
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
            description="Die Pfade bleiben erhalten, aber sie kommen erst nach dem ersten kleinen Schritt. So wirkt die Seite weniger wie eine technische Übersicht und mehr wie eine Lernreise."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {publicLearningPaths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <section id="lektionen" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Erste Lektionen"
            title="Kleine Hilfekarten statt Theorieblock"
            description="Öffne nur die Karte, die du gerade brauchst. Du musst nicht alles auf einmal lesen."
          />

          <div className="grid gap-4">
            {starterLessons.map((lesson, index) => (
              <LessonAccordion
                key={lesson.id}
                lesson={lesson}
                index={index}
                open={openLessonId === lesson.id}
                onToggle={() => setOpenLessonId(openLessonId === lesson.id ? null : lesson.id)}
              />
            ))}
          </div>
        </section>

        <section id="glossar" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] scroll-mt-28">
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
            eyebrow="Mehr Hilfe finden"
            title="Nützliche externe Angebote"
            description="Manchmal helfen externe Angebote weiter. Prüfe dort aber selbst Konto-, Kosten- und Datenschutzhinweise."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {beginnerResources.map((resource) => (
              <ResourceMiniCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>

        <section id="vertrauen" className="space-y-6 scroll-mt-28">
          <SectionIntro
            eyebrow="Vertrauen & Grenzen"
            title="Sicherer werden heißt: Grenzen kennen"
            description="KI kann helfen. Trotzdem solltest du wichtige Antworten prüfen und sensible Daten schützen."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {trustNotes.map((note) => (
              <div key={note} className="rounded-3xl border border-amber-100 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-800">
                {note}
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
              Lern- und Orientierungsportal für KI-Kompetenz in Alltag, Beruf, Kreativarbeit und Organisationen.
              Aktueller Stand: private Demo mit statischen Inhalten.
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

function InfoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <article className="depth-card rounded-3xl p-6">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-lg font-black text-nim-primary">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-nim-secondary">{text}</p>
    </article>
  );
}

function FeaturedLesson({ lesson }: { lesson: LessonItem }) {
  return (
    <article className="rounded-[2rem] border border-nim-border bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">Erste Lektion</p>
      <h3 className="mt-2 text-2xl font-black text-nim-primary">{lesson.title}</h3>
      <p className="mt-3 max-w-3xl text-base leading-8 text-nim-secondary">{lesson.description}</p>
      <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-foreground">
        {(lesson.content ?? "").split("\n").slice(0, 6).join("\n")}
      </div>
      <a
        href="#lektionen"
        className="mt-5 inline-flex rounded-2xl bg-nim-primary px-5 py-4 text-sm font-black text-white transition hover:bg-nim-primary/90"
      >
        Weitere Lernkarten öffnen
      </a>
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
        href="#lektionen"
        className="mt-5 inline-flex rounded-xl bg-nim-primary px-4 py-3 text-sm font-black text-white transition hover:bg-nim-primary/90"
      >
        {disabled ? "Vorschau ansehen" : "Pfad ansehen"}
      </a>
    </article>
  );
}

function LessonAccordion({
  lesson,
  index,
  open,
  onToggle,
}: {
  lesson: LessonItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const contentId = `lesson-${lesson.id}`;

  return (
    <article className="rounded-3xl border border-nim-border bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full flex-col gap-3 p-5 text-left md:flex-row md:items-center md:justify-between"
      >
        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-nim-primary text-sm font-black text-white">
            {index + 1}
          </span>
          <span>
            <span className="block text-lg font-black text-nim-primary">{lesson.title}</span>
            <span className="mt-1 block text-sm leading-6 text-nim-secondary">{lesson.description}</span>
          </span>
        </div>
        <span className="font-black text-nim-primary">{open ? "Schließen" : "Öffnen"}</span>
      </button>

      {open && (
        <div id={contentId} className="border-t border-nim-border p-5">
          <div className="whitespace-pre-line rounded-2xl bg-slate-50 p-5 text-sm leading-8 text-foreground">
            {lesson.content}
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
