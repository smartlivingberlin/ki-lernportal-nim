"use client";

import { useState } from "react";
import {
  scamModuleMeta,
  scamPlaybook,
  scamQuickChecks,
  scamSignals,
} from "../../data/scam-module";
import { explainAttrs } from "../../data/help-tips";
import { ExplainHotspot } from "./ExplainCloud";
import { InteractiveChallengeCard } from "./InteractiveChallengeCard";
import { challengesByDomain } from "../../data/interactive-challenges";

type ScamModulePanelProps = {
  challengeIds: string[];
};

export function ScamModulePanel({ challengeIds }: ScamModulePanelProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const challenges = challengesByDomain("sicherheit").filter((item) =>
    challengeIds.includes(item.id),
  );

  return (
    <section
      id="scam"
      aria-labelledby="scam-title"
      {...explainAttrs("scam-module")}
      className="scroll-mt-72 space-y-5 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-5 shadow-[var(--shadow-lift)] sm:scroll-mt-64 sm:p-6 lg:scroll-mt-36"
    >
      <ExplainHotspot tipId="scam-module">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-accent)]">
          Sicherheit · Alltag
        </p>
        <h2
          id="scam-title"
          className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]"
        >
          {scamModuleMeta.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--nim-secondary)]">
          {scamModuleMeta.intro}
        </p>
        <p className="mt-2 max-w-3xl text-xs font-semibold leading-5 text-[var(--nim-secondary)]">
          {scamModuleMeta.disclaimer}
        </p>
      </ExplainHotspot>

      <div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
          Warnsignale
        </h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {scamSignals.map((signal) => (
            <li
              key={signal.id}
              className="rounded-[var(--nim-radius-md)] bg-[var(--nim-accent-soft)] p-4"
            >
              <p className="text-sm font-black text-[var(--nim-accent)]">{signal.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--nim-secondary)]">{signal.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
          Stopp-Ablauf
        </h3>
        <ol className="mt-3 grid gap-3 md:grid-cols-2">
          {scamPlaybook.map((step) => (
            <li
              key={step.id}
              className="rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-4"
            >
              <p className="text-sm font-black text-[var(--nim-primary)]">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--nim-secondary)]">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-[var(--nim-radius-md)] bg-[var(--nim-surface-soft)] p-4">
        <h3 className="text-sm font-black text-[var(--foreground)]">Schnell-Check vor dem Handeln</h3>
        <ul className="mt-3 space-y-2">
          {scamQuickChecks.map((item) => (
            <li key={item}>
              <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[var(--nim-radius-sm)] px-1 text-sm font-medium text-[var(--nim-secondary)]">
                <input
                  type="checkbox"
                  className="h-7 w-7 shrink-0 accent-[var(--nim-primary)]"
                  checked={Boolean(checked[item])}
                  onChange={(event) =>
                    setChecked((current) => ({ ...current, [item]: event.target.checked }))
                  }
                />
                <span>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {challenges.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Üben: Scam-Situationen
          </h3>
          {challenges.map((challenge) => (
            <InteractiveChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
