import {
  ASSESSMENT_KINDS,
  ASSESSMENT_RUN_STATUSES,
  DOMAIN_RULE_VIOLATION_KINDS,
  FEEDBACK_KINDS,
  LEARNING_EVENT_TYPES,
  LESSON_PROGRESS_STATUSES,
  PILOT_COHORT_STATUSES,
  PILOT_MEMBERSHIP_STATUSES,
  PILOT_ROLES,
  PRIVACY_REQUEST_STATUSES,
  PROGRESS_SOURCES,
  USER_STATUSES,
  canAcceptAssessmentResponse,
  canFinalizeAssessmentResponse,
  canTransitionAssessmentRunStatus,
  canTransitionPilotCohortStatus,
  canTransitionPilotMembershipStatus,
  canTransitionPrivacyRequestStatus,
  canTransitionUserStatus,
  isAssessmentKind,
  isAssessmentRunStatus,
  isDomainRuleViolationKind,
  isFeedbackKind,
  isLearningEventType,
  isLessonProgressStatus,
  isPilotCohortStatus,
  isPilotMembershipStatus,
  isPilotRole,
  isPrivacyRequestStatus,
  isProgressSource,
  isTerminalAssessmentRunStatus,
  isTerminalPilotCohortStatus,
  isTerminalPilotMembershipStatus,
  isTerminalPrivacyRequestStatus,
  isTerminalUserStatus,
  isUserStatus,
} from "./pilot-domain.ts";

function ok(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string): void {
  ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
  );
}

function exact(
  label: string,
  actual: readonly string[],
  expected: readonly string[],
): void {
  same(actual, expected, `${label} values/order`);
  ok(new Set(actual).size === actual.length, `${label} contains duplicates`);
}

function guard<T extends string>(
  label: string,
  values: readonly T[],
  predicate: (candidate: unknown) => boolean,
  invalid: unknown,
): void {
  for (const value of values) {
    ok(predicate(value), `${label} rejected ${value}`);
  }
  ok(!predicate(invalid), `${label} accepted invalid value ${String(invalid)}`);
  ok(!predicate(null), `${label} accepted null`);
}

function matrix<T extends string>(
  label: string,
  statuses: readonly T[],
  allowedPairs: readonly (readonly [T, T])[],
  predicate: (from: T, to: T) => boolean,
): void {
  const allowed = new Set(
    allowedPairs.map(([from, to]) => `${from}->${to}`),
  );

  for (const from of statuses) {
    for (const to of statuses) {
      const key = `${from}->${to}`;
      same(predicate(from, to), allowed.has(key), `${label} ${key}`);
    }
  }
}

exact("USER_STATUSES", USER_STATUSES, [
  "active",
  "suspended",
  "pending_deletion",
  "deidentified",
]);
exact("PILOT_COHORT_STATUSES", PILOT_COHORT_STATUSES, [
  "draft",
  "active",
  "closed",
  "archived",
]);
exact("PILOT_MEMBERSHIP_STATUSES", PILOT_MEMBERSHIP_STATUSES, [
  "active",
  "suspended",
  "ended",
]);
exact("LESSON_PROGRESS_STATUSES", LESSON_PROGRESS_STATUSES, [
  "in_progress",
  "completed",
]);
exact("ASSESSMENT_RUN_STATUSES", ASSESSMENT_RUN_STATUSES, [
  "in_progress",
  "completed",
  "abandoned",
]);
exact("PRIVACY_REQUEST_STATUSES", PRIVACY_REQUEST_STATUSES, [
  "requested",
  "processing",
  "completed",
  "failed",
]);
exact("PILOT_ROLES", PILOT_ROLES, ["learner", "pilot_admin"]);
exact("PROGRESS_SOURCES", PROGRESS_SOURCES, [
  "pilot_runtime",
  "local_import",
]);
exact("ASSESSMENT_KINDS", ASSESSMENT_KINDS, ["baseline", "final"]);
exact("FEEDBACK_KINDS", FEEDBACK_KINDS, [
  "clarity",
  "confidence",
  "content_problem",
  "technical_problem",
]);
exact("LEARNING_EVENT_TYPES", LEARNING_EVENT_TYPES, [
  "learning_path_started",
  "lesson_started",
  "lesson_completed",
  "lesson_reopened",
  "practice_submitted",
  "assessment_started",
  "assessment_completed",
  "help_opened",
]);
exact("DOMAIN_RULE_VIOLATION_KINDS", DOMAIN_RULE_VIOLATION_KINDS, [
  "invalid_status_transition",
  "terminal_state_transition",
  "privacy_retry_not_authorized",
  "assessment_run_closed",
  "assessment_response_mutation",
  "assessment_finalization_forbidden",
]);

guard("user status", USER_STATUSES, isUserStatus, "deleted");
guard("cohort status", PILOT_COHORT_STATUSES, isPilotCohortStatus, "deleted");
guard(
  "membership status",
  PILOT_MEMBERSHIP_STATUSES,
  isPilotMembershipStatus,
  "revoked",
);
guard(
  "lesson progress status",
  LESSON_PROGRESS_STATUSES,
  isLessonProgressStatus,
  "not_started",
);
guard(
  "assessment run status",
  ASSESSMENT_RUN_STATUSES,
  isAssessmentRunStatus,
  "failed",
);
guard(
  "privacy request status",
  PRIVACY_REQUEST_STATUSES,
  isPrivacyRequestStatus,
  "cancelled",
);
guard("pilot role", PILOT_ROLES, isPilotRole, "owner");
guard("progress source", PROGRESS_SOURCES, isProgressSource, "manual_repair");
guard("assessment kind", ASSESSMENT_KINDS, isAssessmentKind, "diagnostic");
guard("feedback kind", FEEDBACK_KINDS, isFeedbackKind, "free_text");
guard(
  "learning event type",
  LEARNING_EVENT_TYPES,
  isLearningEventType,
  "review_scheduled",
);
guard(
  "domain violation kind",
  DOMAIN_RULE_VIOLATION_KINDS,
  isDomainRuleViolationKind,
  "transport_validation_failed",
);

