'use client';

import React, { useState } from 'react';
import { seedLearningPaths } from '../data/learning-paths';
import { seedGlossary } from '../data/glossary';
import { seedModelCards } from '../data/model-cards';
import { seedSources } from '../data/sources';
import { TrustLevel, ReviewStatus, ModelCard, LearningPath, Lesson } from '../data/types';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const navItems = [
    { icon: '🏠', label: 'Start', id: 'dashboard' },
    { icon: '🧭', label: 'KI-Lotse', id: 'navigator' },
    { icon: '📚', label: 'Lernpfad', id: 'lernpfad' },
    { icon: '📖', label: 'Lektionen', id: 'lektionen' },
    { icon: '📦', label: 'Modellkatalog', id: 'modellkatalog' },
    { icon: '📖', label: 'Glossar', id: 'glossar' },
    { icon: '🔭', label: 'Quellen & Vertrauen', id: 'monitoring' },
  ];

  const primaryPath = seedLearningPaths[0]; // KI-Start für absolute Anfänger
  const publicLearningPaths = seedLearningPaths.filter((path) => path.id !== 'path-admin');

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased text-foreground">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 sidebar-gradient text-white fixed inset-y-0 left-0 z-50">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tight">KI‑Lernportal NIM</h1>
          <p className="text-[10px] opacity-70 mt-1 uppercase tracking-widest font-semibold">KI-Kompetenz einfach lernen</p>
        </div>
        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {navItems.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} targetId={item.id} active={item.id === 'dashboard'} />
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/5">
            <div className="w-10 h-10 rounded-full bg-nim-accent flex items-center justify-center font-bold shadow-inner text-sm">DU</div>
            <div>
              <p className="text-sm font-semibold">Demo-Zugang</p>
                <p className="text-[11px] opacity-60">Status: Demo-Modus</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-nim-border sticky top-0 z-40">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white font-black text-xs shadow-sm">N</div>
            <h2 className="font-bold text-nim-primary tracking-tight">KI‑Lernportal</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-50 border border-gray-100 text-nim-primary"
            aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-72 sidebar-gradient p-6 flex flex-col shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white">Navigation</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white">✕</button>
              </div>
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <NavItem key={item.id} icon={item.icon} label={item.label} targetId={item.id} active={item.id === 'dashboard'} />
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t border-white/10 text-white/50 text-xs text-center">
                KI-Lernportal NIM v0.1.0
              </div>
            </div>
          </div>
        )}

        <main className="p-6 md:p-10 lg:p-12 space-y-12 max-w-7xl mx-auto w-full animate-fade-in">
          {/* Hero / Greeting Section */}
          <section id="dashboard" className="relative overflow-hidden rounded-3xl premium-gradient px-8 py-10 md:px-12 md:py-14 text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <span className="text-[100px] font-bold leading-none">NIM</span>
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Kostenlos starten</span>
                </div>
                <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                  ⚠️ Demo: Statische Inhalte
                </div>
              </div>
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Kostenlos KI lernen – einfach, sicher und verständlich.</h2>
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium">
                  Ihr Einstieg in die Welt der künstlichen Intelligenz. Starten Sie jetzt mit unserem Grundkurs für absolute Anfänger.
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                  <span className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 font-semibold">✅ Kostenlos & offen</span>
                  <span className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 font-semibold">✅ Erste Lektionen ohne Login</span>
                  <span className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 font-semibold">✅ Quellen mit Review-Status</span>
                  <span className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 font-semibold">✅ Orientierung, keine Rechtsberatung</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#lernpfad" className="bg-white text-nim-primary px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 text-sm">
                  Demo-Lernpfad ansehen
                </a>
                <a href="#navigator" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all text-sm">
                  Mein Lernziel wählen
                </a>
              </div>
            </div>
          </section>

          {/* Dashboard Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Lernfortschritt"
              value="0%"
              description="Starten Sie Ihre erste Lektion heute!"
              icon="📈"
              color="text-nim-accent"
              footer={<ProgressBar percent={0} />}
            />
            <DashboardCard
              title="KI-Lotse"
              value="Empfehlung"
              description={`${primaryPath.lessons[0].title}`}
              icon="🧭"
              color="text-nim-primary"
              footer={<a href="#navigator" className="text-sm font-bold text-nim-primary hover:underline">KI-Lotse ansehen →</a>}
            />
            <DashboardCard
              title="Quellen"
              value={`${seedSources.length}`}
              description="Quellen mit Review-Status."
              icon="📚"
              color="text-nim-success"
              footer={<a href="#monitoring" className="text-sm font-bold text-nim-success hover:underline">Quellen ansehen →</a>}
            />
          </section>

          {/* KI-Lotse Recommendation Panel */}
          <section id="navigator" className="glass-card rounded-3xl p-8 border-l-4 border-l-nim-accent shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-nim-accent">
                  <span className="text-xl">✨</span>
                  <h3 className="font-bold uppercase tracking-wider text-sm">Nächster Schritt</h3>
                </div>
                <h4 className="text-2xl font-bold">{primaryPath.lessons[0].title}</h4>
                <p className="text-nim-secondary max-w-xl">
                  {primaryPath.lessons[0].description}
                  <span className="block mt-2 text-xs font-bold text-amber-600">⚠️ Wichtig: Geben Sie niemals private Daten wie Passwörter in KI-Systeme ein.</span>
                </p>
              </div>
              <a href="#lektionen" className="bg-nim-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all whitespace-nowrap text-center">
                Lektion starten (5 Min)
              </a>
            </div>
          </section>

          {/* Learning Paths Preview */}
          <section id="lernpfad" className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold tracking-tight">Lernpfade für Einsteiger</h3>
               <span className="text-xs font-bold text-nim-secondary uppercase bg-slate-100 px-3 py-1 rounded-full">{publicLearningPaths.length} Pfade verfügbar</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicLearningPaths.map((path) => (
                <PathCard key={path.id} path={path} />
              ))}
            </div>
          </section>

          {/* Visible Lesson Content */}
          <section id="lektionen" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Aktive Lektionen</h3>
                <p className="text-sm text-nim-secondary mt-1">
                  Die Inhalte aus dem Anfängerpfad sind hier als lesbare Lernkarten sichtbar.
                </p>
              </div>
              <span className="text-xs font-bold text-nim-secondary uppercase bg-slate-100 px-3 py-1 rounded-full w-fit">
                {primaryPath.lessons.length} Lektionen
              </span>
            </div>
            <div className="space-y-4">
              {primaryPath.lessons.map((lesson) => (
                <LessonContentCard
                  key={lesson.id}
                  lesson={lesson}
                  defaultOpen={lesson.order === 1}
                />
              ))}
            </div>
          </section>

          {/* Model Catalog & Interactive Sections */}
          <section id="modellkatalog" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Modellkatalog & Ressourcen</h3>
                <p className="text-xs text-nim-secondary mt-1">NVIDIA NIM-Inferenz-Services & Frameworks</p>
              </div>
            </div>

            <div className="space-y-4">
              <Accordion
                id="llm"
                title="Sprachmodelle (LLMs)"
                icon="📝"
                activeId={activeAccordion}
                onToggle={toggleAccordion}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seedModelCards.filter(m => m.type === 'Sprachmodell').map(model => (
                    <ModelDetailCard key={model.id} model={model} />
                  ))}
                </div>
              </Accordion>

              <Accordion
                id="rag"
                title="Embeddings & RAG"
                icon="🔍"
                activeId={activeAccordion}
                onToggle={toggleAccordion}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seedModelCards.filter(m => m.type !== 'Sprachmodell').map(model => (
                    <ModelDetailCard key={model.id} model={model} />
                  ))}
                </div>
              </Accordion>

              <Accordion
                id="glossar"
                title="Glossar: KI einfach erklärt"
                icon="📖"
                activeId={activeAccordion}
                onToggle={toggleAccordion}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {seedGlossary.filter(g => g.priority === 1).map(term => (
                    <GlossaryEntry
                      key={term.id}
                      term={term.term}
                      explanation={term.definition}
                      example={term.example}
                    />
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-nim-border">
                   <h5 className="text-xs font-bold text-nim-secondary uppercase tracking-widest mb-4">Weitere Fachbegriffe</h5>
                   <div className="flex flex-wrap gap-2">
                      {seedGlossary.filter(g => g.priority > 1).map(term => (
                        <span key={term.id} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-nim-primary" title={term.definition}>
                          {term.term}
                        </span>
                      ))}
                   </div>
                </div>
              </Accordion>
            </div>
          </section>

          {/* Monitoring Section */}
          <section id="monitoring" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Quellen & Vertrauen</h3>
                <p className="text-xs text-nim-secondary mt-1">Status der verwendeten Referenzdaten & Standards</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-nim-secondary tracking-widest border-b border-nim-border">
                  <tr>
                    <th className="px-6 py-4">Quelle / Standard</th>
                    <th className="px-6 py-4">Typ</th>
                    <th className="px-6 py-4">Review-Status</th>
                    <th className="px-6 py-4">Vertrauen</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {seedSources.map((source) => (
                    <tr key={source.id} className="border-b border-nim-border/50 hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-nim-primary">{source.name}</div>
                        <div className="text-[10px] text-nim-secondary truncate max-w-xs">{source.url}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase tracking-tighter">{source.sourceType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <ReviewBadge status={source.reviewStatus} />
                      </td>
                      <td className="px-6 py-4">
                        <TrustBadge level={source.trustLevel} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>


        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-nim-border bg-white p-8">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-[1.5fr_1fr] text-sm text-nim-secondary">
            <div>
              <h3 className="font-black text-nim-primary text-lg">KI-Lernportal NIM</h3>
              <p className="mt-2 leading-relaxed">
                Kostenloses Lern- und Orientierungsportal für KI-Grundlagen, sichere Nutzung und Quellenkompetenz.
                Inhalte werden mit Quellen und Review-Status angezeigt. Keine Garantie auf Vollständigkeit.
              </p>
              <p className="mt-2 text-xs">
                Keine Rechtsberatung. Keine Förderzusage. Keine Zertifizierung. Externe Links führen aus dem Portal heraus.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <a href="#dashboard" className="font-bold text-nim-primary hover:underline">Start</a>
              <a href="#navigator" className="font-bold text-nim-primary hover:underline">KI-Lotse</a>
              <a href="#monitoring" className="font-bold text-nim-primary hover:underline">Quellen & Vertrauen</a>
              <span className="text-xs opacity-70">Impressum, Datenschutz und Fehler-melden-Seite vor Live-Schaltung finalisieren.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, description, icon, color, footer }: { title: string, value: string, description: string, icon: string, color: string, footer: React.ReactNode }) {
  return (
    <div className="depth-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
      <div className="flex justify-between items-start">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div className="text-xs font-bold text-nim-secondary uppercase tracking-tighter">{title}</div>
      </div>
      <div>
        <div className="text-2xl font-black mb-1">{value}</div>
        <p className="text-sm text-nim-secondary font-medium leading-relaxed">{description}</p>
      </div>
      <div className="pt-4 border-t border-nim-border">
        {footer}
      </div>
    </div>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-nim-accent h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

function Accordion({ id, title, icon, children, activeId, onToggle }: { id: string, title: string, icon: string, children: React.ReactNode, activeId: string | null, onToggle: (id: string) => void }) {
  const isOpen = activeId === id;
  const contentId = `accordion-content-${id}`;
  return (
    <div id={id} className="depth-card rounded-2xl overflow-hidden scroll-mt-20">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/50"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{icon}</span>
          <span className="font-bold">{title}</span>
        </div>
        <span className={`text-nim-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <div
        id={contentId}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
        role="region"
      >
        <div className="p-6 pt-0 border-t border-nim-border/50">
          {children}
        </div>
      </div>
    </div>
  );
}

function GlossaryEntry({ term, explanation, example }: { term: string, explanation: string, example: string }) {
  return (
    <div className="space-y-2 border-l-2 border-nim-primary/20 pl-4 py-1">
      <span className="font-black text-nim-primary block text-lg">{term}</span>
      <p className="text-sm font-semibold text-foreground italic">&quot;{explanation}&quot;</p>
      <div className="text-[11px] text-nim-secondary leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
        <span className="font-bold uppercase tracking-tighter text-[9px] block mb-1">Beispiel:</span>
        {example}
      </div>
    </div>
  );
}

function ModelDetailCard({ model }: { model: ModelCard }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <h5 className="font-black text-nim-primary">{model.name}</h5>
        <span className="text-[9px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase tracking-widest text-slate-500">{model.type}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <p className="text-nim-secondary font-bold uppercase tracking-tighter">Einsatz</p>
          <p className="font-semibold">{model.useCase}</p>
        </div>
        <div>
          <p className="text-nim-secondary font-bold uppercase tracking-tighter">Niveau</p>
          <p className="font-semibold">{model.difficulty}</p>
        </div>
      </div>
      {model.riskNote && (
         <p className="text-[10px] text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100 leading-tight">
            <span className="font-bold">Hinweis:</span> {model.riskNote}
         </p>
      )}
      <div className="pt-2 border-t border-slate-50 flex items-center text-[10px] text-nim-success font-bold uppercase tracking-widest">
        <span className="mr-1.5">🛡️</span> {model.privacyNote}
      </div>
    </div>
  );
}

function LessonContentCard({ lesson, defaultOpen = false }: { lesson: Lesson; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `lesson-content-${lesson.id}`;

  return (
    <article className="depth-card rounded-3xl p-6 space-y-4 border-l-4 border-l-nim-accent">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-nim-secondary uppercase tracking-widest">
            Lektion {lesson.order}
          </div>
          <h4 className="text-xl font-black text-nim-primary leading-tight">{lesson.title}</h4>
          <p className="text-sm text-nim-secondary leading-relaxed">{lesson.description}</p>
        </div>
        <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-nim-secondary whitespace-nowrap">
          {lesson.estimatedMinutes} Min
        </span>
      </div>

      <button
        type="button"
        className="inline-flex w-fit items-center rounded-full bg-nim-primary px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? 'Lektion schließen' : 'Lektion öffnen'}
      </button>

      {isOpen && (
        lesson.content ? (
          <div
            id={contentId}
            className="whitespace-pre-line text-sm leading-7 text-foreground bg-slate-50 border border-slate-100 rounded-2xl p-4"
          >
            {lesson.content}
          </div>
        ) : (
          <p
            id={contentId}
            className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-2xl p-4"
          >
            Für diese Lektion ist noch kein Inhalt hinterlegt.
          </p>
        )
      )}
    </article>
  );
}

function PathCard({ path }: { path: LearningPath }) {
  const isLocked = path.status === 'locked';
  const isPlanned = path.status === 'planned';

  return (
    <div className={`depth-card rounded-3xl p-6 flex flex-col justify-between space-y-4 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
           <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase tracking-widest text-slate-500">{path.difficulty}</span>
           {path.status === 'active' && <span className="w-2 h-2 rounded-full bg-nim-success animate-pulse"></span>}
        </div>
        <h4 className="text-xl font-bold leading-tight">{path.title}</h4>
        <p className="text-sm text-nim-secondary leading-relaxed">{path.description}</p>
      </div>

      <div className="pt-4 border-t border-nim-border flex items-center justify-between">
         <span className="text-xs font-bold text-nim-primary">
           {isPlanned ? 'Geplant' : isLocked ? 'Gesperrt' : `${path.lessons.length} Lektionen`}
         </span>
         {!isLocked && !isPlanned && (
           <button className="text-xs font-black uppercase tracking-widest bg-nim-primary text-white px-3 py-1.5 rounded-lg hover:scale-105 transition-transform">
             Start
           </button>
         )}
      </div>
    </div>
  );
}

function ReviewBadge({ status }: { status: ReviewStatus }) {
  const config = {
    [ReviewStatus.Draft]: { label: 'Entwurf', class: 'bg-slate-100 text-slate-500' },
    [ReviewStatus.NeedsReview]: { label: 'Review offen', class: 'bg-amber-100 text-amber-700' },
    [ReviewStatus.SourceAttached]: { label: 'Quelle vorhanden', class: 'bg-blue-100 text-blue-700' },
    [ReviewStatus.Approved]: { label: 'Review abgeschlossen', class: 'bg-nim-success/20 text-nim-success' },
    [ReviewStatus.Published]: { label: 'Live', class: 'bg-nim-primary/20 text-nim-primary' },
  };
  const item = config[status] || config[ReviewStatus.Draft];
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${item.class}`}>
      {item.label}
    </span>
  );
}

function TrustBadge({ level }: { level: TrustLevel }) {
  const config = {
    [TrustLevel.Low]: { icon: '⚪', label: 'Basis' },
    [TrustLevel.Medium]: { icon: '🟡', label: 'Glaubwürdig' },
    [TrustLevel.High]: { icon: '🟢', label: 'Hoch' },
    [TrustLevel.Verified]: { icon: '🛡️', label: 'Hochwertige Quelle' },
  };
  const item = config[level] || config[TrustLevel.Low];
  return (
    <div className="flex items-center space-x-1" title={item.label}>
       <span className="text-xs">{item.icon}</span>
       <span className="text-[10px] font-bold text-nim-secondary">{item.label}</span>
    </div>
  );
}

function NavItem({ icon, label, targetId, active = false }: { icon: string, label: string, targetId: string, active?: boolean }) {
  return (
    <a
      href={`#${targetId}`}
      className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
        active
          ? 'bg-white/20 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/10'
          : 'text-white/70 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className={`text-xl transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
      <span className="font-semibold text-sm tracking-wide">{label}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
    </a>
  );
}
