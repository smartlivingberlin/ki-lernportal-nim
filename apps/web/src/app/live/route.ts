export const dynamic = "force-dynamic";

/**
 * S51C-OPS-A liveness probe.
 * Self-contained for Railway apps/web root builds (no workspace imports).
 * Shape mirrors packages/contracts LiveResponseV1.
 */
export function GET() {
  return Response.json(
    { status: "live" },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
