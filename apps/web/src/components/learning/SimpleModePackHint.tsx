"use client";

type SimpleModePackHintProps = {
  onShowMore: () => void;
};

/**
 * In Einfacher Ansicht: klar sagen, dass Inhalte nur verpackt (nicht gelöscht) sind.
 */
export function SimpleModePackHint({ onShowMore }: SimpleModePackHintProps) {
  return (
    <section
      aria-labelledby="simple-pack-title"
      data-testid="simple-mode-pack-hint"
      className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-5 shadow-[var(--shadow-lift)]"
    >
      <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
        Einfache Ansicht aktiv
      </p>
      <h2
        id="simple-pack-title"
        className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]"
      >
        Themenwelten und Extra-Werkzeuge sind nur ausgeblendet
      </h2>
      <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
        Nichts fehlt im Portal. Du siehst jetzt den ruhigen Einstieg: Selbstcheck,
        Kurzpfad, Wiederholen, Sicherheit, Lektionen und Begriffe. Alles Weitere bleibt
        im System — und erscheint wieder, wenn du die Einfache Ansicht ausschaltest
        (Schalter oben) oder hier mehr einblendest. Danach landest du bei den
        Themenwelten.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          data-testid="simple-mode-show-worlds"
          onClick={onShowMore}
          className="nim-interactive inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-4 text-sm font-black text-white hover:bg-[var(--nim-primary-strong)]"
        >
          Mehr Bereiche einblenden
        </button>
        <a
          href="#erststart"
          className="nim-interactive inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-4 text-sm font-black text-[var(--nim-primary)]"
        >
          Zum Einstieg bleiben
        </a>
      </div>
    </section>
  );
}
