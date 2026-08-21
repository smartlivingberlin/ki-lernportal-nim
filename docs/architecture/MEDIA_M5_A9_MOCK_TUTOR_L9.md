# MEDIA M5-A9 — Mock-Tutor Expansion (Lektion l9)

**Status:** Scope-Lock + Mock-Tutor-Erweiterung für Lektion `l9`  
**Stand:** 19. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M5-A8 / S56-C9 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Den deterministischen Mock-Tutor von Lektion `l1`–`l8` auf `l9`
(*Quellen prüfen*) erweitern — weiterhin nur Preset-Fragen, kein Netz,
keine Live-KI.

```text
MEDIA_M5_A9_SCOPE_LOCK=YES
MEDIA_M5_A9_MOCK_L9_AUTHORIZED=YES
MEDIA_M5_A9_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A9_NETWORK_FORBIDDEN=YES
MEDIA_M5_A9_LIVE_LLM=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. Drei kuratierte Mock-Fragen für `l9` (Quelle, Prüfung, Erklärung vs. Beleg).
3. `MockTutorPanel` in Lektion `l9` (neben weiterhin `l1`–`l8`).
4. Tests + bestehendes Gate `pnpm test:media-m5`.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Quellen-Suche (S56-C / C2–C10)
- Ollama / Live-LLM
- Embeddings / Flag-Flip
- Mock-Tutor für `l10+` (später)

## 4. Honesty

Unverändert M5-A: `mode: "mock_curated"`, Enthaltung bei unbekannter Frage.
