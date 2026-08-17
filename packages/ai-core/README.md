# `@ki-lernportal-nim/ai-core`

## Zweck

Providerneutrale AI-, Retrieval-, Citation-, Abstention- und Adapterverträge.

## Aktuelle Slices

### M5-A

- Deterministischer **Mock-Tutor** (`answerMockTutor`, kuratierte Bank für `l1`/`l2`/`l3`)
- Kein Netz, kein Freitext-Chat

Siehe `docs/architecture/MEDIA_M5_A_IMPLEMENTATION_SCOPE.md`.

### M5-B

- Lokaler **Ollama-Proof** (`proveOllamaLocal`) — Opt-in, nur Loopback `:11434`
- Kein Product-UI, kein Railway-LLM

Siehe `docs/architecture/MEDIA_M5_B_IMPLEMENTATION_SCOPE.md`.

### S56-A

- **Kuratiertes Retrieval** (`retrieveCurated`) mit Zitaten und Enthaltung
- Keine Embeddings, kein Live-LLM, kein Flag-Flip

Siehe `docs/architecture/S56_A_RAG_SCOPE_LOCK.md`.

### S56-B

- Privacy-Review + Staging-Flag-**Entscheidung** (`resolveAiRagRuntimePolicy`)
- Flag-Flip **nicht** ausgeführt; Production-Flip verboten

Siehe `docs/architecture/S56_B_STAGING_FLAG_PRIVACY.md`.

### S56-C

- Preset-Queries (`listCuratedUiQueries`) für die Pilot-UI in Lektion `l1`
- Kein Freitext-Chat, keine Embeddings, kein Flag-Flip

Siehe `docs/architecture/S56_C_CURATED_RETRIEVAL_UI.md`.

### S56-C2

- Korpus + Preset-Queries für Lektion `l2`
- Panel-Wiring in `l1` und `l2`

Siehe `docs/architecture/S56_C2_CURATED_RETRIEVAL_EXPANSION.md`.

### S56-C3

- Korpus + Preset-Queries für Lektion `l3`
- Panel-Wiring in `l1`, `l2` und `l3`

Siehe `docs/architecture/S56_C3_CURATED_RETRIEVAL_EXPANSION.md`.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
M5/S56 benötigen keine Runtime-Dependencies (nur optional `fetch` für M5-B).

## Verbotene Imports

- Produktive Cloud-Modell- und Embedding-Aufrufe ohne spätere Freigabe
- API-Keys, Vektordatenbanken und produktive RAG-Indizes
- Direkte UI- oder Drizzle-Kopplung
- Nicht-localhost Netzaufrufe

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

- **M5-A:** `answerMockTutor`, `listMockTutorPrompts`
- **M5-B:** `proveOllamaLocal`, `assertLocalOllamaBaseUrl`, `resolveOllamaProofConfig`
- **S56-A:** `retrieveCurated`, `listCuratedPassages`, `CURATED_PASSAGES`
- **S56-B:** `resolveAiRagRuntimePolicy`, `isAiRagRuntimeDefaultOff`
- **S56-C:** `listCuratedUiQueries`, `CURATED_UI_QUERIES`

## Status

```text
MEDIA_M5_A_SCOPE_LOCK=YES
MEDIA_M5_A_MOCK_AUTHORIZED=YES
MEDIA_M5_A_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A_NETWORK_FORBIDDEN=YES
MEDIA_M5_A2_SCOPE_LOCK=YES
MEDIA_M5_A2_MOCK_L2_AUTHORIZED=YES
MEDIA_M5_A3_SCOPE_LOCK=YES
MEDIA_M5_A3_MOCK_L3_AUTHORIZED=YES
MEDIA_M5_B_SCOPE_LOCK=YES
MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES
MEDIA_M5_B_PRODUCT_UI=NO
MEDIA_M5_PRODUCTION_LLM=NO
S56_A_SCOPE_LOCK=YES
S56_A_CURATED_RETRIEVAL_AUTHORIZED=YES
S56_A_LIVE_LLM=NO
S56_A_STAGING_FLAG_FLIP=NO
S56_B_SCOPE_LOCK=YES
S56_B_STAGING_FLAG_FLIP_EXECUTED=NO
S56_B_PRODUCTION_FLAG_FLIP=NO
S56_C_SCOPE_LOCK=YES
S56_C_CURATED_RETRIEVAL_UI_AUTHORIZED=YES
S56_C_FREE_CHAT_FORBIDDEN=YES
S56_C_EMBEDDINGS=NO
S56_C2_SCOPE_LOCK=YES
S56_C2_CURATED_L2_AUTHORIZED=YES
S56_C2_FREE_CHAT_FORBIDDEN=YES
S56_C3_SCOPE_LOCK=YES
S56_C3_CURATED_L3_AUTHORIZED=YES
S56_C3_FREE_CHAT_FORBIDDEN=YES
AI_CORE_LIVE_PROVIDER=NO
```

M5-A bleibt der Product-Mock. M5-B ist nur der lokale Dev-Proof.
S56-A ist kuratiertes Retrieval ohne Live-Laufzeit-Flag.
S56-B dokumentiert Privacy und Flag-Entscheidung ohne Flip.
S56-C liefert Preset-Queries für die kuratierte Quellen-Suche-UI (`l1`).
S56-C2 erweitert Korpus und UI auf `l2`.
S56-C3 erweitert Korpus und UI auf `l3`.
Keine produktive Provider-Runtime und keine Live-LLM im Portal.

## Spätere Slices

- S56-B2: optionaler Staging-Flag-Flip + HTTP-Probe — gesperrt
- S56-D: Embeddings/Index — gesperrt
- M7: Flag-gated Staging-RAG UI — gesperrt

## Sicherheit und Datenschutz

Keine Secrets, keine personenbezogenen Prompts an Dritte, keine
Cloud-Providerzugriffe in M5/S56.
