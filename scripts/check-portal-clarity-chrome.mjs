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
assert.match(mobileNav, /label: "Selbst"/);
assert.match(mobileNav, /label: "Sicher"/);
assert.match(mobileNav, /label: "Welten"/);
assert.match(mobileNav, /href: "#ziele"/);
assert.match(mobileNav, /ariaLabel: "Selbstcheck"/);
assert.match(mobileNav, /ariaLabel: "Sicherheit und Scam-Schutz"/);
assert.match(mobileNav, /ariaLabel: "Themenwelten"/);
assert.doesNotMatch(mobileNav, /label: "Abruf"/);
assert.doesNotMatch(mobileNav, /label: "Check"/);
assert.doesNotMatch(mobileNav, /label: "Scam"/);
assert.match(mobileNav, /label: "Pfad"/);
assert.match(mobileNav, /scrollIntoView/);
assert.match(mobileNav, /\$\{id\}-title/);
assert.match(mobileNav, /data-nav-mode/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /Jetzt starten/);
assert.match(page, /Wiederholen/);
assert.match(page, /KI-Lernportal NIM/);
assert.match(page, /hero-today-card/);
assert.doesNotMatch(page, /hero-today-card-desktop/);
assert.doesNotMatch(page, /hero-today-card-mobile/);
assert.doesNotMatch(page, />Abruf</);

const literacy = read("apps/web/src/data/literacy-path.ts");
assert.match(literacy, /60-Minuten KI-Kurzpfad/);
assert.match(literacy, /Zum Wiederholen/);

const onboarding = read("apps/web/src/components/learning/OnboardingRoutePanel.tsx");
assert.match(onboarding, /Drei Stationen — jederzeit wiederfinden/);
assert.match(onboarding, /Wiederholen starten/);

console.log("PORTAL_CLARITY_CHROME_STATIC_OK=YES");
