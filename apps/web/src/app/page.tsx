import React from 'react';

export default function Home() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="p-6">
          <h1 className="text-xl font-bold gradient-text">NIM Lernportal</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">AI Intelligence Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon="🏠" label="Dashboard" active />
          <NavItem icon="🧭" label="KI Navigator" />
          <NavItem icon="📚" label="Lernpfade" />
          <NavItem icon="📖" label="Glossar" />
          <NavItem icon="📦" label="Modell-Katalog" />
          <NavItem icon="🔭" label="Trend Watcher" />
        </nav>

        <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
          <NavItem icon="⚙️" label="Admin Cockpit" />
          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <span>Lernfortschritt</span>
              <span className="text-blue-600">65%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative animate-in">
        {/* Top bar / Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-500">Willkommen zurück,</span>
            <span className="text-sm font-bold">Innovator</span>
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20">
              <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-500 uppercase tracking-tighter">
                MVP-Aufbau — Vorschau-Modus
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <section className="relative p-10 rounded-3xl overflow-hidden glass-card animate-slide-up">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Meistern Sie die <span className="gradient-text">KI-Zukunft</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg leading-relaxed">
                Willkommen im KI-Lernportal NIM. Ihr interaktives Ökosystem für modernes KI-Wissen.
                Von den Grundlagen bis zur komplexen Agenten-Orchestrierung – verständlich, sicher und direkt anwendbar.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                  Lernpfad fortsetzen
                </button>
                <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold transition-all border border-slate-200 dark:border-slate-700">
                  Navigator öffnen
                </button>
              </div>
            </div>
          </section>

          {/* Quick Overview Grid */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <StatsCard label="Aktive Module" value="12" sub="3 abgeschlossen" icon="📚" />
            <StatsCard label="Gelerntes Vokabular" value="48" sub="+5 diese Woche" icon="📖" />
            <StatsCard label="KI-Modelle getestet" value="6" sub="NIM Catalog" icon="📦" />
            <StatsCard label="System Status" value="Online" sub="Simulation aktiv" icon="🟢" />
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* KI Navigator / Recommendation Panel */}
            <div className="lg:col-span-2 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">🧭</span> KI Navigator
                </h3>
                <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Vollständige Analyse</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <RecommendationCard
                  title="Für Einsteiger"
                  desc="Grundlagen der KI & Prompting"
                  tag="Empfohlen"
                  level="Beginner"
                />
                <RecommendationCard
                  title="Für Unternehmen"
                  desc="Effizienzsteigerung durch Agenten"
                  tag="Business"
                  level="Advanced"
                />
              </div>

              {/* Learning Paths Preview */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📚</span> Aktuelle Lernpfade
                </h3>
                <div className="space-y-3">
                  <PathItem title="Was ist ein Large Language Model (LLM)?" progress={100} status="Abgeschlossen" />
                  <PathItem title="RAG: Dokumente mit KI verstehen" progress={45} status="In Arbeit" />
                  <PathItem title="Einführung in NVIDIA NIM Microservices" progress={0} status="Gesperrt" locked />
                </div>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {/* Glossary Preview */}
              <div className="p-6 rounded-2xl glass-card space-y-4">
                <h3 className="font-bold flex items-center">
                  <span className="mr-2">📖</span> Glossar-Vorschau
                </h3>
                <div className="space-y-4">
                  <GlossaryItem term="RAG" definition="Erweiterung von KI-Antworten durch eigene Dokumente." />
                  <GlossaryItem term="Token" definition="Einheiten, in denen KI Text verarbeitet." />
                  <button className="w-full py-2.5 text-sm font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    Gesamtes Glossar
                  </button>
                </div>
              </div>

              {/* Trend Watcher */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white space-y-4">
                <h3 className="font-bold flex items-center">
                  <span className="mr-2">🔭</span> Trend Watcher
                </h3>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
                  <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">Top Trend</p>
                  <p className="text-sm font-semibold italic">„Multimodale Agenten in der Logistik“</p>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                  Neue Forschungsdaten zeigen 15% Effizienzsteigerung durch lokale LLM-Integration.
                </p>
              </div>
            </div>
          </div>

          {/* Model Catalog Preview */}
          <section className="space-y-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">📦</span> Modell-Katalog (NIM)
              </h3>
              <button className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                Alle 147 Modelle
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModelCard name="Mixtral 8x7B" type="Text Generation" info="MoE Flagship" />
              <ModelCard name="NV-Embed-v2" type="Retrieval" info="Top MTEB Rank" />
              <ModelCard name="Nemotron-3" type="Safety" info="Content Guard" />
            </div>
          </section>

          {/* FAQ / Accordion Section */}
          <section className="max-w-3xl mx-auto py-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-2xl font-bold text-center mb-8">Häufige Fragen</h3>
            <div className="space-y-4">
              <details className="group glass-card rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm" open>
                <summary className="p-4 cursor-pointer font-bold flex items-center justify-between list-none">
                  Ist das ein echtes System?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800">
                  Dies ist eine Vorschau der Benutzeroberfläche (Premium Shell). Die Anbindung an echte KI-Systeme erfolgt in der nächsten Entwicklungsphase.
                </div>
              </details>
              <details className="group glass-card rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                <summary className="p-4 cursor-pointer font-bold flex items-center justify-between list-none">
                  Was lernt man hier zuerst?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800">
                  Wir empfehlen mit dem KI-Navigator zu starten, um ein individuelles Lernprofil zu erstellen.
                </div>
              </details>
            </div>
          </section>
        </div>

        <footer className="mt-auto py-10 px-8 border-t border-slate-200 dark:border-slate-800 text-center space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-center space-x-6 text-sm font-bold text-slate-400">
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Impressum</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Datenschutz</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Kontakt</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} KI‑Lernportal NIM. Ein Premium-Produkt für digitale Bildung.
          </p>
        </footer>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
    }`}>
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
  );
}

function StatsCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: string }) {
  return (
    <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition-colors group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-[10px] font-extrabold text-blue-600/50 uppercase">Update</span>
      </div>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-[11px] font-bold text-slate-500 mt-0.5">{label}</p>
      <p className="text-[10px] text-slate-400 mt-2 font-medium italic">{sub}</p>
    </div>
  );
}

function RecommendationCard({ title, desc, tag, level }: { title: string, desc: string, tag: string, level: string }) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all cursor-pointer group">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
          {tag}
        </span>
        <span className="text-[10px] font-bold text-slate-400">{level}</span>
      </div>
      <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function PathItem({ title, progress, status, locked = false }: { title: string, progress: number, status: string, locked?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between transition-all group ${
      locked ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50'
    }`}>
      <div className="flex flex-col flex-1 pr-4">
        <span className="text-sm font-bold truncate">{title}</span>
        <div className="mt-2 w-full max-w-[200px] bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className={`text-[10px] font-black uppercase ${locked ? 'text-slate-400' : 'text-emerald-600'}`}>{status}</span>
        <span className="text-xs font-medium text-slate-400 mt-0.5">{locked ? '🔒' : `${progress}%`}</span>
      </div>
    </div>
  );
}

function GlossaryItem({ term, definition }: { term: string, definition: string }) {
  return (
    <div className="group border-l-2 border-blue-500 pl-4 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
      <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{term}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{definition}</p>
    </div>
  );
}

function ModelCard({ name, type, info }: { name: string, type: string, info: string }) {
  return (
    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 hover:shadow-lg transition-all cursor-pointer group border-b-2 border-b-transparent hover:border-b-blue-600">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">⚡</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold group-hover:text-blue-600 transition-colors">{name}</span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{type}</span>
        </div>
      </div>
      <p className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block">
        {info}
      </p>
    </div>
  );
}
