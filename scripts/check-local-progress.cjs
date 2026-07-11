const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const progressStorageKey = "ki-lernportal-nim:local-progress:v1";

async function expectExactText(page, text) {
  await page.getByText(text, { exact: true }).waitFor({ state: "visible" });
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate((key) => window.localStorage.removeItem(key), progressStorageKey);
    await page.reload({ waitUntil: "networkidle" });

    await expectExactText(page, "0/12");
    await expectExactText(page, "0%");
    console.log("START_0_12_OK=YES");

    await page.getByRole("button", { name: "Als erledigt markieren" }).click();
    await expectExactText(page, "1/12");
    await page.getByText("1/3 erledigt", { exact: false }).waitFor({ state: "visible" });
    await page.getByRole("button", { name: /Was ist KI\?.*erledigt/i }).waitFor({ state: "visible" });

    const firstStoredState = await page.evaluate(
      (key) => JSON.parse(window.localStorage.getItem(key) || "[]"),
      progressStorageKey,
    );
    assert.deepEqual(firstStoredState, ["l1"]);
    console.log("MARK_DONE_1_12_OK=YES");
    console.log("MODULE_1_3_OK=YES");
    console.log("LESSON_DONE_STATUS_OK=YES");

    await page.reload({ waitUntil: "networkidle" });
    await expectExactText(page, "1/12");
    await page.getByRole("button", { name: "Erledigt zurücknehmen" }).waitFor({ state: "visible" });
    console.log("RELOAD_LOCALSTORAGE_1_12_OK=YES");

    await page.getByRole("button", { name: "Erledigt zurücknehmen" }).click();
    await expectExactText(page, "0/12");
    console.log("UNDO_BACK_TO_0_12_OK=YES");

    await page.getByRole("button", { name: "Als erledigt markieren" }).click();
    await page.getByRole("button", { name: /Was kann KI gut.*offen/i }).click();
    await page.getByRole("button", { name: "Als erledigt markieren" }).click();
    await expectExactText(page, "2/12");
    await page.getByText("2/3 erledigt", { exact: false }).waitFor({ state: "visible" });
    console.log("TWO_LESSONS_2_12_OK=YES");

    await page.getByRole("button", { name: "Reset" }).click();
    await expectExactText(page, "0/12");
    await page.waitForFunction(
      (key) => JSON.parse(window.localStorage.getItem(key) || "[]").length === 0,
      progressStorageKey,
    );
    console.log("RESET_BACK_TO_0_12_OK=YES");

    const forbiddenControls = page.locator("a, button").filter({
      hasText: /Anmelden|Registrieren|Bezahlen|Checkout|Chat starten|KI-Chat/i,
    });
    assert.equal(await forbiddenControls.count(), 0);
    console.log("NO_LOGIN_PAYMENT_TRACKING_CHAT_OK=YES");

    console.log("S67G3C_AUTOMATED_PROGRESS_SMOKE_TEST=PASS");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("S67G3C_AUTOMATED_PROGRESS_SMOKE_TEST=FAIL");
  console.error(error);
  process.exitCode = 1;
});
