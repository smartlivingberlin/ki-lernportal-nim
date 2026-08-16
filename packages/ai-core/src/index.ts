/**
 * S51A package boundary + M5 mock/ollama proof + S56-A curated retrieval.
 */
export {
  MOCK_TUTOR_MODE,
  MOCK_TUTOR_PROMPTS,
  answerMockTutor,
  listMockTutorPrompts,
} from "./mock-tutor.ts";

export type {
  MockTutorMode,
  MockTutorPrompt,
  MockTutorRequest,
  MockTutorResponse,
} from "./mock-tutor.ts";

export {
  OLLAMA_PROOF_MODE,
  assertLocalOllamaBaseUrl,
  isOllamaProofEnabled,
  proveOllamaLocal,
  resolveOllamaProofConfig,
} from "./ollama-local.ts";

export type {
  OllamaProofConfig,
  OllamaProofEnv,
  OllamaProofMode,
  OllamaProofResult,
} from "./ollama-local.ts";

export {
  CURATED_PASSAGES,
  CURATED_RETRIEVAL_MODE,
  listCuratedPassages,
  retrieveCurated,
} from "./curated-retrieval.ts";

export type {
  CuratedCitation,
  CuratedPassage,
  CuratedRetrievalMode,
  CuratedRetrieveRequest,
  CuratedRetrieveResult,
} from "./curated-retrieval.ts";

export {
  isAiRagRuntimeDefaultOff,
  resolveAiRagRuntimePolicy,
} from "./ai-rag-runtime-policy.ts";

export type {
  AiRagRuntimeFlags,
  AiRagRuntimePolicy,
} from "./ai-rag-runtime-policy.ts";
