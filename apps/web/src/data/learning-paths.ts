import { LearningPath, DifficultyLevel } from './types';
import { seedLessons } from './lessons';

export const seedLearningPaths: LearningPath[] = [
  {
    id: 'path-beginner',
    title: 'KI-Start für absolute Anfänger',
    description: 'Der perfekte Einstieg: Was ist KI und wie nutze ich sie sicher?',
    difficulty: DifficultyLevel.Beginner,
    lessons: seedLessons.filter(l => l.pathId === 'path-beginner'),
    status: 'active'
  },
  {
    id: 'path-daily-life',
    title: 'KI sicher im Alltag nutzen',
    description: 'Praktische Helfer für E-Mails, Planung und Recherche.',
    difficulty: DifficultyLevel.Beginner,
    lessons: [],
    status: 'planned'
  },
  {
    id: 'path-prompting',
    title: 'Prompting Grundlagen',
    description: 'Bessere Ergebnisse durch präzise Anweisungen.',
    difficulty: DifficultyLevel.Beginner,
    lessons: [],
    status: 'planned'
  },
  {
    id: 'path-sources-rag',
    title: 'Quellen prüfen und Vertrauen aufbauen',
    description: 'Wie du KI-Antworten mit Quellen besser einordnest.',
    difficulty: DifficultyLevel.Intermediate,
    lessons: [],
    status: 'locked'
  },
  {
    id: 'path-business',
    title: 'KI in Beruf und Selbstständigkeit',
    description: 'Produktivität steigern mit KI-Assistenten.',
    difficulty: DifficultyLevel.Intermediate,
    lessons: [],
    status: 'locked'
  },
  {
    id: 'path-admin',
    title: 'Admin & Content Review',
    description: 'Hinter den Kulissen: Inhalte prüfen und verwalten.',
    difficulty: DifficultyLevel.Advanced,
    lessons: [],
    status: 'locked'
  }
];

/**
 * Brücken in den bestehenden 12er-Kernweg — ohne neue Lesson-IDs
 * (Integrity-Gate: genau 12 Lektionen, alle path-beginner).
 */
export type PlannedPathBridge = {
  pathId: 'path-daily-life' | 'path-prompting';
  badge: string;
  whyNow: string;
  laterNote: string;
  bridgeLessonIds: readonly string[];
  bridgeWorldId: string;
  worldCtaLabel: string;
};

export const plannedPathBridges: readonly PlannedPathBridge[] = [
  {
    pathId: 'path-daily-life',
    badge: 'Geplant · Brücke bereit',
    whyNow:
      'Alltag heißt: E-Mails klarer machen und KI sinnvoll im Tagesablauf nutzen — ohne Blindvertrauen.',
    laterNote:
      'Eigene Alltag-Lektionen folgen später. Bis dahin startest du über den Kernweg und die Themenwelt „Arbeit & Alltag“.',
    bridgeLessonIds: ['l6', 'l11'],
    bridgeWorldId: 'world-work-life',
    worldCtaLabel: 'Themenwelt Arbeit & Alltag',
  },
  {
    pathId: 'path-prompting',
    badge: 'Geplant · Brücke bereit',
    whyNow:
      'Gute Prompts sind klare Aufträge: Rolle, Ziel, Format, Grenzen — dann prüfst du das Ergebnis.',
    laterNote:
      'Ein eigener Prompting-Pfad kommt später. Bis dahin: Lektionen 4–5 und die Themenwelt „Chat & Prompting“.',
    bridgeLessonIds: ['l4', 'l5'],
    bridgeWorldId: 'world-chat-prompting',
    worldCtaLabel: 'Themenwelt Chat & Prompting',
  },
] as const;

export function plannedPathById(pathId: string): LearningPath | undefined {
  return seedLearningPaths.find((path) => path.id === pathId);
}
