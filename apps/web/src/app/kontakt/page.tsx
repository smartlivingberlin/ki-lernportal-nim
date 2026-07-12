import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kontakt & Fehler melden | KI-Lernraum",
  description:
    "Kontaktmöglichkeit und Fehlerhinweise für die öffentlich erreichbare Konzeptdemo des KI-Lernraums.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function KontaktPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 sm:py-16">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
        <p className="font-semibold">
          Öffentlich erreichbare Konzeptdemo / Entwicklungsstand
        </p>

        <p className="mt-2">
          Diese Kontaktseite gehört zur öffentlich erreichbaren Konzeptdemo
          „KI-Lernraum“. Es gibt aktuell kein Kontaktformular, keinen Login,
          keine Upload-Funktion und kein verbindliches Supportversprechen.
        </p>
      </div>

      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Kontakt
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          Kontakt & Fehler melden
        </h1>

        <p className="max-w-3xl text-base leading-8 text-slate-700">
          Hinweise, Korrekturen und Rückmeldungen zur Konzeptdemo können per
          E-Mail gesendet werden.
        </p>

        <Link
          href="/"
          className="inline-flex font-medium text-slate-950 underline"
        >
          Zurück zum Lernraum
        </Link>
      </header>

      <Section title="Kontakt per E-Mail">
        <p>
          E-Mail:{" "}
          <a
            className="font-medium text-slate-950 underline"
            href="mailto:gadyri@icloud.com"
          >
            gadyri@icloud.com
          </a>
        </p>

        <p>
          Bitte verwenden Sie einen verständlichen Betreff, zum Beispiel
          „Fehlerhinweis KI-Lernraum“ oder „Rückmeldung zu Lektion 3“.
        </p>
      </Section>

      <Section title="Fehler oder unklare Inhalte melden">
        <p>Bitte nennen Sie möglichst konkret:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>die betroffene Seite, Lektion oder den betroffenen Abschnitt</li>
          <li>was unklar, falsch, veraltet oder missverständlich wirkt</li>
          <li>bei Quellenhinweisen die betroffene Quelle</li>
          <li>optional das verwendete Gerät und den Browser</li>
          <li>optional eine kurze Beschreibung des erwarteten Ergebnisses</li>
        </ul>
      </Section>

      <Section title="Keine sensiblen Daten senden">
        <p>
          Bitte senden Sie keine Passwörter, Ausweisdaten, Bankdaten,
          Gesundheitsdaten, vertraulichen Dokumente oder andere besonders
          schützenswerte personenbezogene Informationen.
        </p>

        <p>
          Für eine Fehlermeldung reichen normalerweise eine allgemeine
          Beschreibung und die Bezeichnung der betroffenen Seite oder Lektion.
        </p>
      </Section>

      <Section title="Kein Datei-Upload">
        <p>
          Das Portal besitzt derzeit keine Upload-Funktion. Dateien können nicht
          direkt über die Website hochgeladen oder im Portal gespeichert werden.
        </p>
      </Section>

      <Section title="Kein verbindliches Supportversprechen">
        <p>
          Die Konzeptdemo befindet sich im Entwicklungsstand. Es besteht kein
          Anspruch auf Antwort, Korrektur, Beratung oder individuelle
          Unterstützung innerhalb einer bestimmten Frist.
        </p>
      </Section>

      <Section title="Inhaltliche Verantwortung">
        <p>
          Hinweise können mit technischen Werkzeugen oder KI-Werkzeugen
          unterstützt geprüft werden. Die abschließende Entscheidung über
          Änderungen und Veröffentlichungen liegt beim Betreiber.
        </p>
      </Section>

      <Section title="Stand">
        <p>Stand: 12. Juli 2026.</p>

        <p>
          Bei Einführung eines Kontaktformulars, Supportsystems, Nutzerkontos
          oder Datei-Uploads müssen diese Seite und die Datenschutzhinweise vor
          der Aktivierung erneut geprüft werden.
        </p>
      </Section>
    </main>
  );
}
