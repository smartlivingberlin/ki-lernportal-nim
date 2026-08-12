"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { helpTipById, type HelpLink, type HelpTip } from "../../data/help-tips";
import { useFirstStartCoachDismissed } from "./FirstStartCoach";
import { useSimpleMode } from "../../hooks/useSimpleMode";

export const EXPLAIN_PIN_EVENT = "nim-explain-pin";
export const EXPLAIN_UNPIN_EVENT = "nim-explain-unpin";

type AvoidRect = { x: number; y: number; width: number; height: number };

type CloudState = {
  tip: HelpTip;
  /** Eingefrorene Panel-Position (nicht dem Cursor hinterher) */
  left: number;
  top: number;
  pinned: boolean;
};

/** Große Manual-Wolke — Maße für Viewport-Clamp. */
const PANEL_WIDTH = 480;
const PANEL_HEIGHT = 520;
const HIDE_DELAY_MS = 480;
const TIP_SWITCH_DWELL_MS = 320;

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

function overlapsRect(
  left: number,
  top: number,
  width: number,
  height: number,
  rect: AvoidRect,
) {
  return !(
    left + width <= rect.x ||
    left >= rect.x + rect.width ||
    top + height <= rect.y ||
    top >= rect.y + rect.height
  );
}

/**
 * Position dicht am Auslöser / Cursor, aber so dass der Cursor
 * außerhalb bleibt — damit man in die Wolke fahren kann.
 * Überdeckt den Auslöser möglichst nicht (Kontrast/Axe).
 */
