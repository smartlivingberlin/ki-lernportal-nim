export const dynamic = "force-dynamic";

/**
 * S51C-OPS-A readiness probe.
 * Self-contained for Railway apps/web root builds (no workspace imports).
 * Shape mirrors packages/contracts ReadyResponseV1.
 *
 * Concept demo: database is not_configured and not required, so overall ready.
 */
export function GET() {
  const body = {
    status: "ready",
    checks: [{ name: "database", status: "not_configured" }],
  };

  return Response.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
