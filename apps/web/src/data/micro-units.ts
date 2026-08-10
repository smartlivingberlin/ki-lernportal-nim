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
    .sort((a, b) => a.order - b.order);
}

export function microUnitForLesson(lessonId: string): MicroLearningUnitV2 | null {
  return allMicroUnits.find((unit) => unit.lessonId === lessonId) ?? null;
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
