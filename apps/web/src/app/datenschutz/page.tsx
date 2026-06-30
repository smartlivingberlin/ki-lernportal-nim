import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | KI-Lernportal NIM",
  description: "Datenschutz-Platzhalter für das KI-Lernportal NIM vor der finalen Live-Schaltung.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href="/" className="text-sm font-bold text-nim-primary hover:underline">
          ← Zurück zum Portal
        </Link>

        <section className="depth-card rounded-3xl p-8 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-nim-secondary">
              Datenschutzinformation
            </p>
            <h1 className="text-3xl font-black text-nim-primary">Datenschutz</h1>
            <p className="text-sm leading-7 text-nim-secondary">
              Diese Seite ist ein Platzhalter für die finale Datenschutzerklärung vor der Live-Schaltung.
              Der aktuelle Prototyp arbeitet ohne Login, ohne eigenes Kontaktformular und ohne produktives Tracking.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
            <strong>Hinweis:</strong> Diese Datenschutzerklärung ist noch nicht final. Vor Veröffentlichung müssen Hosting,
            externe Dienste, Cookies, Schriftarten, Kontaktwege und sonstige Datenverarbeitungen konkret geprüft werden.
          </div>

          <div className="space-y-4 text-sm leading-7">
            <h2 className="text-xl font-bold text-nim-primary">Aktueller Prototyp-Stand</h2>
            <ul className="list-disc space-y-2 pl-5 text-nim-secondary">
              <li>keine Registrierung im Portal</li>
              <li>kein produktiver Mitgliederbereich</li>
              <li>kein eigenes Kontaktformular</li>
              <li>keine Zahlungsfunktion</li>
              <li>keine produktive Lernstandspeicherung</li>
              <li>externe Links führen zu Drittanbietern mit eigenen Datenschutzregeln</li>
            </ul>
          </div>

          <div className="space-y-4 text-sm leading-7">
            <h2 className="text-xl font-bold text-nim-primary">Vor Live-Schaltung zu prüfen</h2>
            <ul className="list-disc space-y-2 pl-5 text-nim-secondary">
              <li>Hosting-Anbieter und Serverstandort</li>
              <li>eingesetzte Analyse-, Cookie- oder Tracking-Dienste</li>
              <li>externe Schriftarten, Medien und eingebundene Inhalte</li>
              <li>Kontaktkanäle und Aufbewahrungsfristen</li>
              <li>Rechtsgrundlagen und Betroffenenrechte</li>
            </ul>
          </div>

          <p className="text-xs leading-6 text-nim-secondary">
            Keine Rechtsberatung. Diese Seite dient nur als struktureller Launch-Readiness-Platzhalter.
          </p>
        </section>
      </div>
    </main>
  );
}
