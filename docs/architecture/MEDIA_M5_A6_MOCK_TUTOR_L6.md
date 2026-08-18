# MEDIA M5-A6 — Mock-Tutor Expansion (Lektion l6)

**Status:** Scope-Lock + Mock-Tutor-Erweiterung für Lektion `l6`  
**Stand:** 18. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M5-A5 / S56-C6 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Den deterministischen Mock-Tutor von Lektion `l1`–`l5` auf `l6`
erweitern — weiterhin nur Preset-Fragen, kein Netz, keine Live-KI.

```text
MEDIA_M5_A6_SCOPE_LOCK=YES
MEDIA_M5_A6_MOCK_L6_AUTHORIZED=YES
MEDIA_M5_A6_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A6_NETWORK_FORBIDDEN=YES
MEDIA_M5_A6_LIVE_LLM=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. Drei kuratierte Mock-Fragen für `l6` (Formulieren, private Daten, Prüfung).
3. `MockTutorPanel` in Lektion `l6` (neben weiterhin `l1`–`l5`).
4. Tests + bestehendes Gate `pnpm test:media-m5`.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Quellen-Suche (S56-C / C2 / C3 / C4 / C5 / C6 / C7)
- Ollama / Live-LLM
- Embeddings / Flag-Flip
- Mock-Tutor für `l7+` (siehe `MEDIA_M5_A7_MOCK_TUTOR_L7.md`)

## 4. Honesty

Unverändert M5-A: `mode: "mock_curated"`, Enthaltung bei unbekannter Frage.
