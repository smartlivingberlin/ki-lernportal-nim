#!/usr/bin/env node
import {
  proveOllamaLocal,
  resolveOllamaProofConfig,
} from "../../packages/ai-core/src/ollama-local.ts";

const result = await proveOllamaLocal(
  resolveOllamaProofConfig({
    AI_CORE_OLLAMA_PROOF: process.env.AI_CORE_OLLAMA_PROOF,
    AI_CORE_OLLAMA_BASE_URL: process.env.AI_CORE_OLLAMA_BASE_URL,
    AI_CORE_OLLAMA_MODEL: process.env.AI_CORE_OLLAMA_MODEL,
  }),
);

console.log(`OLLAMA_PROOF_STATUS=${result.status}`);
console.log(`OLLAMA_PROOF_MODEL_PRESENT=${result.modelPresent ? "YES" : "NO"}`);
console.log(`OLLAMA_PROOF_HOST=${result.baseUrlHost}`);
console.log(`OLLAMA_PROOF_DETAIL=${result.detail}`);
if (result.status !== "ok") process.exitCode = 1;
