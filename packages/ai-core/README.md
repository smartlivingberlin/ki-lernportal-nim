# `@ki-lernportal-nim/ai-core`

## Zweck

Providerneutrale AI-, Retrieval-, Citation-, Abstention- und Adapterverträge.

## Aktuelle Slices

### M5-A

- Deterministischer **Mock-Tutor** (`answerMockTutor`, kuratierte Bank für `l1`)
- Kein Netz, kein Freitext-Chat

Siehe `docs/architecture/MEDIA_M5_A_IMPLEMENTATION_SCOPE.md`.

### M5-B

- Lokaler **Ollama-Proof** (`proveOllamaLocal`) — Opt-in, nur Loopback `:11434`
- Kein Product-UI, kein Railway-LLM

Siehe `docs/architecture/MEDIA_M5_B_IMPLEMENTATION_SCOPE.md`.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
M5-A/B benötigen keine Runtime-Dependencies (nur optional `fetch`).

## Verbotene Imports

- Produktive Cloud-Modell- und Embedding-Aufrufe ohne S56-Freigabe
- API-Keys, Vektordatenbanken und RAG-Indizes
- Direkte UI- oder Drizzle-Kopplung
- Nicht-localhost Netzaufrufe

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

- **M5-A:** `answerMockTutor`, `listMockTutorPrompts`
- **M5-B:** `proveOllamaLocal`, `assertLocalOllamaBaseUrl`, `resolveOllamaProofConfig`

## Status

```text
MEDIA_M5_A_SCOPE_LOCK=YES
MEDIA_M5_A_MOCK_AUTHORIZED=YES
MEDIA_M5_A_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A_NETWORK_FORBIDDEN=YES
MEDIA_M5_B_SCOPE_LOCK=YES
MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES
MEDIA_M5_B_PRODUCT_UI=NO
MEDIA_M5_A_NETWORK_FORBIDDEN=YES
MEDIA_M5_PRODUCTION_LLM=NO
AI_CORE_LIVE_PROVIDER=NO
```

M5-A bleibt der Product-Mock. M5-B ist nur der lokale Dev-Proof.
Keine produktive Provider-Runtime und keine Live-LLM im Portal.

## Spätere Slices

- S56: Live-RAG / Staging — gesperrt

## Sicherheit und Datenschutz

Keine Secrets, keine personenbezogenen Prompts an Dritte, keine
Cloud-Providerzugriffe in M5-A/B.
