import { Lesson, DifficultyLevel } from './types';

export const seedLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Was ist KI?',
    description: 'Eine einfache Einführung in die Welt der künstlichen Intelligenz.',
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 1,
    pathId: 'path-beginner'
  },
  {
    id: 'l2',
    title: 'Was kann KI gut und was nicht?',
    description: 'Stärken und Schwächen von KI-Systemen verstehen.',
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 2,
    pathId: 'path-beginner'
  },
  {
    id: 'l3',
    title: 'Was ist ein Prompt?',
    description: 'Die Sprache der KI lernen: Befehle richtig formulieren.',
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 3,
    pathId: 'path-beginner'
  },
  {
    id: 'l4',
    title: 'Gute Prompts schreiben',
    description: 'Praktische Tipps für bessere Ergebnisse.',
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 10,
    order: 4,
    pathId: 'path-beginner'
  },
  {
    id: 'l5',
    title: 'Halluzinationen erkennen',
    description: 'Warum man KI-Antworten immer prüfen sollte.',
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 5,
    pathId: 'path-beginner'
  },
  {
    id: 'l6',
    title: 'Warum Quellen wichtig sind',
    description: 'Fakten-Check und Transparenz bei KI-Inhalten.',
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 6,
    pathId: 'path-beginner'
  },
  {
    id: 'l7',
    title: 'Datenschutz im Prompt',
    description: 'Sicherer Umgang mit persönlichen Daten.',
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 7,
    pathId: 'path-beginner'
  }
];
