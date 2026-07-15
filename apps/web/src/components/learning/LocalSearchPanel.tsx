"use client";

import { useMemo, useState } from "react";
import type {
  GlossaryTerm,
  Lesson,
  ResourceCard,
} from "../../data/types";

type LocalSearchPanelProps = {
  lessons: Lesson[];
  resources: ResourceCard[];
  glossary: GlossaryTerm[];
  onOpenLesson: (lessonId: string) => void;
};

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("de-DE");
}

function containsQuery(
  values: Array<string | number | undefined>,
  query: string,
) {
  return values.some((value) =>
    normalizeSearchText(String(value ?? "")).includes(query),
  );
}

export function LocalSearchPanel({
  lessons,
  resources,
  glossary,
  onOpenLesson,
}: LocalSearchPanelProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeSearchText(query.trim());
  const searchReady = normalizedQuery.length >= 2;

  const lessonResults = useMemo(() => {
    if (!searchReady) {
      return [];
    }

    return lessons
      .filter((lesson) =>
        containsQuery(
          [
            lesson.title,
            lesson.description,
            lesson.content,
            lesson.difficulty,
            lesson.order,
          ],
          normalizedQuery,
        ),
      )
      .slice(0, 6);
  }, [lessons, normalizedQuery, searchReady]);

  const resourceResults = useMemo(() => {
    if (!searchReady) {
      return [];
    }

    return resources
      .filter((resource) =>
        containsQuery(
          [
            resource.title,
            resource.provider,
            resource.targetAudience,
            resource.benefit,
            resource.resourceType,
            resource.difficulty,
            resource.costStatus,
            resource.tags.join(" "),
            resource.languages.join(" "),
          ],
          normalizedQuery,
        ),
      )
      .slice(0, 6);
  }, [resources, normalizedQuery, searchReady]);

  const glossaryResults = useMemo(() => {
    if (!searchReady) {
      return [];
    }

    return glossary
      .filter((entry) =>
        containsQuery(
          [
            entry.term,
            entry.definition,
            entry.example,
            entry.category,
          ],
          normalizedQuery,
        ),
      )
      .slice(0, 6);
  }, [glossary, normalizedQuery, searchReady]);

  const resultCount =
    lessonResults.length
    + resourceResults.length
    + glossaryResults.length;

  return (
    <section
      data-testid="local-search-panel"
      role="search"
      aria-labelledby="portal-search-title"
      className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">
            Im Portal suchen
          </p>
          <h2
            id="portal-search-title"
            className="mt-2 text-2xl font-black text-nim-primary"
          >
            Finde Lektionen, Begriffe und Lernangebote.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-nim-secondary">
            Die Suche arbeitet nur mit den bereits geladenen Portalinhalten.
            Deine Eingabe wird nicht gespeichert oder versendet.
          </p>
        </div>

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="min-h-11 shrink-0 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-nim-primary hover:border-nim-primary/30 hover:bg-slate-50"
          >
            Suche leeren
          </button>
        )}
      </div>

      <label
        htmlFor="portal-search-input"
        className="mt-5 block text-sm font-black text-nim-primary"
      >
        Suchbegriff
      </label>

      <input
        id="portal-search-input"
        data-testid="portal-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Zum Beispiel: Datenschutz, Prompt oder Quelle"
        autoComplete="off"
        aria-describedby="portal-search-help"
        className="mt-2 min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none placeholder:text-slate-500 focus:border-nim-primary focus:ring-4 focus:ring-nim-primary/10"
      />

      <p
        id="portal-search-help"
        className="mt-2 text-xs leading-6 text-nim-secondary"
      >
        Gib mindestens zwei Zeichen ein. Durchsucht werden zwölf Lektionen,
        acht Lernangebote und zehn Begriffe.
      </p>

      <div aria-live="polite" className="mt-5">
        {!query.trim() ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-nim-secondary">
            Beginne mit einem Thema, einem Begriff oder einer Alltagssituation.
          </p>
        ) : !searchReady ? (
          <p className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">
            Bitte gib mindestens zwei Zeichen ein.
          </p>
        ) : resultCount === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-7 text-nim-secondary">
            Keine passenden Inhalte gefunden. Versuche einen einfacheren
            Begriff wie KI, Prompt, Quelle oder Datenschutz.
          </p>
        ) : (
          <div className="space-y-6">
            <p className="text-sm font-black text-nim-primary">
              {resultCount} passende Ergebnisse
            </p>

            {lessonResults.length > 0 && (
              <section aria-labelledby="search-lessons-title">
                <h3
                  id="search-lessons-title"
                  className="text-xs font-black uppercase tracking-widest text-nim-secondary"
                >
                  Lektionen
                </h3>

                <div className="mt-3 grid gap-3">
                  {lessonResults.map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      data-search-result-kind="lesson"
                      data-search-result-id={lesson.id}
                      onClick={() => onOpenLesson(lesson.id)}
                      className="min-h-11 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-nim-primary/30 hover:bg-white"
                    >
                      <span className="block text-xs font-black uppercase tracking-wider text-nim-secondary">
                        Lektion {lesson.order} · {lesson.estimatedMinutes} Minuten
                      </span>
                      <span className="mt-1 block font-black text-nim-primary">
                        {lesson.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-nim-secondary">
                        {lesson.description}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {glossaryResults.length > 0 && (
              <section aria-labelledby="search-glossary-title">
                <h3
                  id="search-glossary-title"
                  className="text-xs font-black uppercase tracking-widest text-nim-secondary"
                >
                  Einfach erklärt
                </h3>

                <div className="mt-3 grid gap-3">
                  {glossaryResults.map((entry) => (
                    <article
                      key={entry.id}
                      data-search-result-kind="glossary"
                      data-search-result-id={entry.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="font-black text-nim-primary">
                        {entry.term}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-nim-secondary">
                        {entry.definition}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-slate-600">
                        Beispiel: {entry.example}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {resourceResults.length > 0 && (
              <section aria-labelledby="search-resources-title">
                <h3
                  id="search-resources-title"
                  className="text-xs font-black uppercase tracking-widest text-nim-secondary"
                >
                  Lernangebote und Quellen
                </h3>

                <div className="mt-3 grid gap-3">
                  {resourceResults.map((resource) => (
                    <a
                      key={resource.id}
                      data-search-result-kind="resource"
                      data-search-result-id={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block min-h-11 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-nim-primary/30 hover:bg-white"
                    >
                      <span className="block text-xs font-black uppercase tracking-wider text-nim-secondary">
                        {resource.resourceType} · {resource.provider}
                      </span>
                      <span className="mt-1 block font-black text-nim-primary">
                        {resource.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-nim-secondary">
                        {resource.benefit}
                      </span>
                      <span className="sr-only">
                        Öffnet ein externes Angebot in einem neuen Tab
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
