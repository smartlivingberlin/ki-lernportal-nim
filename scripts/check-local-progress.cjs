const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { dismissExplainClouds } = require("./playwright-dismiss-explain-clouds.cjs");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const requestedPhase = process.env.SMOKE_PHASE || "all";
const progressStorageKey = "ki-lernportal-nim:local-progress:v1";
const navigationTimeout = 30_000;

async function suppressExplainClouds(page) {
  await page.addStyleTag({
    content:
      "[data-explain-cloud-root]{display:none!important;pointer-events:none!important;}",
  }).catch(() => {});
  await dismissExplainClouds(page);
}

async function domClick(locator) {
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await locator.evaluate((el) => {
    if (el instanceof HTMLElement) {
      el.click();
    }
  });
}

async function openPortal(page) {
  await page.goto(baseUrl, {
    waitUntil: "load",
    timeout: navigationTimeout,
  });
  await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({
    state: "visible",
    timeout: navigationTimeout,
  });
  await suppressExplainClouds(page);
}

async function resetBrowserProgress(page) {
  await page.evaluate(
    ({ key, value }) => window.localStorage.setItem(key, value),
    { key: progressStorageKey, value: "[]" },
  );
  await page.reload({ waitUntil: "load", timeout: navigationTimeout });
  await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({ state: "visible" });
  await page.waitForTimeout(500);
  await suppressExplainClouds(page);
  await waitForStoredLessonIds(page, []);
}

async function expectExactText(page, text) {
  const locator = page.getByText(text, { exact: true }).first();
  await locator.waitFor({ state: "attached", timeout: 20_000 });
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await locator.waitFor({ state: "visible", timeout: 20_000 });
}

async function waitForStoredLessonIds(page, expectedIds) {
  await page.waitForFunction(
    ({ key, expected }) => {
      try {
        const raw = window.localStorage.getItem(key);
        if (raw === null) return false;

        const current = JSON.parse(raw);
        return JSON.stringify(current) === JSON.stringify(expected);
      } catch {
        return false;
      }
    },
    { key: progressStorageKey, expected: expectedIds },
    { timeout: 20_000 },
  );
}

async function lessonButton(page, title) {
  const button = page
    .locator("#pfad")
    .getByRole("button")
    .filter({ hasText: title })
    .first();
  await button.waitFor({ state: "attached", timeout: 15_000 });
  await button.scrollIntoViewIfNeeded();
  return button;
}

async function waitForLessonSidebarStatus(page, title, statusPattern) {
  const button = await lessonButton(page, title);
  await page.waitForFunction(
    ({ titleText, patternSource }) => {
      const root = document.querySelector("#pfad") || document;
      const buttons = [...root.querySelectorAll("button")];
      const match = buttons.find((node) =>
        (node.innerText || "").includes(titleText),
      );
      if (!match) return false;
      return new RegExp(patternSource, "i").test(match.innerText || "");
    },
    { titleText: title, patternSource: statusPattern.source },
    { timeout: 20_000 },
  );
  return button;
}

async function clickLessonDone(page, title, headingName = title) {
  await suppressExplainClouds(page);
  const lesson = await lessonButton(page, title);
  await domClick(lesson);
  await page
    .getByRole("heading", { name: headingName, exact: true })
    .waitFor({ state: "visible", timeout: 20_000 });
  await suppressExplainClouds(page);

  const doneButton = page.getByRole("button", { name: "Als erledigt markieren" });
  const undoButton = page.getByRole("button", { name: "Erledigt zurücknehmen" });

  for (let attempt = 0; attempt < 5; attempt += 1) {
    if ((await undoButton.count()) > 0 && (await undoButton.isVisible().catch(() => false))) {
      return;
    }

    await doneButton.waitFor({ state: "visible", timeout: 15_000 });
    await suppressExplainClouds(page);
    await domClick(doneButton);
    await page.waitForTimeout(100);

    try {
      await undoButton.waitFor({ state: "visible", timeout: 2_500 });
      return;
    } catch {
      // retry mark-done if overlay/layout ate the first click
    }
  }

  await undoButton.waitFor({ state: "visible", timeout: 5_000 });
}

async function openLessonByWorkspaceNext(page, order, headingName) {
  await suppressExplainClouds(page);
  const nextCta = page.getByRole("button", {
    name: new RegExp(`Danach:\\s*Lektion\\s*${order}`, "i"),
  });
  await nextCta.waitFor({ state: "visible", timeout: 15_000 });
  await domClick(nextCta);
  await page
    .getByRole("heading", { name: headingName, exact: true })
    .waitFor({ state: "visible", timeout: 20_000 });
  await suppressExplainClouds(page);
}

async function clickFirstLessonDone(page) {
  await clickLessonDone(page, "Was ist KI?");
}

async function markFirstLesson(page) {
  await clickFirstLessonDone(page);
  await waitForStoredLessonIds(page, ["l1"]);
  await expectExactText(page, "1/12");
  await waitForLessonSidebarStatus(page, "Was ist KI?", /erledigt/i);
}

