export const dynamic = "force-dynamic";

/**
 * S51C-OPS-A version probe.
 * Self-contained for Railway apps/web root builds (no workspace imports).
 * Shape mirrors packages/contracts VersionResponseV1.
 * Never dumps env secrets or connection strings.
 */
export function GET() {
  const rawSha =
    process.env.RAILWAY_GIT_COMMIT_SHA ??
    process.env.BUILD_SHA ??
    null;
  let buildSha: string | null = null;
  if (typeof rawSha === "string" && /^[0-9a-f]{7,40}$/i.test(rawSha.trim())) {
    buildSha = rawSha.trim().slice(0, 12).toLowerCase();
  }

  const body = {
    service: "web",
    version: "0.1.0",
    build_sha: buildSha,
    environment: "concept_demo",
  };

  return Response.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
