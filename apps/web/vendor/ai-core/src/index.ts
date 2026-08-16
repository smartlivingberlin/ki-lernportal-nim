/**
 * S51A package boundary + M5-A mock tutor (no live LLM).
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
