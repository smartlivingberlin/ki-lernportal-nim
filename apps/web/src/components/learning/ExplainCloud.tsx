"use client";

import { useEffect, useId, useRef, useState } from "react";
import { helpTipById, type HelpTip } from "../../data/help-tips";

type ExplainCloudProps = {
  tipId: string;
  tip?: HelpTip;
  className?: string;
  compact?: boolean;
};

type Layer = "closed" | "short" | "medium" | "deep";

/**
 * 3-Schichten-Hilfe: Kurz → Mittel → Tief.
 * Primär per Klick/Tap und Tastatur — Hover nur als Desktop-Extra für Kurzinfo.
 */
export function ExplainCloud({
  tipId,
  tip: tipProp,
  className = "",
  compact = false,
}: ExplainCloudProps) {
  const tip = tipProp ?? helpTipById(tipId);
  const panelId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const [layer, setLayer] = useState<Layer>("closed");

  useEffect(() => {
    if (layer === "closed") return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLayer("closed");
      }
    };

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setLayer("closed");
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
  }, [layer]);

  if (!tip) return null;

  const open = layer !== "closed";

  return (
    <span ref={rootRef} className={`relative inline-flex align-middle ${className}`}>
      <button
        type="button"
        className={[
          "nim-interactive inline-flex items-center justify-center rounded-full border-2 border-[var(--nim-border-strong)] bg-[var(--nim-surface)] font-black text-[var(--nim-primary-strong)]",
          compact ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm",
          "hover:bg-[var(--nim-primary-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]",
        ].join(" ")}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Hilfe: ${tip.label}`}
        title={tip.short}
        onClick={() => setLayer((current) => (current === "closed" ? "short" : "closed"))}
      >
        ?
      </button>

      {open ? (
        <span
          id={panelId}
          role="region"
          aria-label={`Erklärung: ${tip.label}`}
          className="absolute left-0 top-full z-40 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-4 text-left shadow-[var(--shadow-lift)]"
        >
          <span className="block text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
            {tip.label}
          </span>
          <span className="mt-2 block text-sm font-bold leading-6 text-[var(--foreground)]">
            {tip.short}
          </span>

          {layer === "medium" || layer === "deep" ? (
            <span className="mt-3 block text-sm font-medium leading-6 text-[var(--nim-secondary)]">
              {tip.medium}
            </span>
          ) : null}

          {layer === "deep" ? (
            <span className="mt-3 block space-y-2 text-sm font-medium leading-6 text-[var(--nim-secondary)]">
              <span className="block">
                <strong className="text-[var(--foreground)]">Wozu?</strong> {tip.deep.whatFor}
              </span>
              <span className="block">
                <strong className="text-[var(--foreground)]">So gehst du vor:</strong>
              </span>
              <ol className="list-decimal space-y-1 pl-5">
                {tip.deep.howTo.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <span className="block">
                <strong className="text-[var(--foreground)]">Beispiel:</strong> {tip.deep.example}
              </span>
              <span className="block">
                <strong className="text-[var(--foreground)]">Typischer Fehler:</strong>{" "}
                {tip.deep.mistake}
              </span>
              {tip.deep.nextHint ? (
                <span className="block">
                  <strong className="text-[var(--foreground)]">Als Nächstes:</strong>{" "}
                  {tip.deep.nextHint}
                </span>
              ) : null}
            </span>
          ) : null}

          <span className="mt-4 flex flex-wrap gap-2">
            {layer === "short" ? (
              <button
                type="button"
                className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 text-xs font-black text-white"
                onClick={() => setLayer("medium")}
              >
                Mehr dazu
              </button>
            ) : null}
            {layer === "medium" ? (
              <button
                type="button"
                className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 text-xs font-black text-white"
                onClick={() => setLayer("deep")}
              >
                Genaue Anleitung
              </button>
            ) : null}
            <button
              type="button"
              className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-3 text-xs font-black text-[var(--nim-primary)]"
              onClick={() => setLayer("closed")}
            >
              Schließen
            </button>
          </span>
        </span>
      ) : null}
    </span>
  );
}
