import {
  PLATFORM_ROLES,
  PRIVILEGED_PLATFORM_ROLES,
  isPlatformRole,
  isPrivilegedPlatformRole,
  mayAutoGrantFirstUserAdmin,
  roleRequiresMfa,
} from "./platform-roles.ts";

function ok(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string): void {
  ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
  );
}

same(
  PLATFORM_ROLES,
  ["Visitor", "Learner", "Editor", "Reviewer", "Admin", "Owner"],
  "platform roles",
);
same(PRIVILEGED_PLATFORM_ROLES, ["Admin", "Owner"], "privileged roles");

for (const role of PLATFORM_ROLES) {
  ok(isPlatformRole(role), `accept ${role}`);
}
ok(!isPlatformRole("pilot_admin"), "pilot role not platform role");
ok(!isPlatformRole("visitor"), "case sensitive");

ok(isPrivilegedPlatformRole("Admin"), "Admin privileged");
ok(isPrivilegedPlatformRole("Owner"), "Owner privileged");
ok(!isPrivilegedPlatformRole("Learner"), "Learner not privileged");

ok(roleRequiresMfa("Admin"), "Admin MFA");
ok(roleRequiresMfa("Owner"), "Owner MFA");
ok(!roleRequiresMfa("Learner"), "Learner no MFA requirement here");

same(mayAutoGrantFirstUserAdmin(), false, "no first-user admin");
