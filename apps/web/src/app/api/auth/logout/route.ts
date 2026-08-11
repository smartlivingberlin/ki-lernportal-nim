import {
  getAuthHttpHandlers,
  toAuthResponse,
} from "../../../../server/auth-http-adapter";

export const dynamic = "force-dynamic";

/**
 * S52-D1 – POST /api/auth/logout
 * Behind auth_runtime (default false → FEATURE_DISABLED, no Set-Cookie).
 */
export async function POST(request: Request) {
  const result = await getAuthHttpHandlers().logout({
    cookieHeader: request.headers.get("cookie"),
  });
  return toAuthResponse(result);
}
