import { ModelCard, DifficultyLevel, TrustLevel } from './types';

export const seedModelCards: ModelCard[] = [
  {
    id: 'm1',
    name: 'Mixtral 8x7B',
    type: 'Sprachmodell',
    useCase: 'Code & Text',
    difficulty: DifficultyLevel.Intermediate,
    privacyNote: 'Datenschutz-Hinweis: Demo, nicht geprüft',
    trustLevel: TrustLevel.High,
    displayAllowed: true,
    riskNote: 'Kann bei komplexen Fakten halluzinieren.'
  },
  {
    id: 'm2',
    name: 'Llama 3.1 8B',
    type: 'Sprachmodell',
    useCase: 'Chat & Hilfe',
    difficulty: DifficultyLevel.Beginner,
    privacyNote: 'Demo-Status',
    trustLevel: TrustLevel.Medium,
    displayAllowed: true
  },
  {
    id: 'm3',
    name: 'NV-Embed v2',
    type: 'Embedding',
    useCase: 'Wissenssuche',
    difficulty: DifficultyLevel.Advanced,
    privacyNote: 'Demo-Quelle',
    trustLevel: TrustLevel.Verified,
    displayAllowed: true
  },
  {
    id: 'm4',
    name: 'Llama-Reranker',
    type: 'Reranking',
    useCase: 'Suche-Optimierung',
    difficulty: DifficultyLevel.Advanced,
    privacyNote: 'Sicherheitsprüfung: später',
    trustLevel: TrustLevel.Medium,
    displayAllowed: true
  }
];
