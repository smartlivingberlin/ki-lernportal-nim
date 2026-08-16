import {
  assertLocalOllamaBaseUrl,
  isOllamaProofEnabled,
  proveOllamaLocal,
  resolveOllamaProofConfig,
} from "./ollama-local.ts";

function ok(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string): void {
  ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
  );
}

ok(!isOllamaProofEnabled({}), "default disabled");
ok(isOllamaProofEnabled({ AI_CORE_OLLAMA_PROOF: "1" }), "opt-in");

const cfg = resolveOllamaProofConfig({
  AI_CORE_OLLAMA_PROOF: "1",
  AI_CORE_OLLAMA_BASE_URL: "http://127.0.0.1:11434",
  AI_CORE_OLLAMA_MODEL: "llama3.2",
});
same(cfg.enabled, true, "enabled");
same(cfg.baseUrl, "http://127.0.0.1:11434", "base");

ok(
  assertLocalOllamaBaseUrl("http://127.0.0.1:11434").hostname === "127.0.0.1",
  "loopback ok",
);
ok(
  assertLocalOllamaBaseUrl("http://localhost:11434").hostname === "localhost",
  "localhost ok",
);

for (const bad of [
  "https://127.0.0.1:11434",
  "http://example.com:11434",
  "http://10.0.0.5:11434",
  "http://127.0.0.1:80",
  "http://127.0.0.1",
]) {
  let threw = false;
  try {
    assertLocalOllamaBaseUrl(bad);
  } catch {
    threw = true;
  }
  ok(threw, `reject ${bad}`);
}

const disabled = await proveOllamaLocal(
  resolveOllamaProofConfig({ AI_CORE_OLLAMA_PROOF: "0" }),
);
same(disabled.status, "disabled", "disabled without opt-in");

const fakeFetch: typeof fetch = async () =>
  new Response(
    JSON.stringify({ models: [{ name: "llama3.2:latest" }] }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );

const okResult = await proveOllamaLocal({
  ...cfg,
  fetchImpl: fakeFetch,
});
same(okResult.status, "ok", "fake tags ok");
same(okResult.modelPresent, true, "model present");
same(okResult.baseUrlHost, "127.0.0.1", "host label");
ok(okResult.honesty.includes("Dev only"), "honesty");

const remoteRejected = await proveOllamaLocal({
  enabled: true,
  baseUrl: "http://evil.example:11434",
  model: "llama3.2",
  fetchImpl: fakeFetch,
});
same(remoteRejected.status, "error", "remote rejected");
ok(
  remoteRejected.detail.includes("LOCALHOST") ||
    remoteRejected.detail.includes("OLLAMA_BASE_URL"),
  "localhost error code",
);

console.log("AI_CORE_OLLAMA_LOCAL_OK=YES");
