const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const axePackage = require("@axe-core/playwright");
const AxeBuilder =
  axePackage.default ??
  axePackage.AxeBuilder ??
  axePackage;

const baseUrl =
  process.env.BASE_URL ||
  "http://127.0.0.1:3000";

const navigationTimeout = 30_000;
const storageKey =
  "ki-lernportal-nim:local-progress:v1";

const viewports = [
  {
    name: "small-320",
    width: 320,
    height: 800,
  },
  {
    name: "mobile-390",
    width: 390,
    height: 844,
  },
  {
    name: "tablet-1024",
    width: 1024,
    height: 900,
  },
  {
    name: "desktop-1440",
    width: 1440,
    height: 1000,
  },
];

const anchorTargets = [
  {
    href: "#lernraum",
    label: "Lernraum",
  },
  {
    href: "#pfad",
    label: "Pfad",
  },
  {
    href: "#coach",
    label: "Coach",
  },
  {
    href: "#quellen",
    label: "Quellen",
  },
];

function collectRuntimeErrors(page) {
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  return {
    consoleErrors,
    pageErrors,
  };
}

async function openPortal(page) {
  await page.goto(baseUrl, {
    waitUntil: "networkidle",
    timeout: navigationTimeout,
  });

  await page
    .getByRole("heading", {
      name: "Dein geführter KI-Lernraum.",
    })
    .waitFor({
      state: "visible",
      timeout: navigationTimeout,
    });
}