async function markFirstTwoLessons(page) {
  await markFirstLesson(page);
  // Prefer in-workspace next CTA: on mobile the Lernpfad aside is far below
  // and sidebar lesson clicks flake behind sticky chrome / overlays.
  await openLessonByWorkspaceNext(
    page,
    2,
    "Was kann KI gut — und was nicht?",
  );
  await clickLessonDone(page, "Was kann KI gut", "Was kann KI gut — und was nicht?");
  await waitForStoredLessonIds(page, ["l1", "l2"]);
  await expectExactText(page, "2/12");
}

const phases = {
  async start(page) {
    await expectExactText(page, "0/12");
    await expectExactText(page, "0%");
    console.log("START_0_12_OK=YES");
  },

  async assets(page) {
    const scriptSources = await page.locator("script[src]").evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("src")).filter(Boolean),
    );

    assert.ok(scriptSources.length > 0, "No browser JavaScript assets were found.");

    const assetResults = await page.evaluate(async (sources) => {
      return Promise.all(
        sources.map(async (source) => {
          const url = new URL(source, window.location.href).toString();
          try {
            const response = await fetch(url, { cache: "no-store" });
            return { source, ok: response.ok, status: response.status };
          } catch (error) {
            return { source, ok: false, status: 0, error: String(error) };
          }
        }),
      );
    }, scriptSources);

    const failedAssets = assetResults.filter((result) => !result.ok);
    assert.deepEqual(failedAssets, []);
    console.log("BROWSER_JS_ASSETS_OK=YES");
  },

  async click(page) {
    await clickFirstLessonDone(page);
    await expectExactText(page, "1/12");
    console.log("CLICK_UPDATES_1_12_OK=YES");
  },

  async storage(page) {
    await clickFirstLessonDone(page);
    await waitForStoredLessonIds(page, ["l1"]);
    console.log("CLICK_PERSISTS_L1_OK=YES");
  },

  async module(page) {
    await markFirstLesson(page);
    const bodyText = await page.locator("body").innerText();
    assert.match(bodyText, /1\/3 erledigt/i);
    console.log("MODULE_1_3_OK=YES");
  },

  async status(page) {
    await markFirstLesson(page);
    const firstLessonButton = await lessonButton(page, "Was ist KI?");
    assert.match(await firstLessonButton.innerText(), /erledigt/i);
    console.log("LESSON_DONE_STATUS_OK=YES");
  },

  async reload(page) {
    await markFirstLesson(page);
    await page.reload({ waitUntil: "load", timeout: navigationTimeout });
    await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({ state: "visible" });
    await suppressExplainClouds(page);
    await expectExactText(page, "1/12");
    await page.getByRole("button", { name: "Erledigt zurücknehmen" }).waitFor({ state: "visible" });
    await waitForStoredLessonIds(page, ["l1"]);
    console.log("RELOAD_LOCALSTORAGE_1_12_OK=YES");
  },

  async undo(page) {
    await markFirstLesson(page);
    await suppressExplainClouds(page);
    await domClick(page.getByRole("button", { name: "Erledigt zurücknehmen" }));
    await expectExactText(page, "0/12");
    await waitForStoredLessonIds(page, []);
    console.log("UNDO_BACK_TO_0_12_OK=YES");
  },

  async two(page) {
    await markFirstTwoLessons(page);
    const bodyText = await page.locator("body").innerText();
    assert.match(bodyText, /2\/3 erledigt/i);
    console.log("TWO_LESSONS_2_12_OK=YES");
  },

  async reset(page) {
    await markFirstTwoLessons(page);
    await suppressExplainClouds(page);
    await domClick(page.getByRole("button", { name: "Fortschritt zurücksetzen" }));
    await domClick(page.getByRole("button", { name: "Ja, zurücksetzen" }));
    await expectExactText(page, "0/12");
    await waitForStoredLessonIds(page, []);
    console.log("RESET_BACK_TO_0_12_OK=YES");
  },

  async "cross-tab-clear"(page) {
    await markFirstLesson(page);

    const secondPage = await page.context().newPage();

    try {
      await openPortal(secondPage);
      await expectExactText(secondPage, "1/12");

      await secondPage.evaluate(
        (key) => window.localStorage.removeItem(key),
        progressStorageKey,
      );

      await expectExactText(page, "0/12");

      assert.equal(
        await page.evaluate(
          (key) => window.localStorage.getItem(key),
          progressStorageKey,
        ),
        null,
      );

      console.log("CROSS_TAB_STORAGE_REMOVAL_RESETS_PROGRESS_OK=YES");
    } finally {
      await secondPage.close();
    }
  },

  async guardrails(page) {
    const forbiddenControls = page.locator("a, button").filter({
      hasText: /Anmelden|Registrieren|Bezahlen|Checkout|Chat starten|KI-Chat/i,
    });
    assert.equal(await forbiddenControls.count(), 0);
    console.log("NO_LOGIN_PAYMENT_TRACKING_CHAT_OK=YES");

    const bottomNav = page.getByRole("navigation", {
      name: "Mobile Schnellnavigation",
    });
    for (const label of ["Start", "Check", "Pfad", "Üben", "Scam"]) {
      assert.equal(
        await bottomNav.getByRole("link", { name: label, exact: true }).count(),
        1,
        `bottom nav missing label: ${label}`,
      );
    }
    assert.equal(
      await bottomNav.getByRole("link", { name: "Abruf", exact: true }).count(),
      0,
    );
    assert.equal(
      await page.getByRole("link", { name: "Jetzt starten", exact: true }).count(),
      1,
    );
    console.log("MASS_AUDIENCE_CHROME_LABELS_OK=YES");
  },

  async packaging(page) {
    await page.evaluate(() => {
      window.localStorage.setItem("ki-lernportal-nim:simple-mode:v1", "1");
      window.localStorage.setItem("ki-lernportal-nim:first-start-coach:v1", "dismissed");
    });
    await page.reload({ waitUntil: "load", timeout: navigationTimeout });
    await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({
      state: "visible",
    });
    await suppressExplainClouds(page);

    await page.getByTestId("simple-mode-pack-hint").waitFor({ state: "visible" });
    assert.equal(await page.locator("#ziele").count(), 0);
    assert.equal(await page.locator("#szenarien").count(), 0);
    assert.equal(await page.locator("#methoden").count(), 0);

    await page.getByRole("button", { name: "Mehr Bereiche einblenden" }).click();
    await page.locator("#ziele").waitFor({ state: "visible" });
    assert.equal(await page.getByTestId("simple-mode-pack-hint").count(), 0);
    console.log("PACKAGING_A_SIMPLE_MODE_PACK_OK=YES");

    await page.getByRole("button", { name: "Fortschritt zurücksetzen" }).click();
    await expectExactText(page, "Haken an den 12 Lektionen");
    await expectExactText(page, "Wiederholungs-Queue (Übungskarten)");
    console.log("PACKAGING_A_HONEST_RESET_COPY_OK=YES");
  },

  async "next-step"(page) {
    await page.evaluate(() => {
      window.localStorage.removeItem("ki-lernportal-nim:literacy-path:v1");
      window.localStorage.setItem("ki-lernportal-nim:first-start-coach:v1", "dismissed");
      window.localStorage.setItem("ki-lernportal-nim:simple-mode:v1", "1");
      window.localStorage.setItem("ki-lernportal-nim:local-progress:v1", "[]");
    });
    await page.reload({ waitUntil: "load", timeout: navigationTimeout });
    await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({
      state: "visible",
    });
    await suppressExplainClouds(page);

    const today = page.getByTestId("today-start-card");
    await today.waitFor({ state: "visible" });
    assert.equal(await today.getAttribute("data-next-step-kind"), "self-check");
    await expectExactText(page, "Selbstcheck machen");
    console.log("NEXT_STEP_CONTRACT_TODAY_SELF_CHECK_OK=YES");
  },

  async "content-wave"(page) {
    await page.evaluate(() => {
      window.localStorage.setItem("ki-lernportal-nim:simple-mode:v1", "0");
      window.localStorage.setItem("ki-lernportal-nim:first-start-coach:v1", "dismissed");
    });
    await page.reload({ waitUntil: "load", timeout: navigationTimeout });
    await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({
      state: "visible",
    });
    await suppressExplainClouds(page);

    await page.locator("#ziele").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Ohne Angst|KI ohne Angst/i }).first().click().catch(async () => {
      await page.locator("#ziele button").first().click();
    });
    const track = page.getByTestId("theme-world-track");
    await track.waitFor({ state: "visible", timeout: 15_000 });
    await expectExactText(page, "Start hier");
    await page.getByText(/Weitere Einheiten \(\d+\)/).first().waitFor({ state: "visible" });
    console.log("CONTENT_WAVE_C_WORLD_OVERVIEW_OK=YES");
  },
};

async function runPhase(browser, phaseName) {
  const phase = phases[phaseName];
  if (!phase) throw new Error(`Unknown smoke phase: ${phaseName}`);

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(20_000);

  try {
    await openPortal(page);
    await resetBrowserProgress(page);
    await phase(page);
    console.log(`SMOKE_PHASE_${phaseName.toUpperCase()}=PASS`);
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    if (requestedPhase === "all") {
      for (const phaseName of Object.keys(phases)) {
        await runPhase(browser, phaseName);
      }
      console.log("S67G3C_AUTOMATED_PROGRESS_SMOKE_TEST=PASS");
      return;
    }

    await runPhase(browser, requestedPhase);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(`SMOKE_PHASE_${requestedPhase.toUpperCase()}=FAIL`);
  console.error(error);
  process.exitCode = 1;
});
