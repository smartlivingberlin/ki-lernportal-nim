import type { MicroLearningUnitV2 } from "./types";
import { microUnitsAdvanced } from "./micro-units-advanced";
import { microUnitsAgents } from "./micro-units-agents";
import { microUnitsChatPrompting } from "./micro-units-chat-prompting";
import { microUnitsModels } from "./micro-units-models";
import { microUnitsMultimodal } from "./micro-units-multimodal";
import { microUnitsNoFear } from "./micro-units-no-fear";
import { microUnitsResearchTruth } from "./micro-units-research-truth";
import { microUnitsSafetyLaw } from "./micro-units-safety-law";
import { microUnitsVibeCoding } from "./micro-units-vibe-coding";
import { microUnitsWorkLife } from "./micro-units-work-life";

export const allMicroUnits: MicroLearningUnitV2[] = [
  ...microUnitsNoFear,
  ...microUnitsChatPrompting,
  ...microUnitsResearchTruth,
  ...microUnitsWorkLife,
  ...microUnitsSafetyLaw,
  ...microUnitsMultimodal,
  ...microUnitsModels,
  ...microUnitsAgents,
  ...microUnitsVibeCoding,
  ...microUnitsAdvanced,
];

export function microUnitsForWorld(worldId: string): MicroLearningUnitV2[] {
  return allMicroUnits
    .filter((unit) => unit.worldId === worldId)
    .sort((a, b) => {
      // Kernweg (mit Lektion) vor Vertiefung — „Start hier“ trifft zuerst den Kern.
      const layerDelta =
        Number(microUnitLearningLayer(a) === "vertiefung") -
        Number(microUnitLearningLayer(b) === "vertiefung");
      if (layerDelta !== 0) return layerDelta;
      return a.order - b.order;
    });
}

/** Nächste offene Vertiefungs-Einheit (ohne Lektionsbindung), Welten in Anzeigereihenfolge. */
export function nextOpenDeepenMicroUnit(options: {
  worldIds: readonly string[];
  completedMicroUnitIds: readonly string[];
}): MicroLearningUnitV2 | null {
  const completed = new Set(options.completedMicroUnitIds);
  for (const worldId of options.worldIds) {
    for (const unit of microUnitsForWorld(worldId)) {
      if (unit.lessonId) continue;
      if (!completed.has(unit.id)) return unit;
    }
  }
  return null;
}

export function microUnitForLesson(lessonId: string): MicroLearningUnitV2 | null {
  return allMicroUnits.find((unit) => unit.lessonId === lessonId) ?? null;
}

export function microUnitsForLesson(lessonId: string): MicroLearningUnitV2[] {
  return allMicroUnits.filter((unit) => unit.lessonId === lessonId);
}

/** Kernweg = an eine Klassik-Lektion gebunden; Vertiefung = eigenständig. */
export function microUnitLearningLayer(
  unit: MicroLearningUnitV2,
): "kernweg" | "vertiefung" {
  return unit.lessonId ? "kernweg" : "vertiefung";
}

export function microUnitLayerLabel(unit: MicroLearningUnitV2): string {
  return microUnitLearningLayer(unit) === "kernweg"
    ? "Kernweg"
    : "Vertiefung";
}

export function isMicroUnitCompleted(options: {
  unit: MicroLearningUnitV2;
  completedLessonIds: readonly string[];
  completedMicroUnitIds: readonly string[];
}): boolean {
  const { unit, completedLessonIds, completedMicroUnitIds } = options;
  if (unit.lessonId) {
    return completedLessonIds.includes(unit.lessonId);
  }
  return completedMicroUnitIds.includes(unit.id);
}

export const worldsWithMicroUnits = [
  "world-no-fear",
  "world-chat-prompting",
  "world-research-truth",
  "world-work-life",
  "world-safety-law",
  "world-multimodal",
  "world-models",
  "world-agents",
  "world-vibe-coding",
  "world-advanced",
] as const;

export function worldHasMicroUnits(worldId: string): boolean {
  return worldsWithMicroUnits.includes(
    worldId as (typeof worldsWithMicroUnits)[number],
  );
}
