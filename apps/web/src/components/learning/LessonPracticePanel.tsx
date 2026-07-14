"use client";

import { useState } from "react";
import type { LessonPractice } from "../../data/types";

type LessonPracticePanelProps = {
  lessonId: string;
  lessonTitle: string;
  practice: LessonPractice;
};

const ANSWER_MAX_LENGTH = 2000;

export function LessonPracticePanel({
  lessonId,
  lessonTitle,
  practice,
}: LessonPracticePanelProps) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);

  const titleId = `lesson-${lessonId}-practice-title`;
  const answerId = `lesson-${lessonId}-practice-answer`;
  const answerHelpId = `lesson-${lessonId}-practice-answer-help`;
  const hintId = `lesson-${lessonId}-practice-hint`;
  const sampleAnswerId = `lesson-${lessonId}-practice-sample`;

  return (
    <section
      data-testid="lesson-practice"
      data-lesson-id={lessonId}
      aria-labelledby={titleId}
      className="rounded-3xl border border-sky-100 bg-sky-50 p-5 shadow-sm md:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-sky-700">
            Jetzt selbst ausprobieren
          </p>
          <h3 id={titleId} className="mt-2 text-xl font-black text-nim-primary">
            3. Übung zu „{lessonTitle}“
          </h3>
        </div>

        <span className="w-fit rounded-full bg-white px-3 py-2 text-xs font-black text-nim-primary">
          Ohne automatische Bewertung
        </span>
      </div>

      <div className="mt-5 rounded-3xl bg-white p-5">
        <p className="text-sm font-black text-nim-primary">Deine Aufgabe</p>
        <p className="mt-3 whitespace-pre-line text-base leading-8 text-slate-800">
          {practice.task}
        </p>
      </div>

      <div className="mt-4 rounded-3xl border border-sky-100 bg-white p-5">
        <p className="text-sm font-black text-nim-primary">
          Drei Kontrollfragen
        </p>

        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-nim-secondary">
          {practice.checkQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </div>

      <div className="mt-5">
        <label
          htmlFor={answerId}
          className="text-sm font-black text-nim-primary"
        >
          Deine eigene Antwort
        </label>

        <p
          id={answerHelpId}
          className="mt-2 text-sm leading-7 text-slate-700"
        >
          Schreibe in deinen eigenen Worten. Deine Eingabe wird nicht
          bewertet, nicht gesendet und nicht dauerhaft gespeichert.
        </p>

        <textarea
          id={answerId}
          data-testid="lesson-practice-answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          maxLength={ANSWER_MAX_LENGTH}
          rows={8}
          aria-describedby={answerHelpId}
          className="mt-3 min-h-44 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base leading-7 text-slate-950 outline-none placeholder:text-slate-500 focus:border-nim-primary focus:ring-4 focus:ring-nim-primary/10"
          placeholder="Schreibe hier deine Antwort …"
        />

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700">
          <span>Bleibt nur in diesem geöffneten Lernschritt.</span>

          <span data-testid="lesson-practice-character-count">
            {answer.length} / {ANSWER_MAX_LENGTH} Zeichen
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          data-testid="lesson-practice-hint-toggle"
          aria-expanded={showHint}
          aria-controls={hintId}
          onClick={() => setShowHint((current) => !current)}
          className="min-h-11 rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm font-black text-nim-primary hover:border-nim-primary/30 hover:bg-sky-50"
        >
          {showHint ? "Hinweis ausblenden" : "Hinweis anzeigen"}
        </button>

        <button
          type="button"
          data-testid="lesson-practice-sample-toggle"
          aria-expanded={showSampleAnswer}
          aria-controls={sampleAnswerId}
          onClick={() =>
            setShowSampleAnswer((current) => !current)
          }
          className="min-h-11 rounded-2xl bg-nim-primary px-4 py-3 text-sm font-black text-white hover:bg-nim-primary/90"
        >
          {showSampleAnswer
            ? "Beispielantwort ausblenden"
            : "Beispielantwort vergleichen"}
        </button>

        <button
          type="button"
          data-testid="lesson-practice-clear"
          onClick={() => setAnswer("")}
          disabled={answer.length === 0}
          className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-nim-secondary hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Eigene Antwort löschen
        </button>
      </div>

      {showHint && (
        <div
          id={hintId}
          data-testid="lesson-practice-hint"
          className="mt-4 rounded-3xl border border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-amber-950"
        >
          <p className="font-black">Hinweis</p>
          <p className="mt-2">{practice.hint}</p>
        </div>
      )}

      {showSampleAnswer && (
        <div
          id={sampleAnswerId}
          data-testid="lesson-practice-sample"
          className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-sm leading-7 text-emerald-950"
        >
          <p className="font-black">
            Beispielantwort zum Vergleichen
          </p>

          <p className="mt-2">{practice.sampleAnswer}</p>

          <p className="mt-3 text-xs font-semibold text-emerald-900">
            Das ist eine Orientierung und keine automatische Bewertung.
            Andere sachlich richtige Antworten können ebenfalls passen.
          </p>
        </div>
      )}

      <fieldset className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
        <legend className="px-1 text-sm font-black text-nim-primary">
          4. Selbstprüfung
        </legend>

        <p className="mt-2 text-sm leading-7 text-nim-secondary">
          Vergleiche deine Antwort ehrlich mit diesen drei Punkten.
        </p>

        <div className="mt-4 space-y-3">
          {practice.selfCheck.map((item, index) => {
            const checkboxId =
              `lesson-${lessonId}-self-check-${index + 1}`;

            return (
              <div
                key={item}
                className="flex items-start gap-3"
              >
                <input
                  id={checkboxId}
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-nim-primary focus:ring-nim-primary"
                />

                <label
                  htmlFor={checkboxId}
                  className="text-sm leading-7 text-slate-800"
                >
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
