/**
 * M5-B local Ollama proof (Dev only).
 * Opt-in + localhost only. Module import performs no network I/O.
 */

export const OLLAMA_PROOF_MODE = "ollama_local_proof" as const;

export type OllamaProofMode = typeof OLLAMA_PROOF_MODE;

export type OllamaProofEnv = {
  AI_CORE_OLLAMA_PROOF?: string;
  AI_CORE_OLLAMA_BASE_URL?: string;
  AI_CORE_OLLAMA_MODEL?: string;
};

export type OllamaProofConfig = {
  enabled: boolean;
  baseUrl: string;
  model: string;
  /** Injectable for Fake-/Unit-Tests; defaults to global fetch. */
  fetchImpl?: typeof fetch;
};

export type OllamaProofResult = {
  mode: OllamaProofMode;
  status: "ok" | "disabled" | "error";
  baseUrlHost: "localhost" | "127.0.0.1" | "none";
  model: string;
  modelPresent: boolean;
  honesty: string;
  detail: string;
};

const DEFAULT_BASE = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "llama3.2";
const HONESTY =
  "Lokaler Ollama-Proof (Dev only) · kein Product-UI · kein Railway · keine Live-KI im Portal.";

const ALLOWED_HOSTS = new Set(["127.0.0.1", "localhost"]);

export function isOllamaProofEnabled(env: OllamaProofEnv = {}): boolean {
  return env.AI_CORE_OLLAMA_PROOF === "1";
}

export function resolveOllamaProofConfig(
  env: OllamaProofEnv = {},
  fetchImpl?: typeof fetch,
): OllamaProofConfig {
  return {
    enabled: isOllamaProofEnabled(env),
    baseUrl: (env.AI_CORE_OLLAMA_BASE_URL ?? DEFAULT_BASE).replace(/\/$/, ""),
    model: env.AI_CORE_OLLAMA_MODEL ?? DEFAULT_MODEL,
    fetchImpl,
  };
}

/** Reject anything that is not loopback HTTP Ollama. */
export function assertLocalOllamaBaseUrl(baseUrl: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    throw new Error("OLLAMA_BASE_URL_INVALID");
  }

  if (parsed.protocol !== "http:") {
    throw new Error("OLLAMA_BASE_URL_HTTP_ONLY");
  }
  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    throw new Error("OLLAMA_BASE_URL_LOCALHOST_ONLY");
  }
  if (parsed.port && parsed.port !== "11434") {
    throw new Error("OLLAMA_BASE_URL_PORT_11434_ONLY");
  }
  if (!parsed.port && parsed.hostname) {
    // http://localhost without port is ok (defaults to 80) — force 11434
    throw new Error("OLLAMA_BASE_URL_PORT_11434_ONLY");
  }
  return parsed;
}

function hostLabel(hostname: string): OllamaProofResult["baseUrlHost"] {
  if (hostname === "127.0.0.1") return "127.0.0.1";
  if (hostname === "localhost") return "localhost";
  return "none";
}

function redactError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  return raw
    .replace(/https?:\/\/[^\s]+/gi, "[redacted-url]")
    .replace(/[\w.+-]+@[\w.-]+/g, "[redacted-email]")
    .slice(0, 180);
}

/**
 * Explicit proof call — never runs on module import.
 * Lists local tags; does not stream chat into the product.
 */
export async function proveOllamaLocal(
  config: OllamaProofConfig,
): Promise<OllamaProofResult> {
  if (!config.enabled) {
    return {
      mode: OLLAMA_PROOF_MODE,
      status: "disabled",
      baseUrlHost: "none",
      model: config.model,
      modelPresent: false,
      honesty: HONESTY,
      detail: "AI_CORE_OLLAMA_PROOF must be 1",
    };
  }

  try {
    const parsed = assertLocalOllamaBaseUrl(config.baseUrl);
    const fetchImpl = config.fetchImpl ?? globalThis.fetch;
    if (typeof fetchImpl !== "function") {
      throw new Error("OLLAMA_FETCH_UNAVAILABLE");
    }

    const response = await fetchImpl(`${parsed.origin}/api/tags`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`OLLAMA_TAGS_HTTP_${response.status}`);
    }

    const body = (await response.json()) as {
      models?: Array<{ name?: string }>;
    };
    const names = (body.models ?? [])
      .map((entry) => entry.name ?? "")
      .filter(Boolean);
    const modelPresent = names.some(
      (name) => name === config.model || name.startsWith(`${config.model}:`),
    );

    return {
      mode: OLLAMA_PROOF_MODE,
      status: "ok",
      baseUrlHost: hostLabel(parsed.hostname),
      model: config.model,
      modelPresent,
      honesty: HONESTY,
      detail: modelPresent
        ? "tags_ok_model_present"
        : "tags_ok_model_missing",
    };
  } catch (error) {
    return {
      mode: OLLAMA_PROOF_MODE,
      status: "error",
      baseUrlHost: "none",
      model: config.model,
      modelPresent: false,
      honesty: HONESTY,
      detail: redactError(error),
    };
  }
}
