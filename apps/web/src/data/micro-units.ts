import type { MicroLearningUnitV2 } from "./types";
import { microUnitsChatPrompting } from "./micro-units-chat-prompting";
import { microUnitsNoFear } from "./micro-units-no-fear";
import { microUnitsResearchTruth } from "./micro-units-research-truth";
import { microUnitsSafetyLaw } from "./micro-units-safety-law";
import { microUnitsWorkLife } from "./micro-units-work-life";

/** Kernweg-Welten — eagerly bundled (lesson-bound + deepen CTAs). */
const EAGER_WORLD_IDS = [
  "world-no-fear",
  "world-chat-prompting",
  "world-research-truth",
  "world-work-life",
  "world-safety-law",
] as const;

/** Später-Welten — loaded via dynamic import() and cached. */
const LAZY_WORLD_IDS = [
  "world-multimodal",
  "world-models",
  "world-agents",
  "world-vibe-coding",
  "world-advanced",
] as const;

type LazyWorldId = (typeof LAZY_WORLD_IDS)[number];

const eagerByWorld = new Map<string, MicroLearningUnitV2[]>([
  ["world-no-fear", microUnitsNoFear],
  ["world-chat-prompting", microUnitsChatPrompting],
  ["world-research-truth", microUnitsResearchTruth],
  ["world-work-life", microUnitsWorkLife],
  ["world-safety-law", microUnitsSafetyLaw],
]);

const eagerMicroUnits: MicroLearningUnitV2[] = [
  ...microUnitsNoFear,
  ...microUnitsChatPrompting,
  ...microUnitsResearchTruth,
  ...microUnitsWorkLife,
  ...microUnitsSafetyLaw,
];

/** Cached units for already-loaded lazy worlds. */
const lazyWorldCache = new Map<string, MicroLearningUnitV2[]>();

/** In-flight dynamic import promises (dedupe concurrent ensure calls). */
const lazyWorldPromises = new Map<string, Promise<MicroLearningUnitV2[]>>();

const lazyWorldLoaders: Record<
  LazyWorldId,
  () => Promise<MicroLearningUnitV2[]>
> = {
  "world-multimodal": () =>
    import("./micro-units-multimodal").then((m) => m.microUnitsMultimodal),
  "world-models": () =>
    import("./micro-units-models").then((m) => m.microUnitsModels),
  "world-agents": () =>
    import("./micro-units-agents").then((m) => m.microUnitsAgents),
  "world-vibe-coding": () =>
    import("./micro-units-vibe-coding").then((m) => m.microUnitsVibeCoding),
  "world-advanced": () =>
    import("./micro-units-advanced").then((m) => m.microUnitsAdvanced),
};

function isLazyWorldId(worldId: string): worldId is LazyWorldId {
  return (LAZY_WORLD_IDS as readonly string[]).includes(worldId);
}

function sortWorldUnits(units: MicroLearningUnitV2[]): MicroLearningUnitV2[] {
  return [...units].sort((a, b) => {
    // Kernweg (mit Lektion) vor Vertiefung — „Start hier“ trifft zuerst den Kern.
    const layerDelta =
      Number(microUnitLearningLayer(a) === "vertiefung") -
      Number(microUnitLearningLayer(b) === "vertiefung");
    if (layerDelta !== 0) return layerDelta;
    return a.order - b.order;
  });
}

function loadedMicroUnitsSnapshot(): MicroLearningUnitV2[] {
  const lazyUnits = [...lazyWorldCache.values()].flat();
  return lazyUnits.length > 0
    ? [...eagerMicroUnits, ...lazyUnits]
    : eagerMicroUnits;
}

/**
 * Sync snapshot: eager Kernweg units initially; grows as ensure/preload
 * cache Später worlds (ESM live binding via `let`).
 */
export let allMicroUnits: MicroLearningUnitV2[] = eagerMicroUnits;

function refreshAllMicroUnitsExport(): void {
  allMicroUnits = loadedMicroUnitsSnapshot();
}

/** Eager + currently cached lazy units (same as refreshed allMicroUnits). */
export function getLoadedMicroUnits(): MicroLearningUnitV2[] {
  return loadedMicroUnitsSnapshot();
}

export function microUnitsForWorld(worldId: string): MicroLearningUnitV2[] {
  const eager = eagerByWorld.get(worldId);
  if (eager) return sortWorldUnits(eager);
  const cached = lazyWorldCache.get(worldId);
  return cached ? sortWorldUnits(cached) : [];
}

/** Nächste offene Vertiefungs-Einheit (ohne Lektionsbindung).
 * Caller steuert Weltenreihenfolge — für Auto-CTA nur Kernweg-Welten übergeben.
 * Works on whatever is currently loaded for the given worldIds.
 */
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

/** Lesson-bound units live only in eager Kernweg worlds. */
export function microUnitForLesson(lessonId: string): MicroLearningUnitV2 | null {
  return eagerMicroUnits.find((unit) => unit.lessonId === lessonId) ?? null;
}

export function microUnitsForLesson(lessonId: string): MicroLearningUnitV2[] {
  return eagerMicroUnits.filter((unit) => unit.lessonId === lessonId);
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

export function isMicroUnitsWorldLoaded(worldId: string): boolean {
  if ((EAGER_WORLD_IDS as readonly string[]).includes(worldId)) return true;
  return lazyWorldCache.has(worldId);
}

export async function ensureMicroUnitsForWorld(
  worldId: string,
): Promise<MicroLearningUnitV2[]> {
  const eager = eagerByWorld.get(worldId);
  if (eager) return sortWorldUnits(eager);

  const cached = lazyWorldCache.get(worldId);
  if (cached) return sortWorldUnits(cached);

  if (!isLazyWorldId(worldId)) return [];

  let pending = lazyWorldPromises.get(worldId);
  if (!pending) {
    const loader = lazyWorldLoaders[worldId];
    pending = loader().then((units) => {
      lazyWorldCache.set(worldId, units);
      refreshAllMicroUnitsExport();
      return units;
    });
    lazyWorldPromises.set(worldId, pending);
  }

  const units = await pending;
  return sortWorldUnits(units);
}

/** Preload all Später (lazy) theme-world micro-unit bundles. */
export async function preloadSpaeterMicroUnits(): Promise<void> {
  await Promise.all(
    LAZY_WORLD_IDS.map((worldId) => ensureMicroUnitsForWorld(worldId)),
  );
}
