"use client";

import { useState } from "react";
import {
  answerMockTutor,
  listMockTutorPrompts,
  type MockTutorResponse,
} from "@ki-lernportal-nim/ai-core";

type MockTutorPanelProps = {
  lessonId: string;
};

/**
 * M5-A pilot: curated prompt buttons only (no free-text chat).
 */
export function MockTutorPanel({ lessonId }: MockTutorPanelProps) {
  const prompts = listMockTutorPrompts(lessonId);
  const [response, setResponse] = useState<MockTutorResponse | null>(null);

  if (prompts.length === 0) {
    return null;
  }

  return (
    <section
      data-testid="mock-tutor-panel"
      data-lesson-id={lessonId}
      aria-labelledby="mock-tutor-heading"
      className="space-y-3 rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 py-4"
    >
      <div className="space-y-1">
        <h3
          id="mock-tutor-heading"
          className="text-sm font-semibold text-[var(--foreground)]"
        >
          Übungs-Tutor (Mock)
        </h3>
        <p
          data-testid="mock-tutor-honesty"
          className="text-xs leading-5 text-[var(--nim-secondary)]"
        >
          Feste Antworten aus dem Lektionsstoff · kein Netz · keine Live-KI und
          kein freier Chat.
        </p>
      </div>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {prompts.map((prompt) => (
          <li key={prompt.id}>
            <button
              type="button"
              data-testid={`mock-tutor-prompt-${prompt.id}`}
              className="w-full rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] px-3 py-2 text-left text-sm text-[var(--foreground)] hover:border-[var(--nim-accent)] sm:w-auto"
              onClick={() =>
                setResponse(
                  answerMockTutor({ lessonId, promptId: prompt.id }),
                )
              }
            >
              {prompt.question}
            </button>
          </li>
        ))}
      </ul>
      {response ? (
        <div
          data-testid="mock-tutor-response"
          data-status={response.status}
          className="space-y-1 border-t border-[var(--nim-border)] pt-3 text-sm leading-6 text-[var(--foreground)]"
        >
          {response.question ? (
            <p className="font-semibold">{response.question}</p>
          ) : null}
          <p>{response.answer}</p>
          <p className="text-xs text-[var(--nim-secondary)]">
            {response.sourceNote} · {response.honesty}
          </p>
        </div>
      ) : null}
    </section>
  );
}
