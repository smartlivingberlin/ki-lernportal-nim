const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const requestedPhase = process.env.SMOKE_PHASE || "all";
const progressStorageKey = "ki-lernportal-nim:local-progress:v1";
const navigationTimeout = 30_000;

async function openPortal(page) {
  await page.goto(baseUrl, {
    waitUntil: "domcontentloaded",
    timeout: navigationTimeout,
  });
  await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({
    state: "visible",
    timeout: navigationTimeout,
  });
}

async function resetBrowserProgress(page) {
  await page.evaluate((key) => window.localStorage.removeItem(key), progressStorageKey);
  await page.reload({ waitUntil: "domcontentloaded", timeout: navigationTimeout });
  await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({ state: "visible" });
  await waitForStoredLessonIds(page, []);
}

async function expectExactText(page, text) {
  await page.getByText(text, { exact: true }).first().waitFor({
    state: "visible",
    timeout: 10_000,
  });
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
    { timeout: 10_000 },
  );
}

async function lessonButton(page, title) {
  const button = page.getByRole("button").filter({ hasText: title }).first();
  await button.waitFor({ state: "visible", timeout: 10_000 });
  return button;
}

async function markFirstLesson(page) {
  await page.getByRole("button", { name: "Als erledigt markieren" }).click();
  await expectExactText(page, "1/12");
  await waitForStoredLessonIds(page, ["l1"]);
}

async function markFirstTwoLessons(page) {
  await markFirstLesson(page);

  const secondLessonButton = await lessonButton(page, "Was kann KI gut");
  await secondLessonButton.click();
  await page.getByRole("heading", { name: "Was kann KI gut — und was nicht?" }).waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Als erledigt markieren" }).click();
  await expectExactText(page, "2/12");
  await waitForStoredLessonIds(page, ["l1", "l2"]);
}

const phases = {
  async start(page) {
    await expectExactText(page, "0/12");
    await expectExactText(page, "0%");
    console.log("START_0_12_OK=YES");
  },

  async mark(page) {
    await markFirstLesson(page);
    console.log("MARK_DONE_1_12_OK=YES");
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
    await page.reload({ waitUntil: "domcontentloaded", timeout: navigationTimeout });
    await page.getByRole("heading", { name: "Dein geführter KI-Lernraum." }).waitFor({ state: "visible" });
    await expectExactText(page, "1/12");
    await page.getByRole("button", { name: "Erledigt zurücknehmen" }).waitFor({ state: "visible" });
    await waitForStoredLessonIds(page, ["l1"]);
    console.log("RELOAD_LOCALSTORAGE_1_12_OK=YES");
  },

  async undo(page) {
    await markFirstLesson(page);
    await page.getByRole("button", { name: "Erledigt zurücknehmen" }).click();
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
    await page.getByRole("button", { name: "Reset" }).click();
    await expectExactText(page, "0/12");
    await waitForStoredLessonIds(page, []);
    console.log("RESET_BACK_TO_0_12_OK=YES");
  },

  async guardrails(page) {
    const forbiddenControls = page.locator("a, button").filter({
      hasText: /Anmelden|Registrieren|Bezahlen|Checkout|Chat starten|KI-Chat/i,
    });
    assert.equal(await forbiddenControls.count(), 0);
    console.log("NO_LOGIN_PAYMENT_TRACKING_CHAT_OK=YES");
  },
};

async function runPhase(browser, phaseName) {
  const phase = phases[phaseName];
  if (!phase) throw new Error(`Unknown smoke phase: ${phaseName}`);

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.setDefaultTimeout(10_000);

  try {
    await openPortal(page);
    await resetBrowserProgress(page);
    await phase(page);
    console.log(`SMOKE_PHASE_${phaseName.toUpperCase()}=PASS`);
  } finally {
    await page.close();
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
