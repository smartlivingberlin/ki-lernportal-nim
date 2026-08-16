/**
 * Scripted guide mascot (M3) — original SVG, no Live2D/Rive SaaS, no LLM.
 * Poses are driven only by curated coach steps.
 */
export type GuideMascotPose = "idle" | "point" | "celebrate";

type GuideMascotProps = {
  pose?: GuideMascotPose;
  className?: string;
  label?: string;
};

export function GuideMascot({
  pose = "idle",
  className,
  label = "Geführter Begleiter",
}: GuideMascotProps) {
  const armRaise = pose === "point" || pose === "celebrate";
  const smileWide = pose === "celebrate";

  return (
    <svg
      data-testid="guide-mascot"
      data-mascot-pose={pose}
      className={className ?? "h-28 w-28 shrink-0"}
      viewBox="0 0 160 160"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="80" cy="80" r="72" fill="var(--nim-surface, #fff)" />
      <circle
        cx="80"
        cy="80"
        r="68"
        fill="var(--nim-primary-soft, #ccfbf1)"
        stroke="var(--nim-primary, #0f766e)"
        strokeWidth="3"
      />
      {/* Body */}
      <ellipse cx="80" cy="118" rx="34" ry="22" fill="var(--nim-primary, #0f766e)" opacity="0.85" />
      {/* Head */}
      <circle cx="80" cy="70" r="36" fill="var(--nim-surface, #fff)" stroke="var(--nim-primary, #0f766e)" strokeWidth="3" />
      {/* Eyes */}
      <circle cx="68" cy="66" r="5" fill="var(--nim-primary-strong, #115e59)" />
      <circle cx="92" cy="66" r="5" fill="var(--nim-primary-strong, #115e59)" />
      {/* Smile */}
      <path
        d={
          smileWide
            ? "M62 82 Q80 98 98 82"
            : "M66 82 Q80 92 94 82"
        }
        fill="none"
        stroke="var(--nim-primary-strong, #115e59)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Arm — points on "point" / raised on celebrate */}
      <path
        d={
          armRaise
            ? "M112 110 Q138 70 128 48"
            : "M112 110 Q130 120 138 112"
        }
        fill="none"
        stroke="var(--nim-accent, #c2410c)"
        strokeWidth="6"
        strokeLinecap="round"
        className="motion-safe:transition-all motion-safe:duration-300"
      />
      {pose === "point" ? (
        <polygon
          points="128,40 140,52 122,54"
          fill="var(--nim-accent, #c2410c)"
        />
      ) : null}
      {pose === "celebrate" ? (
        <g fill="var(--nim-accent, #c2410c)" opacity="0.8">
          <circle cx="40" cy="36" r="3" />
          <circle cx="120" cy="30" r="2.5" />
          <circle cx="48" cy="28" r="2" />
        </g>
      ) : null}
    </svg>
  );
}

export function poseForCoachStep(stepIndex: number, isLast: boolean): GuideMascotPose {
  if (isLast) return "celebrate";
  if (stepIndex > 0) return "point";
  return "idle";
}
