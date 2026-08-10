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
