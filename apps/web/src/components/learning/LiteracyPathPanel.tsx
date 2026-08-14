"use client";

import { useState } from "react";
import { literacyPathMeta, literacyStations } from "../../data/literacy-path";
import { literacyStationForMode } from "../../data/next-step";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";
import { ResetProgressConfirm } from "./ResetProgressConfirm";
import { useLiteracyPathProgress } from "../../hooks/useLiteracyPathProgress";
import { useSimpleMode } from "../../hooks/useSimpleMode";

export function LiteracyPathPanel() {
  const { completedStationIds, markComplete, unmark, reset } = useLiteracyPathProgress();
  const { enabled: simpleMode } = useSimpleMode();
  const [resetOpen, setResetOpen] = useState(false);
  const doneCount = completedStationIds.length;
  const total = literacyStations.length;
  const allDone = doneCount === total;
  const percent = Math.round((doneCount / total) * 100);
  const nextStationRaw =
    literacyStations.find((station) => !completedStationIds.includes(station.id)) ?? null;
  const nextStation = nextStationRaw
    ? literacyStationForMode(nextStationRaw, simpleMode)
    : null;

  const printProof = () => {
    window.print();
  };

  const confirmReset = () => {
    reset();
    setResetOpen(false);
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
          Kernweg · Kurzpfad · ca. {literacyPathMeta.totalMinutes} Min.
        </p>
        <h2
          id="literacy-pfad-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          {literacyPathMeta.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          {literacyPathMeta.subtitle} Derselbe „Nächste Schritt“ wie in der Heute-Karte.
        </p>
      </ExplainHotspot>

      <div
        className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4"
        role="group"
        aria-label="Fortschritt 60-Minuten-Kurzpfad"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-black text-[var(--nim-primary)]">
            {doneCount}/{total} Stationen · {percent}%
          </p>
          <button
            type="button"
            data-testid="literacy-path-reset"
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-3 text-xs font-black text-[var(--nim-primary)]"
            onClick={() => setResetOpen(true)}
            aria-expanded={resetOpen}
            aria-controls="literacy-reset-confirm"
          >
            Pfad zurücksetzen
          </button>
        </div>
        <div id="literacy-reset-confirm">
          <ResetProgressConfirm
            open={resetOpen}
            onCancel={() => setResetOpen(false)}
            onConfirm={confirmReset}
            titleId="literacy-reset-progress-title"
            title="Kurzpfad wirklich zurücksetzen?"
            items={["Stationen des 60-Minuten-Kurzpfads (nur dieser Pfad)"]}
            backupLinkTestId="literacy-reset-progress-backup-link"
          />
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
          Kurzpfad-Fortschritt: {doneCount} von {total} Stationen erledigt.
        </p>
      </div>

      {nextStation ? (
        <div
          data-testid="literacy-next-step"
          className="rounded-[var(--nim-radius-md)] border border-[var(--nim-primary)]/30 bg-[var(--nim-primary-soft)] p-4"
        >
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
            Nächster Schritt · Station {nextStation.order}/{total}
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            {nextStation.title}
          </p>
          <p className="mt-1 text-sm leading-6 text-[var(--nim-secondary)]">{nextStation.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={nextStation.href}
              className="nim-interactive inline-flex min-h-11 items-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
            >
              {nextStation.actionLabel}
            </a>
            <button
              type="button"
              className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-4 text-sm font-black text-[var(--nim-primary)]"
              onClick={() => markComplete(nextStation.id)}
            >
              Station erledigen
            </button>
          </div>
        </div>
      ) : null}

      <ol className="space-y-3">
        {literacyStations.map((stationRaw) => {
          const station = literacyStationForMode(stationRaw, simpleMode);
          const done = completedStationIds.includes(station.id);
          const isNext = nextStation?.id === station.id;
          return (
            <li
              key={station.id}
              className={[
                "rounded-[var(--nim-radius-md)] border p-4",
                isNext
                  ? "border-[var(--nim-primary)] bg-[var(--nim-primary-soft)]"
                  : "border-[var(--nim-border)] bg-[var(--nim-surface-soft)]",
              ].join(" ")}
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
                  {done ? "erledigt" : isNext ? "Nächster Schritt" : "offen"}
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
        className="scroll-mt-72 rounded-[var(--nim-radius-lg)] border-2 border-[var(--nim-primary)] bg-[var(--nim-primary-soft)] p-5 sm:scroll-mt-64 lg:scroll-mt-36 print:border-0 print:bg-white print:p-0 print:shadow-none"
      >
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] print:hidden">
          Lokaler Teilnahme-Nachweis
        </h3>
        <p className="mt-2 text-sm font-medium leading-7 text-[var(--nim-secondary)] print:hidden">
          {literacyPathMeta.disclaimer}
        </p>
        {allDone ? (
          <div className="literacy-proof mt-4 space-y-4 rounded-[var(--nim-radius-md)] bg-[var(--nim-surface)] p-5 print:mt-0 print:border-2 print:border-black print:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--nim-border)] pb-4 print:border-black">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)] print:text-black">
                  KI-Lernportal NIM
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                  Teilnahme-Nachweis
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--nim-secondary)] print:text-black">
                  {literacyPathMeta.title}
                </p>
              </div>
              <p className="text-sm font-black text-[var(--nim-primary)] print:text-black">
                {total}/{total} Stationen
              </p>
            </div>
            <p className="text-sm leading-7 text-[var(--nim-secondary)] print:text-black">
              In diesem Browser wurden alle Stationen des Kurzpfads als erledigt markiert.
              Datum (Gerät):{" "}
              {new Date().toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {literacyStations.map((station) => (
                <li
                  key={station.id}
                  className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-surface-soft)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] print:border print:border-black print:bg-white"
                >
                  {station.order}. {station.title}
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-[var(--nim-secondary)] print:text-black">
              Hinweis: lokal erzeugt, ohne Benutzerkonto, ohne Server-Prüfung — kein amtliches Zertifikat.
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
          <p className="mt-3 text-sm font-semibold text-[var(--nim-secondary)] print:hidden">
            Noch {total - doneCount} Station(en) offen — markiere sie, wenn du sie bearbeitet hast.
          </p>
        )}
      </div>
    </section>
  );
}
