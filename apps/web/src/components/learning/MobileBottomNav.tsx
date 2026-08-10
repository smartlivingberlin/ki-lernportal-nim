"use client";

type MobileBottomNavProps = {
  simpleMode: boolean;
};

const items = [
  { href: "#erststart", label: "Start" },
  { href: "#ziele", label: "Ziele" },
  { href: "#werkzeuge", label: "Tools" },
  { href: "#szenarien", label: "Üben" },
  { href: "#coach", label: "Hilfe" },
] as const;

export function MobileBottomNav({ simpleMode }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile Schnellnavigation"
      className={[
        "fixed inset-x-0 bottom-0 z-50 border-t border-[var(--nim-border)] bg-[var(--nim-surface)]/95 px-2 py-2 backdrop-blur md:hidden",
        simpleMode ? "pb-[max(0.5rem,env(safe-area-inset-bottom))]" : "pb-[max(0.5rem,env(safe-area-inset-bottom))]",
      ].join(" ")}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between gap-1">
        {items.map((item) => (
          <li key={item.href} className="flex-1">
            <a
              href={item.href}
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
