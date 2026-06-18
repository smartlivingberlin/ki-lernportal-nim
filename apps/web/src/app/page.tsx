'use client';

import React, { useState } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const navItems = [
    { icon: '🏠', label: 'Dashboard', id: 'dashboard' },
    { icon: '🧭', label: 'Navigator', id: 'navigator' },
    { icon: '📚', label: 'Lernpfad', id: 'lernpfad' },
    { icon: '📦', label: 'Modellkatalog', id: 'modellkatalog' },
    { icon: '📖', label: 'Glossar', id: 'glossary' },
    { icon: '🔭', label: 'Monitoring', id: 'monitoring' },
    { icon: '🛡️', label: 'Admin-Cockpit', id: 'admin' },
  ];

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased text-foreground">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 sidebar-gradient text-white fixed inset-y-0 left-0 z-50">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tight">KI‑Lernportal NIM</h1>
          <p className="text-[10px] opacity-70 mt-1 uppercase tracking-widest font-semibold">Premium AI Learning Suite</p>
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
              <p className="text-[11px] opacity-60">Status: Aktiv</p>
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
                  <span className="text-[10px] font-bold uppercase tracking-widest">MVP Phase 1</span>
                </div>
                <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                  ⚠️ MVP-Demo: Mock-System ohne Live-Daten
                </div>
              </div>
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Ihr KI‑Lern‑Dashboard
                </h2>
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium">
                  Willkommen im adaptiven Portal für KI-Literacy. Entdecken Sie die Möglichkeiten moderner Sprachmodelle in verständlicher Sprache.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#lernpfad" className="bg-white text-nim-primary px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 text-sm">
                  Lernpfad fortsetzen
                </a>
                <a href="#glossary" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all text-sm">
                  Glossar öffnen
                </a>
              </div>
            </div>
          </section>

          {/* Dashboard Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Lernfortschritt"
              value="35%"
              description="Sie haben 3 von 8 Modulen abgeschlossen."
              icon="📈"
              color="text-nim-accent"
              footer={<ProgressBar percent={35} />}
            />
            <DashboardCard
              title="AI Navigator"
              value="Demo-Vorschlag"
              description="Beispiel: Einführung in LLMs & Codegenerierung."
              icon="🧭"
              color="text-nim-primary"
              footer={<a href="#navigator" className="text-sm font-bold text-nim-primary hover:underline">Details ansehen →</a>}
            />
            <DashboardCard
              title="Monitoring"
              value="Demo-Vorschau"
              description="Aktueller Status der simulierten Systeme."
              icon="🔭"
              color="text-nim-success"
              footer={<a href="#monitoring" className="text-sm font-bold text-nim-success hover:underline">Zum Monitoring →</a>}
            />
          </section>

          {/* AI Navigator Recommendation Panel */}
          <section id="navigator" className="glass-card rounded-3xl p-8 border-l-4 border-l-nim-accent shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-nim-accent">
                  <span className="text-xl">✨</span>
                  <h3 className="font-bold uppercase tracking-wider text-sm">Demo-Empfehlung</h3>
                </div>
                <h4 className="text-2xl font-bold">Nächster sinnvoller Lernschritt (Beispiel)</h4>
                <p className="text-nim-secondary max-w-xl">
                  Als nächsten Schritt in dieser Demo schlagen wir das Modul <span className="font-semibold text-foreground italic">&quot;Abruf Augmented Generation (RAG) für Anfänger&quot;</span> vor.
                </p>
              </div>
              <a href="#modellkatalog" className="bg-nim-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all whitespace-nowrap text-center">
                Modul-Vorschau
              </a>
            </div>
          </section>

          {/* Model Catalog & Interactive Sections */}
          <section id="modellkatalog" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Modellkatalog & Ressourcen</h3>
                <p className="text-xs text-nim-secondary mt-1">⚠️ Beispiel-Inhalte: Keine Live-Integration</p>
              </div>
              <button className="text-sm font-bold text-nim-primary hover:underline">Modul-Archiv (später)</button>
            </div>

            <div className="space-y-4">
              <Accordion
                id="llm"
                title="LLMs & Codegenerierung"
                icon="📝"
                activeId={activeAccordion}
                onToggle={toggleAccordion}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ModelDetailCard
                    name="Mixtral 8x7B"
                    type="Sprachmodell"
                    useCase="Code & Text"
                    difficulty="Fortgeschritten"
                    privacy="DSGVO-konform"
                  />
                  <ModelDetailCard
                    name="Llama 3.1 8B"
                    type="Sprachmodell"
                    useCase="Chat & Hilfe"
                    difficulty="Einsteiger"
                    privacy="Sicherer Prompt"
                  />
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-sm">
                  <span className="font-bold text-blue-800 italic">Hinweis:</span> Diese Modelle sind im Demo-Modus simuliert. In der finalen Version erfolgt eine direkte NVIDIA NIM Anbindung.
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
                  <ModelDetailCard
                    name="NV-Embed v2"
                    type="Embedding"
                    useCase="Wissenssuche"
                    difficulty="Experte"
                    privacy="Interne Daten"
                  />
                  <ModelDetailCard
                    name="Llama-Reranker"
                    type="Reranking"
                    useCase="Suche-Optimierung"
                    difficulty="Experte"
                    privacy="Verschlüsselt"
                  />
                </div>
              </Accordion>

              <Accordion
                id="glossary"
                title="Glossar: Einfache Sprache"
                icon="📖"
                activeId={activeAccordion}
                onToggle={toggleAccordion}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlossaryEntry
                    term="Prompt"
                    explanation="Die Anweisung oder Frage, die du der KI stellst."
                    example="Stell dir vor, du gibst einem Koch ein Rezept. Der Prompt ist dein Wunsch: 'Bitte backe einen Schokokuchen'."
                  />
                  <GlossaryEntry
                    term="LLM (Sprachmodell)"
                    explanation="Ein Computerprogramm, das wie ein Mensch Texte lesen und schreiben kann."
                    example="Es ist wie ein extrem belesener Assistent, der fast alle Bücher der Welt kennt und dir nun beim Schreiben hilft."
                  />
                  <GlossaryEntry
                    term="RAG (Wissens-Abruf)"
                    explanation="Die KI schaut erst in deinen eigenen Dokumenten nach, bevor sie antwortet."
                    example="Wie ein Schüler, der bei einer Prüfung in seinem eigenen Heft nachschlagen darf, um keine Fehler zu machen."
                  />
                  <GlossaryEntry
                    term="Halluzination"
                    explanation="Wenn die KI Fakten erfindet, die gar nicht stimmen, aber sehr überzeugend klingen."
                    example="Die KI behauptet, es gäbe ein fliegendes Auto in Berlin, obwohl das (noch) gar nicht wahr ist."
                  />
                </div>
              </Accordion>
            </div>
          </section>

          {/* Learning Paths Preview */}
          <section id="lernpfad" className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Ihr individueller Lernpfad</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <PathStep number={1} title="Grundlagen" status="completed" />
              <PathStep number={2} title="Einfache Prompts" status="completed" />
              <PathStep number={3} title="LLM verstehen" status="current" />
              <PathStep number={4} title="RAG & Daten" status="locked" />
            </div>
          </section>

          {/* Monitoring Section */}
          <section id="monitoring" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Monitoring & Trend-Watcher</h3>
                <p className="text-xs text-nim-secondary mt-1">⚠️ Demo-Status: Keine Live-Überwachung</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-nim-secondary tracking-widest border-b border-nim-border">
                  <tr>
                    <th className="px-6 py-4">Quelle</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Letzte Prüfung</th>
                    <th className="px-6 py-4">Review</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-nim-border/50 hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold">NVIDIA NIM API (Simuliert)</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center text-nim-success">● <span className="ml-2">Online</span></span></td>
                    <td className="px-6 py-4 text-nim-secondary italic text-xs">Demo-Stand</td>
                    <td className="px-6 py-4 text-nim-secondary">—</td>
                  </tr>
                  <tr className="border-b border-nim-border/50 hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold">Lern-Fortschritt-Dienst</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center text-nim-success">● <span className="ml-2">Aktiv</span></span></td>
                    <td className="px-6 py-4 text-nim-secondary italic text-xs">Demo-Stand</td>
                    <td className="px-6 py-4 text-nim-secondary">—</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30 transition-colors text-amber-600">
                    <td className="px-6 py-4 font-semibold">Glossar-Synchronisation</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center">● <span className="ml-2">Wartend</span></span></td>
                    <td className="px-6 py-4 text-nim-secondary italic text-xs">Demo-Stand</td>
                    <td className="px-6 py-4 font-bold text-xs">Review nötig</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Admin / Owner Cockpit Section */}
          <section id="admin" className="space-y-6 pb-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Admin & Owner Cockpit</h3>
                <p className="text-xs text-nim-secondary mt-1">⚠️ Preview-Modus für Administratoren</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AdminCard title="Inhaltsprüfung" value="12" status="Offen" icon="📝" />
              <AdminCard title="Quellenstatus" value="98%" status="Optimal" icon="📡" color="text-nim-success" />
              <AdminCard title="Privacy-Check" value="Pass" status="DSGVO Konform" icon="🛡️" color="text-nim-success" />
              <AdminCard title="System-Review" value="2" status="Aufgaben" icon="⚖️" color="text-amber-500" />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-nim-border bg-white p-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-nim-primary">KI‑Lernportal NIM</p>
              <p className="text-sm text-nim-secondary mt-1">Ein Projekt zur Förderung der KI-Literacy in Deutschland.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-nim-secondary">
              <span className="opacity-50">Impressum (später)</span>
              <span className="opacity-50">Datenschutz (später)</span>
              <span className="opacity-50">Barrierefreiheit (später)</span>
            </div>
            <div className="text-xs text-nim-secondary opacity-50">
              &copy; {new Date().getFullYear()} smartlivingberlin
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
    <div className="depth-card rounded-2xl overflow-hidden">
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
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
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

