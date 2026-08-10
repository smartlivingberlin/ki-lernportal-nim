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
  Framework = 'Framework',
  Regulation = 'Verordnung',
  Documentation = 'Dokumentation',
  Guideline = 'Leitlinie',
  Website = 'Webseite'
}

export interface Source {
  id: string;
  name: string;
  publisher: string;
  url: string;
  sourceType: SourceType;
  reviewStatus: ReviewStatus;
  approvalStatus: ApprovalStatus;
  trustLevel: TrustLevel;
  lastReviewed: string;
  publicDisplayAllowed: boolean;
  description?: string;
}

export interface LessonPractice {
  task: string;
  checkQuestions: [string, string, string];
  hint: string;
  sampleAnswer: string;
  selfCheck: [string, string, string];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content?: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  order: number;
  sourceIds: string[];
  reviewStatus: ReviewStatus;
  lastReviewed: string;
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

export type ModelCapability =
  | "chat"
  | "reasoning"
  | "vision"
  | "image"
  | "coding"
  | "search-rag"
  | "local-open";

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
  plainPurpose: string;
  strengths: string[];
  limits: string[];
  capabilities: ModelCapability[];
  costHint: string;
  officialSourceName: string;
  officialSourceUrl: string;
  lastChecked: string;
}

export enum ResourceType {
  Course = 'Kurs',
  Platform = 'Lernangebot',
  Official = 'Offizielle Quelle',
  ToolHelp = 'Hilfeseite',
  Framework = 'Kompetenzrahmen',
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

/** Content Schema v2 — Themenwelten und interaktive Lernbausteine */

export type AudienceLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ThemeWorldStatus = "active" | "planned" | "locked";

export type ThemeWorldAccent = "teal" | "coral";

export type ConfidenceLevel = "sure" | "unsure" | "unclear";

export interface ThemeWorld {
  id: string;
  title: string;
  shortLabel: string;
  goalPrompt: string;
  description: string;
  audienceLevel: AudienceLevel;
  estimatedUnits: number;
  status: ThemeWorldStatus;
  accent: ThemeWorldAccent;
  starterLessonId: string | null;
  learningOutcomes: string[];
}

export interface LearningMethod {
  id: string;
  name: string;
  plainName: string;
  summary: string;
  whyItHelps: string;
  howWeUseIt: string;
  interactionHint: string;
}

export interface ChallengeOption {
  id: string;
  label: string;
  feedback: string;
  isGood: boolean;
}

export interface InteractiveChallenge {
  id: string;
  worldId: string;
  lessonId: string | null;
  title: string;
  plainIntro: string;
  prompt: string;
  options: ChallengeOption[];
  teachBackPrompt: string;
  methodIds: string[];
  scenarioDomain?: "alltag" | "beruf" | "sicherheit" | "grundlagen";
}

/**
 * Micro-Einheit nach Content Schema v2.
 */
export interface MicroLearningUnitV2 {
  id: string;
  worldId: string;
  lessonId: string | null;
  order: number;
  title: string;
  whyUseful: string;
  oneSentence: string;
  everydayExample: string;
  steps: string[];
  practiceTask: string;
  samplePath: string;
  whyItWorks: string;
  commonMistake: string;
  safetyNote: string;
  retrievalQuestions: string[];
  teachBackPrompt: string;
  sourceIds: string[];
  lastReviewed: string;
  estimatedMinutes: number;
  methodIds: string[];
}

