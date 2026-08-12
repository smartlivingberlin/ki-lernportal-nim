/**
 * Kanonischer „Nächster Schritt“-Vertrag.
 *
 * Eine Priorität für Heute-Karte, Selbstcheck-Ergebnis, Kurzpfad und Seitenleiste:
 * Einstieg (Selbstcheck) → Kurzpfad-Station → Wiederholen → Lektion → Vertiefen.
 * Themenwelten sind Vertiefung, kein paralleler Erst-Einstieg.
 */

import { literacyStations, type LiteracyStation } from "./literacy-path";
import type { Lesson } from "./types";

export type NextStepKind =
  | "self-check"
  | "literacy"
  | "review"
  | "lesson"
  | "deepen"
  | "complete";

export type NextStepLayer = "core" | "deepen";

export type NextStep = {
  kind: NextStepKind;
  layer: NextStepLayer;
  /** Einheitliche Eyebrow-Zeile in allen Oberflächen */
  eyebrow: "Nächster Schritt";
  title: string;
  reason: string;
  primaryLabel: string;
  href: string;
  lessonId: string | null;
  /** Optionale Vertiefungs-Micro nach Kernweg */
  microUnitId: string | null;
  worldId: string | null;
  /** Kurzlabel für Mobile / kompakte Chips */
  chipLabel: string;
};

export type NextStepInput = {
  completedLiteracyStationIds: readonly string[];
  dueReviews: number;
  nextOpenLesson: Lesson | null;
  completedLessons: number;
  totalLessons: number;
  simpleMode: boolean;
  recommendedWorldTitle?: string | null;
  /** Nächste offene Vertiefungs-Micro (ohne Lektionsbindung), nach Kernweg. */
  nextDeepenMicroUnitId?: string | null;
  nextDeepenMicroTitle?: string | null;
  nextDeepenWorldId?: string | null;
};

/** In Einfacher Ansicht fehlen manche Anker — auf Kernpfad umbiegen. */
export function literacyStationForMode(
  station: LiteracyStation,
  simpleMode: boolean,
): LiteracyStation {
  if (!simpleMode) return station;

  if (station.id === "lit-basics") {
    return {
      ...station,
      href: "#pfad",
      actionLabel: "Zur Lektion im Pfad",
      summary: "Im Kernpfad eine Lektion öffnen — Themenwelten kommen später als Vertiefung.",
    };
  }
  if (station.id === "lit-prompt") {
    return {
      ...station,
      href: "#challenge",
      actionLabel: "Zur Lektions-Challenge",
      summary: "Kurz üben an der aktuellen Lektion. Die Prompt-Bibliothek erscheint bei „Mehr Bereichen“.",
    };
  }
  if (station.id === "lit-scenario") {
    return {
      ...station,
      href: "#challenge",
      actionLabel: "Situation an der Lektion üben",
      summary: "Extra-Szenarien sind in der Einfachen Ansicht ausgeblendet — die Lektions-Challenge reicht.",
    };
  }
  return station;
}

function nextLiteracyStation(
  completedIds: readonly string[],
  simpleMode: boolean,
): LiteracyStation | null {
  const raw =
    literacyStations.find((station) => !completedIds.includes(station.id)) ?? null;
  return raw ? literacyStationForMode(raw, simpleMode) : null;
}

/**
 * Reihenfolge (bewusst):
 * 1. Selbstcheck (Station 1)
 * 2. Nächste Kurzpfad-Station
 * 3. Fällige Wiederholung
 * 4. Nächste offene Lektion im 12er-Spine
 * 5. Vertiefen (Themenwelten) — nur außerhalb Simple Mode sinnvoll beworben
 * 6. Fertig
 */
