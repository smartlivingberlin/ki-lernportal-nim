/**
 * Original M1 SVG illustrations (project-owned). Keep paths simple and accessible.
 * Colors use currentColor / CSS variables so they follow the portal theme.
 */

export function KiPatternsIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 360"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="640" height="360" fill="var(--nim-surface-soft, #f1f5f9)" rx="24" />
      <circle cx="160" cy="120" r="18" fill="var(--nim-primary, #0f766e)" opacity="0.9" />
      <circle cx="260" cy="90" r="14" fill="var(--nim-primary, #0f766e)" opacity="0.7" />
      <circle cx="220" cy="180" r="16" fill="var(--nim-accent, #c2410c)" opacity="0.8" />
      <circle cx="320" cy="150" r="12" fill="var(--nim-primary, #0f766e)" opacity="0.55" />
      <line
        x1="160"
        y1="120"
        x2="260"
        y2="90"
        stroke="var(--nim-primary, #0f766e)"
        strokeWidth="3"
        opacity="0.45"
      />
      <line
        x1="160"
        y1="120"
        x2="220"
        y2="180"
        stroke="var(--nim-primary, #0f766e)"
        strokeWidth="3"
        opacity="0.45"
      />
      <line
        x1="260"
        y1="90"
        x2="320"
        y2="150"
        stroke="var(--nim-primary, #0f766e)"
        strokeWidth="3"
        opacity="0.35"
      />
      <line
        x1="220"
        y1="180"
        x2="320"
        y2="150"
        stroke="var(--nim-accent, #c2410c)"
        strokeWidth="3"
        opacity="0.35"
      />
      <rect
        x="380"
        y="88"
        width="180"
        height="56"
        rx="12"
        fill="var(--nim-surface, #fff)"
        stroke="var(--nim-border, #cbd5e1)"
        strokeWidth="2"
      />
      <rect
        x="380"
        y="160"
        width="180"
        height="56"
        rx="12"
        fill="var(--nim-surface, #fff)"
        stroke="var(--nim-border, #cbd5e1)"
        strokeWidth="2"
      />
      <rect x="400" y="108" width="110" height="10" rx="5" fill="var(--nim-secondary, #64748b)" opacity="0.45" />
      <rect x="400" y="180" width="90" height="10" rx="5" fill="var(--nim-secondary, #64748b)" opacity="0.45" />
      <path
        d="M320 150 L380 116"
        stroke="var(--nim-primary, #0f766e)"
        strokeWidth="3"
        strokeDasharray="6 6"
        opacity="0.5"
      />
      <path
        d="M320 150 L380 188"
        stroke="var(--nim-primary, #0f766e)"
        strokeWidth="3"
        strokeDasharray="6 6"
        opacity="0.5"
      />
    </svg>
  );
}

export function KiCheckIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 360"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="640" height="360" fill="var(--nim-surface-soft, #f1f5f9)" rx="24" />
      <rect
        x="80"
        y="90"
        width="220"
        height="180"
        rx="16"
        fill="var(--nim-surface, #fff)"
        stroke="var(--nim-border, #cbd5e1)"
        strokeWidth="2"
      />
      <rect x="110" y="130" width="160" height="12" rx="6" fill="var(--nim-secondary, #64748b)" opacity="0.35" />
      <rect x="110" y="160" width="140" height="12" rx="6" fill="var(--nim-secondary, #64748b)" opacity="0.35" />
      <rect x="110" y="190" width="120" height="12" rx="6" fill="var(--nim-secondary, #64748b)" opacity="0.35" />
      <rect
        x="340"
        y="90"
        width="220"
        height="180"
        rx="16"
        fill="var(--nim-surface, #fff)"
        stroke="var(--nim-border, #cbd5e1)"
        strokeWidth="2"
      />
      <circle cx="380" cy="150" r="16" fill="var(--nim-success-soft, #dcfce7)" stroke="var(--nim-success, #15803d)" strokeWidth="3" />
      <path
        d="M372 150 L378 156 L390 142"
        fill="none"
        stroke="var(--nim-success, #15803d)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="380" cy="210" r="16" fill="var(--nim-success-soft, #dcfce7)" stroke="var(--nim-success, #15803d)" strokeWidth="3" />
      <path
        d="M372 210 L378 216 L390 202"
        fill="none"
        stroke="var(--nim-success, #15803d)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="410" y="142" width="120" height="12" rx="6" fill="var(--nim-secondary, #64748b)" opacity="0.4" />
      <rect x="410" y="202" width="100" height="12" rx="6" fill="var(--nim-secondary, #64748b)" opacity="0.4" />
    </svg>
  );
}
