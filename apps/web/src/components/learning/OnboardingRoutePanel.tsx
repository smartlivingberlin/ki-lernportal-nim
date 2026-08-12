"use client";

import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";

const routeSteps = [
  {
    id: "check",
    n: "1",
    title: "Selbstcheck",
    body: "Kurze Alltagsfragen — ohne Note. Danach weißt du, womit du starten solltest.",
    href: "#selbstcheck",
    cta: "Selbstcheck",
  },
  {
    id: "path",
    n: "2",
    title: "60-Minuten-Pfad",
    body: "Acht Stationen: verstehen, sicher üben, prüfen — inkl. lokalem Teilnahme-Nachweis.",
    href: "#literacy-pfad",
    cta: "Pfad öffnen",
  },
  {
    id: "review",
    n: "3",
    title: "Kurz wiederholen",
    body: "Kurze Übungsfragen mit Abstand. Unsichere Karten kommen früher wieder — nur in deinem Browser.",
    href: "#wiederholen",
    cta: "Wiederholen starten",
  },
] as const;

/**
 * Persistente Wegkarte nach dem Erststart-Coach (kein zweites Tutorial).
 * Reihenfolge: Selbstcheck → 60-Minuten-Pfad → Wiederholen.
 */
export function OnboardingRoutePanel() {
  return (
    <section
      id="einstieg-route"
      aria-labelledby="einstieg-route-title"
      {...explainAttrs("einstieg-route")}
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 sm:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="einstieg-route">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          Dein Weg · ohne Konto
        </p>
        <h2
          id="einstieg-route-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          Drei Stationen — jederzeit wiederfinden
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          Kein neues Tutorial: nur die Übersicht zu Selbstcheck, Kurzpfad und Wiederholen —
          falls du zwischendurch abschweifst.
        </p>
      </ExplainHotspot>

      <ol className="mt-5 grid gap-3 md:grid-cols-3">
        {routeSteps.map((step) => (
          <li
            key={step.id}
            className="flex flex-col rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4"
          >
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
              Schritt {step.n}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              {step.title}
            </p>
            <p className="mt-2 flex-1 text-sm leading-6 text-[var(--nim-secondary)]">{step.body}</p>
            <a
              href={step.href}
              className="nim-interactive mt-4 inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
            >
              {step.cta}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
