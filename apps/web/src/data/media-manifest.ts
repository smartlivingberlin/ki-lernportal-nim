import type { MediaAsset } from "./types";

/**
 * Curated media ledger — every shipped visual/audio/video asset must be listed.
 * Licenses are project-controlled; prefer original SVG or CC0/MIT with notes.
 */
export const mediaManifest: MediaAsset[] = [
  {
    id: "ill-ki-patterns",
    kind: "illustration",
    phase: "m1",
    title: "Muster und Antworten",
    alt: "Abstrakte Illustration: aus verbundenen Punkten entstehen einfache Antwortkarten — Sinnbild für Mustererkennung, nicht für menschliches Denken.",
    purpose: "Visualisiert für Einsteiger, dass KI Muster berechnet statt zu verstehen.",
    src: "component:KiPatternsIllustration",
    license: "AllRights-Project",
    licenseNote:
      "Original SVG für KI-Lernportal NIM (2026). Nutzung nur im Projektkontext; keine Dritt-Stockfoto-Lizenz nötig.",
    synthetic: false,
    lastReviewed: "2026-08-16",
  },
  {
    id: "ill-ki-check",
    kind: "illustration",
    phase: "m1",
    title: "Prüfen statt glauben",
    alt: "Abstrakte Illustration: eine Antwortkarte neben einer Checkliste mit Häkchen — Sinnbild für menschliches Gegenprüfen.",
    purpose: "Erinnert daran, KI-Ausgaben zu prüfen statt blind zu übernehmen.",
    src: "component:KiCheckIllustration",
    license: "AllRights-Project",
    licenseNote:
      "Original SVG für KI-Lernportal NIM (2026). Nutzung nur im Projektkontext.",
    synthetic: false,
    lastReviewed: "2026-08-16",
  },
];

export function mediaById(id: string): MediaAsset | undefined {
  return mediaManifest.find((asset) => asset.id === id);
}

export function mediaForIds(ids: string[] | undefined): MediaAsset[] {
  if (!ids?.length) return [];
  return ids
    .map((id) => mediaById(id))
    .filter((asset): asset is MediaAsset => Boolean(asset));
}
