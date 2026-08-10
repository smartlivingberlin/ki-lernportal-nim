"use client";

import { literacyPathMeta, literacyStations } from "../../data/literacy-path";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";
import { useLiteracyPathProgress } from "../../hooks/useLiteracyPathProgress";

export function LiteracyPathPanel() {
  const { completedStationIds, markComplete, unmark, reset } = useLiteracyPathProgress();
  const doneCount = completedStationIds.length;
  const total = literacyStations.length;
  const allDone = doneCount === total;
  const percent = Math.round((doneCount / total) * 100);

  const printProof = () => {
    window.print();
  };

  return (
    <section
      id="literacy-pfad"
      aria-labelledby="literacy-pfad-title"
      {...explainAttrs("literacy-path")}
      className="scroll-mt-72 space-y-4 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 sm:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="literacy-path">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          Kurzpfad · ca. {literacyPathMeta.totalMinutes} Min.
        </p>
        <h2
          id="literacy-pfad-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          {literacyPathMeta.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          {literacyPathMeta.subtitle}
        </p>
      </ExplainHotspot>

      <div
        className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4"
        role="group"
        aria-label="Fortschritt Literacy-Pfad"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-black text-[var(--nim-primary)]">
            {doneCount}/{total} Stationen · {percent}%
          </p>
          <button
            type="button"
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-3 text-xs font-black text-[var(--nim-primary)]"
            onClick={reset}
          >
            Pfad zurücksetzen
          </button>
        </div>
        <div
          className="mt-3 h-3 overflow-hidden rounded-full bg-white"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-[var(--nim-primary)] transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="sr-only">
          Literacy-Pfad Fortschritt: {doneCount} von {total} Stationen erledigt.
        </p>
      </div>

      <ol className="space-y-3">
        {literacyStations.map((station) => {
          const done = completedStationIds.includes(station.id);
          return (
            <li
              key={station.id}
              className="rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
                    Station {station.order} · ca. {station.minutes} Min.
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
                    {station.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--nim-secondary)]">{station.summary}</p>
                </div>
                <span
                  className={[
                    "rounded-[var(--nim-radius-sm)] px-3 py-1 text-xs font-black",
                    done
                      ? "bg-[var(--nim-success-soft)] text-[var(--nim-success)]"
                      : "bg-white text-[var(--nim-secondary)]",
                  ].join(" ")}
                >
                  {done ? "erledigt" : "offen"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={station.href}
                  className="nim-interactive inline-flex min-h-11 items-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
                >
                  {station.actionLabel}
                </a>
                <button
                  type="button"
                  className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
                  onClick={() => (done ? unmark(station.id) : markComplete(station.id))}
                >
                  {done ? "Station wieder öffnen" : "Station erledigen"}
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <div
        id="literacy-nachweis"
        className="scroll-mt-72 rounded-[var(--nim-radius-lg)] border-2 border-[var(--nim-primary)] bg-[var(--nim-primary-soft)] p-5 sm:scroll-mt-64 lg:scroll-mt-36"
      >
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
          Lokaler Teilnahme-Nachweis
        </h3>
        <p className="mt-2 text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          {literacyPathMeta.disclaimer}
        </p>
        {allDone ? (
          <div className="mt-4 space-y-3 rounded-[var(--nim-radius-md)] bg-[var(--nim-surface)] p-4 print:border print:border-black">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
              KI-Lernportal NIM
            </p>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              Teilnahme-Nachweis: {literacyPathMeta.title}
            </p>
            <p className="text-sm leading-7 text-[var(--nim-secondary)]">
              In diesem Browser wurden alle {total} Stationen des Kurzpfads als erledigt markiert.
              Datum (Gerät):{" "}
              {new Date().toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
            <p className="text-xs font-semibold text-[var(--nim-secondary)]">
              Hinweis: lokal erzeugt, ohne Benutzerkonto, ohne Server-Prüfung.
            </p>
            <button
              type="button"
              onClick={printProof}
              className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white print:hidden"
            >
              Nachweis drucken / als PDF speichern
            </button>
          </div>
        ) : (
          <p className="mt-3 text-sm font-semibold text-[var(--nim-secondary)]">
            Noch {total - doneCount} Station(en) offen — markiere sie, wenn du sie bearbeitet hast.
          </p>
        )}
      </div>
    </section>
  );
}
