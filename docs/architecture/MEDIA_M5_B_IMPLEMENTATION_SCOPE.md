# MEDIA M5-B — lokaler Ollama-Proof (Dev only)

**Status:** Scope-Lock + lokaler Proof-Adapter (kein Production-LLM)  
**Stand:** 16. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M5-A („ok, weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Kontrollierter **Dev-only**-Nachweis, dass `packages/ai-core` eine lokale
Ollama-Instanz erreichen *kann* — ohne Product-UI, ohne Railway, ohne RAG.

```text
MEDIA_M5_B_SCOPE_LOCK=YES
MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES
MEDIA_M5_B_DEV_ONLY=YES
MEDIA_M5_B_LOCALHOST_ONLY=YES
MEDIA_M5_B_PRODUCT_UI=NO
MEDIA_M5_B_RAILWAY=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
MEDIA_LIVE_LLM_FORBIDDEN_UNTIL_S56_FREIGABE=YES
AI_CORE_LIVE_PROVIDER=NO
```

## 2. In Scope

1. Scope-Dokument + Marker in Stack/Status.
2. `packages/ai-core`: `proveOllamaLocal()` mit
   - explizitem Opt-in (`AI_CORE_OLLAMA_PROOF=1`),
   - **nur** `http://127.0.0.1:11434` / `http://localhost:11434`,
   - injizierbarem `fetch` für Fake-/Unit-Tests,
   - redigierten Fehlern (keine Stack-Traces mit Host-Interna in Logs-Gates).
3. Unit-Tests ohne echte Ollama-Instanz (CI).
4. Optionaler Proof-Skript `scripts/ai/prove-ollama-local.sh` — skippt sauber,
   wenn Ollama fehlt (`OLLAMA_PROOF_SKIPPED`).
5. Gate `pnpm test:media-m5b` + CI.
6. Product-UI bleibt M5-A Mock-Tutor; **kein** Ollama in `LessonWorkspace`.

## 3. Explizit out of scope

- Product-/Railway-UI für Live-Antworten
- Freier Chat, Streaming-UX
- Cloud-Provider (OpenAI, Anthropic, NIM Cloud, …)
- RAG / Embeddings / Vektordatenbanken (S56)
- `ai_rag_runtime=true` in Staging/Production
- Secrets oder Telemetrie
- Automatischer Modell-Download in CI

## 4. Honesty / Safety

- Proof ist **kein** Lernfeature für Endnutzer.
- Erfolg bedeutet nur: lokale Erreichbarkeit + Tags-Liste (oder Fake).
- Concept-Demo auf Railway nutzt weiterhin nur den Mock-Tutor.
- Kein Claim „Live-KI im Portal“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| M5-A | Mock-Tutor + Pilot-UI | integriert |
| M5-B | lokaler Ollama-Proof | dieses Dokument |
| S56 | Live-RAG / Staging-Flags | **gesperrt** |
