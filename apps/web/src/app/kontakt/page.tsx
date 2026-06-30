import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt & Fehler melden | KI-Lernportal NIM",
  description: "Kontakt- und Fehler-melden-Seite für das KI-Lernportal NIM.",
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href="/" className="text-sm font-bold text-nim-primary hover:underline">
          ← Zurück zum Portal
        </Link>

        <section className="depth-card rounded-3xl p-8 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-nim-secondary">
              Kontakt & Qualitätssicherung
            </p>
            <h1 className="text-3xl font-black text-nim-primary">Kontakt & Fehler melden</h1>
            <p className="text-sm leading-7 text-nim-secondary">
              Diese Seite bereitet einen einfachen Kontakt- und Fehler-melden-Bereich vor. Aktuell gibt es bewusst
              kein Formular, keinen Upload und keine automatische Übermittlung personenbezogener Daten.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-800">
            <strong>Prototyp-Hinweis:</strong> Eine konkrete Kontaktadresse wird vor der Live-Schaltung ergänzt.
            Bis dahin bleibt diese Seite ein statischer Platzhalter.
          </div>

          <div className="space-y-4 text-sm leading-7">
            <h2 className="text-xl font-bold text-nim-primary">Fehler melden: sinnvoller Inhalt</h2>
            <ul className="list-disc space-y-2 pl-5 text-nim-secondary">
              <li>betroffene Seite oder Abschnitt nennen</li>
              <li>kurz beschreiben, was unklar, falsch oder nicht barrierearm ist</li>
              <li>bei Quellenproblemen die betroffene Quelle nennen</li>
              <li>keine sensiblen personenbezogenen Daten senden</li>
            </ul>
          </div>

          <div className="space-y-4 text-sm leading-7">
            <h2 className="text-xl font-bold text-nim-primary">Noch zu ergänzen</h2>
            <ul className="list-disc space-y-2 pl-5 text-nim-secondary">
              <li>finale Kontaktadresse</li>
              <li>Verantwortlichkeit für Inhalte und Quellenprüfung</li>
              <li>Prozess für Korrekturen und Quellenupdates</li>
              <li>optional später: Formular mit Datenschutzprüfung</li>
            </ul>
          </div>

          <p className="text-xs leading-6 text-nim-secondary">
            Keine Rechtsberatung. Keine Förderzusage. Keine Zertifizierung. Externe Hinweise werden vor Live-Schaltung final geprüft.
          </p>
        </section>
      </div>
    </main>
  );
}
