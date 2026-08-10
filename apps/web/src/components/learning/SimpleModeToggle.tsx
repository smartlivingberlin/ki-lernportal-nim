"use client";

type SimpleModeToggleProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export function SimpleModeToggle({ enabled, onChange }: SimpleModeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Simple Mode: größere Schrift und weniger Ablenkung"
      onClick={() => onChange(!enabled)}
      className={[
        "nim-interactive inline-flex min-h-11 items-center gap-3 rounded-[var(--nim-radius-md)] border-2 px-3 py-2 text-sm font-black transition-[transform,background-color,border-color] duration-280 ease-[var(--nim-ease)]",
        enabled
          ? "border-[var(--nim-primary)] bg-[var(--nim-primary-soft)] text-[var(--nim-primary-strong)]"
          : "border-[var(--nim-border)] bg-[var(--nim-surface)] text-[var(--nim-primary)]",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "relative h-6 w-11 rounded-full transition-colors duration-280",
          enabled ? "bg-[var(--nim-primary)]" : "bg-[var(--nim-border)]",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-280",
            enabled ? "translate-x-5" : "translate-x-0.5",
          ].join(" ")}
        />
      </span>
      <span>Simple Mode</span>
    </button>
  );
}
