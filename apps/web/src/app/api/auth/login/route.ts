import {
  getAuthHttpHandlers,
  toAuthResponse,
} from "../../../../server/auth-http-adapter";

export const dynamic = "force-dynamic";

/**
 * S52-D1 – POST /api/auth/login
 * Behind auth_runtime (default false → FEATURE_DISABLED, no Set-Cookie).
 */
export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const result = await getAuthHttpHandlers().login({ body });
  return toAuthResponse(result);
}
