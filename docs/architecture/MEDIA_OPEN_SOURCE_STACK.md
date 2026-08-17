# Media Open-Source Stack — Scope-Lock M0 + Phasenplan

**Status:** M0 Scope-Lock (Dokumentation + Schema-Vertrag)  
**Stand:** 16. August 2026  
**Baseline `main` bei Erstellung:** `9e0814b7beab3607fdd2a39b97a133a411c206a0` (#225)  
**Autorisierung dieses Dokuments:** menschliche Freigabe der Medien-Hierarchie (Bilder → Video → scripted Guide → optional lokal OS-KI)  
**Keine Rechtsberatung.** Haftungs- und Compliance-Hinweise dienen der technischen Vorsorge; verbindliche Bewertung bleibt menschlich/juristisch.

## 1. Zweck

Kontrollierte, **Open-Source- und ohne-SaaS-API**-Medienfähigkeit für die
Concept-Demo, passend zu Package-DAG, Honesty-Linie und Quality-Gates.

```text
MEDIA_M0_SCOPE_LOCK=YES
MEDIA_OPEN_SOURCE_ONLY=YES
MEDIA_PAID_SAAS_FORBIDDEN=YES
MEDIA_LIVE_LLM_FORBIDDEN_UNTIL_S56_FREIGABE=YES
MEDIA_LIVE_PHOTOREAL_AVATAR_RUNTIME_FORBIDDEN=YES
MEDIA_BIOMETRIC_TRACKING_FORBIDDEN=YES
```

## 2. Verbindliche Priorität (nicht überspringen)

| Phase | Inhalt | Runtime-Kosten | Freigabe |
|-------|--------|----------------|----------|
| **M0** | Scope-Lock, Schema, License-Ledger, Gate | keine | dieses Dokument |
| **M1** | Statische Illustrationen (SVG/WebP), `MediaFigure` | Build/CDN-Traffic gering | nach M0 |
| **M2** | Kurze vorproduzierte Videos + VTT-Captions | Storage/Bandwidth | M2-Pilot freigegeben; Bibliothek gesperrt |
| **M3** | Scripted Guide-Mascot (SVG/Lottie), kein freier Chat | vernachlässigbar | M3-Pilot freigegeben |
| **M4** | Optional: vorgerenderte Audio-Clips (Piper lokal) | Storage | M4-Pilot freigegeben |
| **M5** | `packages/ai-core` Mock-Tutor + lokaler Ollama-Proof | nur Dev/Staging | **S56 + Privacy** |
| **M6** | Optional: offline gerenderte Talking-Head-Clips (SadTalker/MuseTalk) | GPU lokal, dann static | optional |
| **M7** | Flag-gated RAG nur Staging | Hosting/GPU | explizite Freigabe |

Synergie-Regel: **eine kuratierte Textwahrheit** speist Bild-Slots, Video-Skripte,
Mascot-Zeilen und später RAG. Keine parallelen KI-Wahrheiten.

## 3. Architektur-Fit

```text
apps/web          UI: MediaFigure, VideoPlayer (M2), GuideMascot (M3)
data/             media-manifest.ts (Lizenz + Alt + Zweck)
packages/domain   spätere Domain-Typen nur nach Bedarf
packages/ai-core  erst M5+; kein SDK in React-Komponenten
scripts/media/    lokale OS-Pipelines (ffmpeg, piper) — nicht Prod-Runtime
```

Importregeln laut `PACKAGE_DAG.md` / ADR-0002 bleiben unberührt.
Keine bezahlten Cloud-Avatar-/TTS-/LLM-APIs ohne Kostenfreigabe
(`docs/agent-ops/SAFETY_RULES.md`).

## 4. Open-Source-Werkzeuge (Referenz, nicht alles sofort installieren)

### M1 Bilder
- Quellen: CC0/MIT-Illustrationen oder **eigene** SVG im Repo
- Tools: Inkscape, SVGO
- Runtime: Inline-SVG oder `next/image` (Bitmap)

### M2 Video (vorproduziert)
- FFmpeg, Piper TTS (DE-Stimmen), faster-whisper / whisper.cpp → VTT
- Optional: Scholium, Motion Canvas, Revideo (Lizenz prüfen)
- **Nicht** Remotion ohne Company-License-Klärung
- **Nicht** HeyGen / Synthesia / D-ID Cloud

### M3 Guide
- Eigene SVG-State-Maschine oder Lottie (`lottie-web`, MIT)
- Rive-Editor ist **nicht** FOSS → bei striktem OS-Pfad meiden
- Anbindung an bestehende Next-Step- / Soft-Start- / Coach-Flows

### M5–M7 KI (gesperrt bis Freigabe)
- Ollama lokal; Adapter nur in `packages/ai-core`
- Photoreal Live-Avatar-Runtime (MuseTalk o. ä.) **nicht** auf Railway-Concept-Demo

## 5. Compliance & Haftung (vigilant)

**Keine Rechtsberatung.** Ziel: technische und redaktionelle Vorsorge, damit
das Portal **nachweisbar vorsichtig** bleibt.

### 5.1 Bestehende Pflichten (DE/EU — typisch relevant)
- **DSGVO / BDSG:** keine unnötige Personenbezug-Verarbeitung durch Medien;
  keine Voice-/Gesichtsbiometrie; keine Analyse von Nutzer-Webcam/Mikrofon
  ohne gesonderte Rechtsgrundlage und Consent-Design.
- **TMG / DDG (je nach Stand):** Impressum, Verantwortlichkeit, Concept-Demo-Klarheit.
- **Urheberrecht:** jedes Asset im License-Ledger; keine ungeprüften Web-Scrapes.
- **Barrierefreiheit (BFSG-Horizont / WCAG-Ziel):** Alt-Texte, Captions,
  `prefers-reduced-motion`, Tastaturbedienbarkeit.
- **UWG / Transparenz:** keine Irreführung („Live-KI“, „menschlicher Tutor“),
  wenn nur Script/Static vorliegt.

### 5.2 Aufkommende / erweiterte Regime (Beobachtungspflicht)
- **EU AI Act:** bei späterem Live-Tutor Transparenz, Risiko-Klassifikation,
  Logging-Grenzen — **vor** Aktivierung bewerten; Concept-Demo ohne Live-LLM
  bleibt bewusst unterhalb.
- **Deepfake-/Synthetic-Media-Kennzeichnung:** vorproduzierte synthetische
  Gesichter/Stimmen müssen als solche erkennbar sein (UI + Manifest).
- Nationale Umsetzungen und Aufsichtspraxis: vor Prod-Auth / Live-KI erneut prüfen.

### 5.3 Liability-by-design (Portal)
1. Concept-Demo-Banner und Footer-Honesty bleiben führend.  
2. Medien ersetzen keine Rechts-, Medizin-, Finanz- oder Förderberatung
   (bereits Impressum/Datenschutz).  
3. Keine automatischen verbindlichen Entscheidungen über Personen.  
4. Quellenparität für claim-bearing Text bleibt Pflicht; Medien illustriert,
   begründet nicht allein.  
5. Feature-Flags für alles Interaktive jenseits Static.  
6. Keine Tracking-, Affiliate- oder Paywall-Medien-SDKs ohne Freigabe.  
7. SEO bleibt `noindex`, bis Index-Öffnung bewusst entschieden ist.

### 5.4 Explizit verboten in diesem Scope
```text
PAID_MEDIA_SAAS=NO
LIVE_UNLABELLED_SYNTHETIC_HUMAN=NO
USER_WEBCAM_MIC_CAPTURE_FOR_AVATAR=NO
BIOMETRIC_EMOTION_ATTENTION_TRACKING=NO
OPEN_WEB_RAG_WITHOUT_CURATION=NO
PRODUCTION_LIVE_LLM=NO
```

## 6. Content-Vertrag (Schema)

Siehe auch `CONTENT_SCHEMA_V2.md` und `apps/web/src/data/types.ts`.

```text
MediaAsset {
  id
  kind: illustration | poster | video | audio | mascot_state
  title
  alt          // Pflicht bei sichtbaren Standbildern
  purpose      // Lern-/UI-Zweck in einfacher Sprache
  src          // Repo-Pfad oder componentKey
  license      // z.B. CC0-1.0 | MIT | AllRights-Project
  licenseNote
  synthetic    // true bei KI-/synthetisch erzeugtem Asset
  captionsVtt? // Pflicht bei video sobald M2
  phase        // m1 | m2 | m3 | m4 | m6
  lastReviewed
}
```

Lektionen dürfen optional `mediaIds: string[]` tragen (Referenzen auf Manifest).

## 7. Qualitätsgates

- Static Gate: Manifest ↔ genutzte IDs ↔ Pflichtfelder / Lizenzen  
- Bestehende Gates: `source:check`, portal-clarity, packaging, a11y-Smokes  
- M2+: Captions-Datei existiert; Reduced-Motion respektiert  

## 8. Nicht autorisiert durch M0 allein

- Auslieferung großer Video-Bibliotheken ohne Bandwidth-Review  
- Live-Avatar-Streaming  
- Ollama/RAG in Production  
- Änderung von Production-Autodeploy / SEO-Index  
- Rechtsverbindliche Claims „haftungsfrei“ — nur **vorsorgeorientierte** Technik

## 9. Implementierungsstand

**M1 Pilot:** Manifest + `MediaFigure` + eigene SVG-Illustrationen für
Lektion `l1` — integriert.

**M2 Pilot:** ein kurzer vorproduzierter Clip + VTT + `MediaVideoPlayer`
für Lektion `l1` — Captions Pflicht, kein Autoplay-Ton, Reduced-Motion-Hinweis.

**M3 Pilot:** scripted Guide-Mascot (SVG) im 3-Minuten-Coach — feste Texte,
Posen idle/point/celebrate, Honesty-Hinweis, kein Chat und keine Live-KI.

**M4 Pilot:** vorproduzierte Piper-Hörfassung + sichtbares Transkript für
Lektion `l1` — synthetische Stimme gekennzeichnet, kein Laufzeit-TTS, kein Mikrofon.
Integriert über #229 (`d6b50f2d5566`).

**M5-A Pilot:** deterministischer Mock-Tutor in `packages/ai-core` + Pilot-UI
in Lektion `l1` (nur vorgegebene Fragen, keine Live-KI). Scope:
`MEDIA_M5_A_IMPLEMENTATION_SCOPE.md`. Integriert über #231 (`021791469980`).

**M5-A2:** Mock-Tutor-Expansion auf Lektion `l2` — Scope
`MEDIA_M5_A2_MOCK_TUTOR_L2.md`. Integriert über #249 (`e34ee929bc6a`).
Weiterhin Preset-Fragen, kein Freitext, keine Live-KI.

**M5-B Proof:** lokaler Ollama-Adapter + Fake-Tests + optionaler Dev-Skript —
**kein** Product-UI, **kein** Railway-LLM. Scope:
`MEDIA_M5_B_IMPLEMENTATION_SCOPE.md`. Integriert über #233 (`60b6eae1e10c`).

**S56-A:** kuratiertes Retrieval (`retrieveCurated`) mit Zitaten/Enthaltung —
Scope `S56_A_RAG_SCOPE_LOCK.md`. Integriert über #235 (`ffa90f6e9e70`).
Kein Live-LLM, kein Vektorindex, kein Flag-Flip.

**S56-B:** Privacy-Review + Staging-Flag-Entscheidung ohne Flip —
`S56_B_STAGING_FLAG_PRIVACY.md`. Integriert über #237 (`a239aa58ea06`).
`ai_rag_runtime` bleibt default `false`.

**S56-C Pilot:** kuratierte Quellen-Suche in Lektion `l1` (Preset-Queries,
Zitate/Enthaltung) — Scope `S56_C_CURATED_RETRIEVAL_UI.md`. Integriert über
#239 (`caf0caf64f20`). Kein Freitext-Chat, kein Flag-Flip, keine Embeddings,
keine Live-KI.

**S56-C2:** Expansion auf Lektion `l2` — Scope
`S56_C2_CURATED_RETRIEVAL_EXPANSION.md`. Integriert über #244 (`167b3199c035`).
Korpus + Preset-UI, gleiche Grenzen.

**S56-C3:** Expansion auf Lektion `l3` — Scope
`S56_C3_CURATED_RETRIEVAL_EXPANSION.md`. Integriert über #248 (`6cac7a22d40d`).
Korpus + Preset-UI, gleiche Grenzen.

```text
MEDIA_M1_PILOT_AUTHORIZED_BY_M0=YES
MEDIA_M2_PILOT_AUTHORIZED=YES
MEDIA_M2_LIBRARY_EXPANSION=NO
MEDIA_M3_PILOT_AUTHORIZED=YES
MEDIA_M3_CHAT_FORBIDDEN=YES
MEDIA_M4_PILOT_AUTHORIZED=YES
MEDIA_M4_RUNTIME_TTS_FORBIDDEN=YES
MEDIA_M4_INTEGRATED_TO_MAIN=YES
MEDIA_M4_MERGE_COMMIT=d6b50f2d5566250bff7a8c6b6e99d4afc00f530a
MEDIA_M5_A_SCOPE_LOCK=YES
MEDIA_M5_A_MOCK_AUTHORIZED=YES
MEDIA_M5_A_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A_NETWORK_FORBIDDEN=YES
MEDIA_M5_A_INTEGRATED_TO_MAIN=YES
MEDIA_M5_A_MERGE_COMMIT=0217914699804bafd36015c74b2f0ab73afe4c4c
MEDIA_M5_A2_SCOPE_LOCK=YES
MEDIA_M5_A2_MOCK_L2_AUTHORIZED=YES
MEDIA_M5_A2_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A2_INTEGRATED_TO_MAIN=YES
MEDIA_M5_A2_MERGE_COMMIT=e34ee929bc6a35965c9bdcedfc4409d9699030cb
MEDIA_M5_B_SCOPE_LOCK=YES
MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES
MEDIA_M5_B_DEV_ONLY=YES
MEDIA_M5_B_LOCALHOST_ONLY=YES
MEDIA_M5_B_PRODUCT_UI=NO
MEDIA_M5_B_RAILWAY=NO
MEDIA_M5_B_INTEGRATED_TO_MAIN=YES
MEDIA_M5_B_MERGE_COMMIT=60b6eae1e10c320d0ff468a4be975cc4363810d8
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
MEDIA_M5_AI_AUTHORIZED=NO
S56_A_SCOPE_LOCK=YES
S56_A_CURATED_RETRIEVAL_AUTHORIZED=YES
S56_A_LIVE_LLM=NO
S56_A_VECTOR_DB=NO
S56_A_PRODUCT_UI=NO
S56_A_STAGING_FLAG_FLIP=NO
S56_A_INTEGRATED_TO_MAIN=YES
S56_A_MERGE_COMMIT=ffa90f6e9e704bd83e585361d6ad32d63619df71
S56_B_SCOPE_LOCK=YES
S56_B_PRIVACY_REVIEW_DOCUMENTED=YES
S56_B_STAGING_FLAG_DECISION_DOCUMENTED=YES
S56_B_STAGING_FLAG_FLIP_EXECUTED=NO
S56_B_PRODUCTION_FLAG_FLIP=NO
S56_B_INTEGRATED_TO_MAIN=YES
S56_B_MERGE_COMMIT=a239aa58ea06f97bc7c66bd8a493529a3f2e0906
S56_C_SCOPE_LOCK=YES
S56_C_CURATED_RETRIEVAL_UI_AUTHORIZED=YES
S56_C_FREE_CHAT_FORBIDDEN=YES
S56_C_LIVE_LLM=NO
S56_C_EMBEDDINGS=NO
S56_C_STAGING_FLAG_FLIP=NO
S56_C_INTEGRATED_TO_MAIN=YES
S56_C_MERGE_COMMIT=caf0caf64f2042b3de7e13b89cecfe371f8da27b
S56_C2_SCOPE_LOCK=YES
S56_C2_CURATED_L2_AUTHORIZED=YES
S56_C2_FREE_CHAT_FORBIDDEN=YES
S56_C2_LIVE_LLM=NO
S56_C2_EMBEDDINGS=NO
S56_C2_STAGING_FLAG_FLIP=NO
S56_C2_INTEGRATED_TO_MAIN=YES
S56_C2_MERGE_COMMIT=167b3199c03572fbe80cb81bf10f11160ca0a38c
S56_C3_SCOPE_LOCK=YES
S56_C3_CURATED_L3_AUTHORIZED=YES
S56_C3_FREE_CHAT_FORBIDDEN=YES
S56_C3_LIVE_LLM=NO
S56_C3_EMBEDDINGS=NO
S56_C3_STAGING_FLAG_FLIP=NO
S56_C3_INTEGRATED_TO_MAIN=YES
S56_C3_MERGE_COMMIT=6cac7a22d40d4dd9ff99ac924b61880a95299be1
```

Nächster Schritt nur mit Freigabe: **S56-B2** (Staging-Flag-Flip + HTTP-Probe),
**S56-D** (Embeddings/Index) oder **M7** (Flag-gated Staging-RAG UI).
