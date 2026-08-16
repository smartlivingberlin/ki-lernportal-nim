import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Datenschutz | KI-Lernportal NIM",
  description:
    "Datenschutzhinweise für die öffentlich erreichbare Konzeptdemo des KI-Lernportal NIM.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 min-w-0 space-y-3 text-sm leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-6 px-4 py-12 [overflow-wrap:anywhere] sm:px-6 sm:py-16">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
        <p className="font-semibold">
          Öffentlich erreichbare Konzeptdemo / Datenschutzhinweis
        </p>
        <p className="mt-2">
          Diese Hinweise beschreiben den aktuellen begrenzten Funktionsstand.
          Lernen ist ohne Konto möglich. Für spätere produktive Konten,
          Zahlungen, Analytics, Newsletter, Kontaktformular oder KI-Dienste
          müssen die Hinweise vor deren Aktivierung erneut technisch und
          rechtlich geprüft werden.
        </p>
      </div>

      <header className="min-w-0 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Datenschutz
        </p>

        <h1 className="min-w-0 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Datenschutzhinweise
        </h1>

        <p className="max-w-3xl text-base leading-8 text-slate-700">
          Informationen zur Verarbeitung personenbezogener Daten beim Besuch
          der öffentlich erreichbaren Konzeptdemo „KI-Lernportal NIM“.
        </p>

        <Link
          href="/"
          className="inline-flex font-medium text-slate-950 underline"
        >
          Zurück zum Lernraum
        </Link>
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
          <a
            className="font-medium text-slate-950 underline"
            href="mailto:gadyri@icloud.com"
          >
            gadyri@icloud.com
          </a>
        </p>
      </Section>

      <Section title="2. Aktueller Funktionsstand">
        <p>
          Das Portal ist eine öffentlich erreichbare Konzeptdemo und befindet
          sich weiterhin im Entwicklungsstatus. Der aktuelle Stand ist ein
          statisches Lern- und Orientierungsangebot.
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            kein öffentliches Nutzerkonto und kein Login-Zwang zum Lernen
          </li>
          <li>
            keine produktive Anmeldung in der öffentlichen Konzeptdemo
            (Production-Auth ist abgeschaltet)
          </li>
          <li>
            optional nur hinter Feature-Flag: Test-Anmeldung unter{" "}
            <Link href="/anmelden" className="font-medium text-slate-950 underline">
              /anmelden
            </Link>{" "}
            (z.&nbsp;B. Staging) — nicht erforderlich für Lernfortschritt
          </li>
          <li>kein Mitgliederbereich</li>
          <li>keine Zahlungs- oder Abofunktion</li>
          <li>kein Kontaktformular und kein Newsletter</li>
          <li>keine produktive Analyse- oder Tracking-Funktion</li>
          <li>keine nicht notwendigen Marketing- oder Tracking-Cookies</li>
          <li>
            lokale Speicherung von Lernfortschritt und Einstellungen im Browser
          </li>
          <li>
            optionale, kuratierte Lern-Illustrationen, kurze vorproduzierte
            Lernclips und Hörfassungen als statische Dateien vom selben Hosting
            (Untertitel als VTT; Transkript bei Audio; synthetische Stimmen
            gekennzeichnet; kein Tracking-Pixel, keine Webcam-/Mikrofon-Nutzung,
            kein Autoplay mit Ton, kein Laufzeit-Cloud-TTS)
          </li>
          <li>keine serverseitige Lerndatenbank</li>
          <li>
            optionaler Mock-Tutor mit fest kuratierten Antworten aus dem
            Lektionsstoff (kein Netz, kein Freitext-Chat, keine
            Live-KI-/LLM-Anbindung an Drittanbieter)
          </li>
          <li>
            optionale kuratierte Quellen-Suche mit festen Fragen und Zitaten
            aus freigegebenen Passagen (bei fehlender Evidenz Enthaltung; kein
            Netz, keine Embeddings, keine Live-KI, kein Freitext-Chat)
          </li>
        </ul>

        <p>
          Wenn weitere Funktionen hinzukommen, müssen diese Hinweise vor ihrer
          Aktivierung angepasst werden.
        </p>
      </Section>

      <Section title="3. Hosting und Server-Logs">
        <p>
          Das Portal wird derzeit über Railway bereitgestellt. Beim Aufruf
          können technisch notwendige Zugriffsdaten und Server-Logs verarbeitet
          werden.
        </p>

        <p>Dazu können insbesondere gehören:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Abrufs</li>
          <li>abgerufene Seite oder Datei</li>
          <li>Browser- und Geräteinformationen</li>
          <li>Referrer-Informationen, falls übermittelt</li>
          <li>technische Status- und Fehlercodes</li>
        </ul>

        <p>
          Die konkrete Hosting-Region, Serverstandorte, Unterauftragnehmer,
          Datenübermittlungen und Aufbewahrungsfristen müssen anhand der
          tatsächlich eingesetzten Railway-Konfiguration und der jeweils
          aktuellen Anbieterunterlagen weiter geprüft werden.
        </p>
      </Section>

      <Section title="4. Lokaler Lernfortschritt im Browser">
        <p>
          Das Portal speichert Lernmarkierungen und Einstellungen im lokalen
          Speicher des verwendeten Browsers (
          <code className="rounded bg-slate-100 px-1">localStorage</code>).
        </p>

        <p>
          Dafür werden derzeit folgende technische Schlüssel verwendet:
        </p>
        <ul
          className="mt-2 min-w-0 list-disc space-y-3 overflow-x-hidden pl-5"
          data-testid="datenschutz-storage-keys"
        >
          <li className="min-w-0">
            <span className="block">Lektionen:</span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:local-progress:v1
            </code>
          </li>
          <li className="min-w-0">
            <span className="block">Vertiefungs-Einheiten:</span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:micro-progress:v1
            </code>
          </li>
          <li className="min-w-0">
            <span className="block">60-Minuten-Kurzpfad:</span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:literacy-path:v1
            </code>
          </li>
          <li className="min-w-0">
            <span className="block">Wiederholungs-Übungen:</span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:spaced-review:v1
            </code>
          </li>
          <li className="min-w-0">
            <span className="block">Einstiegs-Selbstcheck (Antworten/Empfehlung):</span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:self-check:v1
            </code>
          </li>
          <li className="min-w-0">
            <span className="block">
              „Noch unsicher“-Markierungen an Lektionen:
            </span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:lesson-confidence:v1
            </code>
          </li>
          <li className="min-w-0">
            <span className="block">Einfache Ansicht (Schalter):</span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:simple-mode:v1
            </code>
          </li>
          <li className="min-w-0">
            <span className="block">Einstiegs-Coach (Hinweis erledigt):</span>
            <code
              className="mt-1 block max-w-full rounded bg-slate-100 px-1"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              ki-lernportal-nim:first-start-coach:v1
            </code>
          </li>
        </ul>

        <p>
          Nur diese Schlüssel speichern Daten dauerhaft im Browser. Interne
          Event-Namen (z.&nbsp;B.{" "}
          <code className="rounded bg-slate-100 px-1">*-change</code>) sind
          keine Speicher-Keys. Einschätzungen in Challenges/Teachback in der
          aktuellen Ansicht werden nicht dauerhaft gespeichert.
        </p>

        <p>
          Die Sicherungsdatei unter „Fortschritt sichern“ enthält die sechs
          Lernstände (Lektionen, Vertiefung, Kurzpfad, Wiederholen,
          Selbstcheck und „Noch unsicher“). Einfache Ansicht und
          Einstiegs-Coach bleiben absichtlich außerhalb der Sicherung und
          außerhalb des globalen Zurücksetzens.
        </p>

        <p>
          Nach dem aktuellen Code verbleibt dieser Lernstand auf dem verwendeten
          Endgerät. Er wird nicht mit einem öffentlichen Nutzerkonto verbunden
          und nicht an eine serverseitige Lerndatenbank übertragen. Eine
          optionale Test-Anmeldung (siehe Abschnitt 2) speichert keinen
          Lernfortschritt auf dem Server.
        </p>

        <p>
          Der gespeicherte Lernstand kann über die Funktion zum Zurücksetzen des
          Lernstands oder durch das Löschen der Website-Daten im Browser
          entfernt werden. Zusätzlich kannst du den lokalen Stand als
          Sicherungsdatei herunterladen und auf demselben oder einem anderen Browser
          wieder einspielen („Fortschritt sichern“). Der Download verlässt nur
          dein Gerät, sofern du die Datei nicht selbst weitergibst.
        </p>
      </Section>

      <Section title="5. Kontaktaufnahme per E-Mail">
        <p>
          Wenn Nutzer per E-Mail Kontakt aufnehmen, werden die übermittelten
          Angaben verarbeitet, um die Anfrage zu bearbeiten. Dazu können
          insbesondere E-Mail-Adresse, Name, Nachrichteninhalt und technische
          E-Mail-Metadaten gehören.
        </p>

        <p>
          Bitte senden Sie keine Passwörter, Ausweisdaten, Bankdaten,
          Gesundheitsdaten oder vertraulichen Unterlagen per E-Mail.
        </p>
      </Section>

      <Section title="6. Cookies und vergleichbare Technologien">
        <p>
          Im aktuellen Stand setzt das Portal nach dem geprüften Quellcode keine
          nicht notwendigen Marketing- oder Analyse-Cookies ein.
        </p>

        <p>
          Die lokale Fortschrittsspeicherung im Browser (
          <code className="rounded bg-slate-100 px-1">localStorage</code>,
          Abschnitt 4) dient der gewünschten Lernfunktion auf diesem Gerät. Sie
          ist von einer serverseitigen Lerndatenbank zu unterscheiden.
        </p>

        <p>
          Wenn die Auth-Runtime hinter Feature-Flag aktiv ist (typischerweise
          nur Staging), kann bei erfolgreicher Test-Anmeldung ein technisches
          Sitzungs-Cookie{" "}
          <code className="rounded bg-slate-100 px-1">nim_session</code>{" "}
          gesetzt werden (HttpOnly, Secure, SameSite=Lax). In der öffentlichen
          Production-Konzeptdemo ist diese Runtime abgeschaltet; Lernen
          benötigt kein Cookie.
        </p>

        <p>
          Werden später Analytics, produktive Konten, Formulare, KI-Dienste oder
          andere Drittanbieter-Funktionen ergänzt, muss vor der Aktivierung
          geprüft werden, ob zusätzliche Hinweise, Einwilligungen oder
          technische Schutzmaßnahmen erforderlich sind.
        </p>
      </Section>

      <Section title="7. Externe Links">
        <p>
          Das Portal enthält Links zu externen Quellen und Lernressourcen. Beim
          Anklicken verlassen Nutzer dieses Portal. Für die Datenverarbeitung
          und Inhalte der externen Angebote gelten die Hinweise der jeweiligen
          Anbieter.
        </p>
      </Section>

      <Section title="8. Externe Schriftarten, Medien und Dienste">
        <p>
          Im aktuellen Projekt werden Next.js- und Schriftartenfunktionen
          verwendet. Vor einem öffentlichen Produktlaunch muss durch eine
          praktische Netzwerkprüfung bestätigt werden, welche externen
          Verbindungen beim Seitenaufruf tatsächlich entstehen.
        </p>
      </Section>

      <Section title="9. Rechtsgrundlagen">
        <p>
          Die jeweils anwendbare Rechtsgrundlage richtet sich nach Art, Zweck
          und Umfang der konkreten Verarbeitung. In Betracht kommen
          insbesondere die technische Bereitstellung und Sicherheit der
          Website sowie die Bearbeitung freiwilliger E-Mail-Anfragen.
        </p>

        <p>
          Werden später nicht notwendige Cookies, Analytics oder andere
          zustimmungspflichtige Funktionen eingesetzt, kann eine vorherige
          Einwilligung erforderlich sein.
        </p>
      </Section>

      <Section title="10. Speicherdauer">
        <p>
          Der lokale Lernfortschritt bleibt im Browser gespeichert, bis er im
          Portal zurückgesetzt oder über die Website-Daten des Browsers gelöscht
          wird.
        </p>

        <p>
          Server-Logs und E-Mail-Anfragen werden nur so lange verarbeitet, wie
          es für den jeweiligen Zweck erforderlich ist oder gesetzliche
          Aufbewahrungspflichten bestehen. Konkrete Fristen für Server-Logs
          müssen anhand der eingesetzten Hosting-Konfiguration weiter geprüft
          werden.
        </p>
      </Section>

      <Section title="11. Rechte betroffener Personen">
        <p>
          Betroffene Personen können nach Maßgabe der geltenden
          Datenschutzvorschriften insbesondere Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit
          verlangen, soweit die jeweiligen gesetzlichen Voraussetzungen
          vorliegen.
        </p>

        <p>
          Anfragen können per E-Mail gestellt werden:{" "}
          <a
            className="font-medium text-slate-950 underline"
            href="mailto:gadyri@icloud.com"
          >
            gadyri@icloud.com
          </a>
        </p>
      </Section>

      <Section title="12. Beschwerderecht">
        <p>
          Betroffene Personen können sich bei einer zuständigen
          Datenschutzaufsichtsbehörde beschweren. Die konkrete Zuständigkeit
          richtet sich nach den gesetzlichen Zuständigkeitsregeln.
        </p>
      </Section>

      <Section title="13. Änderungsstand">
        <p>
          Stand: 15. August 2026.
        </p>

        <p>
          Diese Datenschutzhinweise beschreiben den derzeitigen begrenzten
          Funktionsstand der Konzeptdemo. Vor der Aktivierung weiterer
          Funktionen oder einem öffentlichen Produktlaunch müssen sie erneut
          technisch und rechtlich geprüft werden.
        </p>
      </Section>
    </main>
  );
}
