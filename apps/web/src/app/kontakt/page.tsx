import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kontakt & Fehler melden | KI-Lernportal NIM",
  description:
    "Kontaktmöglichkeit und Fehlerhinweise für die private Demo des KI-Lernportals NIM.",
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
        <p className="font-semibold">Private Demo / Entwicklungsstand</p>
        <p className="mt-2">
          Diese Kontaktseite gehört zum privaten Demo-Stand. Es gibt aktuell kein
          Kontaktformular, keinen Login, keine Upload-Funktion und kein
          Supportversprechen.
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
          Hinweise, Korrekturen und Rückmeldungen zur privaten Demo können per
          E-Mail gesendet werden.
        </p>
      </header>

      <Section title="Kontakt per E-Mail">
        <p>
          E-Mail:{" "}
          <a className="font-medium text-slate-950 underline" href="mailto:gadyri@icloud.com">
            gadyri@icloud.com
          </a>
        </p>
      </Section>

      <Section title="Fehler oder unklare Inhalte melden">
        <p>Bitte nennen Sie möglichst konkret:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>die betroffene Seite oder den betroffenen Abschnitt</li>
          <li>was unklar, falsch, veraltet oder missverständlich wirkt</li>
          <li>falls es um Quellen geht: welche Quelle betroffen ist</li>
          <li>optional: kurze Erklärung, was erwartet wurde</li>
        </ul>
      </Section>

      <Section title="Keine sensiblen Daten senden">
        <p>
          Bitte senden Sie keine sensiblen personenbezogenen Daten, keine
          Passwörter, keine Ausweisdaten, keine Bankdaten und keine
          vertraulichen Unterlagen.
        </p>
      </Section>

      <Section title="Kein Supportversprechen">
        <p>
          Die private Demo ist ein Entwicklungsstand. Es besteht kein Anspruch
          auf Antwort, Korrektur, Beratung oder individuelle Unterstützung
          innerhalb einer bestimmten Frist.
        </p>
      </Section>

      <Section title="Inhaltliche Verantwortung">
        <p>
          Hinweise können mit KI-Tools unterstützt geprüft werden. Die finale
          Entscheidung über Änderungen liegt beim Betreiber.
        </p>
      </Section>
    </main>
  );
}
