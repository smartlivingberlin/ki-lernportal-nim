import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Impressum | KI-Lernraum",
  description:
    "Impressum und Anbieterinformationen für die öffentlich erreichbare Konzeptdemo des KI-Lernraums.",
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

export default function ImpressumPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 sm:py-16">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
        <p className="font-semibold">
          Öffentlich erreichbare Konzeptdemo / Entwicklungsstand
        </p>
        <p className="mt-2">
          Dieses Impressum gehört zur öffentlich erreichbaren Konzeptdemo
          „KI-Lernraum“. Die Angaben beschreiben den aktuellen
          Entwicklungsstand und müssen bei wesentlichen Änderungen des Angebots
          erneut geprüft werden.
        </p>
      </div>

      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Anbieterkennzeichnung
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          Impressum
        </h1>

        <p className="max-w-3xl text-base leading-8 text-slate-700">
          Angaben zum Betreiber der öffentlich erreichbaren Konzeptdemo.
          Das Portal ist ein Lern- und Orientierungsangebot zu grundlegender
          KI-Kompetenz.
        </p>

        <Link
          href="/"
          className="inline-flex font-medium text-slate-950 underline"
        >
          Zurück zum Lernraum
        </Link>
      </header>

      <Section title="Anbieter und Verantwortlicher">
        <p>
          Alisad Gadyri
          <br />
          Durlacher Str. 36
          <br />
          10715 Berlin
          <br />
          Deutschland
        </p>

        <p>
          E-Mail:{" "}
          <a
            className="font-medium text-slate-950 underline"
            href="mailto:gadyri@icloud.com"
          >
            gadyri@icloud.com
          </a>
        </p>

        <p className="text-xs text-slate-500">
          Telefonische Kontaktaufnahme ist derzeit nicht vorgesehen.
          Rückmeldungen zur Konzeptdemo bitte per E-Mail senden.
        </p>
      </Section>

      <Section title="Verantwortlich für Inhalte">
        <p>
          Alisad Gadyri
          <br />
          Durlacher Str. 36
          <br />
          10715 Berlin
          <br />
          Deutschland
        </p>
      </Section>

      <Section title="Zweck des Angebots">
        <p>
          Dieses Portal ist eine öffentlich erreichbare Konzeptdemo und
          befindet sich weiterhin im Entwicklungsstatus. Die Inhalte dienen der
          allgemeinen Information, Orientierung und Lernunterstützung rund um
          grundlegende KI-Kompetenz.
        </p>
      </Section>

      <Section title="Keine individuelle Beratung">
        <p>
          Die Inhalte ersetzen keine individuelle Rechtsberatung,
          Finanzberatung, medizinische Beratung, Steuerberatung oder
          Förderberatung. Wichtige Entscheidungen sollten anhand geeigneter
          offizieller oder fachlicher Quellen geprüft werden.
        </p>
      </Section>

      <Section title="Keine Förder-, Prüf- oder Zulassungsleistung">
        <p>
          Dieses Portal ist keine Prüfstelle, kein Fördermittelgeber und keine
          Stelle für behördliche oder berufliche Anerkennungen. Es besteht kein
          Anspruch auf Förderung, Prüfungserfolg, Vollständigkeit, Aktualität
          oder individuelle Eignung der Inhalte.
        </p>
      </Section>

      <Section title="Keine NVIDIA- oder NIM-Verbindung">
        <p>
          Der KI-Lernraum ist ein unabhängiges Lernprojekt. Im aktuell
          öffentlich sichtbaren Portal besteht keine produktive Integration von
          NVIDIA NIM und keine dargestellte Partnerschaft, Unterstützung oder
          Zertifizierung durch NVIDIA.
        </p>
      </Section>

      <Section title="Externe Links">
        <p>
          Dieses Portal kann auf externe Websites und Ressourcen verweisen. Für
          Inhalte, Datenschutz, Aktualität und Verfügbarkeit externer Angebote
          sind die jeweiligen Anbieter verantwortlich.
        </p>
      </Section>

      <Section title="Hinweis zum Stand">
        <p>Stand: 12. Juli 2026.</p>

        <p>
          Bei einer neuen Domain, Bezahlfunktion, Registrierung,
          Organisationsform oder wesentlichen Änderung des Angebots müssen
          Anbieter-, Hosting- und Kontaktdaten erneut geprüft und gegebenenfalls
          angepasst werden.
        </p>
      </Section>
    </main>
  );
}
