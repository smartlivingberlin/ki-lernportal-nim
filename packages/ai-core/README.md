# `@ki-lernportal-nim/ai-core`

## Zweck

Providerneutrale AI-, Retrieval-, Citation-, Abstention- und Adapterverträge.

## Aktueller Slice (M5-A)

- Deterministischer **Mock-Tutor** (`answerMockTutor`, kuratierte Bank für `l1`)
- Kein Netz, keine Provider-SDKs, kein Freitext-Chat, kein Ollama/RAG

Siehe `docs/architecture/MEDIA_M5_A_IMPLEMENTATION_SCOPE.md`.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
M5-A benötigt keine Runtime-Dependencies.

## Verbotene Imports

- Produktive Modell- und Embedding-Aufrufe ohne S56-Freigabe
- API-Keys, Vektordatenbanken und RAG-Indizes
- Direkte UI- oder Drizzle-Kopplung
- Netzwerkaufrufe aus diesem Package

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

- **M5-A:** `answerMockTutor`, `listMockTutorPrompts`, kuratierte Bank für `l1`

## Status

```text
MEDIA_M5_A_SCOPE_LOCK=YES
MEDIA_M5_A_MOCK_AUTHORIZED=YES
MEDIA_M5_A_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A_NETWORK_FORBIDDEN=YES
MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
AI_CORE_LIVE_PROVIDER=NO
```

M5-A enthält nur den deterministischen Mock-Tutor. Keine produktive
Provider-Runtime und keine Live-LLM-Implementierung.

## Spätere Slices

- M5-B: lokaler Ollama-Proof (Dev only) — gesperrt
- S56: Live-RAG / Staging — gesperrt

## Sicherheit und Datenschutz

Keine Secrets, keine personenbezogenen Prompts an Dritte, keine
produktiven Providerzugriffe in M5-A.
