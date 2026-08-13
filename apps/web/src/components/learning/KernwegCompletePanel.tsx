type KernwegCompletePanelProps = {
  completedLessons: number;
  totalLessons: number;
  simpleMode?: boolean;
  onShowWorlds?: () => void;
};

/**
 * Abschluss des 12er-Kernwegs — Wiederholen, optional Vertiefen, Backup.
 * Keine neuen Lektionen, kein Konto.
 */
export function KernwegCompletePanel({
  completedLessons,
  totalLessons,
  simpleMode = false,
  onShowWorlds,
}: KernwegCompletePanelProps) {
  const safeTotal = totalLessons || 12;

  const handleWorlds = () => {
    if (simpleMode) {
      onShowWorlds?.();
    }
  };

  return (
    <section
      id="kernweg-abschluss"
      data-testid="kernweg-complete-panel"
      aria-labelledby="kernweg-complete-title"
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-success-soft)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-6 lg:scroll-mt-36"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-success)]">
            Kernweg
          </p>
          <h2
            id="kernweg-complete-title"
            tabIndex={-1}
            className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--foreground)] outline-none md:text-3xl"
          >
            Kernweg abgeschlossen
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
            Du hast alle {safeTotal} Lektionen lokal erledigt. Es gibt keine
            Pflicht-Weiterleitung — du kannst kurz wiederholen, optional
            vertiefen oder deinen Stand sichern.
          </p>
        </div>
        <p
          aria-label={`${completedLessons} von ${safeTotal} Lektionen erledigt`}
          className="w-fit shrink-0 rounded-[var(--nim-radius-md)] bg-[var(--nim-surface)] px-4 py-2 text-sm font-black text-[var(--nim-primary)] shadow-sm"
        >
          {completedLessons}/{safeTotal} erledigt
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href="#wiederholen"
          data-testid="kernweg-complete-review"
          className="nim-interactive inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white"
        >
          Kurz wiederholen
        </a>
        <a
          href="#ziele"
          data-testid="kernweg-complete-worlds"
          onClick={handleWorlds}
          className="nim-interactive inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 text-sm font-black text-[var(--nim-primary)]"
        >
          Themenwelten ansehen
        </a>
        <a
          href="#fortschritt-sichern"
          data-testid="kernweg-complete-backup"
          className="nim-interactive inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 text-sm font-black text-[var(--nim-primary)]"
        >
          Fortschritt sichern
        </a>
      </div>

      <p className="mt-4 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        Fortschritt nur in diesem Browser — kein Konto, kein Server.
      </p>
    </section>
  );
}
