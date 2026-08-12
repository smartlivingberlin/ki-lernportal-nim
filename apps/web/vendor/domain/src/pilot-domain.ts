/**
 * Canonical vocabulary and pure business rules for the first pilot.
 *
 * This module has no persistence, transport, framework, environment or
 * provider responsibilities.
 */

export const USER_STATUSES = [
  "active",
  "suspended",
  "pending_deletion",
  "deidentified",
] as const;

export type UserStatus = (typeof USER_STATUSES)[number];

export const PILOT_COHORT_STATUSES = [
  "draft",
  "active",
  "closed",
  "archived",
] as const;

export type PilotCohortStatus =
  (typeof PILOT_COHORT_STATUSES)[number];

export const PILOT_MEMBERSHIP_STATUSES = [
  "active",
  "suspended",
  "ended",
] as const;

export type PilotMembershipStatus =
  (typeof PILOT_MEMBERSHIP_STATUSES)[number];

export const LESSON_PROGRESS_STATUSES = [
  "in_progress",
  "completed",
] as const;

export type LessonProgressStatus =
  (typeof LESSON_PROGRESS_STATUSES)[number];

export const ASSESSMENT_RUN_STATUSES = [
  "in_progress",
  "completed",
  "abandoned",
] as const;

export type AssessmentRunStatus =
  (typeof ASSESSMENT_RUN_STATUSES)[number];

export const PRIVACY_REQUEST_STATUSES = [
  "requested",
  "processing",
  "completed",
  "failed",
] as const;

export type PrivacyRequestStatus =
  (typeof PRIVACY_REQUEST_STATUSES)[number];

export const PILOT_ROLES = [
  "learner",
  "pilot_admin",
] as const;

export type PilotRole = (typeof PILOT_ROLES)[number];

export const PROGRESS_SOURCES = [
  "pilot_runtime",
  "local_import",
] as const;

export type ProgressSource =
  (typeof PROGRESS_SOURCES)[number];

export const ASSESSMENT_KINDS = [
  "baseline",
  "final",
] as const;

export type AssessmentKind =
  (typeof ASSESSMENT_KINDS)[number];

export const FEEDBACK_KINDS = [
  "clarity",
  "confidence",
  "content_problem",
  "technical_problem",
] as const;

export type FeedbackKind =
  (typeof FEEDBACK_KINDS)[number];

export const LEARNING_EVENT_TYPES = [
  "learning_path_started",
  "lesson_started",
  "lesson_completed",
  "lesson_reopened",
  "practice_submitted",
  "assessment_started",
  "assessment_completed",
  "help_opened",
] as const;

export type LearningEventType =
  (typeof LEARNING_EVENT_TYPES)[number];

export const DOMAIN_RULE_VIOLATION_KINDS = [
  "invalid_status_transition",
  "terminal_state_transition",
  "privacy_retry_not_authorized",
  "assessment_run_closed",
  "assessment_response_mutation",
  "assessment_finalization_forbidden",
] as const;

export type DomainRuleViolationKind =
  (typeof DOMAIN_RULE_VIOLATION_KINDS)[number];

function isControlledValue<TValue extends string>(
  values: readonly TValue[],
  candidate: unknown,
): candidate is TValue {
  return (
    typeof candidate === "string" &&
    values.includes(candidate as TValue)
  );
}

export function isUserStatus(
  candidate: unknown,
): candidate is UserStatus {
  return isControlledValue(USER_STATUSES, candidate);
}

export function isPilotCohortStatus(
  candidate: unknown,
): candidate is PilotCohortStatus {
  return isControlledValue(PILOT_COHORT_STATUSES, candidate);
}

export function isPilotMembershipStatus(
  candidate: unknown,
): candidate is PilotMembershipStatus {
  return isControlledValue(PILOT_MEMBERSHIP_STATUSES, candidate);
}

export function isLessonProgressStatus(
  candidate: unknown,
): candidate is LessonProgressStatus {
  return isControlledValue(LESSON_PROGRESS_STATUSES, candidate);
}

export function isAssessmentRunStatus(
  candidate: unknown,
): candidate is AssessmentRunStatus {
  return isControlledValue(ASSESSMENT_RUN_STATUSES, candidate);
}

export function isPrivacyRequestStatus(
  candidate: unknown,
): candidate is PrivacyRequestStatus {
  return isControlledValue(PRIVACY_REQUEST_STATUSES, candidate);
}

export function isPilotRole(
  candidate: unknown,
): candidate is PilotRole {
  return isControlledValue(PILOT_ROLES, candidate);
}

export function isProgressSource(
  candidate: unknown,
): candidate is ProgressSource {
  return isControlledValue(PROGRESS_SOURCES, candidate);
}

export function isAssessmentKind(
  candidate: unknown,
): candidate is AssessmentKind {
  return isControlledValue(ASSESSMENT_KINDS, candidate);
}

export function isFeedbackKind(
  candidate: unknown,
): candidate is FeedbackKind {
  return isControlledValue(FEEDBACK_KINDS, candidate);
}

export function isLearningEventType(
  candidate: unknown,
): candidate is LearningEventType {
  return isControlledValue(LEARNING_EVENT_TYPES, candidate);
}

