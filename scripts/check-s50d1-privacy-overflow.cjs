const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const navigationTimeout = 30_000;
const technicalKey = "ki-lernportal-nim:local-progress:v1";

const viewports = [
  { name: "small-320", width: 320, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
];

async function checkViewport(browser, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    serviceWorkers: "block",
  });

  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  try {
    const response = await page.goto(`${baseUrl}/datenschutz`, {
      waitUntil: "networkidle",
      timeout: navigationTimeout,
    });

    assert.ok(response, `${viewport.name}: navigation returned no response`);
    assert.equal(response.status(), 200, `${viewport.name}: unexpected HTTP status`);

    const heading = page
      .getByRole("heading", { level: 1, name: "Datenschutzhinweise" })
      .first();
    await heading.waitFor({ state: "visible", timeout: navigationTimeout });

    const code = page.locator("code", { hasText: technicalKey }).first();
    await code.waitFor({ state: "visible", timeout: navigationTimeout });

    const diagnostics = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const offenders = Array.from(document.body.querySelectorAll("*")).flatMap(
        (element) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          const visible =
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0;

          if (!visible) return [];

          const outside = rect.left < -1 || rect.right > viewportWidth + 1;
          const internallyWide = element.scrollWidth > element.clientWidth + 1;

          if (!outside && !internallyWide) return [];

          return [
            {
              tag: element.tagName.toLowerCase(),
              id: element.id || "",
              className:
                typeof element.className === "string"
                  ? element.className.slice(0, 180)
                  : "",
              text: (element.textContent || "")
                .trim()
                .replace(/\s+/g, " ")
                .slice(0, 120),
              left: Math.round(rect.left * 10) / 10,
              right: Math.round(rect.right * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
              clientWidth: element.clientWidth,
              scrollWidth: element.scrollWidth,
              overflowWrap: style.overflowWrap,
              wordBreak: style.wordBreak,
              whiteSpace: style.whiteSpace,
            },
          ];
        },
      );

      offenders.sort(
        (a, b) =>
          Math.max(b.right - viewportWidth, b.scrollWidth - b.clientWidth) -
          Math.max(a.right - viewportWidth, a.scrollWidth - a.clientWidth),
      );

      return {
        viewportWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        documentClientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        bodyClientWidth: document.body.clientWidth,
        offenders: offenders.slice(0, 20),
      };
    });

    console.log(
      `VIEWPORT=${viewport.name} WIDTH_DIAGNOSTICS=${JSON.stringify(diagnostics)}`,
    );

    assert.ok(
      diagnostics.documentScrollWidth <= diagnostics.documentClientWidth + 1,
      `${viewport.name}: document horizontal overflow ${JSON.stringify(diagnostics)}`,
    );
    assert.ok(
      diagnostics.bodyScrollWidth <= diagnostics.bodyClientWidth + 1,
      `${viewport.name}: body horizontal overflow ${JSON.stringify(diagnostics)}`,
    );
    assert.deepEqual(
      diagnostics.offenders,
      [],
      `${viewport.name}: overflowing elements ${JSON.stringify(diagnostics.offenders)}`,
    );

    const headingMetrics = await heading.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return {
        left: rect.left,
        right: rect.right,
        viewportWidth: window.innerWidth,
        overflowWrap: style.overflowWrap,
        wordBreak: style.wordBreak,
        fontSize: style.fontSize,
      };
    });

    assert.ok(
      headingMetrics.left >= -1,
      `${viewport.name}: privacy heading starts outside viewport ${JSON.stringify(headingMetrics)}`,
    );
    assert.ok(
      headingMetrics.right <= headingMetrics.viewportWidth + 1,
      `${viewport.name}: privacy heading exceeds viewport ${JSON.stringify(headingMetrics)}`,
    );

    const codeMetrics = await code.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return {
        left: rect.left,
        right: rect.right,
        viewportWidth: window.innerWidth,
        overflowWrap: style.overflowWrap,
        wordBreak: style.wordBreak,
      };
    });

    assert.ok(codeMetrics.left >= -1, `${viewport.name}: technical key starts outside viewport`);
    assert.ok(
      codeMetrics.right <= codeMetrics.viewportWidth + 1,
      `${viewport.name}: technical key exceeds viewport ${JSON.stringify(codeMetrics)}`,
    );
    assert.ok(
      codeMetrics.wordBreak === "break-all" ||
        codeMetrics.wordBreak === "break-word" ||
        codeMetrics.overflowWrap === "anywhere" ||
        codeMetrics.overflowWrap === "break-word",
      `${viewport.name}: technical key has no robust wrapping rule ${JSON.stringify(codeMetrics)}`,
    );

    assert.deepEqual(consoleErrors, [], `${viewport.name}: console errors`);
    assert.deepEqual(pageErrors, [], `${viewport.name}: page errors`);

    console.log(
      `VIEWPORT=${viewport.name} WIDTH=${viewport.width} OVERFLOW=NO PRIVACY_HEADING=PASS TECHNICAL_KEY_WRAP=PASS`,
    );
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    for (const viewport of viewports) {
      await checkViewport(browser, viewport);
    }
  } finally {
    await browser.close();
  }

  console.log("S50D1_PRIVACY_MOBILE_OVERFLOW=PASS");
}

main().catch((error) => {
  console.error("S50D1_PRIVACY_MOBILE_OVERFLOW=FAIL");
  console.error(error);
  process.exitCode = 1;
});
