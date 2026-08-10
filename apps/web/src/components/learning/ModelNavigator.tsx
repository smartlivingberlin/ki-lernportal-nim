"use client";

import { useMemo, useState } from "react";
import {
  capabilityLabels,
  publicModelCards,
} from "../../data/model-cards";
import type { ModelCapability } from "../../data/types";
import { ExplainHotspot } from "./ExplainCloud";
import { InlineGlossaryText } from "./InlineGlossary";

const filters: Array<{ id: "all" | ModelCapability; label: string }> = [
  { id: "all", label: "Alle" },
  { id: "chat", label: "Chat & Text" },
  { id: "coding", label: "Code" },
  { id: "search-rag", label: "Suche / RAG" },
  { id: "local-open", label: "Lokal / Open" },
  { id: "reasoning", label: "Reasoning" },
];

export function ModelNavigator() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const cards = useMemo(() => {
    if (filter === "all") return publicModelCards;
    return publicModelCards.filter((card) => card.capabilities.includes(filter));
  }, [filter]);

  return (
    <section
      id="modelle"
      aria-labelledby="modelle-title"
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-7 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="modelle">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          Model-Navigator
        </p>
        <h2
          id="modelle-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          Modelle nach Aufgabe wählen — nicht nach Hype
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          <InlineGlossaryText text="Kurzer Überblick: Zweck, Stärken, Grenzen, Datenschutz- und Kostenhinweis. Statische Demo-Karten — kein automatisches Web-Update. Auch RAG-Hinweise findest du bei Suche/Quellenbezug." />
        </p>
      </ExplainHotspot>

      <div
        role="group"
        aria-label="Nach Fähigkeit filtern"
        className="mt-5 flex flex-wrap gap-2"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className={[
              "nim-interactive min-h-11 rounded-[var(--nim-radius-md)] px-4 py-2 text-sm font-black",
              filter === item.id
                ? "bg-[var(--nim-primary)] text-white"
                : "bg-[var(--nim-surface-soft)] text-[var(--nim-primary)] ring-2 ring-[var(--nim-border)]",
            ].join(" ")}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {cards.map((card) => (
          <li
            key={card.id}
            className="rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                  {card.name}
                </h3>
                <p className="mt-1 text-sm font-bold text-[var(--nim-primary)]">
                  {card.type} · {card.useCase}
                </p>
              </div>
              <span className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-surface)] px-3 py-1 text-xs font-black text-[var(--nim-secondary)]">
                {card.difficulty}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--nim-secondary)]">{card.plainPurpose}</p>

            <p className="mt-3 flex flex-wrap gap-2" aria-label="Fähigkeiten">
              {card.capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-[var(--nim-radius-sm)] bg-[var(--nim-primary-soft)] px-2 py-1 text-xs font-black text-[var(--nim-primary-strong)]"
                >
                  {capabilityLabels[capability] ?? capability}
                </span>
              ))}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">Stärken</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-[var(--nim-secondary)]">
                  {card.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">Grenzen</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-[var(--nim-secondary)]">
                  {card.limits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold leading-7 text-[var(--foreground)]">
              Datenschutz: {card.privacyNote}
            </p>
            {card.riskNote ? (
              <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">Risiko: {card.riskNote}</p>
            ) : null}
            <p className="mt-2 text-sm leading-7 text-[var(--nim-secondary)]">Kosten: {card.costHint}</p>

            <p className="mt-4 text-xs text-[var(--nim-secondary)]">
              Quelle:{" "}
              <a
                href={card.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-bold text-[var(--nim-primary)] underline-offset-2 hover:underline"
              >
                {card.officialSourceName}
                <span className="sr-only"> – öffnet in einem neuen Tab</span>
              </a>
              {" · "}Zuletzt geprüft: {card.lastChecked} · Vertrauen: {card.trustLevel}
            </p>
          </li>
        ))}
      </ul>

      {cards.length === 0 ? (
        <p className="mt-4 text-sm font-medium text-[var(--nim-secondary)]">
          Keine Karten für diesen Filter. Wähle „Alle“ oder eine andere Fähigkeit.
        </p>
      ) : null}
    </section>
  );
}
