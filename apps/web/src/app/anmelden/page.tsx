import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "../../components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Anmelden | KI-Lernraum",
  description:
    "Anmeldung für die freigegebene Auth-Runtime hinter Feature-Flag. Kein öffentlicher Produktiv-Login.",
};

export const dynamic = "force-dynamic";

function authRuntimeEnabled(): boolean {
  return process.env.AUTH_RUNTIME === "true";
}

export default function AnmeldenPage() {
  const enabled = authRuntimeEnabled();

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-6 py-12 sm:py-16">
      <div className="rounded-[var(--nim-radius-xl)] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
        <p className="font-semibold">Kontrollierte Anmeldung</p>
        <p className="mt-2">
          Diese Seite gehört zur Auth-Runtime hinter Feature-Flag. Es gibt keine
          öffentliche Registrierung und keine Production-Nutzer in der
          Konzeptdemo.
        </p>
      </div>

      <header className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--nim-secondary)]">
          Konto
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--nim-primary)]">
          Anmelden
        </h1>
        <p className="text-base font-medium leading-7 text-[var(--nim-secondary)]">
          Melde dich mit E-Mail und Passwort an. Deine Sitzung wird nur als
          sicheres Server-Cookie gesetzt.
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-black text-[var(--nim-primary)] underline"
        >
          Zurück zum Lernraum
        </Link>
      </header>

      {enabled ? (
        <LoginForm />
      ) : (
        <section
          className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-6 shadow-[var(--shadow-lift)]"
          aria-labelledby="auth-disabled-title"
        >
          <h2
            id="auth-disabled-title"
            className="text-xl font-black text-[var(--nim-primary)]"
          >
            Anmeldung ist derzeit nicht aktiv
          </h2>
          <p className="mt-3 text-sm font-medium leading-7 text-[var(--nim-secondary)]">
            Das Feature-Flag <code className="font-mono text-xs">auth_runtime</code>{" "}
            ist aus. In der Konzeptdemo bleibt der Default bewusst ausgeschaltet.
            Staging kann das Flag separat aktivieren.
          </p>
          <Link
            href="/"
            className="nim-interactive mt-5 inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] px-5 text-sm font-black text-[var(--nim-primary)]"
          >
            Abbrechen
          </Link>
        </section>
      )}
    </main>
  );
}
