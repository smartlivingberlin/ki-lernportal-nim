"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { helpTipById, type HelpLink, type HelpTip } from "../../data/help-tips";

export const EXPLAIN_PIN_EVENT = "nim-explain-pin";
export const EXPLAIN_UNPIN_EVENT = "nim-explain-unpin";

type AvoidRect = { x: number; y: number; width: number; height: number };

type CloudState = {
  tip: HelpTip;
  x: number;
  y: number;
  pinned: boolean;
  avoid: AvoidRect | null;
};

/** Große Manual-Wolke (Konzept A) — Maße für Viewport-Clamp. */
const PANEL_WIDTH = 480;
const PANEL_HEIGHT = 520;

function canHoverFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function containsPoint(
  left: number,
  top: number,
  width: number,
  height: number,
  x: number,
  y: number,
) {
  return x >= left && x <= left + width && y >= top && y <= top + height;
}

function clampPosition(x: number, y: number, avoid?: AvoidRect | null) {
  const pad = 12;
  const width = Math.min(PANEL_WIDTH, window.innerWidth - pad * 2);
  const height = Math.min(PANEL_HEIGHT, window.innerHeight * 0.7);
  const maxX = Math.max(pad, window.innerWidth - width - pad);
  const maxY = Math.max(pad, window.innerHeight - height - pad);

  const candidates: Array<{ left: number; top: number }> = [
    { left: x + 22, top: y + 22 },
    { left: x - width - 22, top: y + 22 },
    { left: x + 22, top: y - height - 22 },
    { left: x - width - 22, top: y - height - 22 },
    { left: x + 22, top: Math.min(maxY, Math.max(pad, y - height / 3)) },
    { left: Math.min(maxX, Math.max(pad, x - width / 3)), top: y + 22 },
  ];

  if (avoid) {
    candidates.unshift(
      { left: avoid.x + avoid.width + 12, top: avoid.y },
      { left: avoid.x - width - 12, top: avoid.y },
      { left: avoid.x, top: avoid.y + avoid.height + 10 },
    );
  }

  for (const candidate of candidates) {
    const left = Math.max(pad, Math.min(candidate.left, maxX));
    const top = Math.max(pad, Math.min(candidate.top, maxY));
    if (!containsPoint(left, top, width, height, x, y)) {
      return { left, top };
    }
  }

  return {
    left: Math.max(pad, Math.min(x + 22, maxX)),
    top: Math.max(pad, Math.min(y + 22, maxY)),
  };
}

function hostRectFromTarget(target: EventTarget | null): AvoidRect | null {
  if (!(target instanceof Element)) return null;
  const host = target.closest("[data-explain]");
  if (!host || host.closest("[data-explain-cloud-root]")) return null;
  const rect = host.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
}

function tipFromEventTarget(target: EventTarget | null): HelpTip | null {
  if (!(target instanceof Element)) return null;
  if (target.closest("[data-explain-cloud-root]")) return null;
  const host = target.closest("[data-explain]");
  if (!host) return null;
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

function ManualLinks({ links, interactive }: { links: HelpLink[]; interactive: boolean }) {
  if (!links.length) return null;

  return (
    <ul className="mt-2 space-y-2">
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          {interactive ? (
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-semibold text-[var(--nim-primary-strong)] underline decoration-2 underline-offset-2 hover:text-[var(--nim-primary)]"
            >
              {link.label}
              {link.external ? " (neuer Tab)" : ""}
            </a>
          ) : (
            <span className="font-semibold text-[var(--nim-primary-strong)]">
              {link.label}
              <span className="font-medium text-[var(--nim-secondary)]"> → {link.href}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function ManualBody({ tip, interactive }: { tip: HelpTip; interactive: boolean }) {
  return (
    <div className="space-y-4 text-[0.95rem] font-medium leading-7 text-[var(--foreground)] sm:text-base">
      <section>
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--nim-primary-strong)] sm:text-lg">
          Was ist das?
        </h3>
        <p className="mt-1 text-[var(--nim-secondary)]">{tip.whatIs}</p>
      </section>

      <section>
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--nim-primary-strong)] sm:text-lg">
          Wozu ist das gut — was löst es?
        </h3>
        <p className="mt-1 text-[var(--nim-secondary)]">{tip.whatFor}</p>
      </section>

      <section>
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--nim-primary-strong)] sm:text-lg">
          Was kannst du hier tun?
        </h3>
        <ol className="mt-1 list-decimal space-y-1.5 pl-5 text-[var(--nim-secondary)]">
          {tip.canDo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--nim-primary-strong)] sm:text-lg">
          Beispiel aus dem Alltag
        </h3>
        <p className="mt-1 text-[var(--nim-secondary)]">{tip.example}</p>
      </section>

      <section>
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--nim-primary-strong)] sm:text-lg">
          Typischer Anfängerfehler
        </h3>
        <p className="mt-1 text-[var(--nim-secondary)]">{tip.mistake}</p>
      </section>

      <section>
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--nim-primary-strong)] sm:text-lg">
          Hilfreiche Links
        </h3>
        <ManualLinks links={tip.links} interactive={interactive} />
      </section>
    </div>
  );
}