async function testViewport(browser, viewport) {
  const context = await browser.newContext({
    viewport: {
      width: viewport.width,
      height: viewport.height,
    },
  });

  await context.addInitScript(
    ({ key }) => {
      window.localStorage.setItem(
        key,
        JSON.stringify(["l1", "l2"]),
      );
    },
    {
      key: storageKey,
    },
  );

  const page = await context.newPage();

  const {
    consoleErrors,
    pageErrors,
  } = collectRuntimeErrors(page);

  try {
    await openPortal(page);

    await page.waitForTimeout(300);

    await page
      .getByText("2/12", {
        exact: true,
      })
      .first()
      .waitFor({
        state: "visible",
      });

    const axeResults = await new AxeBuilder({
      page,
    }).analyze();

    assert.deepEqual(
      axeResults.violations,
      [],
      `${viewport.name}: axe violations:\n${JSON.stringify(
        axeResults.violations,
        null,
        2,
      )}`,
    );

    const layout = await page.evaluate(() => {
      const interactiveSelector = [
        "a[href]",
        "button",
        "summary",
        "input",
        "select",
        "textarea",
        "[role='button']",
      ].join(",");

      const tinyTargets = Array.from(
        document.querySelectorAll(
          interactiveSelector,
        ),
      )
        .filter((element) => {
          const style =
            window.getComputedStyle(element);

          const rect =
            element.getBoundingClientRect();

          const intentionallyVisuallyHidden =
            element.classList.contains("sr-only") &&
            element !== document.activeElement;

          return (
            !intentionallyVisuallyHidden &&
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0 &&
            (
              rect.width < 24 ||
              rect.height < 24
            )
          );
        })
        .map((element) => {
          const rect =
            element.getBoundingClientRect();

          return {
            tag:
              element.tagName.toLowerCase(),
            text:
              (
                element.textContent ?? ""
              )
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 100),
            width:
              Math.round(rect.width),
            height:
              Math.round(rect.height),
          };
        });

      const asideLabels = Array.from(
        document.querySelectorAll("aside"),
      ).map((aside) =>
        aside.getAttribute("aria-label"),
      );

      const progressbar =
        document.querySelector(
          '[role="progressbar"]',
        );

      return {
        innerWidth:
          window.innerWidth,

        documentScrollWidth:
          document.documentElement.scrollWidth,

        bodyScrollWidth:
          document.body.scrollWidth,

        tinyTargets,

        mainCount:
          document.querySelectorAll("main")
            .length,

        asideCount:
          document.querySelectorAll("aside")
            .length,

        asideLabels,

        h1Count:
          document.querySelectorAll("h1")
            .length,

        liveRegionCount:
          document.querySelectorAll(
            "[aria-live]",
          ).length,

        progressbarCount:
          document.querySelectorAll(
            '[role="progressbar"]',
          ).length,

        progressbar: progressbar
          ? {
              label:
                progressbar.getAttribute(
                  "aria-label",
                ),

              min:
                progressbar.getAttribute(
                  "aria-valuemin",
                ),

              max:
                progressbar.getAttribute(
                  "aria-valuemax",
                ),

              now:
                progressbar.getAttribute(
                  "aria-valuenow",
                ),

              text:
                progressbar.getAttribute(
                  "aria-valuetext",
                ),
            }
          : null,
      };
    });

    assert.equal(
      layout.documentScrollWidth,
      layout.innerWidth,
      `${viewport.name}: document overflow`,
    );

    assert.equal(
      layout.bodyScrollWidth,
      layout.innerWidth,
      `${viewport.name}: body overflow`,
    );

    assert.deepEqual(
      layout.tinyTargets,
      [],
      `${viewport.name}: tiny targets`,
    );

    assert.equal(
      layout.mainCount,
      1,
      `${viewport.name}: exactly one main expected`,
    );

    assert.equal(
      layout.asideCount,
      2,
      `${viewport.name}: exactly two asides expected`,
    );

    assert.equal(
      layout.h1Count,
      1,
      `${viewport.name}: exactly one h1 expected`,
    );

    assert.ok(
      layout.liveRegionCount >= 1,
      `${viewport.name}: live region missing`,
    );

    assert.equal(
      layout.progressbarCount,
      1,
      `${viewport.name}: progressbar missing`,
    );

    assert.equal(
      layout.progressbar?.label,
      "Lernfortschritt",
    );

    assert.equal(
      layout.progressbar?.min,
      "0",
    );

    assert.equal(
      layout.progressbar?.max,
      "100",
    );

    assert.equal(
      layout.progressbar?.text,
      "2/12 Lektionen lokal erledigt",
    );

    assert.equal(
      layout.asideLabels.length,
      new Set(
        layout.asideLabels,
      ).size,
      `${viewport.name}: duplicate aside labels`,
    );

    assert.ok(
      layout.asideLabels.every(
        (label) =>
          typeof label === "string" &&
          label.length > 0,
      ),
      `${viewport.name}: unnamed aside`,
    );

    await page.keyboard.press("Tab");

    const skipLink = await page.evaluate(() => {
      const active =
        document.activeElement;

      return {
        tag:
          active?.tagName.toLowerCase(),

        href:
          active?.getAttribute("href"),

        text:
          (
            active?.textContent ?? ""
          )
            .replace(/\s+/g, " ")
            .trim(),
      };
    });

    assert.equal(
      skipLink.tag,
      "a",
      `${viewport.name}: first focus is not a link`,
    );

    assert.equal(
      skipLink.href,
      "#lernraum",
      `${viewport.name}: skip link target`,
    );

    assert.match(
      skipLink.text,
      /Direkt zum Lerninhalt/,
    );

    await page.keyboard.press("Enter");
    await page.waitForTimeout(150);

    const skipPosition =
      await page.evaluate(() => {
        const header =
          document.querySelector("header");

        const target =
          document.querySelector("#lernraum");

        return {
          hash:
            window.location.hash,

          headerBottom:
            header
              ?.getBoundingClientRect()
              .bottom,

          targetTop:
            target
              ?.getBoundingClientRect()
              .top,

          activeElementId:
            document.activeElement?.id,
        };
      });

    assert.equal(
      skipPosition.hash,
      "#lernraum",
    );

    assert.equal(
      skipPosition.activeElementId,
      "lernraum",
    );

    assert.ok(
      skipPosition.targetTop >=
        skipPosition.headerBottom - 2,
      `${viewport.name}: skip target hidden by header`,
    );

    for (const target of anchorTargets) {
      await page
        .locator(
          `nav[aria-label="Portalnavigation"] a[href="${target.href}"]`,
        )
        .click();

      await page.waitForTimeout(150);

      const anchorPosition =
        await page.evaluate((selector) => {
          const header =
            document.querySelector("header");

          const element =
            document.querySelector(selector);

          return {
            hash:
              window.location.hash,

            headerBottom:
              header
                ?.getBoundingClientRect()
                .bottom,

            targetTop:
              element
                ?.getBoundingClientRect()
                .top,
          };
        }, target.href);

      assert.equal(
        anchorPosition.hash,
        target.href,
        `${viewport.name}: ${target.label} hash`,
      );

      assert.ok(
        anchorPosition.targetTop >=
          anchorPosition.headerBottom - 2,
        `${viewport.name}: ${target.label} hidden by header`,
      );
    }

    const searchInput = page.getByTestId(
      "portal-search-input",
    );

    await searchInput.fill("Halluzinationen");

    const lessonSearchResult = page.locator(
      '[data-search-result-kind="lesson"][data-search-result-id="l8"]',
    );

    await lessonSearchResult.waitFor({
      state: "visible",
    });

    await lessonSearchResult.click();

    await page.waitForFunction(() => {
      return (
        document.activeElement?.id ===
        "lesson-l8-title"
      );
    });

    const currentLessonButtons = page.locator(
      '#pfad button[aria-current="step"]',
    );

    assert.equal(
      await currentLessonButtons.count(),
      1,
      `${viewport.name}: exactly one current lesson expected`,
    );

    assert.match(
      await currentLessonButtons.first().innerText(),
      /Halluzinationen erkennen/,
      `${viewport.name}: current lesson semantics are stale`,
    );

    assert.match(
      (await page
        .locator(
          '[aria-live="polite"][aria-atomic="true"]',
        )
        .textContent()) ?? "",
      /Halluzinationen erkennen wurde geöffnet/,
      `${viewport.name}: opened lesson announcement missing`,
    );

    assert.deepEqual(
      consoleErrors,
      [],
      `${viewport.name}: console errors`,
    );

    assert.deepEqual(
      pageErrors,
      [],
      `${viewport.name}: page errors`,
    );

    console.log(
      [
        `VIEWPORT=${viewport.name}`,
        `WIDTH=${viewport.width}`,
        "OVERFLOW=NO",
        "AXE=0",
        "TINY_TARGETS=0",
        "STRUCTURE=PASS",
        "ANCHORS=PASS",
        "HYDRATION=PASS",
      ].join(" "),
    );
  } finally {
    await context.close();
  }
}

