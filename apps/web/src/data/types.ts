export enum ReviewStatus {
  Draft = 'draft',
  NeedsReview = 'needs_review',
  SourceAttached = 'source_attached',
  Approved = 'approved',
  Published = 'published'
}

export enum ApprovalStatus {
  Pending = 'pending',
  ReviewRequired = 'review_required',
  Approved = 'approved',
  Rejected = 'rejected'
}

export enum DifficultyLevel {
  Beginner = 'Einsteiger',
  Intermediate = 'Fortgeschritten',
  Advanced = 'Experte'
}

export enum TrustLevel {
  Low = 'Niedrig',
  Medium = 'Mittel',
  High = 'Hoch',
  Verified = 'Hochwertige Quelle'
}

export enum SourceType {
  Framework = 'Kompetenzrahmen',
  Regulation = 'Verordnung',
  Documentation = 'Dokumentation',
  Guideline = 'Leitlinie',
  Website = 'Webseite'
}

export interface Source {
  id: string;
  name: string;
  url: string;
  sourceType: SourceType;
  reviewStatus: ReviewStatus;
  approvalStatus: ApprovalStatus;
  trustLevel: TrustLevel;
  description?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content?: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  order: number;
  pathId: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  lessons: Lesson[];
  isPremium?: boolean;
  status: 'active' | 'planned' | 'locked';
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  priority: 1 | 2 | 3;
  category?: string;
}

export interface ModelCard {
  id: string;
  name: string;
  type: string;
  useCase: string;
  difficulty: DifficultyLevel;
  privacyNote: string;
  trustLevel: TrustLevel;
  displayAllowed: boolean;
  riskNote?: string;
}

export enum ResourceType {
  Course = 'Kurs',
  Platform = 'Lernangebot',
  Official = 'Offizielle Quelle',
  ToolHelp = 'Hilfeseite',
  Framework = 'Framework',
  Technical = 'Technik'
}

export enum CostStatus {
  Free = 'Kostenlos',
  Freemium = 'Freemium',
  Paid = 'Kostenpflichtig',
  Unknown = 'Unklar'
}

export enum AccountRequirement {
  No = 'Nein',
  Optional = 'Optional',
  Yes = 'Ja',
  Unknown = 'Unklar'
}

export interface ResourceCard {
  id: string;
  title: string;
  provider: string;
  url: string;
  resourceType: ResourceType;
  languages: string[];
  costStatus: CostStatus;
  accountRequired: AccountRequirement;
  targetAudience: string;
  difficulty: DifficultyLevel;
  benefit: string;
  riskNote?: string;
  privacyNote: string;
  reviewStatus: ReviewStatus;
  trustLevel: TrustLevel;
  lastReviewed: string;
  tags: string[];
}

