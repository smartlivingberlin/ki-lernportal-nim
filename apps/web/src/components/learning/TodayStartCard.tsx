"use client";

import type { NextStep } from "../../data/next-step";

type TodayStartCardProps = {
  nextStep: NextStep;
  moduleTitle: string | null;
  onOpenLesson: (lessonId: string) => void;
  onOpenDeepenMicro?: (microUnitId: string, worldId: string) => void;
  onShowMore?: () => void;
};

export function TodayStartCard({
  nextStep,
  moduleTitle,
  onOpenLesson,
  onOpenDeepenMicro,
  onShowMore,
}: TodayStartCardProps) {
  const handlePrimary = () => {
    if (nextStep.kind === "complete" && onShowMore) {
      onShowMore();
      return;
    }
    if (nextStep.lessonId) {
      onOpenLesson(nextStep.lessonId);
      return;
    }
    if (
      nextStep.kind === "deepen" &&
      nextStep.microUnitId &&
      nextStep.worldId &&
      onOpenDeepenMicro
    ) {
      onOpenDeepenMicro(nextStep.microUnitId, nextStep.worldId);
      return;
    }
    if (typeof document !== "undefined") {
      const id = nextStep.href.replace(/^#/, "");
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      const focusEl =
        document.getElementById(`${id}-title`) ??
        (target instanceof HTMLElement ? target : null);
      focusEl?.focus({ preventScroll: true });
    }
  };

  return (
    <section
      id="heute"
      data-testid="today-start-card"
      data-next-step-kind={nextStep.kind}
      aria-labelledby="today-start-title"
      data-explain="heute"
      className="rounded-[var(--nim-radius-xl)] border border-white/25 bg-white/12 p-5 backdrop-blur-sm"
    >
      <p className="text-xs font-black uppercase tracking-widest text-white">
        {nextStep.eyebrow}
        {moduleTitle && nextStep.kind === "lesson" ? ` · ${moduleTitle}` : ""}
      </p>

      <p
        id="today-start-title"
        className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-white"
      >
        {nextStep.title}
      </p>
      <p className="mt-3 text-sm font-semibold leading-6 text-white">{nextStep.reason}</p>
      <p className="mt-2 text-xs font-semibold text-white/90">
        Schicht: {nextStep.layer === "core" ? "Kernweg" : "Vertiefung"} · {nextStep.chipLabel}
      </p>

      <button
        type="button"
        data-testid="today-next-step-cta"
        onClick={handlePrimary}
        className="nim-interactive mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[var(--nim-radius-md)] bg-white px-4 py-3 text-sm font-black text-[var(--nim-primary)] hover:bg-[var(--nim-accent-soft)]"
      >
        {nextStep.primaryLabel}
      </button>

      {nextStep.kind === "lesson" ? (
        <a
          href="#literacy-pfad"
          className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-white/90 underline decoration-white/45 underline-offset-4 hover:decoration-white"
        >
          Alternative: 60-Minuten-Kurzpfad
        </a>
      ) : null}
    </section>
  );
}
