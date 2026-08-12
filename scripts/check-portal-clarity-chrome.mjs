#!/usr/bin/env node
/**
 * Static guardrails for mass-audience chrome vocabulary (no browser).
 * Auth / login expansion is intentionally out of scope.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const mobileNav = read("apps/web/src/components/learning/MobileBottomNav.tsx");
assert.match(mobileNav, /href: "#erststart"/);
assert.match(mobileNav, /label: "Üben"/);
assert.doesNotMatch(mobileNav, /label: "Abruf"/);
assert.match(mobileNav, /label: "Pfad"/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /Jetzt starten/);
assert.match(page, /Wiederholen/);
assert.doesNotMatch(page, />Abruf</);

const literacy = read("apps/web/src/data/literacy-path.ts");
assert.match(literacy, /60-Minuten KI-Kurzpfad/);
assert.match(literacy, /Zum Wiederholen/);

const onboarding = read("apps/web/src/components/learning/OnboardingRoutePanel.tsx");
assert.match(onboarding, /Drei Stationen — jederzeit wiederfinden/);
assert.match(onboarding, /Wiederholen starten/);

console.log("PORTAL_CLARITY_CHROME_STATIC_OK=YES");