function ModelDetailCard({ name, type, useCase, difficulty, privacy }: { name: string, type: string, useCase: string, difficulty: string, privacy: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <h5 className="font-black text-nim-primary">{name}</h5>
        <span className="text-[9px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase tracking-widest text-slate-500">{type}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <p className="text-nim-secondary font-bold uppercase tracking-tighter">Einsatz</p>
          <p className="font-semibold">{useCase}</p>
        </div>
        <div>
          <p className="text-nim-secondary font-bold uppercase tracking-tighter">Niveau</p>
          <p className="font-semibold">{difficulty}</p>
        </div>
      </div>
      <div className="pt-2 border-t border-slate-50 flex items-center text-[10px] text-nim-success font-bold uppercase tracking-widest">
        <span className="mr-1.5">🛡️</span> {privacy}
      </div>
    </div>
  );
}

function AdminCard({ title, value, status, icon, color = "text-nim-primary" }: { title: string, value: string, status: string, icon: string, color?: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3 border-t-2 border-t-nim-primary/20">
      <div className="flex justify-between items-center">
        <span className="text-xl">{icon}</span>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${color}`}>{status}</span>
      </div>
      <div>
        <div className="text-xl font-bold">{value}</div>
        <p className="text-[11px] font-bold text-nim-secondary uppercase tracking-widest">{title}</p>
      </div>
    </div>
  );
}

function PathStep({ number, title, status }: { number: number, title: string, status: 'completed' | 'current' | 'locked' }) {
  const styles = {
    completed: 'bg-nim-success/10 border-nim-success/20 text-nim-success',
    current: 'bg-nim-accent text-white border-nim-accent shadow-lg shadow-nim-accent/20',
    locked: 'bg-slate-50 border-slate-100 text-slate-300 opacity-60'
  };

  return (
    <div className={`p-6 rounded-3xl border-2 flex flex-col items-center text-center space-y-3 transition-all duration-300 ${styles[status]}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${status === 'current' ? 'bg-white text-nim-accent border-white' : 'border-current'}`}>
        {status === 'completed' ? '✓' : number}
      </div>
      <span className="font-bold text-sm leading-tight">{title}</span>
      <span className="text-[10px] uppercase font-black tracking-widest">
        {status === 'completed' ? 'Fertig' : status === 'current' ? 'Aktiv' : 'Gesperrt'}
      </span>
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