matrix(
  "user transition",
  USER_STATUSES,
  [
    ["active", "suspended"],
    ["active", "pending_deletion"],
    ["suspended", "active"],
    ["suspended", "pending_deletion"],
    ["pending_deletion", "deidentified"],
  ],
  canTransitionUserStatus,
);
matrix(
  "cohort transition",
  PILOT_COHORT_STATUSES,
  [
    ["draft", "active"],
    ["draft", "archived"],
    ["active", "closed"],
    ["closed", "archived"],
  ],
  canTransitionPilotCohortStatus,
);
matrix(
  "membership transition",
  PILOT_MEMBERSHIP_STATUSES,
  [
    ["active", "suspended"],
    ["active", "ended"],
    ["suspended", "active"],
    ["suspended", "ended"],
  ],
  canTransitionPilotMembershipStatus,
);
matrix(
  "assessment transition",
  ASSESSMENT_RUN_STATUSES,
  [
    ["in_progress", "completed"],
    ["in_progress", "abandoned"],
  ],
  canTransitionAssessmentRunStatus,
);

for (const from of PRIVACY_REQUEST_STATUSES) {
  for (const to of PRIVACY_REQUEST_STATUSES) {
    const expected =
      (from === "requested" && (to === "processing" || to === "failed")) ||
      (from === "processing" && (to === "completed" || to === "failed"));

    same(
      canTransitionPrivacyRequestStatus(from, to),
      expected,
      `privacy transition ${from}->${to} without retry context`,
    );
  }
}

for (const retryAuthorized of [false, true]) {
  for (const requestTypeUnchanged of [false, true]) {
    for (const errorHistoryRetained of [false, true]) {
      same(
        canTransitionPrivacyRequestStatus("failed", "processing", {
          retryAuthorized,
          requestTypeUnchanged,
          errorHistoryRetained,
        }),
        retryAuthorized && requestTypeUnchanged && errorHistoryRetained,
        "privacy retry safeguards",
      );
    }
  }
}

const terminalChecks = [
  ["user", USER_STATUSES, isTerminalUserStatus, ["deidentified"]],
  ["cohort", PILOT_COHORT_STATUSES, isTerminalPilotCohortStatus, ["archived"]],
  [
    "membership",
    PILOT_MEMBERSHIP_STATUSES,
    isTerminalPilotMembershipStatus,
    ["ended"],
  ],
  [
    "assessment",
    ASSESSMENT_RUN_STATUSES,
    isTerminalAssessmentRunStatus,
    ["completed", "abandoned"],
  ],
  [
    "privacy",
    PRIVACY_REQUEST_STATUSES,
    isTerminalPrivacyRequestStatus,
    ["completed"],
  ],
] as const;

for (const [label, statuses, predicate, terminals] of terminalChecks) {
  for (const status of statuses) {
    same(
      predicate(status as never),
      terminals.includes(status as never),
      `${label} terminal ${status}`,
    );
  }
}

for (const to of USER_STATUSES) {
  ok(!canTransitionUserStatus("deidentified", to), `terminal user -> ${to}`);
}
for (const to of PILOT_COHORT_STATUSES) {
  ok(!canTransitionPilotCohortStatus("archived", to), `terminal cohort -> ${to}`);
}
for (const to of PILOT_MEMBERSHIP_STATUSES) {
  ok(
    !canTransitionPilotMembershipStatus("ended", to),
    `terminal membership -> ${to}`,
  );
}
for (const from of ["completed", "abandoned"] as const) {
  for (const to of ASSESSMENT_RUN_STATUSES) {
    ok(
      !canTransitionAssessmentRunStatus(from, to),
      `terminal assessment ${from} -> ${to}`,
    );
  }
}
for (const to of PRIVACY_REQUEST_STATUSES) {
  ok(
    !canTransitionPrivacyRequestStatus("completed", to),
    `terminal privacy -> ${to}`,
  );
}

same(canAcceptAssessmentResponse("in_progress"), true, "running response");
same(canAcceptAssessmentResponse("completed"), false, "completed response");
same(canAcceptAssessmentResponse("abandoned"), false, "abandoned response");

const validFinalization = {
  runFrom: "in_progress",
  runTo: "completed",
  previousIsFinal: false,
  nextIsFinal: true,
  responseContentUnchanged: true,
  responseSequenceUnchanged: true,
} as const;

ok(canFinalizeAssessmentResponse(validFinalization), "valid finalization rejected");

const invalidFinalizations = [
  { ...validFinalization, runTo: "abandoned" as const },
  { ...validFinalization, previousIsFinal: true },
  { ...validFinalization, nextIsFinal: false },
  { ...validFinalization, responseContentUnchanged: false },
  { ...validFinalization, responseSequenceUnchanged: false },
];

for (const candidate of invalidFinalizations) {
  ok(
    !canFinalizeAssessmentResponse(candidate),
    `invalid finalization accepted: ${JSON.stringify(candidate)}`,
  );
}
