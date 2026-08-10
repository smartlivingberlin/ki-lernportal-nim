/**
 * Design tokens for KI-Lernportal NIM Design System 2.0 (web runtime copy).
 *
 * Kept self-contained so Railway Production (Root Directory `apps/web`, npm)
 * can build without pnpm workspace protocol. Canonical package remains
 * `packages/ui` for monorepo/local development; keep values in sync.
 */

export const colorTokens = {
  ink: "#062C33",
  inkMuted: "#355F66",
  paper: "#F3FBFA",
  paperDeep: "#D7F0EC",
  surface: "#FFFFFF",
  surfaceSoft: "#E8F7F4",
  primary: "#0D7377",
  primaryStrong: "#095E61",
  primarySoft: "#D8F1EF",
  accent: "#B83A2E",
  accentSoft: "#FFE1DC",
  success: "#0F5C4A",
  successSoft: "#D5F3EA",
  warning: "#C47A12",
  warningSoft: "#FFF0D6",
  focus: "#0A5C7A",
  border: "#9ED0CB",
  borderStrong: "#0D7377",
} as const;

export const typographyTokens = {
  fontDisplay: '"Fraunces", Georgia, "Times New Roman", serif',
  fontBody: '"Source Sans 3", "Segoe UI", sans-serif',
  baseSizePx: 18,
  lineHeight: 1.65,
  simpleModeScale: 1.12,
} as const;

export const spacingTokens = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  touchMinPx: 44,
} as const;

export const radiusTokens = {
  sm: "0.75rem",
  md: "1.25rem",
  lg: "1.75rem",
  xl: "2.25rem",
} as const;

export const motionTokens = {
  durationFastMs: 160,
  durationBaseMs: 280,
  durationSlowMs: 480,
  easingStandard: "cubic-bezier(0.22, 1, 0.36, 1)",
  respectReducedMotion: true,
} as const;

export const designSystemMeta = {
  id: "nim-design-system-2.0",
  version: "0.1.0",
  accessibilityTarget: "WCAG 2.2 AA",
  noGrayChrome: true,
  languageDefault: "de",
} as const;

export type ColorTokenName = keyof typeof colorTokens;
export type DesignTokens = {
  color: typeof colorTokens;
  typography: typeof typographyTokens;
  spacing: typeof spacingTokens;
  radius: typeof radiusTokens;
  motion: typeof motionTokens;
  meta: typeof designSystemMeta;
};

export const designTokens: DesignTokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  motion: motionTokens,
  meta: designSystemMeta,
};
