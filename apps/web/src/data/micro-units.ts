import type { MicroLearningUnitV2 } from "./types";
import { microUnitsChatPrompting } from "./micro-units-chat-prompting";
import { microUnitsNoFear } from "./micro-units-no-fear";
import { microUnitsWorkLife } from "./micro-units-work-life";

export const allMicroUnits: MicroLearningUnitV2[] = [
  ...microUnitsNoFear,
  ...microUnitsChatPrompting,
  ...microUnitsWorkLife,
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
  "world-work-life",
] as const;

export function worldHasMicroUnits(worldId: string): boolean {
  return worldsWithMicroUnits.includes(
    worldId as (typeof worldsWithMicroUnits)[number],
  );
}
