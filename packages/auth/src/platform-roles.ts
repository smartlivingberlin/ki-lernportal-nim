/**
 * S52-A – platform role vocabulary from PLATFORM_CONTRACTS.
 *
 * No auth runtime, persistence, cookies or UI.
 */

export const PLATFORM_ROLES = [
  "Visitor",
  "Learner",
  "Editor",
  "Reviewer",
  "Admin",
  "Owner",
] as const;

export type PlatformRole = (typeof PLATFORM_ROLES)[number];

export const PRIVILEGED_PLATFORM_ROLES = [
  "Admin",
  "Owner",
] as const;

export type PrivilegedPlatformRole =
  (typeof PRIVILEGED_PLATFORM_ROLES)[number];

function isControlledValue<TValue extends string>(
  values: readonly TValue[],
  candidate: unknown,
): candidate is TValue {
  return (
    typeof candidate === "string" &&
    values.includes(candidate as TValue)
  );
}

export function isPlatformRole(
  candidate: unknown,
): candidate is PlatformRole {
  return isControlledValue(PLATFORM_ROLES, candidate);
}

export function isPrivilegedPlatformRole(
  candidate: unknown,
): candidate is PrivilegedPlatformRole {
  return isControlledValue(PRIVILEGED_PLATFORM_ROLES, candidate);
}

export function roleRequiresMfa(role: PlatformRole): boolean {
  return isPrivilegedPlatformRole(role);
}

/**
 * Explicit policy: the first registered account must never become Admin/Owner
 * automatically.
 */
export function mayAutoGrantFirstUserAdmin(): false {
  return false;
}