/**
 * Globale Cursor-Erklärungswolke — Konzept A: Mini-Handbuch am Cursor.
 *
 * Hover: große Manual-Wolke mit allen Kapiteln (pointer-events-none,
 * damit Seite/Sidebar weiter scrollen).
 * Hilfe-Pin: scrollbar + klickbare Links.
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
      }, 200);
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
      lastTipIdRef.current = tip.id;
      setCloud({
        tip,
        x: event.clientX,
        y: event.clientY,
        pinned: false,
        avoid: hostRectFromTarget(event.target),
      });
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-explain-cloud-root]")) {
        return;
      }
      if (pinnedRef.current) return;
      clearHide();
      lastTipIdRef.current = null;
      setCloud(null);
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
        x: current?.x ?? Math.min(window.innerWidth / 2 - 40, window.innerWidth - 500),
        y: current?.y ?? 72,
        pinned: true,
        avoid: current?.avoid ?? null,
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
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener(EXPLAIN_PIN_EVENT, onPin as EventListener);
    window.addEventListener(EXPLAIN_UNPIN_EVENT, onUnpin);
    window.addEventListener("keydown", onKey);

    return () => {
      clearHide();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
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

  const pos = clampPosition(cloud.x, cloud.y, cloud.avoid);
  const interactive = cloud.pinned;

  return createPortal(
    <div
      id={panelId}
      data-explain-cloud-root=""
      role="region"
      aria-label={`Handbuch: ${cloud.tip.label}`}
      aria-hidden={interactive ? undefined : true}
      className={[
        "fixed z-[80] flex w-[min(30rem,calc(100vw-1.25rem))] max-h-[min(70vh,40rem)] flex-col overflow-hidden rounded-[1.35rem] border-2 border-[var(--nim-primary)] bg-[var(--nim-surface)] text-left text-[var(--foreground)] shadow-[var(--shadow-lift)]",
        interactive ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      style={{ left: pos.left, top: pos.top }}
    >
      <div className="shrink-0 border-b border-[var(--nim-border)] bg-[var(--nim-surface-soft)] px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-sm font-semibold text-[var(--nim-primary-strong)]">Mini-Handbuch</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--foreground)] sm:text-2xl">
          {cloud.tip.label}
        </p>
        <p className="mt-2 text-sm font-medium leading-6 text-[var(--nim-secondary)] sm:text-[0.95rem]">
          {cloud.tip.short}
        </p>
      </div>

      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <ManualBody tip={cloud.tip} interactive={interactive} />
      </div>

      <div className="shrink-0 border-t border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 py-3 sm:px-5">
        {interactive ? (
          <button
            type="button"
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
            onClick={close}
          >
            Schließen
          </button>
        ) : (
          <p className="text-xs font-semibold leading-5 text-[var(--nim-secondary)]">
            Orangenen Hilfe-Button antippen: Wolke festhalten, darin scrollen und Links öffnen.
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function pinExplainTip(tipId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EXPLAIN_PIN_EVENT, { detail: { tipId } }));
}
