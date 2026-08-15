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
assert.match(mobileNav, /label: "Schutz"/);
assert.match(mobileNav, /label: "Welten"/);
assert.match(mobileNav, /href: "#ziele"/);
assert.match(mobileNav, /ariaLabel: "Selbstcheck"/);
assert.match(mobileNav, /ariaLabel: "Betrugsschutz und Scam-Modul"/);
assert.match(mobileNav, /ariaLabel: "Themenwelten"/);
assert.doesNotMatch(mobileNav, /label: "Abruf"/);
assert.doesNotMatch(mobileNav, /label: "Check"/);
assert.doesNotMatch(mobileNav, /label: "Scam"/);
assert.doesNotMatch(mobileNav, /label: "Sicher"/);
assert.match(mobileNav, /label: "Pfad"/);
assert.match(mobileNav, /navigatePortalHash/);
assert.match(mobileNav, /data-nav-mode/);

const hashNav = read("apps/web/src/lib/portal-hash-nav.ts");
assert.match(hashNav, /REVEAL_WORLDS_EVENT/);
assert.match(hashNav, /navigatePortalHash/);
assert.match(hashNav, /\$\{id\}-title/);

const page = read("apps/web/src/app/page.tsx");
assert.match(page, /Jetzt starten/);
assert.match(page, /goToNextStep/);
assert.match(page, /hero-primary-cta/);
assert.match(page, /nextStep\.primaryLabel/);
assert.match(page, /Wiederholen/);
assert.match(page, /KI-Lernportal NIM/);
assert.match(page, /KI einfach lernen/);
assert.match(page, /Kurzer Selbstcheck/);
assert.match(page, /hero-today-card/);
assert.match(page, /quietCta=\{isFirstVisitSurface\}/);
assert.match(page, /isFirstVisitSurface/);
assert.match(page, /showDeferredDiscovery/);
assert.match(page, /Weitere Einstiege/);
assert.match(page, /hero-secondary-einstieg/);
assert.match(page, /hero-honesty-line/);
assert.match(page, /keine Live-KI/);
assert.match(page, /hero-secondary-backup/);
assert.match(page, /href="#fortschritt-sichern"/);
assert.match(page, /data-testid="footer-noindex-note"/);
assert.match(page, /Bewusst nicht für Suchmaschinen indexiert/);
assert.doesNotMatch(page, /60-Minuten-Pfad/);
assert.doesNotMatch(page, /hero-today-card-desktop/);
assert.doesNotMatch(page, /hero-today-card-mobile/);
assert.doesNotMatch(page, />Abruf</);
assert.match(page, /href="#coach"[^>]*>Regeln</);
assert.doesNotMatch(page, /href="#coach"[^>]*>Hilfe</);
assert.doesNotMatch(page, /href="#coach"[^>]*>Sicherheit</);
assert.match(page, /id="glossar"/);
assert.doesNotMatch(
  page,
  /\{\!simpleMode \? \(\s*<section\s+id="glossar"/,
);
assert.match(page, /onRevealWorld/);
assert.match(page, /REVEAL_WORLDS_EVENT/);

const todayCard = read(
  "apps/web/src/components/learning/TodayStartCard.tsx",
);
assert.match(todayCard, /quietCta/);
assert.match(todayCard, /today-quiet-hint/);
assert.match(todayCard, /ein Weg reicht/);

const anmelden = read("apps/web/src/app/anmelden/page.tsx");
assert.match(anmelden, /Staging \/ Test only/);
assert.match(anmelden, /kein Production-Konto/);

const impressum = read("apps/web/src/app/impressum/page.tsx");
assert.match(impressum, /data-testid="impressum-noindex-note"/);
assert.match(impressum, /robots\.txt Disallow/);
assert.match(impressum, /noindex/);

const robots = read("apps/web/src/app/robots.ts");
assert.match(robots, /disallow:\s*["']\/["']/i);

const layout = read("apps/web/src/app/layout.tsx");
assert.match(layout, /index:\s*false/);

const literacy = read("apps/web/src/data/literacy-path.ts");
assert.match(literacy, /60-Minuten KI-Kurzpfad/);
assert.match(literacy, /Zum Wiederholen/);

const literacyPanel = read(
  "apps/web/src/components/learning/LiteracyPathPanel.tsx",
);
assert.match(literacyPanel, /data-testid="literacy-path-reset"/);
assert.match(literacyPanel, /ResetProgressConfirm/);
assert.match(literacyPanel, /Kurzpfad wirklich zurücksetzen\?/);
assert.match(literacyPanel, /className="literacy-proof/);

const globalsCss = read("apps/web/src/app/globals.css");
assert.match(globalsCss, /@media print/);
assert.match(globalsCss, /\.literacy-proof/);

const onboarding = read("apps/web/src/components/learning/OnboardingRoutePanel.tsx");
assert.match(onboarding, /Drei Stationen — jederzeit wiederfinden/);
assert.match(onboarding, /Wiederholen starten/);

const helpTips = read("apps/web/src/data/help-tips.ts");
assert.match(helpTips, /Echte Hilfe: die kleinen/);
assert.match(helpTips, /„Regeln“ antippen/);
assert.match(helpTips, /„Schutz“ öffnet das Scam-Modul/);

const coach = read(
  "apps/web/src/components/learning/FirstStartCoach.tsx",
);
assert.match(coach, /Ein Weg reicht zum Start/);

console.log("PORTAL_CLARITY_CHROME_STATIC_OK=YES");
