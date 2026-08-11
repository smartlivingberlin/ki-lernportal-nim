"use client";

type ResetProgressConfirmProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

/**
 * Inline-Bestätigung vor dem Löschen des lokalen Lernfortschritts.
 * Kein window.confirm — tastatur- und screenreader-freundlich.
 */
export function ResetProgressConfirm({
  open,
  onCancel,
  onConfirm,
}: ResetProgressConfirmProps) {
  if (!open) return null;

  return (
    <div
      role="group"
      aria-labelledby="reset-progress-title"
      className="mt-3 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-3"
    >
      <p
        id="reset-progress-title"
        className="text-sm font-black text-[var(--nim-primary)]"
      >
        Fortschritt wirklich zurücksetzen?
      </p>
      <p className="mt-1 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        Alle Haken in diesem Browser werden gelöscht. Das lässt sich nicht
        rückgängig machen.
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