function placeCloud(x: number, y: number, avoid?: AvoidRect | null) {
  const pad = 12;
  const width = Math.min(PANEL_WIDTH, window.innerWidth - pad * 2);
  const height = Math.min(PANEL_HEIGHT, window.innerHeight * 0.7);
  const maxX = Math.max(pad, window.innerWidth - width - pad);
  const maxY = Math.max(pad, window.innerHeight - height - pad);

  const candidates: Array<{ left: number; top: number }> = [];

  if (avoid) {
    // Bevorzugt neben dem Bereich — kurze Strecke für den Cursor.
    candidates.push(
      { left: avoid.x + avoid.width + 12, top: Math.min(avoid.y, maxY) },
      { left: avoid.x - width - 12, top: Math.min(avoid.y, maxY) },
      { left: Math.min(maxX, Math.max(pad, avoid.x)), top: avoid.y + avoid.height + 12 },
      { left: Math.min(maxX, Math.max(pad, avoid.x)), top: avoid.y - height - 12 },
    );
  }

  candidates.push(
    { left: x + 20, top: y + 20 },
    { left: x - width - 20, top: y + 20 },
    { left: x + 20, top: y - height - 20 },
    { left: x - width - 20, top: y - height - 20 },
  );

  const scored: Array<{ left: number; top: number; score: number }> = [];

  for (const candidate of candidates) {
    const left = Math.max(pad, Math.min(candidate.left, maxX));
    const top = Math.max(pad, Math.min(candidate.top, maxY));
    if (containsPoint(left, top, width, height, x, y)) continue;
    let score = 0;
    if (avoid && overlapsRect(left, top, width, Math.min(height, 280), avoid)) score += 5;
    if (avoid && overlapsRect(left, top, width, height, avoid)) score += 10;
    scored.push({ left, top, score });
  }

  scored.sort((a, b) => a.score - b.score);
  if (scored[0]) return { left: scored[0].left, top: scored[0].top };

  return {
    left: Math.max(pad, Math.min(x + 20, maxX)),
    top: Math.max(pad, Math.min(y + 20, maxY)),
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
 * Mini-Handbuch am Cursor.
 *
 * Wichtig: Position wird pro Tipp eingefroren — die Wolke läuft dem Cursor
 * nicht mehr davon. Maus kann in die Wolke fahren, scrollen und Links nutzen.
 */
export function CursorExplainLayer() {
  const panelId = useId();
  const isClient = useIsClient();
  const coachDismissed = useFirstStartCoachDismissed();
  const { enabled: simpleMode } = useSimpleMode();
  /** Hover-Handbuch erst nach Coach + nicht in Einfacher Ansicht. */
  const hoverExplainEnabled = coachDismissed && !simpleMode;
  const [cloud, setCloud] = useState<CloudState | null>(null);
  const [engaged, setEngaged] = useState(false);
  const pinnedRef = useRef(false);
  const overCloudRef = useRef(false);
  const lastTipIdRef = useRef<string | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const switchTimerRef = useRef<number | null>(null);
  const suppressOpenUntilRef = useRef(0);
  const pendingTipRef = useRef<{ tip: HelpTip; x: number; y: number; avoid: AvoidRect | null } | null>(
    null,
  );
  const hoverExplainEnabledRef = useRef(hoverExplainEnabled);

  useEffect(() => {
    hoverExplainEnabledRef.current = hoverExplainEnabled;
  }, [hoverExplainEnabled]);

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

    const clearSwitch = () => {
      if (switchTimerRef.current !== null) {
        window.clearTimeout(switchTimerRef.current);
        switchTimerRef.current = null;
      }
      pendingTipRef.current = null;
    };

    const scheduleHide = () => {
      clearHide();
      hideTimerRef.current = window.setTimeout(() => {
        if (!pinnedRef.current && !overCloudRef.current) {
          lastTipIdRef.current = null;
          clearSwitch();
          setEngaged(false);
          setCloud(null);
        }
      }, HIDE_DELAY_MS);
    };

    const openTip = (tip: HelpTip, x: number, y: number, avoid: AvoidRect | null) => {
      const pos = placeCloud(x, y, avoid);
      lastTipIdRef.current = tip.id;
      setEngaged(false);
      setCloud({
        tip,
        left: pos.left,
        top: pos.top,
        pinned: false,
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canHoverFinePointer()) return;
      if (pinnedRef.current) return;
      if (!hoverExplainEnabledRef.current) return;

      if (event.target instanceof Element && event.target.closest("[data-explain-cloud-root]")) {
        overCloudRef.current = true;
        clearHide();
        clearSwitch();
        return;
      }

      overCloudRef.current = false;

      if (Date.now() < suppressOpenUntilRef.current) {
        return;
      }

      const tip = tipFromEventTarget(event.target);

      if (!tip) {
        // Unterwegs zur Wolke: nicht sofort schließen.
        scheduleHide();
        return;
      }

      clearHide();

      // Gleicher Tipp: Position eingefroren lassen — Cursor kann eintreten.
      if (lastTipIdRef.current === tip.id) {
        clearSwitch();
        return;
      }

      // Anderer Tipp: kurze Verweilzeit, damit der Weg zur Wolke
      // nicht versehentlich umschaltet.
      pendingTipRef.current = {
        tip,
        x: event.clientX,
        y: event.clientY,
        avoid: hostRectFromTarget(event.target),
      };

      if (switchTimerRef.current !== null) {
        return;
      }

      // Kein offenes Handbuch → sofort öffnen.
      if (!lastTipIdRef.current) {
        openTip(tip, event.clientX, event.clientY, hostRectFromTarget(event.target));
        clearSwitch();
        return;
      }

      switchTimerRef.current = window.setTimeout(() => {
        switchTimerRef.current = null;
        const pending = pendingTipRef.current;
        if (!pending || pinnedRef.current || overCloudRef.current) return;
        if (Date.now() < suppressOpenUntilRef.current) return;
        if (!hoverExplainEnabledRef.current) return;
        openTip(pending.tip, pending.x, pending.y, pending.avoid);
        pendingTipRef.current = null;
      }, TIP_SWITCH_DWELL_MS);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-explain-cloud-root]")) {
        return;
      }
      if (pinnedRef.current) return;
      // Nach Klicks kurz keine neue Hover-Wolke — verhindert Kontrast-Überdeckung.
      suppressOpenUntilRef.current = Date.now() + 400;
      clearHide();
      clearSwitch();
      overCloudRef.current = false;
      lastTipIdRef.current = null;
      setEngaged(false);
      setCloud(null);
    };

    const onPin = (event: Event) => {
      const detail = (event as CustomEvent<{ tipId: string }>).detail;
      const tip = helpTipById(detail?.tipId ?? "");
      if (!tip) return;
      clearHide();
      clearSwitch();
      lastTipIdRef.current = tip.id;
      pinnedRef.current = true;
      setEngaged(true);
      setCloud((current) => {
        if (current?.tip.id === tip.id) {
          return { ...current, tip, pinned: true };
        }
        const pos = placeCloud(
          Math.min(window.innerWidth / 2, window.innerWidth - 520),
          96,
          null,
        );
        return { tip, left: pos.left, top: pos.top, pinned: true };
      });
    };

    const onUnpin = () => {
      clearHide();
      clearSwitch();
      lastTipIdRef.current = null;
      pinnedRef.current = false;
      overCloudRef.current = false;
      setEngaged(false);
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
      clearSwitch();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener(EXPLAIN_PIN_EVENT, onPin as EventListener);
      window.removeEventListener(EXPLAIN_UNPIN_EVENT, onUnpin);
      window.removeEventListener("keydown", onKey);
    };
  }, [isClient]);

  const close = useCallback(() => {
    pinnedRef.current = false;
    overCloudRef.current = false;
    lastTipIdRef.current = null;
    setEngaged(false);
    setCloud(null);
    window.dispatchEvent(new Event(EXPLAIN_UNPIN_EVENT));
  }, []);

  if (!isClient || !cloud) return null;

  const interactive = cloud.pinned || engaged;

  return createPortal(
    <div
      id={panelId}
      data-explain-cloud-root=""
      role="region"
      aria-label={`Handbuch: ${cloud.tip.label}`}
      className="pointer-events-auto fixed z-[80] flex w-[min(30rem,calc(100vw-1.25rem))] max-h-[min(70vh,40rem)] flex-col overflow-hidden rounded-[1.35rem] border-2 border-[var(--nim-primary)] bg-[var(--nim-surface)] text-left text-[var(--foreground)] shadow-[var(--shadow-lift)]"
      style={{ left: cloud.left, top: cloud.top }}
      onPointerEnter={() => {
        overCloudRef.current = true;
        setEngaged(true);
        if (hideTimerRef.current !== null) {
          window.clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
      }}
      onPointerLeave={() => {
        overCloudRef.current = false;
        if (!pinnedRef.current) {
          setEngaged(false);
          hideTimerRef.current = window.setTimeout(() => {
            if (!pinnedRef.current && !overCloudRef.current) {
              lastTipIdRef.current = null;
              setCloud(null);
            }
          }, HIDE_DELAY_MS);
        }
      }}
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
        {cloud.pinned ? (
          <button
            type="button"
            className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-4 text-sm font-black text-[var(--nim-primary)]"
            onClick={close}
          >
            Schließen
          </button>
        ) : (
          <p className="text-xs font-semibold leading-5 text-[var(--nim-secondary)]">
            Maus hierher bewegen, dann scrollen. Hilfe-Button hält die Wolke fest.
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
