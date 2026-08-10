"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { helpTipById, type HelpTip } from "../../data/help-tips";

type ExplainCloudProps = {
  tipId: string;
  tip?: HelpTip;
  className?: string;
  compact?: boolean;
  /** Sichtbarer Text neben dem ? — macht die Wolke auffindbar */
  triggerLabel?: string;
};

type ExplainHotspotProps = {
  tipId: string;
  tip?: HelpTip;
  className?: string;
  children: ReactNode;
  /** Optionaler Label-Text am Hilfe-Chip */
  triggerLabel?: string;
};

type Layer = "closed" | "short" | "medium" | "deep";

function canHoverFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function CloudPanel({
  tip,
  panelId,
  layer,
  openedByHover,
  panelWidth,
  onKeepOpen,
  onMedium,
  onDeep,
  onClose,
}: {
  tip: HelpTip;
  panelId: string;
  layer: Layer;
  openedByHover: boolean;
  panelWidth: string;
  onKeepOpen: () => void;
  onMedium: () => void;
  onDeep: () => void;
  onClose: () => void;
}) {
  if (layer === "closed") return null;

  return (
    <span
      id={panelId}
      role="region"
      aria-label={`Erklärung: ${tip.label}`}
      onMouseEnter={onKeepOpen}
      className={[
        "absolute left-0 top-full z-50 mt-3",
        panelWidth,
        "rounded-[1.75rem] border-2 border-[var(--nim-primary)] bg-[var(--nim-surface)] p-5 text-left shadow-[var(--shadow-lift)] sm:p-6",
      ].join(" ")}
    >
      <span className="block text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
        Erklärungswolke · {tip.label}
      </span>
      <span className="mt-2 block font-[family-name:var(--font-display)] text-xl font-semibold leading-7 text-[var(--foreground)] sm:text-2xl">
        {tip.short}
      </span>

      {openedByHover && layer === "short" ? (
        <span className="mt-2 block text-xs font-bold text-[var(--nim-secondary)]">
          Maus hier lassen · oder „Mehr dazu“ antippen
        </span>
      ) : null}

      {layer === "medium" || layer === "deep" ? (
        <span className="mt-3 block text-sm font-medium leading-7 text-[var(--nim-secondary)] sm:text-base">
          {tip.medium}
        </span>
      ) : null}

      {layer === "deep" ? (
        <span className="mt-3 block space-y-2 text-sm font-medium leading-7 text-[var(--nim-secondary)] sm:text-base">
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
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
            onClick={onMedium}
          >
            Mehr dazu
          </button>
        ) : null}
        {layer === "medium" ? (
          <button
            type="button"
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
            onClick={onDeep}
          >
            Genaue Anleitung
          </button>
        ) : null}
        <button
          type="button"
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
          onClick={onClose}
        >
          Schließen
        </button>
      </span>
    </span>
  );
}

function HelpTriggerButton({
  tip,
  panelId,
  open,
  compact,
  triggerLabel,
  onClick,
}: {
  tip: HelpTip;
  panelId: string;
  open: boolean;
  compact: boolean;
  triggerLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={[
        "nim-interactive inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 border-[var(--nim-border-strong)] bg-[var(--nim-accent-soft)] px-3 font-black text-[var(--nim-primary-strong)]",
        compact ? "text-xs" : "text-sm",
        "hover:bg-[var(--nim-primary-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]",
      ].join(" ")}
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={`Hilfe: ${tip.label}`}
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--nim-surface)] text-sm"
      >
        ?
      </span>
      <span>{triggerLabel}</span>
    </button>
  );
}

function useOutsideAndEscape(
  open: boolean,
  rootRef: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        onClose();
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
  }, [open, onClose, rootRef]);
}

/**
 * 3-Schichten-Erklärungswolke am Hilfe-Button.
 * Desktop: Hover auf den Button öffnet Kurzinfo; Maus in der Wolke halten zum Weiterlesen.
 * Klick/Tap: öffnen/schließen; Buttons „Mehr dazu“ / „Genaue Anleitung“.
 */
