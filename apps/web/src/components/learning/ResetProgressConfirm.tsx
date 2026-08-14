"use client";

type ResetProgressConfirmProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  /** Stable id for aria-labelledby; defaults to global reset title. */
  titleId?: string;
  title?: string;
  /** Bullet list of what will be cleared. */
  items?: string[];
  /** data-testid for the backup deeplink (default: reset-progress-backup-link). */
  backupLinkTestId?: string;
};

const DEFAULT_ITEMS = [
  "Haken an den 12 Lektionen",
  "Erledigt-Markierungen an Vertiefungs-Einheiten (Themenwelten)",
  "Stationen des 60-Minuten-Kurzpfads",
  "Wiederholungs-Queue (Übungskarten)",
];

/**
 * Inline-Bestätigung vor dem Löschen lokaler Lernmarkierungen.
 * Kein window.confirm — tastatur- und screenreader-freundlich.
 */
export function ResetProgressConfirm({
  open,
  onCancel,
  onConfirm,
  titleId = "reset-progress-title",
  title = "Lokalen Lernstand wirklich zurücksetzen?",
  items = DEFAULT_ITEMS,
  backupLinkTestId = "reset-progress-backup-link",
}: ResetProgressConfirmProps) {
  if (!open) return null;

  return (
    <div
      role="group"
      aria-labelledby={titleId}
      className="mt-3 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-3"
    >
      <p
        id={titleId}
        className="text-sm font-black text-[var(--nim-primary)]"
      >
        {title}
      </p>
      <p className="mt-1 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        In diesem Browser werden gelöscht:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        Unberührt bleiben: Einfache Ansicht, Einstiegshilfe und alle Lerninhalte im
        Portal. Das Zurücksetzen lässt sich nicht rückgängig machen — sichere den
        Stand vorher unter{" "}
        <a
          href="#fortschritt-sichern"
          data-testid={backupLinkTestId}
          className="font-black text-[var(--nim-primary)] underline underline-offset-2"
        >
          Fortschritt sichern
        </a>
        , falls du ihn behalten willst.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-3 py-2 text-xs font-black text-[var(--nim-primary)]"
        >
          Abbrechen
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 py-2 text-xs font-black text-white"
        >
          Ja, zurücksetzen
        </button>
      </div>
    </div>
  );
}
