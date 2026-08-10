import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „Daten, Sicherheit & Recht“ — Schema v2.
 * Verknüpft u. a. mit l10 und l12; weitere Einheiten direkt in der Themenwelt.
 */
export const microUnitsSafetyLaw: MicroLearningUnitV2[] = [
  {
    id: "mu-safety-01",
    worldId: "world-safety-law",
    lessonId: "l10",
    order: 1,
    title: "Was sind sensible Daten — in Alltagssprache?",
    whyUseful:
      "Wenn du sensible Daten erkennst, stoppst du rechtzeitig, bevor etwas in den Prompt rutscht.",
    oneSentence:
      "Sensible Daten sind Infos, mit denen jemand dich oder andere identifizieren oder schädigen könnte.",
    everydayExample:
      "Name plus Adresse, Krankenakte, Passwort, Kundennummer, Gehalt — alles gehört nicht ungefragt in einen öffentlichen Chat.",
    steps: [
      "Frage: Kann jemand daraus eine Person oder ein Geheimnis erkennen?",
      "Ersetze Identifizierer durch Platzhalter (Person A, Ort X).",
      "Kürze den Text auf das, was die KI wirklich braucht.",
    ],
    practiceTask:
      "Markiere in einem erfundenen Absatz drei sensible Stellen und ersetze sie durch Platzhalter.",
    samplePath:
      "Vorher: „Frau Meier, Berliner Str. 12, IBAN …“ Nachher: „Person A, Adresse ungenannt, Bankdaten weglassen.“",
    whyItWorks:
      "Datensparsamkeit ist die einfachste Schutzregel — weniger Input, weniger Risiko.",
    commonMistake:
      "„Ist ja nur für mich“ — und trotzdem echte Daten in ein fremdes System tippen.",
    safetyNote:
      "Gesundheits-, Finanz- und Kundendaten gehören nicht in öffentliche KI-Chats.",
    retrievalQuestions: [
      "Was macht Daten „sensibel“?",
      "Nenne drei Beispiele aus dem Alltag.",
      "Was ist ein Platzhalter?",
    ],
    teachBackPrompt:
      "Erklär einer Freundin in einem Satz, welche Daten nie in einen Prompt gehören.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-safety-02",
    worldId: "world-safety-law",
    lessonId: "l10",
    order: 2,
    title: "Die Platzhalter-Regel für sichere Prompts",
    whyUseful:
      "Du kannst weiter Hilfe holen — ohne echte Namen, Nummern oder Geheimnisse preiszugeben.",
    oneSentence:
      "Formuliere die Aufgabe mit Platzhaltern und allgemeinen Fakten, nie mit echten Identifikatoren.",
    everydayExample:
      "Statt Krankenakte: „Erkläre allgemein, was eine Überweisung zum Facharzt bedeutet — ohne Diagnose.“",
    steps: [
      "Schreibe den Wunsch zuerst mit echten Details (nur lokal, nicht absenden).",
      "Ersetze alle Namen, Nummern und Orte durch Platzhalter.",
      "Prüfe: Reicht der Rest für eine brauchbare Antwort?",
    ],
    practiceTask:
      "Baue aus einer privaten Mail-Idee einen Prompt nur mit Platzhaltern.",
    samplePath:
      "„Formuliere eine höfliche Erinnerung an Person A wegen Termin X. Keine Adresse, kein Betrag, keine Vertragsnummer.“",
    whyItWorks:
      "Die KI braucht oft nur Struktur und Ton — nicht deine Geheimnisse.",
    commonMistake:
      "Ganze Dokumente hineinkopieren, „weil es schneller geht“.",
    safetyNote:
      "Auch Metadaten (Dateiname mit Kundenname) können verräterisch sein — vorher bereinigen.",
    retrievalQuestions: [
      "Wozu dienen Platzhalter?",
      "Warum reichen oft allgemeine Fakten?",
      "Was prüfst du vor dem Absenden?",
    ],
    teachBackPrompt:
      "Zeige an einem Beispiel: Prompt vorher (riskant) und nachher (sicher).",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-progressive", "method-retrieval"],
  },
  {
    id: "mu-safety-03",
    worldId: "world-safety-law",
    lessonId: null,
    order: 3,
    title: "Firmenregeln und öffentliche Tools",
    whyUseful:
      "Im Beruf gelten oft strengere Regeln als privat — du vermeidest teure Fehler.",
    oneSentence:
      "Prüfe vor jedem beruflichen Prompt: Darf dieses Tool überhaupt mit diesen Daten arbeiten?",
    everydayExample:
      "Kundenbeschwerde mit Adresse und Vertragsnummer: erst Firmenrichtlinie, dann Platzhalter — oder internes Tool.",
    steps: [
      "Kläre, welche KI-Tools dein Arbeitgeber freigibt.",
      "Trenne: öffentliche Demo vs. freigegebene Firmenlösung.",
      "Bei Unsicherheit: Daten weglassen oder nachfragen.",
    ],
    practiceTask:
      "Schreibe drei Fragen, die du vor dem ersten beruflichen KI-Einsatz klären würdest.",
    samplePath:
      "1) Welche Tools sind freigegeben? 2) Welche Datenklassen sind tabu? 3) Wer gibt Entwürfe frei?",
    whyItWorks:
      "Klare Regeln ersetzen Rätselraten und schützen Kund:innen und Team.",
    commonMistake:
      "Privat-Account mit Kundendaten „kurz ausprobieren“.",
    safetyNote:
      "Vertrags- und Kundendaten ohne Freigabe nicht in externe Systeme geben.",
    retrievalQuestions: [
      "Warum unterscheiden sich Privat und Beruf?",
      "Was klärst du vor dem Einsatz?",
      "Was tun bei Unsicherheit?",
    ],
    teachBackPrompt:
      "Erklär die Regel „Tool freigegeben + Daten sparsam“ in eigenen Worten.",
    sourceIds: ["eu-gdpr", "nist-ai-rmf", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-safety-04",
    worldId: "world-safety-law",
    lessonId: null,
    order: 4,
    title: "AI Act in Alltagssprache: Risiken ernst nehmen",
    whyUseful:
      "Du verstehst, warum manche KI-Nutzungen stärker geprüft werden müssen — ohne Panik.",
    oneSentence:
      "Je größer der Schaden bei Fehlern sein kann, desto vorsichtiger musst du KI einsetzen und prüfen.",
    everydayExample:
      "Einkaufsliste umschreiben: geringes Risiko. Personalentscheidung oder medizinischer Rat: hohes Risiko — Mensch und Fachquelle nötig.",
    steps: [
      "Schätze: Was passiert, wenn die Antwort falsch ist?",
      "Bei hohem Schaden: KI nur als Entwurf, nie als Entscheidung.",
      "Dokumentiere grob, was du geprüft hast.",
    ],
    practiceTask:
      "Sortiere fünf Alltagsaufgaben in „gering / mittel / hoch“ nach Schadensrisiko.",
    samplePath:
      "Gering: Synonyme. Mittel: Bewerbungsmail. Hoch: „Soll ich diesen Vertrag unterschreiben?“",
    whyItWorks:
      "Risikodenken steuert Prüfung — nicht der Hype um das Tool.",
    commonMistake:
      "Überzeugenden Ton mit geringer Fehlergefahr verwechseln.",
    safetyNote:
      "Rechtliche und gesundheitliche Entscheidungen nicht allein der KI überlassen.",
    retrievalQuestions: [
      "Wann ist das Risiko hoch?",
      "Was bedeutet „KI nur als Entwurf“?",
      "Warum reicht guter Stil nicht?",
    ],
    teachBackPrompt:
      "Erklär einer Kollegin, warum Risiko die Prüfpflicht steuert.",
    sourceIds: ["eu-ai-act", "oecd-ai-principles", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-scenario", "method-teachback", "method-retrieval"],
  },
  {
    id: "mu-safety-05",
    worldId: "world-safety-law",
    lessonId: null,
    order: 5,
    title: "Urheberrecht grob: Was darfst du übernehmen?",
    whyUseful:
      "Du vermeidest, fremde Werke oder KI-Text blind als „dein Eigentum“ zu behandeln.",
    oneSentence:
      "KI kann Formulierungen vorschlagen — Verantwortung für Nutzung, Rechte und Quellen bleibst du.",
    everydayExample:
      "Ein KI-Gedicht für die Familienfeier: oft okay. Einen KI-Text als wissenschaftliche Arbeit ausgeben: problematisch und oft gegen Regeln.",
    steps: [
      "Frage: Für welchen Zweck und welches Publikum?",
      "Prüfe Haus- oder Firmenregeln zu KI-Texten.",
      "Kennzeichne KI-Hilfe, wenn Transparenz erwartet wird.",
    ],
    practiceTask:
      "Formuliere eine kurze Transparenzzeile für eine Blog-Notiz mit KI-Hilfe.",
    samplePath:
      "„Entwurf mit KI-Unterstützung erstellt, Inhalt und Fakten von mir geprüft.“",
    whyItWorks:
      "Transparenz und Prüfung reduzieren Missverständnisse und Regelbrüche.",
    commonMistake:
      "Annehmen, „die KI hat’s geschrieben, also ist alles frei und wahr“.",
    safetyNote:
      "Fremde Marken, Fotos und geschützte Werke nicht ungeprüft weiterverwenden.",
    retrievalQuestions: [
      "Wer trägt die Verantwortung für die Nutzung?",
      "Wann ist Kennzeichnung sinnvoll?",
      "Was ersetzt KI-Text nicht?",
    ],
    teachBackPrompt:
      "Sag in zwei Sätzen, was du bei KI-Texten zu Rechten beachtest.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-safety-06",
    worldId: "world-safety-law",
    lessonId: null,
    order: 6,
    title: "Phishing und Fake mit KI: Misstrauen trainieren",
    whyUseful:
      "Du erkennst, dass flüssige Texte und Bilder nicht automatisch echt oder harmlos sind.",
    oneSentence:
      "KI macht Betrug oft glaubwürdiger — prüfe Absender, Links und ungewöhnliche Bitten extra.",
    everydayExample:
      "Mail „von der Bank“ mit perfektem Deutsch und Dringlichkeit: trotzdem Link und Kontodaten nicht blind folgen.",
    steps: [
      "Stopp bei Dringlichkeit und Geheimnis-Aufforderung.",
      "Prüfe Absender und Domain unabhängig (nicht im Mail-Link).",
      "Bei Zweifel: offiziellen Kanal nutzen, nicht antworten.",
    ],
    practiceTask:
      "Liste drei Warnsignale einer verdächtigen „Bank-Mail“ auf.",
    samplePath:
      "1) Dringlichkeit 2) Link zu unbekannter Domain 3) Bitte um Passwort oder TAN",
    whyItWorks:
      "Ein kurzes Stopp-Ritual unterbricht den Automatismus „klingt gut → klicken“.",
    commonMistake:
      "Nur auf Rechtschreibung achten — moderne Fakes sind oft fehlerfrei.",
    safetyNote:
      "Nie Zugangsdaten, TANs oder Dokumente über ungeprüfte Kanäle senden.",
    retrievalQuestions: [
      "Warum hilft flüssiges Deutsch nicht als Echtheitsbeweis?",
      "Was prüfst du außer dem Text?",
      "Was tust du bei Zweifel?",
    ],
    teachBackPrompt:
      "Erklär das Stopp-Ritual gegen KI-gestützte Fakes.",
    sourceIds: ["nist-genai-profile", "digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-playful", "method-retrieval"],
  },
  {
    id: "mu-safety-07",
    worldId: "world-safety-law",
    lessonId: "l12",
    order: 7,
    title: "Dein Sicherheits-Check vor dem Absenden",
    whyUseful:
      "Ein festes Ritual schützt dich besser als gelegentliche Vorsätze.",
    oneSentence:
      "Vor jedem Prompt: Daten sparsam? Zweck klar? Risiko eingeschätzt? Ergebnis später prüfen?",
    everydayExample:
      "Ob Einkaufsliste oder Kundenmail-Entwurf: dieselbe Vier-Punkte-Liste vor dem Senden.",
    steps: [
      "Daten-Scan: Geheimnisse und Identifikatoren weg?",
      "Zweck: Brauche ich KI wirklich für diesen Schritt?",
      "Prüfplan: Was muss ich nach der Antwort gegenlesen?",
    ],
    practiceTask:
      "Schreibe deinen persönlichen Vier-Punkte-Check auf eine Karteikarte.",
    samplePath:
      "1) Platzhalter 2) Zweck 3) Risiko 4) Gegenlesen / Quelle",
    whyItWorks:
      "Routinen bleiben unter Zeitdruck besser als spontane Vorsicht.",
    commonMistake:
      "Nur nach peinlichen Fehlern vorsichtig sein — und dazwischen alles tippen.",
    safetyNote:
      "Bei hohem Risiko: lieber pausieren als „schnell noch absenden“.",
    retrievalQuestions: [
      "Welche vier Punkte gehören zum Check?",
      "Warum vor dem Absenden?",
      "Was ändert sich bei hohem Risiko?",
    ],
    teachBackPrompt:
      "Führe jemanden laut durch deinen Sicherheits-Check.",
    sourceIds: ["eu-gdpr", "nist-ai-rmf", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-progressive", "method-retrieval", "method-spaced"],
  },
  {
    id: "mu-safety-08",
    worldId: "world-safety-law",
    lessonId: "l12",
    order: 8,
    title: "Abschluss: Sicher starten, ruhig bleiben",
    whyUseful:
      "Du verlässt die Welt mit klaren Regeln — ohne Angst und ohne Leichtsinn.",
    oneSentence:
      "Sensibel erkennen, Platzhalter nutzen, Risiko einschätzen, Ergebnis prüfen — dann erst übernehmen.",
    everydayExample:
      "Familie, Hobby, Beruf: dieselbe Haltung. KI hilft beim Formulieren, du bleibst verantwortlich.",
    steps: [
      "Wiederhole deine drei wichtigsten Regeln laut.",
      "Wähle eine reale Aufgabe für heute und wende den Check an.",
      "Notiere, was du beim nächsten Mal noch besser machen willst.",
    ],
    practiceTask:
      "Formuliere in fünf Zeilen dein persönliches Sicherheitsversprechen.",
    samplePath:
      "1) Keine Geheimnisse 2) Platzhalter 3) Firmenregeln 4) Risiko steuert Prüfung 5) Mensch entscheidet",
    whyItWorks:
      "Ein kurzes Versprechen ist leichter zu erinnern als lange Richtlinien.",
    commonMistake:
      "Nach dem Kurs glauben, man sei „fertig“ und Prüfung sei optional.",
    safetyNote:
      "Sicherheit ist Gewohnheit — bei neuen Tools den Check erneut anwenden.",
    retrievalQuestions: [
      "Welche fünf Regeln nimmst du mit?",
      "Wer entscheidet am Ende?",
      "Was tust du bei einem neuen Tool?",
    ],
    teachBackPrompt:
      "Erklär einem Anfänger in 30 Sekunden, wie man KI sicherer startet.",
    sourceIds: ["eu-gdpr", "eu-ai-act", "digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-confidence", "method-spaced"],
  },
  {
    id: "mu-safety-09",
    worldId: "world-safety-law",
    lessonId: null,
    order: 9,
    title: "Löschen, Auskunft, Kontrolle — deine Rechte grob",
    whyUseful:
      "Du weißt, dass Datenschutz nicht nur „nichts tippen“ heißt — sondern auch Kontrolle über Daten.",
    oneSentence:
      "Bei personenbezogenen Daten zählen Zweck, Sparsamkeit und oft Rechte wie Auskunft oder Löschung — je nach Kontext und Anbieter.",
    everydayExample:
      "Du hast versehentlich einen Namen in ein Tool getippt: Zugang prüfen, Eintrag löschen falls möglich, Vorgang notieren, künftig Platzhalter.",
    steps: [
      "Frage: Welche personenbezogenen Daten waren betroffen?",
      "Nutze verfügbare Lösch-/Kontofunktionen des Tools.",
      "Passe deine Prompt-Gewohnheit an, damit es nicht wieder passiert.",
    ],
    practiceTask:
      "Schreibe drei Schritte nach einem versehentlichen Daten-Leak in einen Chat.",
    samplePath:
      "1) Inhalt sichern/notieren (ohne zu teilen) 2) Löschen/widerrufen wo möglich 3) Regel verschärfen",
    whyItWorks:
      "Schnelle Reaktion begrenzt Schaden — Prävention bleibt wichtiger.",
    commonMistake:
      "Ignorieren („ist ja nur ein Name“) und weitermachen wie bisher.",
    safetyNote:
      "Bei beruflichen Leaks: interne Meldewege nutzen, nicht allein „aussitzen“.",
    retrievalQuestions: [
      "Was tust du nach einem versehentlichen Leak?",
      "Warum Prävention wichtiger ist?",
      "Wen informierst du im Beruf?",
    ],
    teachBackPrompt:
      "Erklär in einfachen Worten, warum Löschen und Sparsamkeit zusammengehören.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-safety-10",
    worldId: "world-safety-law",
    lessonId: null,
    order: 10,
    title: "Abschluss: Sicherheitsregeln im Team teilen",
    whyUseful:
      "Du machst aus persönlichen Gewohnheiten kurze, teilbare Regeln für Familie oder Kolleg:innen.",
    oneSentence:
      "Drei bis fünf klare Sätze reichen oft: was nie in Prompts darf, wann Freigabe nötig ist, wie Prüfung aussieht.",
    everydayExample:
      "Teamkarte: „Keine Kundendaten in öffentliche Chats. Platzhalter. Entwürfe gegenlesen. Bei Zweifel: nachfragen.“",
    steps: [
      "Wähle deine drei wichtigsten Regeln.",
      "Formuliere sie in Alltagssprache.",
      "Hänge sie sichtbar an (Notiz, Wiki) und reviewt sie regelmäßig.",
    ],
    practiceTask:
      "Schreibe eine Team- oder Familienkarte mit fünf Zeilen.",
    samplePath:
      "1) Keine Geheimnisse 2) Platzhalter 3) Freigegebene Tools 4) Risiko steuert Prüfung 5) Mensch entscheidet",
    whyItWorks:
      "Geteilte Regeln verhindern „jede:r tippt anders“.",
    commonMistake:
      "Lange Richtlinien schreiben, die niemand liest — statt kurzer Karten.",
    safetyNote:
      "Karten selbst ohne echte Fallbeispiele mit Kundendaten formulieren.",
    retrievalQuestions: [
      "Wie viele Regeln reichen oft?",
      "Warum Alltagssprache?",
      "Wann reviewst du die Karte?",
    ],
    teachBackPrompt:
      "Trage deine Sicherheitskarte jemandem in 30 Sekunden vor.",
    sourceIds: ["eu-gdpr", "eu-ai-act", "nist-ai-rmf", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-spaced", "method-progressive"],
  },
];
