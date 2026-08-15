import type { Source } from "../../data/types";

type SourceLinkListProps = {
  sources: Source[];
  heading?: string;
  testId?: string;
  compact?: boolean;
};

/**
 * Shared Quellenparität UI — same outbound contract as lesson sources.
 */
export function SourceLinkList({
  sources,
  heading = "Quellen",
  testId,
  compact = false,
}: SourceLinkListProps) {
  if (sources.length === 0) return null;

  return (
    <div
      data-testid={testId}
      className={compact ? "mt-3" : "mt-4"}
    >
      <p
        className={
          compact
            ? "text-[0.65rem] font-black uppercase tracking-widest text-[var(--nim-secondary)]"
            : "text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]"
        }
      >
        {heading}
      </p>
      <ul className={compact ? "mt-2 space-y-2" : "mt-3 space-y-3"}>
        {sources.map((source) => (
          <li key={source.id}>
            <a
              data-source-id={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                compact
                  ? "block min-h-11 break-words rounded-[var(--nim-radius-sm)] bg-[var(--nim-surface)] px-3 py-2 hover:bg-[var(--nim-primary-soft)]"
                  : "block min-h-11 break-words rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-3 hover:bg-[var(--nim-primary-soft)]"
              }
            >
              <span className="block text-sm font-black text-[var(--nim-primary)]">
                {source.name}
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-[var(--nim-secondary)]">
                {source.publisher}
              </span>
              <span className="mt-1 block text-xs text-[var(--nim-secondary)]">
                Geprüft am{" "}
                {source.lastReviewed.split("-").reverse().join(".")}
              </span>
              <span className="sr-only"> – öffnet in einem neuen Tab</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
