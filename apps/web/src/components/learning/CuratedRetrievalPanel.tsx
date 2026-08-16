"use client";

import { useState } from "react";
import {
  listCuratedUiQueries,
  retrieveCurated,
  type CuratedRetrieveResult,
} from "@ki-lernportal-nim/ai-core";

type CuratedRetrievalPanelProps = {
  lessonId: string;
};

/**
 * S56-C pilot: curated retrieval via preset query buttons only (no free chat).
 */
export function CuratedRetrievalPanel({ lessonId }: CuratedRetrievalPanelProps) {
  const queries = listCuratedUiQueries(lessonId);
  const [result, setResult] = useState<CuratedRetrieveResult | null>(null);

  if (queries.length === 0) {
    return null;
  }

  return (
    <section
      data-testid="curated-retrieval-panel"
      data-lesson-id={lessonId}
      aria-labelledby="curated-retrieval-heading"
      className="space-y-3 rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 py-4"
    >
      <div className="space-y-1">
        <h3
          id="curated-retrieval-heading"
          className="text-sm font-semibold text-[var(--foreground)]"
        >
          Quellen-Suche (kuratiert)
        </h3>
        <p
          data-testid="curated-retrieval-honesty"
          className="text-xs leading-5 text-[var(--nim-secondary)]"
        >
          Feste Passagen mit Zitat · bei fehlender Evidenz Enthaltung · kein Netz
          · keine Embeddings · keine Live-KI und kein freier Chat.
        </p>
      </div>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {queries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              data-testid={`curated-retrieval-query-${entry.id}`}
              className="w-full rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] px-3 py-2 text-left text-sm text-[var(--foreground)] hover:border-[var(--nim-accent)] sm:w-auto"
              onClick={() =>
                setResult(
                  retrieveCurated({ lessonId, query: entry.query }),
                )
              }
            >
              {entry.label}
            </button>
          </li>
        ))}
      </ul>
      {result ? (
        <div
          data-testid="curated-retrieval-result"
          data-status={result.status}
          className="space-y-2 border-t border-[var(--nim-border)] pt-3 text-sm leading-6 text-[var(--foreground)]"
        >
          <p className="font-semibold">{result.query}</p>
          <p data-testid="curated-retrieval-answer">{result.answer}</p>
          {result.citations.length > 0 ? (
            <ul
              data-testid="curated-retrieval-citations"
              className="space-y-1 text-xs text-[var(--nim-secondary)]"
            >
              {result.citations.map((citation) => (
                <li key={citation.passageId}>
                  Quelle {citation.sourceId} · Rev. {citation.revision} ·{" "}
                  {citation.passageId}
                </li>
              ))}
            </ul>
          ) : (
            <p
              data-testid="curated-retrieval-abstain-note"
              className="text-xs text-[var(--nim-secondary)]"
            >
              Keine Zitate — absichtliche Enthaltung.
            </p>
          )}
          <p className="text-xs text-[var(--nim-secondary)]">{result.honesty}</p>
        </div>
      ) : null}
    </section>
  );
}
