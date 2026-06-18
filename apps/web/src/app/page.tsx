export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      {/* Hero Section */}
      <header className="bg-zinc-50 border-b border-zinc-200 py-16 px-6 sm:py-24 sm:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
            Willkommen beim KI-Lernportal NIM
          </h1>
          <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
            Ihr Begleiter beim Einstieg in die Welt der Künstlichen Intelligenz.
            Einfach erklärt, praxisnah und für jeden verständlich.
          </p>
          <div className="inline-block bg-yellow-100 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-md font-medium text-sm mb-4">
            MVP-Aufbau — noch kein echtes KI-System angeschlossen
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {/* Erklärung des Portals */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Was ist das KI-Lernportal?</h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Dieses Portal ist eine adaptive Lernplattform für Einsteiger und Fortgeschrittene.
            Wir helfen Ihnen dabei, die Konzepte hinter modernen KI-Systemen wie NVIDIA NIM zu verstehen,
            Fachbegriffe zu übersetzen und die richtigen Werkzeuge für Ihre Aufgaben zu finden.
          </p>
        </section>

        {/* Zielgruppen-Sektionen */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Für Anfänger</h3>
            <p className="text-zinc-600">
              Starten Sie hier, wenn Sie keine Vorkenntnisse haben. Wir erklären Grundlagen
              wie &quot;Was ist ein Prompt?&quot; oder &quot;Wie funktioniert KI?&quot; in einfacher Sprache.
            </p>
          </div>
          <div className="border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Für Fortgeschrittene</h3>
            <p className="text-zinc-600">
              Vertiefen Sie Ihr Wissen über RAG, Vektordatenbanken und Agenten-Systeme.
              Lernen Sie, wie man KI-Modelle effizient einsetzt.
            </p>
          </div>
          <div className="border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">Unternehmer & Träger</h3>
            <p className="text-zinc-600">
              Entdecken Sie Potenziale für Ihr Unternehmen oder Bildungseinrichtung.
              Wir zeigen Wege zur sicheren und DSGVO-konformen KI-Implementierung.
            </p>
          </div>
        </section>

        {/* Placeholders */}
        <section className="grid md:grid-cols-3 gap-8 border-t border-zinc-100 pt-12 text-center">
          <div className="bg-zinc-50 rounded-lg p-6 opacity-60">
            <h4 className="font-bold mb-2">Glossar</h4>
            <p className="text-sm text-zinc-500 italic">In Vorbereitung</p>
          </div>
          <div className="bg-zinc-50 rounded-lg p-6 opacity-60">
            <h4 className="font-bold mb-2">Modellkatalog</h4>
            <p className="text-sm text-zinc-500 italic">In Vorbereitung</p>
          </div>
          <div className="bg-zinc-50 rounded-lg p-6 opacity-60">
            <h4 className="font-bold mb-2">Trend-Watcher</h4>
            <p className="text-sm text-zinc-500 italic">In Vorbereitung</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-12 px-6 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} KI-Lernportal NIM. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
