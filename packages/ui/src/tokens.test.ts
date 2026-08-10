import {
  colorTokens,
  cssVariablesFromColorTokens,
  designSystemMeta,
  designTokens,
  motionTokens,
} from "./tokens.ts";

function equal(actual: unknown, expected: unknown, label: string): void {
  if (!Object.is(actual, expected)) {
    throw new Error(
      `${label}: expected ${String(expected)}, received ${String(actual)}`,
    );
  }
}

equal(designSystemMeta.noGrayChrome, true, "noGrayChrome");
equal(designSystemMeta.accessibilityTarget, "WCAG 2.2 AA", "a11y target");
equal(designTokens.color.primary, colorTokens.primary, "primary token");
equal(motionTokens.respectReducedMotion, true, "reduced motion");

const cssVars = cssVariablesFromColorTokens();
equal(cssVars["--nim-primary"], colorTokens.primary, "css primary");
equal(cssVars["--background"], colorTokens.paper, "css background");

const forbiddenGray = [
  "#64748b",
  "#94a3b8",
  "#cbd5e1",
  "#e2e8f0",
  "#f1f5f9",
  "#f8fafc",
];

for (const value of Object.values(colorTokens)) {
  if (forbiddenGray.includes(value.toLowerCase())) {
    throw new Error(`gray chrome token found: ${value}`);
  }
}
