/**
 * S52-D1 / Freigabe D – Composition adapter for Auth HTTP handlers.
 * auth_runtime stays false unless AUTH_RUNTIME=true (explicit opt-in).
 * Optional staging memory bootstrap from env (hash only); never production users.
 */

import {
  createAuthHttpHandlers,
  createMemoryCredentialStore,
  createMemorySessionStore,
  createSessionRuntime,
  type AuthHttpHandlers,
  type AuthHttpResult,
} from "@ki-lernportal-nim/auth";
import {
  isFeatureEnabled,
  resolveFeatureFlags,
} from "@ki-lernportal-nim/contracts";
import { readStagingBootstrapCredentials } from "./staging-auth-seed";

let handlers: AuthHttpHandlers | null = null;

function readAuthRuntimeOverride(): boolean {
  return process.env.AUTH_RUNTIME === "true";
}

export {
  isProductionLikeAuthEnvironment,
  readStagingBootstrapCredentials,
} from "./staging-auth-seed";

export function getAuthHttpHandlers(): AuthHttpHandlers {
  if (handlers) {
    return handlers;
  }

  const runtime = createSessionRuntime(createMemorySessionStore());
  const credentials = createMemoryCredentialStore(
    readStagingBootstrapCredentials(process.env),
  );

  handlers = createAuthHttpHandlers({
    runtime,
    credentials,
    isAuthRuntimeEnabled: () => {
      const flags = resolveFeatureFlags(
        readAuthRuntimeOverride() ? { auth_runtime: true } : {},
      );
      return isFeatureEnabled(flags, "auth_runtime");
    },
  });

  return handlers;
}

/** Test-only reset between unit invocations. */
export function resetAuthHttpHandlersForTests(): void {
  handlers = null;
}

export function toAuthResponse(result: AuthHttpResult): Response {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });

  if (result.setCookie) {
    headers.set("Set-Cookie", result.setCookie);
  }

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers,
  });
}
