"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
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

function canHoverFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function clampPosition(x: number, y: number, width: number, height: number) {
  const pad = 12;
  const maxX = Math.max(pad, window.innerWidth - width - pad);
  const maxY = Math.max(pad, window.innerHeight - height - pad);
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

/**
 * Globale Cursor-Erklärungswolke.
 * Maus in `[data-explain]`-Bereich/Button → Wolke am Cursor mit Kurzinfo.
 */
export function CursorExplainLayer() {
  const panelId = useId();
  const [mounted, setMounted] = useState(false);
  const [cloud, setCloud] = useState<CloudState | null>(null);
  const [panelSize, setPanelSize] = useState({ width: 340, height: 180 });
  const pinnedRef = useRef(false);
  const overCloudRef = useRef(false);
  const lastTipIdRef = useRef<string | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    pinnedRef.current = Boolean(cloud?.pinned);
  }, [cloud?.pinned]);

  useEffect(() => {
    if (!mounted) return;

    const clearHide = () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearHide();
      hideTimerRef.current = window.setTimeout(() => {
        if (!pinnedRef.current && !overCloudRef.current) {
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
  }, [mounted]);

  useEffect(() => {
    if (!cloud || !mounted) return;
    const node = document.getElementById(panelId);
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setPanelSize({ width: rect.width, height: rect.height });
    }
  }, [cloud, panelId, mounted]);

  const close = useCallback(() => {
    pinnedRef.current = false;
    lastTipIdRef.current = null;
    setCloud(null);
    window.dispatchEvent(new Event(EXPLAIN_UNPIN_EVENT));
  }, []);

  if (!mounted || !cloud) return null;

  const pos = clampPosition(cloud.x, cloud.y, panelSize.width, panelSize.height);

  return createPortal(
    <div
      id={panelId}
      data-explain-cloud-root=""
      role="region"
      aria-label={`Erklärung: ${cloud.tip.label}`}
      className="pointer-events-auto fixed z-[80] w-[min(22rem,calc(100vw-1.5rem))] rounded-[1.5rem] border-2 border-[var(--nim-primary)] bg-[var(--nim-surface)] p-4 text-left shadow-[var(--shadow-lift)] sm:p-5"
      style={{ left: pos.left, top: pos.top }}
      onPointerEnter={() => {
        overCloudRef.current = true;
        if (hideTimerRef.current !== null) {
          window.clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
      }}
      onPointerLeave={() => {
        overCloudRef.current = false;
        if (!pinnedRef.current) {
          lastTipIdRef.current = null;
          setCloud(null);
        }
      }}
    >
      <p className="text-[0.65rem] font-black uppercase tracking-widest text-[var(--nim-primary)]">
        Erklärungswolke · {cloud.tip.label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-6 text-[var(--foreground)]">
        {cloud.tip.short}
      </p>

      {cloud.layer === "medium" || cloud.layer === "deep" ? (
        <p className="mt-3 text-sm font-medium leading-6 text-[var(--nim-secondary)]">
          {cloud.tip.medium}
        </p>
      ) : null}

      {cloud.layer === "deep" ? (
        <div className="mt-3 space-y-2 text-sm font-medium leading-6 text-[var(--nim-secondary)]">
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

      <div className="mt-3 flex flex-wrap gap-2">
        {cloud.layer === "short" ? (
          <button
            type="button"
            className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 text-xs font-black text-white"
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
            className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 text-xs font-black text-white"
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
          className="nim-interactive min-h-10 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-3 text-xs font-black text-[var(--nim-primary)]"
          onClick={close}
        >
          Schließen
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function pinExplainTip(tipId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EXPLAIN_PIN_EVENT, { detail: { tipId } }));
}
