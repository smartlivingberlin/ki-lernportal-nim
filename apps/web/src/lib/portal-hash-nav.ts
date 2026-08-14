/**
 * Portal-interne Hash-Navigation.
 * Wenn das Ziel in Einfacher Ansicht fehlt, löst das Event „Mehr Bereiche“ aus.
 */
export const REVEAL_WORLDS_EVENT = "nim:reveal-worlds";

export type RevealWorldsDetail = {
  hash?: string;
};

export function requestRevealWorlds(hash?: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<RevealWorldsDetail>(REVEAL_WORLDS_EVENT, {
      detail: { hash },
    }),
  );
}

/** Scrollt zu einem Anker; bei fehlendem Ziel optional Welten einblenden. */
export function navigatePortalHash(
  href: string,
  options?: { revealIfMissing?: boolean },
): boolean {
  if (typeof document === "undefined" || !href.startsWith("#")) return false;
  const id = href.slice(1);
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    const focusTarget = document.getElementById(`${id}-title`) ?? section;
    if (focusTarget instanceof HTMLElement) {
      if (!focusTarget.hasAttribute("tabindex")) {
        focusTarget.setAttribute("tabindex", "-1");
      }
      focusTarget.focus({ preventScroll: true });
    }
    if (typeof history !== "undefined") {
      history.replaceState(null, "", href);
    }
    return true;
  }
  if (options?.revealIfMissing !== false) {
    requestRevealWorlds(href);
  }
  return false;
}
