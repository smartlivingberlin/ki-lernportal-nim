"use client";

import { useMemo, useState } from "react";
import {
  promptCategories,
  promptLibraryMeta,
  promptTemplates,
  type PromptTemplate,
} from "../../data/prompt-library";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";

export function PromptLibraryPanel() {
  const [category, setCategory] = useState<(typeof promptCategories)[number]["id"] | "alle">(
    "alle",
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      category === "alle"
        ? promptTemplates
        : promptTemplates.filter((item) => item.category === category),
    [category],
  );

  const copyPrompt = async (template: PromptTemplate) => {
    try {
      await navigator.clipboard.writeText(template.prompt);
      setCopiedId(template.id);
      window.setTimeout(() => setCopiedId((current) => (current === template.id ? null : current)), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section
      id="prompt-bibliothek"
      aria-labelledby="prompt-bibliothek-title"
      {...explainAttrs("prompt-library")}
      className="scroll-mt-72 space-y-4 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 sm:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="prompt-library">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          Werkzeug · zum Kopieren
        </p>
        <h2
          id="prompt-bibliothek-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          {promptLibraryMeta.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          {promptLibraryMeta.intro}
        </p>
      </ExplainHotspot>

      <div role="group" aria-label="Kategorien" className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={category === "alle"}
          className={[
            "nim-interactive min-h-11 rounded-[var(--nim-radius-md)] px-4 text-sm font-black",
            category === "alle"
              ? "bg-[var(--nim-primary)] text-white"
              : "border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] text-[var(--nim-primary)]",
          ].join(" ")}
          onClick={() => setCategory("alle")}
        >
          Alle
        </button>
        {promptCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            className={[
              "nim-interactive min-h-11 rounded-[var(--nim-radius-md)] px-4 text-sm font-black",
              category === item.id
                ? "bg-[var(--nim-primary)] text-white"
                : "border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] text-[var(--nim-primary)]",
            ].join(" ")}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 lg:grid-cols-2">
        {visible.map((template) => (
          <li
            key={template.id}
            className="rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-4"
          >
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
              {promptCategories.find((item) => item.id === template.category)?.label}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              {template.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--nim-secondary)]">
              <strong className="text-[var(--foreground)]">Wann:</strong> {template.useWhen}
            </p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-[var(--nim-radius-sm)] bg-white p-3 text-sm leading-6 text-[var(--foreground)]">
              {template.prompt}
            </pre>
            <p className="mt-2 text-xs font-semibold leading-5 text-[var(--nim-secondary)]">
              Datenschutz: {template.privacyNote}
            </p>
            <p className="mt-1 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
              Tipp: {template.tip}
            </p>
            <button
              type="button"
              className="nim-interactive mt-3 min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
              onClick={() => void copyPrompt(template)}
            >
              {copiedId === template.id ? "Kopiert" : "Prompt kopieren"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
