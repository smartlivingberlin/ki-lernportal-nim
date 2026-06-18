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
    { icon: '📚', label: 'Lernpfad', id: 'path' },
    { icon: '📦', label: 'Modellkatalog', id: 'models' },
    { icon: '📖', label: 'Glossar', id: 'glossary' },
    { icon: '🔭', label: 'Trend-Watcher', id: 'trends' },
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
            <NavItem key={item.id} icon={item.icon} label={item.label} active={item.id === 'dashboard'} />
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/5">
            <div className="w-10 h-10 rounded-full bg-nim-accent flex items-center justify-center font-bold shadow-inner">DU</div>
            <div>
              <p className="text-sm font-semibold">Demo User</p>
              <p className="text-[11px] opacity-60">Basis Zugang</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-nim-border sticky top-0 z-40">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-nim-primary flex items-center justify-center text-white font-bold text-xs">N</div>
            <h2 className="font-bold text-nim-primary tracking-tight">KI-Lernportal</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-50 border border-gray-100 text-nim-primary"
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute left-0 top-0 bottom-0 w-72 sidebar-gradient p-6 flex flex-col shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white">Navigation</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white">✕</button>
              </div>
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <NavItem key={item.id} icon={item.icon} label={item.label} active={item.id === 'dashboard'} />
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
          <section className="relative overflow-hidden rounded-3xl premium-gradient p-8 md:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <span className="text-[120px] font-bold">NIM</span>
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest">MVP Phase 1</span>
              </div>
              <div className="max-w-2xl space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Willkommen zurück, <span className="text-yellow-200">Demo User</span>!
                </h2>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                  Ihr adaptives Portal für KI-Literacy. Entdecken Sie heute die Welt der NVIDIA NIM-basierten Modelle in einfacher Sprache.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-white text-nim-primary px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-all hover:scale-105 active:scale-95">
                  Lernpfad fortsetzen
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-all">
                  Glossar öffnen
                </button>
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
              value="Empfehlung"
              description="Nächster Schritt: Einführung in LLMs & Codegenerierung."
              icon="🧭"
              color="text-nim-primary"
              footer={<button className="text-sm font-bold text-nim-primary hover:underline">Jetzt starten →</button>}
            />
            <DashboardCard
              title="Trend-Watcher"
              value="Neu"
              description="Erfahren Sie mehr über die neuen NV-Embed Modelle."
              icon="🔭"
              color="text-nim-success"
              footer={<span className="text-xs bg-nim-success/10 text-nim-success px-2 py-1 rounded font-bold">Aktualisiert: Heute</span>}
            />
          </section>

          {/* AI Navigator Recommendation Panel */}
          <section className="glass-card rounded-3xl p-8 border-l-4 border-l-nim-accent shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-nim-accent">
                  <span className="text-xl">✨</span>
                  <h3 className="font-bold uppercase tracking-wider text-sm">Persönliche Empfehlung</h3>
                </div>
                <h4 className="text-2xl font-bold">Vertiefen Sie Ihr Wissen über RAG</h4>
                <p className="text-nim-secondary max-w-xl">
                  Basierend auf Ihrem Fortschritt empfehlen wir das Modul <span className="font-semibold text-foreground italic">&quot;Abruf Augmented Generation (RAG) für Anfänger&quot;</span>.
                </p>
              </div>
              <button className="bg-nim-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
                Modul Starten
              </button>
            </div>
          </section>

          {/* Model Catalog & Interactive Sections */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight">Modellkatalog & Ressourcen</h3>
              <button className="text-sm font-bold text-nim-primary hover:underline">Alle anzeigen</button>
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
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h5 className="font-bold text-sm mb-1">Mixtral 8x7B</h5>
                    <p className="text-xs text-nim-secondary">Spezialist für kreative Texte und Programmierung.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h5 className="font-bold text-sm mb-1">Llama 3.1</h5>
                    <p className="text-xs text-nim-secondary">Vielseitiges Modell für allgemeine Chat-Aufgaben.</p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-sm">
                  <span className="font-bold text-blue-800">Tipp:</span> Fangen Sie mit Llama 3.1 an, um grundlegende Prompts zu testen.
                </div>
              </Accordion>

              <Accordion
                id="rag"
                title="Embeddings & RAG"
                icon="🔍"
                activeId={activeAccordion}
                onToggle={toggleAccordion}
              >
                <p className="text-sm text-nim-secondary mb-4">Erfahren Sie, wie Ihre KI auf Ihre eigenen Dokumente zugreifen kann.</p>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center space-x-2">
                    <span className="text-nim-success">✓</span>
                    <span>NV-Embed QA für Frage-Antwort-Systeme</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-nim-success">✓</span>
                    <span>Reranker zur Ergebnis-Optimierung</span>
                  </li>
                </ul>
              </Accordion>

              <Accordion
                id="glossary"
                title="Glossar: Einfache Sprache"
                icon="📖"
                activeId={activeAccordion}
                onToggle={toggleAccordion}
              >
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="font-bold block text-nim-primary">Prompts</span>
                    <p className="text-sm text-nim-secondary italic">&quot;Einfach erklärt: Die Anweisungen, die du der KI gibst.&quot;</p>
                  </div>
                  <div className="border-b border-slate-100 pb-3">
                    <span className="font-bold block text-nim-primary">Vektor</span>
                    <p className="text-sm text-nim-secondary italic">&quot;Einfach erklärt: Ein Zahlencode, mit dem die KI die Bedeutung von Worten speichert.&quot;</p>
                  </div>
                </div>
              </Accordion>
            </div>
          </section>

          {/* Learning Paths Preview */}
          <section className="space-y-6 pb-12">
            <h3 className="text-2xl font-bold tracking-tight">Ihr individueller Lernpfad</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <PathStep number={1} title="Grundlagen" status="completed" />
              <PathStep number={2} title="Einfache Prompts" status="completed" />
              <PathStep number={3} title="LLM verstehen" status="current" />
              <PathStep number={4} title="RAG & Daten" status="locked" />
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
            <div className="flex gap-8 text-sm font-semibold text-nim-secondary">
              <a href="#" className="hover:text-nim-primary transition-colors">Impressum</a>
              <a href="#" className="hover:text-nim-primary transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-nim-primary transition-colors">Barrierefreiheit</a>
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
  return (
    <div className="depth-card rounded-2xl overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/50"
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{icon}</span>
          <span className="font-bold">{title}</span>
        </div>
        <span className={`text-nim-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 pt-0 border-t border-nim-border/50">
          {children}
        </div>
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

function NavItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
  return (
    <a
      href="#"
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
