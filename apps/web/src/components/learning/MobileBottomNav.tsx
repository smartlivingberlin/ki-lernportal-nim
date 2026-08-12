"use client";

type MobileBottomNavProps = {
  simpleMode: boolean;
};

type NavItem = {
  href: string;
  label: string;
  ariaLabel: string;
};

/**
 * Kurze sichtbare Labels + vollständige aria-Labels für Einsteiger.
 * Muss zu Hilfe-Tipp „mobilnav“ und Guardrail-Smoke passen.
 * Einfache Ansicht: Üben statt Welten. Volle Ansicht: Welten → #ziele.
 */
const simpleItems: readonly NavItem[] = [
  { href: "#erststart", label: "Start", ariaLabel: "Start: Einstieg" },
  {
    href: "#selbstcheck",
    label: "Selbst",
    ariaLabel: "Selbstcheck",
  },
  {
    href: "#literacy-pfad",
    label: "Pfad",
    ariaLabel: "60-Minuten-Kurzpfad",
  },
  {
    href: "#wiederholen",
    label: "Üben",
    ariaLabel: "Wiederholen und üben",
  },
  {
    href: "#scam",
    label: "Sicher",
    ariaLabel: "Sicherheit und Scam-Schutz",
  },
];

const fullItems: readonly NavItem[] = [
  { href: "#erststart", label: "Start", ariaLabel: "Start: Einstieg" },
  {
    href: "#selbstcheck",
    label: "Selbst",
    ariaLabel: "Selbstcheck",
  },
  {
    href: "#literacy-pfad",
    label: "Pfad",
    ariaLabel: "60-Minuten-Kurzpfad",
  },
  {
    href: "#ziele",
    label: "Welten",
    ariaLabel: "Themenwelten",
  },
  {
    href: "#scam",
    label: "Sicher",
    ariaLabel: "Sicherheit und Scam-Schutz",
  },
];

export function MobileBottomNav({ simpleMode }: MobileBottomNavProps) {
  const items = simpleMode ? simpleItems : fullItems;

  return (
    <nav
      aria-label="Mobile Schnellnavigation"
      data-explain="mobilnav"
      data-testid="mobile-bottom-nav"
      data-nav-mode={simpleMode ? "simple" : "full"}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--nim-border)] bg-[var(--nim-surface)]/95 px-2 py-2 backdrop-blur md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between gap-1">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`} className="flex-1">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              onClick={(event) => {
                const id = item.href.replace(/^#/, "");
                if (typeof document === "undefined") return;
                const section = document.getElementById(id);
                if (!section) return;
                event.preventDefault();
                section.scrollIntoView({ behavior: "smooth", block: "start" });
                const focusTarget =
                  document.getElementById(`${id}-title`) ?? section;
                if (focusTarget instanceof HTMLElement) {
                  if (!focusTarget.hasAttribute("tabindex")) {
                    focusTarget.setAttribute("tabindex", "-1");
                  }
                  focusTarget.focus({ preventScroll: true });
                }
                if (typeof history !== "undefined") {
                  history.replaceState(null, "", item.href);
                }
              }}
              className="nim-interactive flex min-h-12 flex-col items-center justify-center rounded-[var(--nim-radius-sm)] px-1 text-xs font-black text-[var(--nim-primary)] hover:bg-[var(--nim-primary-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
