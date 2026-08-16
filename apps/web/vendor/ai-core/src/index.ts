/**
 * S51A package boundary + M5-A mock tutor + M5-B local Ollama proof.
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
