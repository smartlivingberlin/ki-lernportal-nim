"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { GlossaryTerm } from "../../data/types";
import { seedGlossary } from "../../data/glossary";

type InlineGlossaryTermProps = {
  termId: string;
  children?: ReactNode;
  className?: string;
};

type Layer = "closed" | "short" | "deep";

function findTerm(termId: string): GlossaryTerm | null {
  return seedGlossary.find((entry) => entry.id === termId) ?? null;
}

/**
 * Inline-Glossar: markierter Begriff öffnet Erklärung in Schichten (Klick/Tap).
 */
export function InlineGlossaryTerm({
  termId,
  children,
  className = "",
}: InlineGlossaryTermProps) {
  const term = findTerm(termId);
  const panelId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);
  const openedByHoverRef = useRef(false);
  const [layer, setLayer] = useState<Layer>("closed");

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    openedByHoverRef.current = false;
    setLayer("closed");
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (layer === "closed") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("touchstart", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("touchstart", onPointer);
    };
  }, [layer, close]);

  if (!term) {
    return <span className={className}>{children ?? termId}</span>;
  }

  const open = layer !== "closed";

  return (
    <span
      ref={rootRef}
      className={`relative inline ${className}`}
      onMouseLeave={() => {
        if (!openedByHoverRef.current) return;
        clearCloseTimer();
        closeTimer.current = window.setTimeout(() => {
          openedByHoverRef.current = false;
          setLayer("closed");
        }, 220);
      }}
      onMouseEnter={() => {
        clearCloseTimer();
        if (
          typeof window === "undefined" ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          return;
        }
        if (layer === "closed") {
          openedByHoverRef.current = true;
          setLayer("short");
        }
      }}
    >
      <button
        type="button"
        className="nim-interactive inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 border-dotted border-[var(--nim-primary)] px-2 font-bold text-[var(--nim-primary-strong)] hover:bg-[var(--nim-primary-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          clearCloseTimer();
          if (openedByHoverRef.current) {
            openedByHoverRef.current = false;
            setLayer((current) => (current === "closed" ? "short" : current));
            return;
          }
          setLayer((current) => (current === "closed" ? "short" : "closed"));
        }}
      >
        {children ?? term.term}
      </button>
      {open ? (
        <span
          id={panelId}
          role="region"
          aria-label={`Begriff: ${term.term}`}
          onMouseEnter={clearCloseTimer}
          className="absolute left-0 top-full z-[60] mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-4 text-left shadow-[var(--shadow-lift)]"
        >
          <span className="block text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
            Begriff
          </span>
          <span className="mt-1 block font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
            {term.term}
          </span>
          <span className="mt-2 block text-sm font-medium leading-6 text-[var(--nim-secondary)]">
            {term.definition}
          </span>
          {layer === "deep" ? (
            <span className="mt-3 block text-sm font-medium leading-6 text-[var(--nim-secondary)]">
              <strong className="text-[var(--foreground)]">Beispiel:</strong> {term.example}
            </span>
          ) : null}
          <span className="mt-3 flex flex-wrap gap-2">
            {layer === "short" ? (
              <button
                type="button"
                className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 text-xs font-black text-white"
                onClick={() => {
                  openedByHoverRef.current = false;
                  setLayer("deep");
                }}
              >
                Beispiel zeigen
              </button>
            ) : null}
            <button
              type="button"
              className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-3 text-xs font-black text-[var(--nim-primary)]"
              onClick={close}
            >
              Schließen
            </button>
          </span>
        </span>
      ) : null}
    </span>
  );
}

type GlossaryAlias = { pattern: string; flags: string; termId: string };

const aliases: GlossaryAlias[] = [
  { pattern: String.raw`\bHalluzination(en)?\b`, flags: "gi", termId: "halluzination" },
  { pattern: String.raw`\bPrompt(s)?\b`, flags: "gi", termId: "prompt" },
  { pattern: String.raw`\bDatenschutz\b`, flags: "gi", termId: "datenschutz" },
  { pattern: String.raw`\bQuelle(n)?\b`, flags: "gi", termId: "quelle" },
  { pattern: String.raw`\bAI Act\b`, flags: "gi", termId: "ai-act" },
  { pattern: String.raw`\bRAG\b`, flags: "g", termId: "rag" },
  { pattern: String.raw`\bGuardrail(s)?\b`, flags: "gi", termId: "guardrail" },
  { pattern: String.raw`\bVibe Coding\b`, flags: "gi", termId: "vibe-coding" },
  { pattern: String.raw`\bAutomatisierung(en)?\b`, flags: "gi", termId: "automation" },
  { pattern: String.raw`\bKI-Agent(en)?\b`, flags: "gi", termId: "agent" },
  { pattern: String.raw`\bAgent(en)?\b`, flags: "gi", termId: "agent" },
  { pattern: String.raw`\bmultimodal(e|en|er|es)?\b`, flags: "gi", termId: "multimodal" },
  { pattern: String.raw`\bKI-Modell(e|en)?\b`, flags: "gi", termId: "modell" },
  { pattern: String.raw`\bModell(e|en)?\b`, flags: "gi", termId: "modell" },
  { pattern: String.raw`\bKI\b`, flags: "g", termId: "ki" },
];

/**
 * Ersetzt bekannte Fachbegriffe in einem Fließtext durch InlineGlossaryTerm.
 * Einfache Heuristik — für kurze UI-Sätze, nicht für ganze Artikel.
 */
export function InlineGlossaryText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const nodes: ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    let earliest: { index: number; length: number; termId: string; raw: string } | null = null;

    for (const alias of aliases) {
      const matcher = new RegExp(alias.pattern, alias.flags);
      const found = matcher.exec(rest);
      if (!found || found.index === undefined) continue;
      if (!earliest || found.index < earliest.index) {
        earliest = {
          index: found.index,
          length: found[0].length,
          termId: alias.termId,
          raw: found[0],
        };
      }
    }

    if (!earliest) {
      nodes.push(<span key={`t-${key++}`}>{rest}</span>);
      break;
    }

    if (earliest.index > 0) {
      nodes.push(<span key={`t-${key++}`}>{rest.slice(0, earliest.index)}</span>);
    }

    nodes.push(
      <InlineGlossaryTerm key={`g-${key++}`} termId={earliest.termId}>
        {earliest.raw}
      </InlineGlossaryTerm>,
    );
    rest = rest.slice(earliest.index + earliest.length);
  }

  return <span className={className}>{nodes}</span>;
}
