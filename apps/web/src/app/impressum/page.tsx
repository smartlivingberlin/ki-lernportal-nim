import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | KI-Lernportal NIM",
  description: "Impressum-Platzhalter für das KI-Lernportal NIM vor der finalen Live-Schaltung.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href="/" className="text-sm font-bold text-nim-primary hover:underline">
          ← Zurück zum Portal
        </Link>

        <section className="depth-card rounded-3xl p-8 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-nim-secondary">
              Rechtliche Pflichtangaben
            </p>
            <h1 className="text-3xl font-black text-nim-primary">Impressum</h1>
            <p className="text-sm leading-7 text-nim-secondary">
              Diese Seite ist ein Platzhalter für die finalen Anbieterkennzeichnungen vor der Live-Schaltung.
              Die endgültigen Angaben müssen mit echten Betreiber-, Kontakt- und Verantwortlichkeitsdaten ersetzt werden.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
            <strong>Hinweis:</strong> Dieses Impressum ist noch nicht final. Vor Veröffentlichung mit eigener Domain müssen
            die rechtlich erforderlichen Angaben geprüft und vollständig ergänzt werden.
          </div>

          <div className="space-y-4 text-sm leading-7">
            <h2 className="text-xl font-bold text-nim-primary">Noch zu ergänzen</h2>
            <ul className="list-disc space-y-2 pl-5 text-nim-secondary">
              <li>Name/Firma des Betreibers</li>
              <li>vollständige ladungsfähige Anschrift</li>
              <li>Kontaktangaben, zum Beispiel E-Mail-Adresse</li>
              <li>gegebenenfalls Vertretungsberechtigte</li>
              <li>gegebenenfalls Register-, Steuer- oder Aufsichtsangaben</li>
              <li>redaktionell Verantwortliche, falls erforderlich</li>
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