async function testLiveRegion(browser) {
  const context = await browser.newContext({
    viewport: {
      width: 390,
      height: 844,
    },
  });

  const page = await context.newPage();

  const {
    consoleErrors,
    pageErrors,
  } = collectRuntimeErrors(page);

  try {
    await openPortal(page);

    const liveRegion =
      page.locator(
        '[aria-live="polite"][aria-atomic="true"]',
      );

    await page
      .getByRole("button", {
        name: "Als erledigt markieren",
      })
      .click();

    await page.waitForFunction(() => {
      const region =
        document.querySelector(
          '[aria-live="polite"][aria-atomic="true"]',
        );

      return (
        region?.textContent?.includes(
          "als erledigt markiert",
        ) ?? false
      );
    });

    assert.match(
      (await liveRegion.textContent()) ?? "",
      /als erledigt markiert/,
    );

    assert.equal(
      await page
        .getByRole("progressbar", {
          name: "Lernfortschritt",
        })
        .getAttribute("aria-valuetext"),
      "1/12 Lektionen lokal erledigt",
    );

    await page
      .getByRole("button", {
        name: "Reset",
      })
      .click();

    await page.waitForFunction(() => {
      const region =
        document.querySelector(
          '[aria-live="polite"][aria-atomic="true"]',
        );

      return (
        region?.textContent?.includes(
          "Lernfortschritt wurde zurückgesetzt",
        ) ?? false
      );
    });

    assert.match(
      (await liveRegion.textContent()) ?? "",
      /Lernfortschritt wurde zurückgesetzt/,
    );

    assert.equal(
      await page.evaluate(
        (key) =>
          window.localStorage.getItem(key),
        storageKey,
      ),
      "[]",
    );

    assert.deepEqual(
      consoleErrors,
      [],
    );

    assert.deepEqual(
      pageErrors,
      [],
    );

    console.log(
      "LIVE_REGION_PROGRESS_RESET=PASS",
    );
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    for (const viewport of viewports) {
      await testViewport(
        browser,
        viewport,
      );
    }

    await testLiveRegion(browser);

    console.log(
      "S48B_RESPONSIVE_HYDRATION_A11Y=PASS",
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(
    "S48B_RESPONSIVE_HYDRATION_A11Y=FAIL",
  );

  console.error(error);

  process.exitCode = 1;
});
