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
| **M2** | Kurze vorproduzierte Videos + VTT-Captions | Storage/Bandwidth | nach M1 Pilot |
| **M3** | Scripted Guide-Mascot (SVG/Lottie), kein freier Chat | vernachlässigbar | nach M1 |
| **M4** | Optional: vorgerenderte Audio-Clips (Piper lokal) | Storage | optional |
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

## 9. Nächster Implementierungsschritt

**M1 Pilot:** Manifest + `MediaFigure` + eigene SVG-Illustrationen für
Lektion `l1` („Was ist KI?“), Gate `pnpm test:media-m0`.

```text
MEDIA_M1_PILOT_AUTHORIZED_BY_M0=YES
MEDIA_M2_AUTHORIZED=NO
MEDIA_M3_AUTHORIZED=NO
MEDIA_M5_AI_AUTHORIZED=NO
```
