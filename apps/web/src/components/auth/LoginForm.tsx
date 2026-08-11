"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type LoginErrorCode =
  | "FEATURE_DISABLED"
  | "VALIDATION_FAILED"
  | "AUTH_REQUIRED"
  | "ACCESS_DENIED"
  | "INTERNAL_ERROR"
  | "NETWORK";

function messageForCode(code: LoginErrorCode): string {
  switch (code) {
    case "FEATURE_DISABLED":
      return "Die Anmeldung ist derzeit nicht aktiv.";
    case "VALIDATION_FAILED":
      return "Bitte E-Mail und Passwort vollständig eingeben.";
    case "AUTH_REQUIRED":
      return "E-Mail oder Passwort stimmen nicht.";
    case "ACCESS_DENIED":
      return "Zugriff verweigert.";
    case "NETWORK":
      return "Netzwerkfehler. Bitte später erneut versuchen.";
    default:
      return "Die Anmeldung ist fehlgeschlagen.";
  }
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setPending(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: { code?: string; message?: string };
      } | null;

      if (!response.ok) {
        const code = (payload?.error?.code ?? "INTERNAL_ERROR") as LoginErrorCode;
        setError(messageForCode(code));
        return;
      }

      setSuccess("Anmeldung erfolgreich. Du kannst zum Lernraum zurückkehren.");
      setPassword("");
    } catch {
      setError(messageForCode("NETWORK"));
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-6 shadow-[var(--shadow-lift)]"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="block text-sm font-black text-[var(--nim-primary)]"
        >
          E-Mail
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-11 w-full rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-4 text-base text-[var(--foreground)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="block text-sm font-black text-[var(--nim-primary)]"
        >
          Passwort
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="min-h-11 w-full rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-white px-4 text-base text-[var(--foreground)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nim-focus)]"
        />
      </div>

      <div
        className="min-h-6 text-sm font-semibold"
        role="status"
        aria-live="polite"
      >
        {error ? (
          <p className="text-[var(--nim-primary-strong)]" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="text-[var(--nim-success)]">{success}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="nim-interactive inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-5 text-sm font-black text-white hover:bg-[var(--nim-primary-strong)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Wird angemeldet …" : "Anmelden"}
        </button>

        <Link
          href="/"
          className="nim-interactive inline-flex min-h-11 items-center justify-center rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-5 text-sm font-black text-[var(--nim-primary)] hover:border-[var(--nim-primary)]"
        >
          Abbrechen
        </Link>
      </div>
    </form>
  );
}
