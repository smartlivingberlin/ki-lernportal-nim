const assert = require("node:assert/strict");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";

const routes = ["/", "/impressum", "/datenschutz", "/kontakt"];

const expectedHeaders = new Map([
  ["strict-transport-security", "max-age=31536000; includeSubDomains"],
  ["x-content-type-options", "nosniff"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  [
    "permissions-policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  ],
  ["x-frame-options", "DENY"],
]);

async function checkRoute(route) {
  const response = await fetch(new URL(route, baseUrl), {
    cache: "no-store",
    redirect: "manual",
  });

  assert.equal(response.status, 200, `${route}: unexpected HTTP status`);

  const contentType = response.headers.get("content-type") || "";
  assert.match(contentType, /^text\/html(?:;|$)/i, `${route}: expected HTML response`);

  for (const [name, expectedValue] of expectedHeaders) {
    const actualValue = response.headers.get(name);
    assert.equal(
      actualValue,
      expectedValue,
      `${route}: unexpected ${name} header`,
    );
  }

  assert.equal(
    response.headers.has("x-powered-by"),
    false,
    `${route}: x-powered-by must be absent`,
  );

  console.log(
    `ROUTE=${route} HTTP=200 SECURITY_HEADERS=PASS X_POWERED_BY=ABSENT`,
  );
}

async function main() {
  for (const route of routes) {
    await checkRoute(route);
  }

  console.log(`S50D2_SECURITY_HEADER_ROUTE_COUNT=${routes.length}`);
  console.log(`S50D2_SECURITY_HEADER_COUNT=${expectedHeaders.size}`);
  console.log("S50D2_SECURITY_HEADERS=PASS");
}

main().catch((error) => {
  console.error("S50D2_SECURITY_HEADERS=FAIL");
  console.error(error);
  process.exitCode = 1;
});
