"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { helpTipById, type HelpTip } from "../../data/help-tips";

export const EXPLAIN_PIN_EVENT = "nim-explain-pin";
export const EXPLAIN_UNPIN_EVENT = "nim-explain-unpin";

type Layer = "short" | "medium" | "deep";

type CloudState = {
  tip: HelpTip;
  x: number;
  y: number;
  layer: Layer;
  pinned: boolean;
};

const PANEL_WIDTH = 352;
const PANEL_HEIGHT = 220;

function canHoverFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function clampPosition(x: number, y: number) {
  const pad = 12;
  const maxX = Math.max(pad, window.innerWidth - PANEL_WIDTH - pad);
  const maxY = Math.max(pad, window.innerHeight - PANEL_HEIGHT - pad);
  return {
    left: Math.max(pad, Math.min(x + 18, maxX)),
    top: Math.max(pad, Math.min(y + 18, maxY)),
  };
}

function tipFromEventTarget(target: EventTarget | null): HelpTip | null {
  if (!(target instanceof Element)) return null;
  const host = target.closest("[data-explain]");
  if (!host) return null;
  if (host.closest("[data-explain-cloud-root]")) return null;
  const id = host.getAttribute("data-explain");
  if (!id) return null;
  return helpTipById(id);
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Globale Cursor-Erklärungswolke.
 * Maus in `[data-explain]`-Bereich/Button → Wolke am Cursor mit Kurzinfo.
 *
 * Ungepinnt: komplett pointer-events-none (kein Scroll-/Klick-Fang).
 * Gepinnt (Hilfe-Button): Interaktion für Mehr dazu / Schließen.
 */
export function CursorExplainLayer() {
  const panelId = useId();
  const isClient = useIsClient();
  const [cloud, setCloud] = useState<CloudState | null>(null);
  const pinnedRef = useRef(false);
  const lastTipIdRef = useRef<string | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    pinnedRef.current = Boolean(cloud?.pinned);
  }, [cloud?.pinned]);

  useEffect(() => {
    if (!isClient) return;

    const clearHide = () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearHide();
      hideTimerRef.current = window.setTimeout(() => {
        if (!pinnedRef.current) {
          lastTipIdRef.current = null;
          setCloud(null);
        }
      }, 160);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canHoverFinePointer()) return;
      if (pinnedRef.current) return;

      const tip = tipFromEventTarget(event.target);
      if (!tip) {
        scheduleHide();
        return;
      }

      clearHide();
      const tipChanged = lastTipIdRef.current !== tip.id;
      lastTipIdRef.current = tip.id;
      setCloud((current) => ({
        tip,
        x: event.clientX,
        y: event.clientY,
        layer: tipChanged ? "short" : current?.layer ?? "short",
        pinned: false,
      }));
    };

    const onFocusIn = (event: FocusEvent) => {
      if (pinnedRef.current) return;
      const tip = tipFromEventTarget(event.target);
      if (!tip) return;
      clearHide();
      lastTipIdRef.current = tip.id;
      const target = event.target;
      const rect = target instanceof Element ? target.getBoundingClientRect() : null;
      setCloud({
        tip,
        x: rect ? rect.left + Math.min(rect.width / 2, 120) : 24,
        y: rect ? rect.bottom : 24,
        layer: "short",
        pinned: false,
      });
    };

    const onPin = (event: Event) => {
      const detail = (event as CustomEvent<{ tipId: string }>).detail;
      const tip = helpTipById(detail?.tipId ?? "");
      if (!tip) return;
      clearHide();
      lastTipIdRef.current = tip.id;
      pinnedRef.current = true;
      setCloud((current) => ({
        tip,
        x: current?.x ?? Math.min(window.innerWidth / 2, window.innerWidth - 360),
        y: current?.y ?? 100,
        layer: current?.tip.id === tip.id ? current.layer : "short",
        pinned: true,
      }));
    };

    const onUnpin = () => {
      clearHide();
      lastTipIdRef.current = null;
      pinnedRef.current = false;
      setCloud(null);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onUnpin();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener(EXPLAIN_PIN_EVENT, onPin as EventListener);
    window.addEventListener(EXPLAIN_UNPIN_EVENT, onUnpin);
    window.addEventListener("keydown", onKey);

    return () => {
      clearHide();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener(EXPLAIN_PIN_EVENT, onPin as EventListener);
      window.removeEventListener(EXPLAIN_UNPIN_EVENT, onUnpin);
      window.removeEventListener("keydown", onKey);
    };
  }, [isClient]);

  const close = useCallback(() => {
    pinnedRef.current = false;
    lastTipIdRef.current = null;
    setCloud(null);
    window.dispatchEvent(new Event(EXPLAIN_UNPIN_EVENT));
  }, []);

  if (!isClient || !cloud) return null;

  const pos = clampPosition(cloud.x, cloud.y);
  const interactive = cloud.pinned;

  return createPortal(
    <div
      id={panelId}
      data-explain-cloud-root=""
      role="region"
      aria-label={`Erklärung: ${cloud.tip.label}`}
      className={[
        "fixed z-[80] w-[min(22rem,calc(100vw-1.5rem))] rounded-[1.5rem] border-2 border-[var(--nim-primary)] bg-[var(--nim-surface)] p-4 text-left text-[var(--foreground)] shadow-[var(--shadow-lift)] sm:p-5",
        interactive ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      style={{ left: pos.left, top: pos.top }}
    >
      <p className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-[var(--nim-primary-strong)]">
        Erklärungswolke · {cloud.tip.label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-7 text-[var(--foreground)] sm:text-xl">
        {cloud.tip.short}
      </p>

      {cloud.layer === "medium" || cloud.layer === "deep" ? (
        <p className="mt-3 text-sm font-medium leading-7 text-[var(--nim-secondary)] sm:text-base">
          {cloud.tip.medium}
        </p>
      ) : null}

      {cloud.layer === "deep" ? (
        <div className="mt-3 space-y-2 text-sm font-medium leading-7 text-[var(--nim-secondary)] sm:text-base">
          <p>
            <strong className="text-[var(--foreground)]">Wozu?</strong> {cloud.tip.deep.whatFor}
          </p>
          <p>
            <strong className="text-[var(--foreground)]">So bedienst du es:</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            {cloud.tip.deep.howTo.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            <strong className="text-[var(--foreground)]">Beispiel:</strong> {cloud.tip.deep.example}
          </p>
          <p>
            <strong className="text-[var(--foreground)]">Typischer Fehler:</strong>{" "}
            {cloud.tip.deep.mistake}
          </p>
        </div>
      ) : null}

      {interactive ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {cloud.layer === "short" ? (
            <button
              type="button"
              className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
              onClick={() =>
                setCloud((current) =>
                  current ? { ...current, layer: "medium", pinned: true } : current,
                )
              }
            >
              Mehr dazu
            </button>
          ) : null}
          {cloud.layer === "medium" ? (
            <button
              type="button"
              className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
              onClick={() =>
                setCloud((current) =>
                  current ? { ...current, layer: "deep", pinned: true } : current,
                )
              }
            >
              Bedienung genau
            </button>
          ) : null}
          <button
            type="button"
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
            onClick={close}
          >
            Schließen
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs font-semibold leading-5 text-[var(--nim-secondary)]">
          Für mehr Details: orangenen Hilfe-Button antippen.
        </p>
      )}
    </div>,
    document.body,
  );
}

export function pinExplainTip(tipId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EXPLAIN_PIN_EVENT, { detail: { tipId } }));
}