export function ExplainCloud({
  tipId,
  tip: tipProp,
  className = "",
  compact = false,
  triggerLabel = "Hilfe",
}: ExplainCloudProps) {
  const tip = tipProp ?? helpTipById(tipId);
  const panelId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [layer, setLayer] = useState<Layer>("closed");
  const [openedByHover, setOpenedByHover] = useState(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setLayer("closed");
    setOpenedByHover(false);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setLayer("closed");
      setOpenedByHover(false);
    }, 280);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);
  useOutsideAndEscape(layer !== "closed", rootRef, close);

  if (!tip) return null;

  const open = layer !== "closed";
  const panelWidth = compact
    ? "w-[min(26rem,calc(100vw-1.5rem))]"
    : "w-[min(32rem,calc(100vw-1.5rem))]";

  return (
    <span
      ref={rootRef}
      className={`relative inline-flex align-middle ${className}`}
      onMouseEnter={() => {
        if (!canHoverFinePointer()) return;
        clearCloseTimer();
        setOpenedByHover(true);
        setLayer((current) => (current === "closed" ? "short" : current));
      }}
      onMouseLeave={scheduleClose}
    >
      <HelpTriggerButton
        tip={tip}
        panelId={panelId}
        open={open}
        compact={compact}
        triggerLabel={triggerLabel}
        onClick={() => {
          clearCloseTimer();
          setOpenedByHover(false);
          setLayer((current) => (current === "closed" ? "short" : "closed"));
        }}
      />
      <CloudPanel
        tip={tip}
        panelId={panelId}
        layer={layer}
        openedByHover={openedByHover}
        panelWidth={panelWidth}
        onKeepOpen={clearCloseTimer}
        onMedium={() => {
          setOpenedByHover(false);
          setLayer("medium");
        }}
        onDeep={() => {
          setOpenedByHover(false);
          setLayer("deep");
        }}
        onClose={close}
      />
    </span>
  );
}

/**
 * Großer Hover-Hotspot um einen Abschnitts-Kopf.
 * Desktop: Maus über den gesamten Intro-Bereich öffnet die Erklärungswolke.
 * Mobil: orangener Hilfe-Chip bleibt tippbar.
 */
export function ExplainHotspot({
  tipId,
  tip: tipProp,
  className = "",
  children,
  triggerLabel = "Hilfe",
}: ExplainHotspotProps) {
  const tip = tipProp ?? helpTipById(tipId);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [layer, setLayer] = useState<Layer>("closed");
  const [openedByHover, setOpenedByHover] = useState(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setLayer("closed");
    setOpenedByHover(false);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setLayer("closed");
      setOpenedByHover(false);
    }, 280);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);
  useOutsideAndEscape(layer !== "closed", rootRef, close);

  if (!tip) {
    return <div className={className}>{children}</div>;
  }

  const open = layer !== "closed";

  return (
    <div
      ref={rootRef}
      className={[
        "relative rounded-[var(--nim-radius-lg)] transition-[box-shadow,background-color] duration-280 ease-[var(--nim-ease)]",
        open
          ? "bg-[var(--nim-primary-soft)] shadow-[var(--shadow-lift)]"
          : "hover:bg-[var(--nim-surface-soft)]",
        className,
      ].join(" ")}
      onMouseEnter={() => {
        if (!canHoverFinePointer()) return;
        clearCloseTimer();
        setOpenedByHover(true);
        setLayer((current) => (current === "closed" ? "short" : current));
      }}
      onMouseLeave={scheduleClose}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 p-1 sm:p-2">
        <div className="min-w-0 flex-1">{children}</div>
        <HelpTriggerButton
          tip={tip}
          panelId={panelId}
          open={open}
          compact
          triggerLabel={triggerLabel}
          onClick={() => {
            clearCloseTimer();
            setOpenedByHover(false);
            setLayer((current) => (current === "closed" ? "short" : "closed"));
          }}
        />
      </div>
      <CloudPanel
        tip={tip}
        panelId={panelId}
        layer={layer}
        openedByHover={openedByHover}
        panelWidth="w-[min(34rem,calc(100vw-1.5rem))]"
        onKeepOpen={clearCloseTimer}
        onMedium={() => {
          setOpenedByHover(false);
          setLayer("medium");
        }}
        onDeep={() => {
          setOpenedByHover(false);
          setLayer("deep");
        }}
        onClose={close}
      />
    </div>
  );
}
