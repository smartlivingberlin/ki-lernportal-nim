import {
  isAiRagRuntimeDefaultOff,
  resolveAiRagRuntimePolicy,
} from "./ai-rag-runtime-policy.ts";

function ok(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string): void {
  ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
  );
}

ok(isAiRagRuntimeDefaultOff(), "default off");

const off = resolveAiRagRuntimePolicy({});
same(off.enabled, false, "disabled");
same(off.productionFlipAllowed, false, "prod flip forbidden");
same(off.stagingFlipExecuted, false, "staging not executed");
ok(off.honesty.includes("Production-Flip verboten"), "honesty");

const forced = resolveAiRagRuntimePolicy({ ai_rag_runtime: true });
same(forced.enabled, true, "explicit true");
same(forced.productionFlipAllowed, false, "still no prod flip");
same(forced.stagingFlipExecuted, false, "still not executed");
ok(forced.detail.includes("staging_flip_not_executed"), "detail");

console.log("AI_CORE_AI_RAG_RUNTIME_POLICY_OK=YES");
