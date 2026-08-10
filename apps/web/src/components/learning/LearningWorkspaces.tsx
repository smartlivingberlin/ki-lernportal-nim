"use client";

import { useMemo, useState } from "react";

type ToolId = "prompt" | "privacy" | "quellen" | "modell";

const tools: { id: ToolId; title: string; blurb: string }[] = [
  {
    id: "prompt",
    title: "Prompt-Werkbank",
    blurb: "Baue eine klare Aufgabe: Rolle, Ziel, Kontext, Format, Grenze.",
  },
  {
    id: "privacy",
    title: "Datenschutz-Check",
    blurb: "Prüfe vor dem Absenden, was nicht in den Chat gehört.",
  },
  {
    id: "quellen",
    title: "Quellen-Workflow",
    blurb: "Drei Minuten Gegenprüfung für eine KI-Aussage.",
  },
  {
    id: "modell",
    title: "Aufgaben-Kompass",
    blurb: "Finde die passende Modell-Art für deine Aufgabe — ohne Hype.",
  },
];

const privacyItems = [
  "Namen echter Personen",
  "Adressen, Telefon, E-Mail privat",
  "Passwörter oder Zugangsdaten",
  "Kunden- oder Firmendaten",
  "Gesundheits- oder Finanzdetails",
  "Vertrags- oder Aktenauszüge unnötig vollständig",
];

const modelOptions = [
  {
    id: "chat",
    label: "Alltags-Chat / Text",
    tip: "Gute Wahl für Erklären, Formulieren und kurze Entwürfe — immer prüfen.",
  },
  {
    id: "vision",
    label: "Bild verstehen / beschreiben",
    tip: "Vision-Modelle helfen bei Bildern. Keine sensiblen Fotos hochladen.",
  },
  {
    id: "image",
    label: "Bild erzeugen",
    tip: "Bildgeneratoren brauchen klare Prompts und Rechte-Checks vor Veröffentlichung.",
  },
  {
    id: "reasoning",
    label: "Schrittweises Nachdenken",
    tip: "Reasoning hilft bei mehrstufigen Aufgaben — Zahlen und Logik trotzdem gegenprüfen.",
  },
  {
    id: "search",
    label: "Recherche mit Quellenbezug",
    tip: "Search/RAG-Ansätze können aktueller sein — Links und Aussagen trotzdem öffnen und prüfen.",
  },
];

