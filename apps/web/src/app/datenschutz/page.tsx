import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Datenschutz | KI-Lernportal NIM",
  description:
    "Datenschutzhinweise für die private Demo des KI-Lernportals NIM.",
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

export default function DatenschutzPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 sm:py-16">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
        <p className="font-semibold">Private Demo / Datenschutzhinweis</p>
        <p className="mt-2">
          Diese Datenschutzhinweise sind für den aktuellen privaten Demo-Stand
          vorbereitet. Sie sind nicht für einen öffentlichen Produktlaunch,
          Tracking, Login, Zahlungen, Newsletter oder ein Kontaktformular
          freigegeben.
        </p>
      </div>

      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Datenschutz
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          Datenschutzhinweise
        </h1>
        <p className="max-w-3xl text-base leading-8 text-slate-700">
          Informationen zur Verarbeitung personenbezogener Daten im aktuellen
          privaten Demo-Stand des KI-Lernportals NIM.
        </p>
      </header>

      <Section title="1. Verantwortlicher">
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
          <a className="font-medium text-slate-950 underline" href="mailto:gadyri@icloud.com">
            gadyri@icloud.com
          </a>
        </p>
      </Section>

      <Section title="2. Aktueller Charakter des Portals">
        <p>
          Dieses Portal befindet sich im privaten Demo- und Entwicklungsstatus.
          Der aktuelle Stand ist als statisches Lern- und Orientierungsportal
          vorgesehen.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>kein Nutzerkonto</li>
          <li>kein Login</li>
          <li>kein Mitgliederbereich</li>
          <li>keine Zahlungsfunktion</li>
          <li>kein Abo</li>
          <li>keine aktive Lernstandspeicherung</li>
          <li>kein Kontaktformular</li>
          <li>kein Newsletter</li>
          <li>keine produktive Analyse- oder Tracking-Funktion</li>
          <li>keine nicht notwendigen Marketing- oder Tracking-Cookies</li>
        </ul>
        <p>
          Falls solche Funktionen später ergänzt werden, müssen diese Hinweise
          vorher angepasst werden.
        </p>
      </Section>

      <Section title="3. Hosting">
        <p>
          Für die private Demo ist Railway als Hosting-Ziel vorgesehen. Die finale
          Hosting-Region, Serverstandorte, Logdaten, Aufbewahrungsfristen
          und Fragen zur Auftragsverarbeitung müssen vor einer öffentlichen
          Veröffentlichung erneut geprüft werden.
        </p>
        <p>
          Bis diese Punkte final geprüft sind, bleibt dieser Text auf den privaten
          Demo-Stand begrenzt und ist nicht als öffentliche Launch-Freigabe zu
          verstehen.
        </p>
      </Section>

      <Section title="4. Zugriffsdaten und Server-Logs">
        <p>
          Beim Aufruf einer Website können technisch notwendige Zugriffsdaten
          verarbeitet werden, zum Beispiel:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Abrufs</li>
          <li>abgerufene Seite oder Datei</li>
          <li>Browser- und Geräteinformationen</li>
          <li>Referrer-Informationen, falls übermittelt</li>
          <li>technische Statuscodes</li>
        </ul>
        <p>
          Welche Daten im finalen Hosting konkret verarbeitet werden und wie
          lange sie gespeichert werden, muss anhand der finalen Hosting-
          Konfiguration geprüft werden.
        </p>
      </Section>

      <Section title="5. Kontaktaufnahme per E-Mail">
        <p>
          Wenn Nutzer per E-Mail Kontakt aufnehmen, werden die übermittelten
          Angaben verarbeitet, um die Anfrage zu bearbeiten. Dazu können
          insbesondere E-Mail-Adresse, Name, Inhalt der Nachricht und technische
          E-Mail-Metadaten gehören.
        </p>
        <p>
          Bitte senden Sie keine sensiblen personenbezogenen Daten, Passwörter,
          Ausweisdaten, Bankdaten oder vertraulichen Unterlagen per E-Mail.
        </p>
      </Section>

      <Section title="6. Cookies und vergleichbare Technologien">
        <p>
          Für die private Demo ist geplant, keine nicht notwendigen Cookies, kein
          Marketing-Tracking und keine Analyse-Cookies einzusetzen.
        </p>
        <p>
          Falls später Cookies, Analytics, Login, Lernfortschritt, Formulare oder
          Drittanbieter-Tools ergänzt werden, muss vor Aktivierung geprüft werden,
          ob Einwilligungen, zusätzliche Hinweise oder technische Anpassungen
          erforderlich sind.
        </p>
      </Section>

      <Section title="7. Externe Links">
        <p>
          Das Portal enthält Links zu externen Quellen und Lernressourcen. Beim
          Anklicken externer Links verlassen Nutzer dieses Portal. Für
          Datenschutz und Inhalte der externen Angebote gelten die Hinweise der
          jeweiligen Anbieter.
        </p>
      </Section>

      <Section title="8. Externe Schriftarten, Medien und Dienste">
        <p>
          Im aktuellen technischen Stand werden Next.js- und Font-Konfigurationen
          genutzt. Vor produktiver Veröffentlichung muss geprüft werden, ob
          Schriftarten lokal ausgeliefert werden oder externe Anfragen an
          Drittanbieter entstehen.
        </p>
      </Section>

      <Section title="9. Mögliche Rechtsgrundlagen">
        <p>
          Für eine private Demo können je nach konkreter Verarbeitung insbesondere
          die Bereitstellung der Website, technische Sicherheit, Bearbeitung
          freiwilliger Kontaktanfragen und berechtigte Interessen an stabiler
          Bereitstellung relevant sein.
        </p>
        <p>
          Falls später nicht notwendige Cookies oder Tracking eingesetzt werden,
          kann eine vorherige Einwilligung erforderlich sein.
        </p>
      </Section>

      <Section title="10. Speicherdauer">
        <p>
          Personenbezogene Daten werden nur so lange aufbewahrt, wie es für den
          jeweiligen Zweck erforderlich ist oder gesetzliche Pflichten bestehen.
          Konkrete Fristen für Server-Logs, E-Mail-Anfragen und mögliche spätere
          Funktionen müssen nach finalem Hosting- und Prozessentscheid ergänzt
          werden.
        </p>
      </Section>

      <Section title="11. Rechte betroffener Personen">
        <p>
          Betroffene Personen können nach Maßgabe der geltenden
          Datenschutzvorschriften Rechte geltend machen, insbesondere Auskunft,
          Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch
          und Datenübertragbarkeit, soweit die gesetzlichen Voraussetzungen
          vorliegen.
        </p>
        <p>
          Anfragen können per E-Mail gestellt werden:{" "}
          <a className="font-medium text-slate-950 underline" href="mailto:gadyri@icloud.com">
            gadyri@icloud.com
          </a>
        </p>
      </Section>

      <Section title="12. Beschwerderecht">
        <p>
          Betroffene Personen können sich bei einer zuständigen
          Datenschutzaufsichtsbehörde beschweren. Die konkret zuständige Behörde
          ist vor öffentlicher Veröffentlichung zu prüfen und zu ergänzen.
        </p>
      </Section>

      <Section title="13. Änderungsstand">
        <p>
          Diese Datenschutzhinweise sind für eine private Demo vorbereitet. Sie
          sind nicht final für öffentliche Domain, produktiven Deploy, Analytics,
          Cookies, Login, Kontaktformular, Zahlungen oder Newsletter.
        </p>
      </Section>
    </main>
  );
}
