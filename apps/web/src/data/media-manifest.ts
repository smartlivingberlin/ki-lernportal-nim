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
  {
    id: "vid-ki-patterns-pilot",
    kind: "video",
    phase: "m2",
    title: "Kurzclip: Muster, keine Gedanken",
    alt: "Kurzes Erklärvideo mit Texttafeln: KI erkennt Muster, denkt nicht wie ein Mensch, Antworten prüfen.",
    purpose:
      "Ergänzt Lektion 1 in unter 10 Sekunden — ohne Live-KI, mit Untertiteln.",
    src: "/media/videos/ki-patterns-pilot.mp4",
    posterSrc: "/media/posters/ki-patterns-pilot.jpg",
    captionsVtt: "/media/videos/ki-patterns-pilot.vtt",
    license: "AllRights-Project",
    licenseNote:
      "Original FFmpeg-Clip für KI-Lernportal NIM (2026). Stumm + VTT; kein Drittanbieter-SaaS.",
    synthetic: false,
    lastReviewed: "2026-08-16",
  },
  {
    id: "mascot-guide-svg",
    kind: "mascot_state",
    phase: "m3",
    title: "Geführter Begleiter",
    alt: "Einfache Kreisfigur als Begleiter im Einstiegs-Coach — keine Live-KI.",
    purpose:
      "Visuelle Führung im 3-Minuten-Coach mit festen Poses (idle/point/celebrate).",
    src: "component:GuideMascot",
    license: "AllRights-Project",
    licenseNote:
      "Original SVG für KI-Lernportal NIM (2026). Scripted only — kein Chat, kein Avatar-Streaming.",
    synthetic: false,
    lastReviewed: "2026-08-16",
  },
  {
    id: "aud-ki-patterns-pilot",
    kind: "audio",
    phase: "m4",
    title: "Hörclip: Muster, keine Gedanken",
    alt: "Kurze Hörfassung: KI erkennt Muster, denkt nicht wie ein Mensch, Antworten prüfen.",
    purpose:
      "Barrierearme Ergänzung zu Lektion 1 — lokal vorproduzierte Piper-Stimme, kein Laufzeit-TTS.",
    src: "/media/audio/ki-patterns-pilot.m4a",
    license: "AllRights-Project",
    licenseNote:
      "Skript Original NIM (2026); Stimme Piper de_DE-thorsten-low (Voice-Modell rhasspy/piper-voices). Synthetisch gekennzeichnet.",
    synthetic: true,
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

export function splitMediaByKind(assets: MediaAsset[]) {
  return {
    illustrations: assets.filter((asset) => asset.kind === "illustration"),
    videos: assets.filter((asset) => asset.kind === "video"),
    audio: assets.filter((asset) => asset.kind === "audio"),
  };
}

/** Visible transcript for the M4 pilot (must match rendered audio). */
export const PILOT_AUDIO_TRANSCRIPT =
  "KI erkennt Muster. Sie denkt nicht wie ein Mensch. Prüfe Antworten trotzdem selbst.";
