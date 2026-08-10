"use client";

import type { ReactNode } from "react";
import { helpTipById, type HelpTip } from "../../data/help-tips";
import { pinExplainTip } from "./CursorExplainLayer";

type ExplainCloudProps = {
  tipId: string;
  tip?: HelpTip;
  className?: string;
  compact?: boolean;
  triggerLabel?: string;
};

type ExplainHotspotProps = {
  tipId: string;
  tip?: HelpTip;
  className?: string;
  children: ReactNode;
  triggerLabel?: string;
};

/**
 * Sichtbarer Hilfe-Chip. Pinnt die globale Cursor-Erklärungswolke
 * (besonders wichtig auf Touch-Geräten ohne Hover).
 */
export function ExplainCloud({
  tipId,
  tip: tipProp,
  className = "",
  compact = false,
  triggerLabel = "Hilfe",
}: ExplainCloudProps) {
  const tip = tipProp ?? helpTipById(tipId);
  if (!tip) return null;

  return (
    <span className={`relative inline-flex align-middle ${className}`} data-explain={tipId}>
      <button
        type="button"
        className={[
          "nim-interactive inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 border-[var(--nim-border-strong)] bg-[var(--nim-accent-soft)] px-3 font-black text-[var(--nim-primary-strong)]",
          compact ? "text-xs" : "text-sm",
          "hover:bg-[var(--nim-primary-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]",
        ].join(" ")}
        aria-label={`Hilfe anpinnen: ${tip.label}`}
        onClick={() => pinExplainTip(tipId)}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--nim-surface)] text-sm"
        >
          ?
        </span>
        <span>{triggerLabel}</span>
      </button>
    </span>
  );
}

/**
 * Markiert einen Abschnitts-Kopf als Erklär-Bereich (`data-explain`)
 * und bietet optional denselben Hilfe-Chip zum Anpinnen.
 */
export function ExplainHotspot({
  tipId,
  tip: tipProp,
  className = "",
  children,
  triggerLabel = "Hilfe",
}: ExplainHotspotProps) {
  const tip = tipProp ?? helpTipById(tipId);
  if (!tip) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      data-explain={tipId}
      data-explain-hotspot={tipId}
      className={[
        "relative rounded-[var(--nim-radius-lg)] transition-[background-color] duration-280 ease-[var(--nim-ease)]",
        "hover:bg-[var(--nim-surface-soft)]",
        className,
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 p-1 sm:p-2">
        <div className="min-w-0 flex-1">{children}</div>
        <ExplainCloud tipId={tipId} tip={tip} compact triggerLabel={triggerLabel} />
      </div>
    </div>
  );
}
