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