export function LearningWorkspaces({ simpleMode = false }: { simpleMode?: boolean }) {
  const [activeTool, setActiveTool] = useState<ToolId>("prompt");
  const [role, setRole] = useState("freundlicher Assistent");
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");
  const [format, setFormat] = useState("5 kurze Sätze");
  const [boundary, setBoundary] = useState("keine privaten Daten, keine erfundenen Fakten");
  const [checkedPrivacy, setCheckedPrivacy] = useState<string[]>([]);
  const [claim, setClaim] = useState("");
  const [sourceNote, setSourceNote] = useState("");
  const [modelPick, setModelPick] = useState<string | null>(null);
  const [draftScan, setDraftScan] = useState("");

  const promptPreview = useMemo(() => {
    const parts = [
      role.trim() ? `Rolle: ${role.trim()}.` : "",
      task.trim() ? `Aufgabe: ${task.trim()}.` : "",
      context.trim() ? `Kontext: ${context.trim()}.` : "",
      format.trim() ? `Format: ${format.trim()}.` : "",
      boundary.trim() ? `Grenze: ${boundary.trim()}.` : "",
    ].filter(Boolean);
    return parts.join(" ");
  }, [role, task, context, format, boundary]);

  const privacyScore = checkedPrivacy.length;
  const privacyReady = privacyScore === privacyItems.length;

  const riskyHits = useMemo(() => {
    const text = draftScan.toLowerCase();
    const patterns: { label: string; re: RegExp }[] = [
      { label: "mögliche E-Mail", re: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i },
      { label: "mögliche Telefonnummer", re: /\b(?:\+?\d[\d\s/-]{7,}\d)\b/ },
      { label: "Passwort-Hinweis", re: /passwort|password|geheimnis/i },
      { label: "IBAN-ähnlich", re: /\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/i },
    ];
    return patterns.filter((item) => item.re.test(text)).map((item) => item.label);
  }, [draftScan]);

  const visibleTools = simpleMode ? tools.slice(0, 3) : tools;

  return (
    <section
      id="werkzeuge"
      aria-labelledby="werkzeuge-title"
      className="scroll-mt-72 space-y-4 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 md:p-6 lg:scroll-mt-36"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
          Werkzeuge · lokal im Browser
        </p>
        <h2
          id="werkzeuge-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          Arbeitsplätze zum Ausprobieren
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          Keine Cloud-Anbindung nötig: baue Prompts, prüfe Datenschutz, übe Quellenarbeit und
          wähle Modell-Arten — alles bleibt auf diesem Gerät.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Werkzeuge wählen">
        {visibleTools.map((tool) => {
          const selected = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTool(tool.id)}
              className={[
                "nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border-2 px-4 py-2 text-sm font-black",
                selected
                  ? "border-[var(--nim-primary)] bg-[var(--nim-primary-soft)] text-[var(--nim-primary-strong)]"
                  : "border-[var(--nim-border)] bg-[var(--nim-surface-soft)] text-[var(--nim-secondary)]",
              ].join(" ")}
            >
              {tool.title}
            </button>
          );
        })}
      </div>

      <p className="text-sm font-medium text-[var(--nim-secondary)]">
        {tools.find((tool) => tool.id === activeTool)?.blurb}
      </p>

      {activeTool === "prompt" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)]">
            Rolle
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 font-medium text-[var(--foreground)]"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)]">
            Aufgabe
            <input
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="z. B. erkläre KI einem Anfänger"
              className="min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 font-medium text-[var(--foreground)]"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)] md:col-span-2">
            Kontext
            <input
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="z. B. für einen Elternabend, ohne Namen"
              className="min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 font-medium text-[var(--foreground)]"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)]">
            Format
            <input
              value={format}
              onChange={(event) => setFormat(event.target.value)}
              className="min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 font-medium text-[var(--foreground)]"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)]">
            Grenze
            <input
              value={boundary}
              onChange={(event) => setBoundary(event.target.value)}
              className="min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 font-medium text-[var(--foreground)]"
            />
          </label>
          <div className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4 md:col-span-2">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-primary)]">
              Dein Prompt-Entwurf
            </p>
            <p className="mt-2 text-sm font-medium leading-7 text-[var(--foreground)]">
              {promptPreview || "Fülle die Felder aus — hier erscheint dein Prompt."}
            </p>
          </div>
        </div>
      ) : null}

      {activeTool === "privacy" ? (
        <div className="space-y-4">
          <ul className="grid gap-2 sm:grid-cols-2">
            {privacyItems.map((item) => {
              const checked = checkedPrivacy.includes(item);
              return (
                <li key={item}>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] px-3 py-3 text-sm font-medium text-[var(--foreground)]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setCheckedPrivacy((current) =>
                          checked
                            ? current.filter((entry) => entry !== item)
                            : [...current, item],
                        );
                      }}
                      className="mt-1"
                    />
                    <span>Habe ich entfernt/vermeiden: {item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)]">
            Optional: Prompt-Entwurf scannen (nur lokal)
            <textarea
              value={draftScan}
              onChange={(event) => setDraftScan(event.target.value)}
              rows={3}
              className="rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 py-2 font-medium text-[var(--foreground)]"
              placeholder="Text hier einfügen — wird nicht hochgeladen."
            />
          </label>
          <p
            className={[
              "rounded-[var(--nim-radius-md)] p-4 text-sm font-bold",
              privacyReady
                ? "bg-[var(--nim-success-soft)] text-[var(--nim-success)]"
                : "bg-[var(--nim-warning-soft)] text-[var(--nim-secondary)]",
            ].join(" ")}
          >
            Checkliste: {privacyScore}/{privacyItems.length} Punkte.
            {riskyHits.length
              ? ` Hinweis im Entwurf: ${riskyHits.join(", ")}.`
              : " Keine offensichtlichen Muster im Entwurf erkannt."}
            {privacyReady
              ? " Du kannst vorsichtiger starten — trotzdem nochmal selbst lesen."
              : " Bitte alle Punkte bewusst abhaken."}
          </p>
        </div>
      ) : null}

      {activeTool === "quellen" ? (
        <div className="space-y-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm font-medium leading-7 text-[var(--nim-secondary)]">
            <li>Eine Kernaussage markieren (nicht alles auf einmal).</li>
            <li>Unabhängige Quelle öffnen (Behörde, Verlag, bekannte Fachseite).</li>
            <li>Übereinstimmung oder Widerspruch notieren.</li>
          </ol>
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)]">
            Aussage der KI
            <textarea
              value={claim}
              onChange={(event) => setClaim(event.target.value)}
              rows={2}
              className="rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 py-2 font-medium"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold text-[var(--foreground)]">
            Was hast du in der Quelle gefunden?
            <textarea
              value={sourceNote}
              onChange={(event) => setSourceNote(event.target.value)}
              rows={2}
              className="rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-3 py-2 font-medium"
            />
          </label>
          <p className="rounded-[var(--nim-radius-md)] bg-[var(--nim-primary-soft)] p-4 text-sm font-bold text-[var(--nim-primary-strong)]">
            {claim.trim() && sourceNote.trim()
              ? "Gut: Du hast Aussage und Gegenprüfung notiert. Bei Widerspruch gewinnt die Primärquelle."
              : "Fülle beide Felder — das ist dein persönlicher 3-Minuten-Nachweis."}
          </p>
        </div>
      ) : null}

      {activeTool === "modell" ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--nim-secondary)]">
            Wähle die Aufgabe — wir nennen dir eine passende Modell-Art (kein Produktverkauf).
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {modelOptions.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => setModelPick(option.id)}
                  className={[
                    "nim-interactive min-h-14 w-full rounded-[var(--nim-radius-md)] border-2 px-4 py-3 text-left text-sm font-black",
                    modelPick === option.id
                      ? "border-[var(--nim-primary)] bg-[var(--nim-primary-soft)] text-[var(--nim-primary-strong)]"
                      : "border-[var(--nim-border)] bg-[var(--nim-surface-soft)] text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
          {modelPick ? (
            <p className="rounded-[var(--nim-radius-md)] bg-[var(--nim-accent-soft)] p-4 text-sm font-bold leading-7 text-[var(--foreground)]">
              {modelOptions.find((option) => option.id === modelPick)?.tip}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