export function isDomainRuleViolationKind(
  candidate: unknown,
): candidate is DomainRuleViolationKind {
  return isControlledValue(
    DOMAIN_RULE_VIOLATION_KINDS,
    candidate,
  );
}

const USER_TRANSITIONS: Readonly<
  Record<UserStatus, readonly UserStatus[]>
> = {
  active: ["suspended", "pending_deletion"],
  suspended: ["active", "pending_deletion"],
  pending_deletion: ["deidentified"],
  deidentified: [],
};

const PILOT_COHORT_TRANSITIONS: Readonly<
  Record<PilotCohortStatus, readonly PilotCohortStatus[]>
> = {
  draft: ["active", "archived"],
  active: ["closed"],
  closed: ["archived"],
  archived: [],
};

const PILOT_MEMBERSHIP_TRANSITIONS: Readonly<
  Record<
    PilotMembershipStatus,
    readonly PilotMembershipStatus[]
  >
> = {
  active: ["suspended", "ended"],
  suspended: ["active", "ended"],
  ended: [],
};

const ASSESSMENT_RUN_TRANSITIONS: Readonly<
  Record<AssessmentRunStatus, readonly AssessmentRunStatus[]>
> = {
  in_progress: ["completed", "abandoned"],
  completed: [],
  abandoned: [],
};

const PRIVACY_REQUEST_TRANSITIONS: Readonly<
  Record<PrivacyRequestStatus, readonly PrivacyRequestStatus[]>
> = {
  requested: ["processing", "failed"],
  processing: ["completed", "failed"],
  completed: [],
  failed: ["processing"],
};

function transitionIsListed<TStatus extends string>(
  transitions: Readonly<
    Record<TStatus, readonly TStatus[]>
  >,
  from: TStatus,
  to: TStatus,
): boolean {
  return transitions[from].includes(to);
}

export function canTransitionUserStatus(
  from: UserStatus,
  to: UserStatus,
): boolean {
  return transitionIsListed(USER_TRANSITIONS, from, to);
}

export function canTransitionPilotCohortStatus(
  from: PilotCohortStatus,
  to: PilotCohortStatus,
): boolean {
  return transitionIsListed(
    PILOT_COHORT_TRANSITIONS,
    from,
    to,
  );
}

export function canTransitionPilotMembershipStatus(
  from: PilotMembershipStatus,
  to: PilotMembershipStatus,
): boolean {
  return transitionIsListed(
    PILOT_MEMBERSHIP_TRANSITIONS,
    from,
    to,
  );
}

export function canTransitionAssessmentRunStatus(
  from: AssessmentRunStatus,
  to: AssessmentRunStatus,
): boolean {
  return transitionIsListed(
    ASSESSMENT_RUN_TRANSITIONS,
    from,
    to,
  );
}

export interface PrivacyRequestRetryContext {
  readonly retryAuthorized: boolean;
  readonly requestTypeUnchanged: boolean;
  readonly errorHistoryRetained: boolean;
}

export function canTransitionPrivacyRequestStatus(
  from: PrivacyRequestStatus,
  to: PrivacyRequestStatus,
  retryContext?: PrivacyRequestRetryContext,
): boolean {
  if (
    !transitionIsListed(
      PRIVACY_REQUEST_TRANSITIONS,
      from,
      to,
    )
  ) {
    return false;
  }

  if (from !== "failed" || to !== "processing") {
    return true;
  }

  return (
    retryContext?.retryAuthorized === true &&
    retryContext.requestTypeUnchanged === true &&
    retryContext.errorHistoryRetained === true
  );
}

export function isTerminalUserStatus(
  status: UserStatus,
): boolean {
  return status === "deidentified";
}

export function isTerminalPilotCohortStatus(
  status: PilotCohortStatus,
): boolean {
  return status === "archived";
}

export function isTerminalPilotMembershipStatus(
  status: PilotMembershipStatus,
): boolean {
  return status === "ended";
}

export function isTerminalAssessmentRunStatus(
  status: AssessmentRunStatus,
): boolean {
  return status === "completed" || status === "abandoned";
}

export function isTerminalPrivacyRequestStatus(
  status: PrivacyRequestStatus,
): boolean {
  return status === "completed";
}

export function canAcceptAssessmentResponse(
  runStatus: AssessmentRunStatus,
): boolean {
  return runStatus === "in_progress";
}

export interface AssessmentResponseFinalizationContext {
  readonly runFrom: AssessmentRunStatus;
  readonly runTo: AssessmentRunStatus;
  readonly previousIsFinal: boolean;
  readonly nextIsFinal: boolean;
  readonly responseContentUnchanged: boolean;
  readonly responseSequenceUnchanged: boolean;
}

export function canFinalizeAssessmentResponse(
  context: AssessmentResponseFinalizationContext,
): boolean {
  return (
    context.runFrom === "in_progress" &&
    context.runTo === "completed" &&
    canTransitionAssessmentRunStatus(
      context.runFrom,
      context.runTo,
    ) &&
    context.previousIsFinal === false &&
    context.nextIsFinal === true &&
    context.responseContentUnchanged &&
    context.responseSequenceUnchanged
  );
}
