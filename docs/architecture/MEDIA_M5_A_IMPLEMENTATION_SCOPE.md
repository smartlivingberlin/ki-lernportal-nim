# MEDIA M5-A — Mock-Tutor Scope-Lock

**Status:** Scope-Lock + lokale Mock-Implementierung (kein Live-LLM)  
**Stand:** 16. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M0–M4 („ok, weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Erste, **providerneutrale** AI-Grenzschicht in `packages/ai-core`:

- deterministischer **Mock-Tutor** mit kuratierten Antworten aus Lektionsstoff,
- keine Netzwerkaufrufe, keine API-Keys, kein Ollama, kein RAG,
- Honesty: UI und API kennzeichnen klar „Mock / kuratiert / keine Live-KI“.

```text
MEDIA_M5_A_SCOPE_LOCK=YES
MEDIA_M5_A_MOCK_AUTHORIZED=YES
MEDIA_M5_A_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A_NETWORK_FORBIDDEN=YES
MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
MEDIA_LIVE_LLM_FORBIDDEN_UNTIL_S56_FREIGABE=YES
```

## 2. In Scope (dieses Slice)

1. Scope-Dokument + Marker in `MEDIA_OPEN_SOURCE_STACK.md` / Status.
2. `packages/ai-core`: Typen + `answerMockTutor()` + kuratierte Bank für Lektion `l1`.
3. Unit-Tests für Treffer, Enthaltung und „kein Netz“.
4. Optionaler Pilot in `LessonWorkspace` nur für `l1`: **nur vorgegebene Fragen**
   (kein Freitext-Chat), Honesty-Zeile, Vendor-Sync für Railway.
5. Gate `pnpm test:media-m5` + CI-Schritt.
6. Datenschutz-Honesty: Mock-Tutor lokal/kuratiert, keine Live-KI.

## 3. Explizit out of scope

- Ollama / lokale Modell-Runtime (→ M5-B Scope-Lock)
- RAG, Embeddings, Vektordatenbanken
- Provider-SDKs (OpenAI, Anthropic, NVIDIA NIM Cloud, …)
- Freier Chat / Streaming
- Production-Flag `ai_rag_runtime=true`
- Secrets, Telemetrie, Nutzer-Prompts an Dritte
- M6 Talking-Head, M7 Staging-RAG

## 4. Honesty-Vertrag

- Antworten tragen `mode: "mock_curated"`.
- Unbekannte Fragen → kontrollierte Enthaltung (`abstain`), kein Halluzinieren.
- UI-Text: „feste Antworten · kein Netz · keine Live-KI“.
- Kein Claim „persönlicher KI-Tutor“ oder „Live-Modell“.

## 5. Package-Grenzen

- `ai-core` darf nur `contracts` / `domain` importieren (DAG); M5-A braucht
  **keine** Runtime-Deps.
- React-Komponenten importieren nur den Mock-API-Entry, keine Provider-SDKs.
- Railway: `apps/web/vendor/ai-core` via `sync-web-railway-vendor.mjs`.

## 6. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| M5-A | Mock-Tutor + Pilot-UI | dieses Dokument (integriert) |
| M5-A2 | Mock-Tutor Expansion `l2` | siehe `MEDIA_M5_A2_MOCK_TUTOR_L2.md` |
| M5-A3 | Mock-Tutor Expansion `l3` | siehe `MEDIA_M5_A3_MOCK_TUTOR_L3.md` |
| M5-A4 | Mock-Tutor Expansion `l4` | siehe `MEDIA_M5_A4_MOCK_TUTOR_L4.md` |
| M5-A5 | Mock-Tutor Expansion `l5` | siehe `MEDIA_M5_A5_MOCK_TUTOR_L5.md` |
| M5-A6 | Mock-Tutor Expansion `l6` | siehe `MEDIA_M5_A6_MOCK_TUTOR_L6.md` |
| M5-B | lokaler Ollama-Proof (Dev only) | siehe `MEDIA_M5_B_IMPLEMENTATION_SCOPE.md` |
| S56 | Live-RAG / Staging-Flags | **gesperrt** |
