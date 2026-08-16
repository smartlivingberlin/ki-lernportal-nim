/**
 * S56-B policy for ai_rag_runtime — documentation-aligned, no Railway flip.
 * Default remains off; production flip is never allowed from this helper.
 */

export type AiRagRuntimeFlags = {
  ai_rag_runtime?: boolean;
};

export type AiRagRuntimePolicy = {
  enabled: boolean;
  productionFlipAllowed: false;
  stagingFlipExecuted: false;
  honesty: string;
  detail: string;
};

const HONESTY =
  "S56-B: ai_rag_runtime default aus · Staging-Flip nicht ausgeführt · Production-Flip verboten.";

/**
 * Resolves runtime policy. Does not read environment variables and performs no I/O.
 */
export function resolveAiRagRuntimePolicy(
  flags: AiRagRuntimeFlags = {},
): AiRagRuntimePolicy {
  const enabled = flags.ai_rag_runtime === true;
  return {
    enabled,
    productionFlipAllowed: false,
    stagingFlipExecuted: false,
    honesty: HONESTY,
    detail: enabled
      ? "flag_true_but_product_ui_absent_staging_flip_not_executed"
      : "flag_default_false",
  };
}

export function isAiRagRuntimeDefaultOff(): boolean {
  return resolveAiRagRuntimePolicy({}).enabled === false;
}