export function resolveNextStep(input: NextStepInput): NextStep {
  const {
    completedLiteracyStationIds,
    dueReviews,
    nextOpenLesson,
    completedLessons,
    totalLessons,
    simpleMode,
    recommendedWorldTitle,
    nextDeepenMicroUnitId,
    nextDeepenMicroTitle,
    nextDeepenWorldId,
  } = input;

  const literacyNext = nextLiteracyStation(completedLiteracyStationIds, simpleMode);

  if (literacyNext?.id === "lit-selfcheck") {
    return {
      kind: "self-check",
      layer: "core",
      eyebrow: "Nächster Schritt",
      title: "Selbstcheck machen",
      reason: "Kurze Alltagsfragen — ohne Note. Danach weißt du, womit du starten solltest.",
      primaryLabel: "Zum Selbstcheck",
      href: "#selbstcheck",
      lessonId: null,
      microUnitId: null,
      worldId: null,
      chipLabel: "Selbstcheck",
    };
  }

  if (literacyNext) {
    return {
      kind: "literacy",
      layer: "core",
      eyebrow: "Nächster Schritt",
      title: literacyNext.title,
      reason: literacyNext.summary,
      primaryLabel: literacyNext.actionLabel,
      href: literacyNext.href,
      lessonId: null,
      microUnitId: null,
      worldId: null,
      chipLabel: `Station ${literacyNext.order}`,
    };
  }

  if (dueReviews > 0) {
    return {
      kind: "review",
      layer: "core",
      eyebrow: "Nächster Schritt",
      title: "Kurz wiederholen",
      reason: `${dueReviews} Übungskarte${dueReviews === 1 ? "" : "n"} sind fällig — aktiv üben statt nur lesen.`,
      primaryLabel:
        dueReviews === 1 ? "1 Karte wiederholen" : `${dueReviews} Karten wiederholen`,
      href: "#wiederholen",
      lessonId: null,
      microUnitId: null,
      worldId: null,
      chipLabel: "Wiederholen",
    };
  }

  if (nextOpenLesson) {
    return {
      kind: "lesson",
      layer: "core",
      eyebrow: "Nächster Schritt",
      title: nextOpenLesson.title,
      reason: `Lektion ${nextOpenLesson.order} im Kernpfad · ${nextOpenLesson.estimatedMinutes} Min. · ${completedLessons}/${totalLessons || 12} erledigt.`,
      primaryLabel: "Heute hier weitermachen",
      href: `#lesson-${nextOpenLesson.id}`,
      lessonId: nextOpenLesson.id,
      microUnitId: null,
      worldId: null,
      chipLabel: `Lektion ${nextOpenLesson.order}`,
    };
  }

  if (!simpleMode) {
    if (nextDeepenMicroUnitId && nextDeepenMicroTitle) {
      const worldHint = recommendedWorldTitle
        ? ` in „${recommendedWorldTitle}“`
        : "";
      return {
        kind: "deepen",
        layer: "deepen",
        eyebrow: "Nächster Schritt",
        title: `Optional: ${nextDeepenMicroTitle}`,
        reason: `Der Kernpfad ist lokal erledigt. Als Nächstes kannst du optional die Vertiefung „${nextDeepenMicroTitle}“${worldHint} öffnen — ohne Druck.`,
        primaryLabel: `Vertiefung öffnen: ${nextDeepenMicroTitle}`,
        href: "#themenwelt",
        lessonId: null,
        microUnitId: nextDeepenMicroUnitId,
        worldId: nextDeepenWorldId ?? null,
        chipLabel: "Vertiefen",
      };
    }

    return {
      kind: "deepen",
      layer: "deepen",
      eyebrow: "Nächster Schritt",
      title: recommendedWorldTitle
        ? `Vertiefen: ${recommendedWorldTitle}`
        : "Themenwelt vertiefen",
      reason:
        "Der Kernpfad ist lokal erledigt. Wähle eine Themenwelt für kurze Micro-Einheiten — optional, ohne Druck.",
      primaryLabel: "Zu den Themenwelten",
      href: "#ziele",
      lessonId: null,
      microUnitId: null,
      worldId: nextDeepenWorldId ?? null,
      chipLabel: "Vertiefen",
    };
  }

  return {
    kind: "complete",
    layer: "core",
    eyebrow: "Nächster Schritt",
    title: "Kernweg erledigt",
    reason:
      "Lektionen und Kurzpfad sind lokal durch. Schalte die Einfache Ansicht aus, wenn du Themenwelten und Werkzeuge sehen möchtest.",
    primaryLabel: "Mehr Bereiche einblenden",
    href: "#ziele",
    lessonId: null,
    microUnitId: null,
    worldId: null,
    chipLabel: "Fertig",
  };
}
