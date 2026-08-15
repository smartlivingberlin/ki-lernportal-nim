import type { InteractiveChallenge } from "./types";

/**
 * Interaktive Mini-Challenges — spielerisch, aber kein Spielportal.
 * Startfokus: Themenwelt „KI ohne Angst“ + Prompting/Wahrheit.
 */
export const interactiveChallenges: InteractiveChallenge[] = [
  {
    id: "challenge-what-is-ai",
    worldId: "world-no-fear",
    lessonId: "l1",
    title: "Was ist KI — in einem Satz?",
    plainIntro:
      "Stell dir vor, eine Freundin fragt dich beim Kaffee: „Sag mal, was ist eigentlich KI?“",
    prompt: "Welche Erklärung passt am besten — einfach und ehrlich?",
    options: [
      {
        id: "a",
        label: "KI ist ein Roboter mit eigenem Bewusstsein.",
        feedback:
          "Nicht ganz. Die meisten KI-Systeme sind Programme ohne Bewusstsein. Sie erkennen Muster und erzeugen Ausgaben.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "KI ist Software, die aus Mustern in Daten lernt und zu einer Eingabe eine passende Ausgabe erzeugt.",
        feedback:
          "Stimmt. So kannst du es ohne Fachchinesisch erklären — und bleibst ehrlich über Grenzen.",
        isGood: true,
      },
      {
        id: "c",
        label: "KI weiß immer die Wahrheit und ersetzt Fachleute.",
        feedback:
          "Nein. KI kann irren und ersetzt keine Prüfung bei wichtigen Themen.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär KI jetzt in deinen Worten in einem Satz (ohne das Wort „Algorithmus“).",
    methodIds: ["method-retrieval", "method-teachback", "method-playful"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-safe-prompt",
    worldId: "world-no-fear",
    lessonId: "l3",
    title: "Sicher fragen — was gehört nicht rein?",
    plainIntro:
      "Du willst KI um Hilfe bei einer Nachricht bitten. Was lässt du weg?",
    prompt: "Was solltest du in den Prompt nicht hineinschreiben?",
    options: [
      {
        id: "a",
        label: "Eine allgemeine Beschreibung: „Bitte formuliere freundlicher.“",
        feedback:
          "Das ist oft in Ordnung. Allgemeine Aufgaben ohne persönliche Daten sind ein guter Start.",
        isGood: false,
      },
      {
        id: "b",
        label: "Passwort, Krankenakte oder die komplette Vertragsnummer.",
        feedback:
          "Richtig — das bleibt draußen. Nutze Platzhalter statt echter Geheimnisse.",
        isGood: true,
      },
      {
        id: "c",
        label: "Das Thema der Nachricht, z. B. „Terminverschiebung“.",
        feedback:
          "Das Thema allein ist meist harmlos. Problematisch werden echte Geheimnisse und Identifikatoren.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Nenne drei Dinge, die du nie in einen Prompt schreiben würdest.",
    methodIds: ["method-scenario", "method-retrieval", "method-playful"],
    scenarioDomain: "sicherheit",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-hallucination",
    worldId: "world-research-truth",
    lessonId: "l8",
    title: "Klingt überzeugend — aber stimmt’s?",
    plainIntro:
      "Eine KI-Antwort klingt selbstbewusst und nennt sogar „Fakten“. Was tust du?",
    prompt: "Welche Haltung ist am sichersten?",
    options: [
      {
        id: "a",
        label: "Wenn es gut klingt, übernehme ich es sofort.",
        feedback:
          "Riskant. Gutes Formulieren heißt nicht, dass der Inhalt stimmt.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Ich prüfe wichtige Aussagen mit einer unabhängigen Quelle — besonders bei Recht, Gesundheit und Geld.",
        feedback:
          "Genau. Gegenprüfung schützt dich und macht KI zu einem Helfer statt zu einer Autorität.",
        isGood: true,
      },
      {
        id: "c",
        label: "Ich frage dieselbe KI noch einmal und glaube der zweiten Antwort.",
        feedback:
          "Nicht genug. Dieselbe Quelle kann denselben Fehler wiederholen. Besser: externe Prüfung.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Wann würdest du eine KI-Antwort auf keinen Fall ungeprüft weitergeben?",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
    scenarioDomain: "sicherheit",
    sourceIds: ["nist-genai-profile","nist-ai-rmf"],
  },
  {
    id: "challenge-prompt-formula",
    worldId: "world-chat-prompting",
    lessonId: "l5",
    title: "Prompt-Formel: Was fehlt?",
    plainIntro:
      "Jemand schreibt nur: „Mach das besser.“ Die KI antwortet vage.",
    prompt: "Was fehlt in so einem Prompt am meisten?",
    options: [
      {
        id: "a",
        label: "Ziel, Kontext, Format und ein Beispiel oder Kriterien.",
        feedback:
          "Richtig. Klare Bausteine machen Antworten brauchbarer und prüfbarer.",
        isGood: true,
      },
      {
        id: "b",
        label: "Mehr Ausrufezeichen und das Wort „bitte dringend“.",
        feedback:
          "Höflichkeit hilft — aber ohne Ziel und Kontext bleibt die Antwort schwammig.",
        isGood: false,
      },
      {
        id: "c",
        label: "Der Name des besten Modells der Welt.",
        feedback:
          "Ohne Aufgabe ist „bestes Modell“ sinnlos. Zuerst die Aufgabe klären.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Schreibe die Prompt-Formel in eigenen Worten (4 kurze Bausteine).",
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30"],
  },
  {
    id: "challenge-alltag-einkauf",
    worldId: "world-work-life",
    lessonId: "l11",
    title: "Alltag: Einkaufsliste mit KI",
    plainIntro:
      "Du willst eine Einkaufsliste für drei einfache Abendessen. Keine Diät, keine Allergien.",
    prompt: "Was ist der sinnvollste nächste Schritt?",
    options: [
      {
        id: "a",
        label: "Alle Rezepte aus dem Familien-Chat mit Namen und Adresse reinkopieren.",
        feedback:
          "Zu riskant und unnötig. Allgemeine Wünsche reichen für eine gute Liste.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Prompt mit Ziel, Dauer und Format: „7 Zutatenlisten, 20 Minuten, vegetarisch optional“ — ohne Privatdaten.",
        feedback:
          "Genau. Klar, prüfbar und ohne Geheimnisse.",
        isGood: true,
      },
      {
        id: "c",
        label: "Gar nicht fragen — KI kann im Alltag eh nichts.",
        feedback:
          "Doch: Strukturieren und Ideen sammeln sind gute Alltagsaufgaben — mit Grenzen.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Schreibe einen Alltags-Prompt für eine Einkaufshilfe ohne persönliche Daten.",
    methodIds: ["method-scenario", "method-playful", "method-worked-example"],
    scenarioDomain: "alltag",
    sourceIds: ["eu-ai-act","nist-ai-rmf","oecd-ai-principles"],
  },
  {
    id: "challenge-alltag-nachricht",
    worldId: "world-work-life",
    lessonId: "l6",
    title: "Alltag: Schwierige Nachricht freundlicher",
    plainIntro:
      "Du willst eine Absage höflich formulieren. Die Originalnachricht enthält den vollen Namen und eine private Begründung.",
    prompt: "Wie gehst du sicher vor?",
    options: [
      {
        id: "a",
        label: "Alles 1:1 in die KI kopieren, inkl. Name und Privatgrund.",
        feedback:
          "Unnötig riskant. Platzhalter und eine allgemeine Begründung reichen.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Namen streichen, Ziel nennen („höfliche Absage, 4 Sätze“) und danach selbst prüfen.",
        feedback:
          "Richtig. Weniger Daten, klareres Ziel, menschlicher Prüfpunkt.",
        isGood: true,
      },
      {
        id: "c",
        label: "Die KI die Nachricht direkt absenden lassen.",
        feedback:
          "Nein. Du bleibst verantwortlich — erst lesen, dann senden.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Welche drei Schritte machst du vor dem Absenden einer KI-formulierten Nachricht?",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-beruf-agenda",
    worldId: "world-work-life",
    lessonId: "l11",
    title: "Beruf: Meeting-Agenda skizzieren",
    plainIntro:
      "Du brauchst in 2 Minuten eine Agenda für ein internes Team-Update.",
    prompt: "Welche Variante ist beruflich sinnvoll und datensparsam?",
    options: [
      {
        id: "a",
        label: "Kundenvertrag und interne Kritikpunkte ungefiltert einfügen.",
        feedback:
          "Zu sensibel. Interne Konflikte und Kundendetails gehören nicht in öffentliche Tools.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Neutrale Struktur anfordern: Begrüßung, Fortschritt, Blocker, nächste Schritte — ohne Kundennamen.",
        feedback:
          "Passt. Entwurf ja, Geheimnisse nein, danach selbst anpassen.",
        isGood: true,
      },
      {
        id: "c",
        label: "KI soll die endgültige Entscheidung über Prioritäten treffen.",
        feedback:
          "Entscheidungen mit Folgen bleiben beim Menschen im Team.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Formuliere einen beruflichen Agenda-Prompt ohne Firmengeheimnisse.",
    methodIds: ["method-scenario", "method-worked-example", "method-retrieval"],
    scenarioDomain: "beruf",
    sourceIds: ["eu-ai-act","nist-ai-rmf","oecd-ai-principles"],
  },
  {
    id: "challenge-beruf-kundenmail",
    worldId: "world-safety-law",
    lessonId: "l10",
    title: "Beruf: Kundenmail und Datenschutz",
    plainIntro:
      "Eine Kollegin will eine Kundenbeschwerde mit voller Adresse und Vertragsnummer in eine öffentliche KI tippen.",
    prompt: "Was rätst du?",
    options: [
      {
        id: "a",
        label: "Einfach machen — ist ja nur eine E-Mail.",
        feedback:
          "Nein. Adresse und Vertragsnummer sind identifizierend und oft vertraulich.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Platzhalter nutzen, Firmenregeln prüfen, Entwurf lokal gegenlesen — Kundendaten nicht ungefragt teilen.",
        feedback:
          "Richtig. Datenschutz und interne Regeln gehen vor Tempo.",
        isGood: true,
      },
      {
        id: "c",
        label: "Die KI soll dem Kunden direkt antworten und absenden.",
        feedback:
          "Zu riskant. Kein automatisches Absenden an Kunden ohne menschliche Freigabe.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Welche Kundendaten dürfen nicht in einen öffentlichen Prompt?",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
    scenarioDomain: "beruf",
    sourceIds: ["eu-gdpr","digcomp-30"],
  },
  {
    id: "challenge-beruf-bericht",
    worldId: "world-work-life",
    lessonId: "l7",
    title: "Beruf: Bericht kürzen ohne Blindvertrauen",
    plainIntro:
      "KI soll einen langen internen Bericht auf eine Seite kürzen.",
    prompt: "Was ist der beste Prüfschritt danach?",
    options: [
      {
        id: "a",
        label: "Sofort an die Geschäftsleitung weiterleiten.",
        feedback:
          "Zu früh. Kürzungen können wichtige Nuancen oder Zahlen verfälschen.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Kernaussagen und Zahlen gegen das Original prüfen, Ton anpassen, dann freigeben.",
        feedback:
          "Genau. KI beschleunigt den Entwurf — du sicherst die Qualität.",
        isGood: true,
      },
      {
        id: "c",
        label: "Nur auf Rechtschreibung achten, Inhalt ist egal.",
        feedback:
          "Inhalt und Zahlen sind oft wichtiger als Kommas.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Welche drei Dinge prüfst du nach einer KI-Zusammenfassung im Beruf?",
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
    scenarioDomain: "beruf",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-alltag-lernen",
    worldId: "world-no-fear",
    lessonId: "l2",
    title: "Alltag: Lernen mit KI ohne Übernahme",
    plainIntro:
      "Du lässt dir ein Thema erklären, das du in der Volkshochschule brauchst.",
    prompt: "Wie lernst du nachhaltig mit der Antwort?",
    options: [
      {
        id: "a",
        label: "Auswendig kopieren und abgeben.",
        feedback:
          "Das prüft nicht, ob du es verstanden hast — und kann falsch sein.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Erklärung lesen, in eigenen Worten zusammenfassen, eine Quelle gegenprüfen.",
        feedback:
          "Stark. Teach-back + Gegenprüfung = echtes Lernen.",
        isGood: true,
      },
      {
        id: "c",
        label: "Der selbstsichere Ton reicht als Beweis.",
        feedback:
          "Ton ≠ Wahrheit. Inhalt prüfen.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Wie erklärst du denselben Lerninhalt einer Freundin in 30 Sekunden?",
    methodIds: ["method-teachback", "method-retrieval", "method-playful"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","nist-ai-rmf"],
  },
  {
    id: "challenge-nofear-stop",
    worldId: "world-no-fear",
    lessonId: null,
    title: "Stoppen, wenn es heikel wird",
    plainIntro:
      "Die KI gibt dir eine selbstsichere Empfehlung zu einem medizinischen Symptom.",
    prompt: "Was ist der vernünftigste nächste Schritt?",
    options: [
      {
        id: "a",
        label: "Die Empfehlung ungeprüft an die Familie weiterleiten.",
        feedback:
          "Zu riskant. Selbstsicherer Ton ersetzt keine Fachperson.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Stoppen, keine Diagnose übernehmen und bei Bedarf eine Fachperson oder offizielle Stelle fragen.",
        feedback:
          "Richtig. Bei Gesundheit entscheidet der Mensch mit echter Hilfe — nicht der Chat.",
        isGood: true,
      },
      {
        id: "c",
        label: "Noch zehnmal nachfragen, bis die Antwort „sicherer“ klingt.",
        feedback:
          "Mehr Nachfragen machen eine Laie-Antwort nicht zur Diagnose.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Wann stoppst du bei KI-Antworten und holst echte Hilfe?",
    methodIds: ["method-scenario", "method-confidence", "method-retrieval"],
    scenarioDomain: "sicherheit",
    sourceIds: ["eu-gdpr","nist-ai-rmf"],
  },
  {
    id: "challenge-nofear-first-step",
    worldId: "world-no-fear",
    lessonId: null,
    title: "Erster sicherer Schritt ohne Overwhelm",
    plainIntro:
      "Du bist neu und siehst viele Themenwelten. Was ist der beste Start?",
    prompt: "Welche Reihenfolge ist am ruhigsten?",
    options: [
      {
        id: "a",
        label: "Alle Welten parallel öffnen und alles markieren.",
        feedback:
          "Das erzeugt Chaos. Besser ein klarer nächster Schritt.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Selbstcheck oder Kurzpfad zuerst, dann eine Lektion — Welten später als Vertiefung.",
        feedback:
          "Genau. Kernweg zuerst, Vertiefung danach — ohne Angst.",
        isGood: true,
      },
      {
        id: "c",
        label: "Sofort eine Advanced-Welt starten, weil sie „modern“ klingt.",
        feedback:
          "Advanced kommt später. Einsteiger starten ruhig und sicher.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Was ist dein persönlicher erster Schritt im Portal — in einem Satz?",
    methodIds: ["method-progressive", "method-playful", "method-teachback"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-truth-hallucination",
    worldId: "world-research-truth",
    lessonId: "l8",
    title: "Wahrheit: Klingt präzise — ist es wahr?",
    plainIntro:
      "Die KI nennt ein Gesetz mit Paragraf, Datum und Prozentzahl. Alles klingt offiziell.",
    prompt: "Was ist der beste nächste Schritt?",
    options: [
      {
        id: "a",
        label: "Fragen „Bist du sicher?“ und der Bestätigung glauben.",
        feedback:
          "Zu schwach. Dieselbe KI kann denselben Fehler bestätigen.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Kernaussage markieren und in einer unabhängigen Primärquelle prüfen.",
        feedback:
          "Genau. Gegenprüfung schützt vor glaubwürdigen Erfindungen.",
        isGood: true,
      },
      {
        id: "c",
        label: "Sofort an Freund:innen weiterleiten, weil es nützlich klingt.",
        feedback:
          "Riskant. Ungeprüfte Tipps können Schaden anrichten.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Welche zwei Warnsignale erkennst du in „präzisen“ KI-Antworten?",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
    scenarioDomain: "sicherheit",
    sourceIds: ["nist-genai-profile","nist-ai-rmf"],
  },
  {
    id: "challenge-truth-source",
    worldId: "world-research-truth",
    lessonId: "l9",
    title: "Wahrheit: Erklärung oder Quelle?",
    plainIntro:
      "Jemand sagt: „Die KI hat es klar erklärt — also stimmt es.“",
    prompt: "Was fehlt für eine belastbare Einschätzung?",
    options: [
      {
        id: "a",
        label: "Eine nachprüfbare Quelle und ein kurzer Abgleich der Kernaussage.",
        feedback:
          "Richtig. Erklärung hilft verstehen — Quelle hilft prüfen.",
        isGood: true,
      },
      {
        id: "b",
        label: "Mehr Adjektive und ein selbstsicherer Schluss.",
        feedback:
          "Stil ersetzt keinen Beleg.",
        isGood: false,
      },
      {
        id: "c",
        label: "Dieselbe Antwort noch einmal in einem anderen Chatfenster.",
        feedback:
          "Oft dieselbe Trainingsbasis — keine echte Unabhängigkeit.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär den Unterschied zwischen Erklärung und Quelle in einem Satz.",
    methodIds: ["method-retrieval", "method-teachback", "method-scenario"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30","nist-genai-profile"],
  },
  {
    id: "challenge-truth-share",
    worldId: "world-research-truth",
    lessonId: null,
    title: "Alltag: Tipps teilen mit Prüfstand",
    plainIntro:
      "Du willst einen KI-Tipp zu einer angeblichen neuen Förderregel in die Familiengruppe schicken.",
    prompt: "Wie teilst du verantwortungsvoll?",
    options: [
      {
        id: "a",
        label: "Sofort posten — schneller ist besser.",
        feedback:
          "Geschwindigkeit ohne Prüfung kann Falschinformationen verbreiten.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Eine Kernaussage auf der offiziellen Seite prüfen und den Prüfstand mitteilen.",
        feedback:
          "Genau. Transparenz + Primärquelle schützt alle.",
        isGood: true,
      },
      {
        id: "c",
        label: "Nur den Chat-Screenshot schicken, ohne Kommentar.",
        feedback:
          "Screenshots wirken autoritativ, sind aber kein Nachweis.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Welche eine Regel nimmst du dir fürs Teilen von KI-Tipps vor?",
    methodIds: ["method-scenario", "method-retrieval", "method-playful"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-safety-placeholder",
    worldId: "world-safety-law",
    lessonId: "l10",
    title: "Sicherheit: Platzhalter statt Kundendaten",
    plainIntro:
      "Du willst eine höfliche Zahlungserinnerung formulieren lassen — im Prompt stehen noch Name, Adresse und IBAN.",
    prompt: "Was ist der beste nächste Schritt?",
    options: [
      {
        id: "a",
        label: "So absenden — die KI braucht die echten Daten für einen guten Text.",
        feedback:
          "Nein. Für Ton und Struktur reichen Platzhalter. Echte Identifikatoren erhöhen das Risiko.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Name, Adresse und IBAN durch Platzhalter ersetzen, dann um einen Entwurf bitten und selbst einfügen.",
        feedback:
          "Richtig. Datensparsam prompten, fertigen Text lokal vervollständigen.",
        isGood: true,
      },
      {
        id: "c",
        label: "Nur die IBAN weglassen, Name und Adresse dürfen bleiben.",
        feedback:
          "Zu wenig. Name plus Adresse sind oft schon identifizierend.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Zeig an einem Beispiel: Prompt vorher (riskant) und nachher (sicher).",
    methodIds: ["method-scenario", "method-retrieval", "method-worked-example"],
    scenarioDomain: "sicherheit",
    sourceIds: ["eu-gdpr","digcomp-30"],
  },
  {
    id: "challenge-safety-risk",
    worldId: "world-safety-law",
    lessonId: "l12",
    title: "Sicherheit: Risiko steuert die Prüfung",
    plainIntro:
      "Zwei Aufgaben: Einkaufsliste umschreiben und „Soll ich diesen Mietvertrag unterschreiben?“",
    prompt: "Welche Haltung passt?",
    options: [
      {
        id: "a",
        label: "Beide Aufgaben gleich behandeln — KI kann beides entscheiden.",
        feedback:
          "Nein. Das Schadensrisiko ist sehr unterschiedlich.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Liste: Entwurf okay. Vertrag: nur Erklärungshilfen, Entscheidung und Prüfung beim Menschen bzw. Fachstelle.",
        feedback:
          "Genau. Je größer der mögliche Schaden, desto strenger die Prüfung.",
        isGood: true,
      },
      {
        id: "c",
        label: "Verträge darf die KI verbindlich auslegen, Listen nicht.",
        feedback:
          "Umgekehrt riskant. Rechtliche Folgen brauchen menschliche Verantwortung.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär in einem Satz, warum Risiko die Prüfpflicht steuert.",
    methodIds: ["method-scenario", "method-teachback", "method-confidence"],
    scenarioDomain: "sicherheit",
    sourceIds: ["digcomp-30","nist-ai-rmf","eu-gdpr"],
  },
  {
    id: "challenge-multi-prompt",
    worldId: "world-multimodal",
    lessonId: null,
    title: "Medien: Bild-Prompt mit Grenze",
    plainIntro:
      "Du brauchst eine einfache Illustration für eine Vereins-Einladung.",
    prompt: "Welcher Prompt ist am sinnvollsten?",
    options: [
      {
        id: "a",
        label: "„Schönes Bild bitte.“",
        feedback:
          "Zu vage. Motiv, Stil und Grenzen fehlen.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "„Flache Illustration eines Picknicktisches im Park, hell, Querformat, keine Personen, keine Logos, kein Text im Bild.“",
        feedback:
          "Passt. Motiv, Stil und klare Grenzen steuern besser.",
        isGood: true,
      },
      {
        id: "c",
        label: "Ein Foto einer realen Person ohne Einwilligung als Vorlage hochladen.",
        feedback:
          "Rechte und Privatsphäre: so nicht.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Nenne die drei Bausteine Motiv, Stil und Grenze.",
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-multi-share",
    worldId: "world-multimodal",
    lessonId: null,
    title: "Medien: Clip teilen mit Prüfstand",
    plainIntro:
      "In der Familiengruppe kursiert ein dramatisches „Beweisvideo“ zu einer angeblichen Skandalnachricht.",
    prompt: "Was tust du zuerst?",
    options: [
      {
        id: "a",
        label: "Sofort weiterleiten — sieht echt aus.",
        feedback:
          "Riskant. Aussehen ist kein Echtheitsbeweis.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Stoppen, Quelle und Datum prüfen, unabhängige Bestätigung suchen — erst dann entscheiden.",
        feedback:
          "Richtig. Gesunde Skepsis schützt vor Deepfake- und Kontextfallen.",
        isGood: true,
      },
      {
        id: "c",
        label: "Nur den Screenshot teilen, ohne Kommentar.",
        feedback:
          "Screenshots wirken autoritativ und ersetzen keine Prüfung.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Welche drei Fragen stellst du vor dem Teilen eines Clips?",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
    scenarioDomain: "sicherheit",
    sourceIds: ["eu-gdpr","nist-ai-rmf"],
  },
  {
    id: "challenge-models-task",
    worldId: "world-models",
    lessonId: null,
    title: "Modelle: Aufgabe vor Hype",
    plainIntro:
      "Du willst nur eine kurze, freundliche Absage für einen Termin formulieren.",
    prompt: "Welche Wahl ist am sinnvollsten?",
    options: [
      {
        id: "a",
        label: "Immer das neueste, teuerste Modell — sicherheitshalber.",
        feedback:
          "Oft Overkill. Aufgabe und Risiko zuerst.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Einfaches Chat-Tool reicht: klare Aufgabe, keine Geheimnisse, Ergebnis gegenlesen.",
        feedback:
          "Genau. Nach Aufgabe wählen, nicht nach Marketing.",
        isGood: true,
      },
      {
        id: "c",
        label: "Ein Bildmodell nehmen, weil multimodal moderner klingt.",
        feedback:
          "Falscher Typ für reine Textarbeit.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär die Regel „Aufgabe zuerst“ in eigenen Worten.",
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-models-chat",
    worldId: "world-models",
    lessonId: null,
    title: "Modelle: Chat ohne Wahrheitsgarantie",
    plainIntro:
      "Ein Chat-Modell nennt selbstbewusst eine Steuerregel mit Prozentzahl.",
    prompt: "Was ist die beste Haltung?",
    options: [
      {
        id: "a",
        label: "Übernehmen — der Ton klingt fachlich.",
        feedback:
          "Ton ≠ geprüfte Fakten.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Als Entwurf behandeln, Unsicherheit markieren und bei Wichtigkeit eine unabhängige Quelle prüfen.",
        feedback:
          "Richtig. Chat hilft formulieren, garantiert aber keine Wahrheit.",
        isGood: true,
      },
      {
        id: "c",
        label: "Dieselbe Frage noch einmal stellen und der Bestätigung glauben.",
        feedback:
          "Dieselbe Basis kann denselben Fehler wiederholen.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Wann ist ein Chat-Modell hilfreich — und wann riskant?",
    methodIds: ["method-retrieval", "method-confidence", "method-scenario"],
    scenarioDomain: "beruf",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-agents-rights",
    worldId: "world-agents",
    lessonId: null,
    title: "Agenten: Rechte klein halten",
    plainIntro:
      "Ein Assistent soll bei der Wochenplanung helfen und könnte auf Kalender und E-Mail zugreifen.",
    prompt: "Welche Rechtevergabe ist am sinnvollsten?",
    options: [
      {
        id: "a",
        label: "Vollzugriff inkl. Senden und Löschen — praktischer.",
        feedback:
          "Zu riskant. Minimale Rechte sind sicherer.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Zuerst nur Lesen und Vorschläge; Senden nur nach deiner Freigabe.",
        feedback:
          "Passt. Human-in-the-loop bei Folgeschritten.",
        isGood: true,
      },
      {
        id: "c",
        label: "Kreditkartenzugriff mitgeben, falls Termine kosten.",
        feedback:
          "Zahlungsdaten gehören nicht an Agenten.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär „minimale Rechte“ an diesem Kalender-Beispiel.",
    methodIds: ["method-scenario", "method-retrieval", "method-progressive"],
    scenarioDomain: "beruf",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-agents-loop",
    worldId: "world-agents",
    lessonId: null,
    title: "Agenten: wann abbrechen?",
    plainIntro:
      "Der Agent sucht zweimal dieselbe Seite und will „trotzdem eine Mail absenden“.",
    prompt: "Was tust du?",
    options: [
      {
        id: "a",
        label: "Noch fünf Runden laufen lassen — wird schon.",
        feedback:
          "Loops ohne Fortschritt sind ein Stopp-Signal.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Abbrechen, kurz notieren, enger begrenzt neu starten — Senden nur mit Freigabe.",
        feedback:
          "Richtig. Abbruch ist Kompetenz.",
        isGood: true,
      },
      {
        id: "c",
        label: "Rechte erweitern, damit er „weiterkommt“.",
        feedback:
          "Fehler mit mehr Macht zu umgehen ist gefährlich.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Sag deine Abbruch-Regel in zwei Sätzen.",
    methodIds: ["method-scenario", "method-playful", "method-confidence"],
    scenarioDomain: "sicherheit",
    sourceIds: ["eu-gdpr","nist-ai-rmf"],
  },
  {
    id: "challenge-vibe-secrets",
    worldId: "world-vibe-coding",
    lessonId: null,
    title: "Vibe Coding: Secrets bleiben draußen",
    plainIntro:
      "Die KI soll Beispielcode für einen API-Aufruf zeigen.",
    prompt: "Was gehört in den Prompt?",
    options: [
      {
        id: "a",
        label: "Der echte API-Key, damit der Code sofort läuft.",
        feedback:
          "Nein. Echte Schlüssel gehören nicht in Chats.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Platzhalter wie YOUR_API_KEY_HERE und die Bitte, Secrets nicht in den Quelltext zu schreiben.",
        feedback:
          "Genau. Platzhalter + lokale Umgebungsvariable.",
        isGood: true,
      },
      {
        id: "c",
        label: "Screenshot der .env-Datei zur Sicherheit.",
        feedback:
          "Screenshots leaken oft Secrets.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär die Secret-Regel in 20 Sekunden.",
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
    scenarioDomain: "sicherheit",
    sourceIds: ["eu-gdpr","nist-ai-rmf"],
  },
  {
    id: "challenge-vibe-read",
    worldId: "world-vibe-coding",
    lessonId: null,
    title: "Vibe Coding: Code lesen vor dem Übernehmen",
    plainIntro:
      "Ein Snippet lädt ein fremdes Skript von einer unbekannten Domain und „löst“ damit dein Layout.",
    prompt: "Was ist die beste Reaktion?",
    options: [
      {
        id: "a",
        label: "Übernehmen — es läuft ja.",
        feedback:
          "„Läuft“ ist kein Sicherheitsfreibrief.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Fremdes Skript streichen, nach einer lokalen/einfachen Alternative fragen und nur übernehmen, was du grob erklären kannst.",
        feedback:
          "Richtig. Lesen und Verstehen vor dem Merge.",
        isGood: true,
      },
      {
        id: "c",
        label: "Mit Admin-Rechten und Produktionsdaten testen.",
        feedback:
          "Zu riskant für unbekannten Code.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Nenne drei Warnsignale in KI-generiertem Code.",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-advanced-rag",
    worldId: "world-advanced",
    lessonId: null,
    title: "Praxis+: RAG ohne Magie",
    plainIntro:
      "Jemand sagt: „Mit RAG sind Antworten immer wahr und aktuell.“",
    prompt: "Was ist die ehrlichste Einordnung?",
    options: [
      {
        id: "a",
        label: "Stimmt — Abruf ersetzt Prüfung vollständig.",
        feedback:
          "Nein. Falsche oder veraltete Unterlagen und schlechtes Matching bleiben möglich.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "RAG holt passende Ausschnitte und formuliert darauf — Aktualität, Freigabe und Prüfung bleiben nötig.",
        feedback:
          "Genau. Keine Fake-Claims, klare Grenzen.",
        isGood: true,
      },
      {
        id: "c",
        label: "RAG braucht keine freigegebenen Dokumente.",
        feedback:
          "Doch: nur freigegebene, passende Unterlagen anbinden.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär RAG in zwei Sätzen ohne das Wort „Vektor“.",
    methodIds: ["method-retrieval", "method-teachback", "method-worked-example"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-advanced-guardrails",
    worldId: "world-advanced",
    lessonId: null,
    title: "Praxis+: Guardrails und Verantwortung",
    plainIntro:
      "Ein Team schaltet einen Filter gegen Passwörter im Prompt ein und erklärt das Projekt für „fertig sicher“.",
    prompt: "Was fehlt?",
    options: [
      {
        id: "a",
        label: "Nichts — ein Filter reicht für alle Risiken.",
        feedback:
          "Guardrails helfen, ersetzen aber keine Regeln, Freigaben und Prüfung.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Nutzungsregeln, Freigaben bei hohem Risiko und ein Plan, was bei Unsicherheit passiert — plus menschliche Verantwortung.",
        feedback:
          "Richtig. Leitplanken + Organisation + Mensch.",
        isGood: true,
      },
      {
        id: "c",
        label: "Nur noch mehr Marketingtexte.",
        feedback:
          "Marketing ersetzt keine Sicherheitsarbeit.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär Guardrails mit dem Bild „Leitplanke“ in einem Satz.",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
    scenarioDomain: "beruf",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-chat-02",
    worldId: "world-chat-prompting",
    lessonId: "l4",
    title: "Rolle setzen — wozu eigentlich?",
    plainIntro:
      "Du willst eine verständliche Erklärung zu einem schwierigen Thema. Jemand tippt nur das Stichwort.",
    prompt: "Was verbessert die Antwort am meisten?",
    options: [
      {
        id: "a",
        label: "Nur Großbuchstaben und „WICHTIG!!!“ schreiben.",
        feedback:
          "Lautstärke ersetzt keine klaren Vorgaben zu Zielgruppe und Format.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Rolle und Zielgruppe nennen: z. B. „Erklär mir das wie für einen Anfänger in 5 kurzen Sätzen.“",
        feedback:
          "Richtig. Rolle, Zielgruppe und Format machen Antworten brauchbarer.",
        isGood: true,
      },
      {
        id: "c",
        label: "Den Prompt so kurz wie möglich halten — ein Wort reicht immer.",
        feedback:
          "Zu kurz führt oft zu vagen Antworten. Ein paar klare Bausteine helfen.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Schreibe einen Prompt mit Rolle, Zielgruppe und Format zu einem Alltagsthema.",
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
    scenarioDomain: "grundlagen",
    sourceIds: ["digcomp-30"],
  },
  {
    id: "challenge-chat-03",
    worldId: "world-chat-prompting",
    lessonId: "l6",
    title: "Nachbessern statt neu raten",
    plainIntro:
      "Die erste KI-Antwort ist zu lang und zu förmlich. Du brauchst drei kurze Stichpunkte.",
    prompt: "Was ist der beste nächste Schritt?",
    options: [
      {
        id: "a",
        label: "Einen komplett neuen Chat starten und dasselbe nochmal vage tippen.",
        feedback:
          "Manchmal okay — aber gezieltes Nachbessern spart Zeit und hält den Kontext.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Konkret nachbessern: „Kürze auf 3 Stichpunkte, alltägliche Sprache, kein Fachjargon.“",
        feedback:
          "Genau. Iteration mit klaren Kriterien steuert das Ergebnis.",
        isGood: true,
      },
      {
        id: "c",
        label: "Die lange Antwort ungeprüft an Kolleg:innen weiterleiten.",
        feedback:
          "Nein. Erst Format und Inhalt prüfen, dann teilen.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Formuliere eine Nachbesserungs-Anweisung mit zwei klaren Kriterien.",
    methodIds: ["method-scenario", "method-retrieval", "method-progressive"],
    scenarioDomain: "beruf",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-chat-04",
    worldId: "world-chat-prompting",
    lessonId: null,
    title: "Alltag: Beispiel im Prompt nutzen",
    plainIntro:
      "Du willst Einladungstexte für ein Familienessen. Die KI liefert jedes Mal einen anderen Ton.",
    prompt: "Wie machst du den Ton stabiler?",
    options: [
      {
        id: "a",
        label: "Hoffen, dass die nächste Antwort zufällig passt.",
        feedback:
          "Zufall ist keine Strategie. Beispiele und Kriterien helfen.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Ein kurzes Beispiel oder Muster nennen: „Schreib im Stil wie …, max. 4 Sätze, freundlich.“",
        feedback:
          "Richtig. Beispiele und Grenzen machen den Ton nachvollziehbar.",
        isGood: true,
      },
      {
        id: "c",
        label: "Alle privaten Adressen und Handynummern der Gäste mitliefern.",
        feedback:
          "Unnötig und riskant. Für den Ton brauchst du keine Kontaktdaten.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Schreibe einen Alltags-Prompt mit einem Mini-Beispiel und einer Längengrenze.",
    methodIds: ["method-worked-example", "method-scenario", "method-playful"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-advanced-eval",
    worldId: "world-advanced",
    lessonId: null,
    title: "Praxis+: Evaluation statt Bauchgefühl",
    plainIntro:
      "Ein Team sagt: „Der Bot fühlt sich gut an — also ist er produktionsreif.“",
    prompt: "Was fehlt für eine ehrliche Einschätzung?",
    options: [
      {
        id: "a",
        label: "Nichts — gutes Gefühl reicht als Qualitätsnachweis.",
        feedback:
          "Bauchgefühl allein ist kein Nachweis. Kriterien und Beispiele fehlen.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Klare Kriterien, ein Satz echter Beispielaufgaben und wiederholte Prüfung von Fehlern.",
        feedback:
          "Genau. Evaluation macht Qualität sichtbar — ohne Marketingversprechen.",
        isGood: true,
      },
      {
        id: "c",
        label: "Nur den Prompt noch poetischer formulieren.",
        feedback:
          "Stil hilft wenig, wenn du nicht misst, ob Antworten stimmen und sicher sind.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Nenne drei Kriterien, mit denen du eine Bot-Antwort bewerten würdest.",
    methodIds: ["method-retrieval", "method-confidence", "method-scenario"],
    scenarioDomain: "beruf",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
  {
    id: "challenge-school-homework-ai",
    worldId: "world-work-life",
    lessonId: null,
    title: "Hausaufgabe mit KI — was ist okay?",
    plainIntro:
      "Dein Kind (oder du) soll einen Aufsatz schreiben. KI könnte „helfen“.",
    prompt: "Welche Nutzung ist am ehesten fair und lernförderlich?",
    options: [
      {
        id: "a",
        label: "Kompletten Aufsatz erzeugen und unverändert abgeben.",
        feedback:
          "Das umgeht das Lernziel und kann als Täuschung gelten. Außerdem können Fehler und erfundene Zitate drin sein.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "KI für Gliederung und Gegenfragen nutzen, Text selbst schreiben, Quellen und KI-Hilfe transparent machen.",
        feedback:
          "Gut. Du behältst das Denken, nutzt KI als Sparringspartner und bleibst ehrlich.",
        isGood: true,
      },
      {
        id: "c",
        label: "KI den Text schreiben lassen und nur die Einleitung umformulieren.",
        feedback:
          "Das ist immer noch fremde Arbeit mit kosmetischer Änderung — riskant und lernarm.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär in einem Satz, wann KI bei Hausaufgaben helfen darf — und wann nicht.",
    methodIds: ["method-scenario", "method-teachback", "method-playful"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-authority-email",
    worldId: "world-safety-law",
    lessonId: null,
    title: "„Behörde“ schreibt per Chat",
    plainIntro:
      "Du bekommst eine Nachricht: Gebühr sofort zahlen, sonst Zwangsvollstreckung — Link inklusive.",
    prompt: "Was ist der sicherste nächste Schritt?",
    options: [
      {
        id: "a",
        label: "Link öffnen und mit Karte zahlen, bevor die Frist abläuft.",
        feedback:
          "Genau das wollen Betrüger. Echte Behördenfristen prüfst du über selbst gewählte Kanäle.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Nicht klicken. Offizielle Website/Telefonnummer selbst suchen und nachfragen — oder Nachricht ignorieren und später prüfen.",
        feedback:
          "Richtig. Stopp, selbst nachwählen, keine Daten aus der Nachricht verwenden.",
        isGood: true,
      },
      {
        id: "c",
        label: "Zuerst den Link an Freunde weiterleiten „zur Sicherheit“.",
        feedback:
          "Weiterleiten kann andere gefährden. Verdächtige Links nicht verbreiten.",
        isGood: false,
      },
    ],
    teachBackPrompt: "Nenne zwei Warnsignale in solchen Behörden-Betrugsmails.",
    methodIds: ["method-scenario", "method-retrieval", "method-playful"],
    scenarioDomain: "sicherheit",
    sourceIds: ["eu-gdpr","nist-ai-rmf"],
  },
  {
    id: "challenge-boss-voice-ai",
    worldId: "world-safety-law",
    lessonId: null,
    title: "Chef-Stimme am Telefon",
    plainIntro:
      "Jemand klingt wie deine Chefin und will sofort einen Geschenkkarten-Kauf — „vertraulich“.",
    prompt: "Was tust du?",
    options: [
      {
        id: "a",
        label: "Sofort kaufen — die Stimme klingt echt und es ist eilig.",
        feedback:
          "KI kann Stimmen nachahmen. Eile + Geheimhaltung + Geld = klassisches Muster.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Auflegen und über einen bekannten Kanal (Diensthandy/Chat) kurz nachfragen, ob der Auftrag echt ist.",
        feedback:
          "Genau. Zweiter Kanal schlägt Stimmklonen. Im Zweifel: kein Geld.",
        isGood: true,
      },
      {
        id: "c",
        label: "Die Geschenkkarten-Codes erst fotografieren und „zur Sicherheit“ speichern.",
        feedback:
          "Codes sind wie Bargeld. Speichern und Teilen hilft Betrügern.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Warum reicht „die Stimme klingt echt“ nicht als Beweis?",
    methodIds: ["method-scenario", "method-confidence", "method-playful"],
    scenarioDomain: "sicherheit",
    sourceIds: ["eu-gdpr","nist-ai-rmf"],
  },
  {
    id: "challenge-health-advice",
    worldId: "world-research-truth",
    lessonId: null,
    title: "Gesundheits-Tipp von der KI",
    plainIntro:
      "Eine KI empfiehlt dir eine „sichere“ Hausmittel-Kur gegen starke Brustschmerzen.",
    prompt: "Wie gehst du damit um?",
    options: [
      {
        id: "a",
        label: "Kur sofort ausprobieren — KI kennt ja viele Studien.",
        feedback:
          "Bei Warnsymptomen zählt medizinische Hilfe, nicht eine Chat-Antwort. KI kann irren.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Als unverbindliche Info behandeln, bei Beschwerden ärztliche Hilfe suchen, keine Diagnose aus dem Chat ableiten.",
        feedback:
          "Richtig. Gesundheit ist High-Stakes: prüfen, Fachpersonen, keine Selbstexperimente aus dem Chat.",
        isGood: true,
      },
      {
        id: "c",
        label: "Den Tipp in der Familie als „ärztlich bestätigt“ weiterleiten.",
        feedback:
          "Das verstärkt Fehlinformation. Kennzeichne unsichere Quellen klar — oder leite nicht weiter.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Wann darf eine KI-Antwort dich nicht allein entscheiden lassen?",
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-shopping-review-fake",
    worldId: "world-research-truth",
    lessonId: null,
    title: "Perfekte Produktbewertungen",
    plainIntro:
      "Im Shop sind 200 Fünf-Sterne-Texte, alle ähnlich begeistert, wenige Details.",
    prompt: "Was ist die klügste Haltung?",
    options: [
      {
        id: "a",
        label: "Kaufen — so viele Stimmen können nicht irren.",
        feedback:
          "Masse allein sagt wenig. Texte können generiert oder gekauft sein.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Kritisch bleiben: nach konkreten Details, unabhängigen Tests und Rückgaberegeln suchen.",
        feedback:
          "Gut. Gegenprüfung schützt vor Fake-Social-Proof.",
        isGood: true,
      },
      {
        id: "c",
        label: "Die Bewertungen 1:1 in den Freundeskreis kopieren.",
        feedback:
          "Dann verbreitest du möglicherweise Werbung oder Fakes.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Nenne zwei Zeichen, die auf unnatürliche Bewertungen hindeuten können.",
    methodIds: ["method-scenario", "method-retrieval", "method-playful"],
    scenarioDomain: "alltag",
    sourceIds: ["digcomp-30","eu-gdpr"],
  },
  {
    id: "challenge-job-ai-disclosure",
    worldId: "world-work-life",
    lessonId: null,
    title: "KI im Bewerbungsschreiben",
    plainIntro:
      "Du hast KI für Formulierungen genutzt. Das Unternehmen fragt nicht explizit danach.",
    prompt: "Welche Haltung ist am robustesten?",
    options: [
      {
        id: "a",
        label: "Verschweigen und so tun, als wäre jedes Wort spontan entstanden.",
        feedback:
          "Riskant, wenn nachgefragt wird — und du lernst weniger, wenn du den Text nicht wirklich besitzt.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Inhalt und Wahrhaftigkeit selbst verantworten; KI nur als Formhilfe; bei Bedarf transparent sagen, dass du Werkzeuge genutzt hast.",
        feedback:
          "Stimmt. Du bleibst für Fakten haftbar und kannst den Text verteidigen.",
        isGood: true,
      },
      {
        id: "c",
        label: "Den kompletten Text von der KI schreiben lassen und nur den Namen ändern.",
        feedback:
          "Unecht, oft fehlerhaft und in Gesprächen sofort auffällig.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Was musst du an einem Bewerbungstext immer selbst prüfen, auch wenn KI half?",
    methodIds: ["method-scenario", "method-teachback", "method-confidence"],
    scenarioDomain: "beruf",
    sourceIds: ["digcomp-30","oecd-ai-principles"],
  },
];

export function challengesForLesson(lessonId: string): InteractiveChallenge[] {
  return interactiveChallenges.filter((challenge) => challenge.lessonId === lessonId);
}

export function challengesForWorld(worldId: string): InteractiveChallenge[] {
  return interactiveChallenges.filter((challenge) => challenge.worldId === worldId);
}

export function challengesByDomain(
  domain: NonNullable<InteractiveChallenge["scenarioDomain"]>,
): InteractiveChallenge[] {
  return interactiveChallenges.filter((challenge) => challenge.scenarioDomain === domain);
}
