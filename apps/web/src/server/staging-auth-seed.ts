/**
 * Freigabe D – staging memory bootstrap credential parsing (pure, no package imports).
 * Secrets must not live in the repository. Production-like envs never seed.
 */

export type StagingBootstrapCredential = Readonly<{
  subjectId: string;
  email: string;
  role: "Visitor" | "Learner" | "Editor" | "Reviewer";
  passwordHash: string;
}>;

const ALLOWED_BOOTSTRAP_ROLES = [
  "Visitor",
  "Learner",
  "Editor",
  "Reviewer",
] as const;

type EnvMap = Readonly<Record<string, string | undefined>>;

export function isProductionLikeAuthEnvironment(env: EnvMap): boolean {
  const appEnv = (env.APP_ENV ?? "").trim().toLowerCase();
  if (appEnv === "production" || appEnv === "prod") {
    return true;
  }

  const railwayEnv = (
    env.RAILWAY_ENVIRONMENT_NAME ??
    env.RAILWAY_ENVIRONMENT ??
    ""
  )
    .trim()
    .toLowerCase();
  if (railwayEnv === "production" || railwayEnv === "prod") {
    return true;
  }

  return false;
}

/**
 * Staging-only memory bootstrap. Requires AUTH_RUNTIME=true and a
 * nim-scrypt-v1 password hash. Never accepts Admin/Owner.
 */
export function readStagingBootstrapCredentials(
  env: EnvMap,
): readonly StagingBootstrapCredential[] {
  if (env.AUTH_RUNTIME !== "true") {
    return [];
  }
  if (isProductionLikeAuthEnvironment(env)) {
    return [];
  }

  const email = (env.STAGING_BOOTSTRAP_EMAIL ?? "").trim().toLowerCase();
  const passwordHash = (env.STAGING_BOOTSTRAP_PASSWORD_HASH ?? "").trim();
  if (!email || !passwordHash) {
    return [];
  }
  if (!email.includes("@") || email.length > 320) {
    return [];
  }
  if (!passwordHash.startsWith("nim-scrypt-v1$")) {
    return [];
  }

  const subjectId = (
    env.STAGING_BOOTSTRAP_SUBJECT_ID ?? "staging-bootstrap"
  ).trim();
  if (!subjectId || subjectId.length > 128) {
    return [];
  }

  const roleRaw = (env.STAGING_BOOTSTRAP_ROLE ?? "Learner").trim();
  if (
    !(ALLOWED_BOOTSTRAP_ROLES as readonly string[]).includes(roleRaw)
  ) {
    return [];
  }
  const role = roleRaw as StagingBootstrapCredential["role"];

  return Object.freeze([
    Object.freeze({
      subjectId,
      email,
      role,
      passwordHash,
    }),
  ]);
}
