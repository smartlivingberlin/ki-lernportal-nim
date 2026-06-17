import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Hero Section */}
      <header className="bg-blue-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">KI‑Lernportal NIM</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Ihre Einstiegshilfe in die Welt der künstlichen Intelligenz – Schritt für Schritt, verständlich und motivierend.
        </p>
        <div className="mt-8">
          <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold uppercase text-sm">
            MVP-Aufbau — noch kein echtes KI-System angeschlossen
          </span>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Simple Explanation */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Was ist das KI-Lernportal?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Dieses Portal hilft Menschen mit wenig oder keiner KI-Erfahrung, die Möglichkeiten von künstlicher Intelligenz zu verstehen und sicher zu nutzen. Wir verwenden einfache Sprache und klare Beispiele.
          </p>
        </section>

        {/* Target Group Sections */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Für Anfänger</h3>
            <p className="text-gray-600 mb-4">
              Lernen Sie die Grundlagen der KI ohne Fachchinesisch. Starten Sie mit einfachen Übungen und entdecken Sie, wie KI Ihren Alltag erleichtern kann.
            </p>
            <button className="text-blue-600 font-semibold hover:underline">Mehr erfahren →</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Für Fortgeschrittene</h3>
            <p className="text-gray-600 mb-4">
              Vertiefen Sie Ihr Wissen über verschiedene KI-Modelle und lernen Sie, wie Sie komplexe Aufgaben mit Hilfe von KI-Agenten automatisieren können.
            </p>
            <button className="text-blue-600 font-semibold hover:underline">Mehr erfahren →</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Für Unternehmer & Träger</h3>
            <p className="text-gray-600 mb-4">
              Entdecken Sie Potenziale für Ihr Unternehmen oder Ihre Bildungseinrichtung. Wir zeigen Ihnen Wege zur sicheren und effizienten Implementierung.
            </p>
            <button className="text-blue-600 font-semibold hover:underline">Mehr erfahren →</button>
          </div>
        </section>

        {/* Placeholders for Future Content */}
        <section className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Zukünftige Funktionen</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center opacity-60">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">📖</span>
              </div>
              <h4 className="font-bold mb-2">Glossar</h4>
              <p className="text-sm text-gray-500 italic">Hier entsteht ein Verzeichnis für Fachbegriffe in einfacher Sprache.</p>
            </div>
            <div className="text-center opacity-60">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="font-bold mb-2">Modellkatalog</h4>
              <p className="text-sm text-gray-500 italic">Hier finden Sie bald eine Übersicht verschiedener KI-Modelle.</p>
            </div>
            <div className="text-center opacity-60">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">🔭</span>
              </div>
              <h4 className="font-bold mb-2">Trend-Watcher</h4>
              <p className="text-sm text-gray-500 italic">Bleiben Sie auf dem Laufenden über aktuelle Entwicklungen in der KI-Welt.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} KI‑Lernportal NIM. Alle Rechte vorbehalten.</p>
        <p className="text-sm mt-2 opacity-70">Ein Projekt zur Förderung der KI-Literacy.</p>
      </footer>
    </div>
  );
}
