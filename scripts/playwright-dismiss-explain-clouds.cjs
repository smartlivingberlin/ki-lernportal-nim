/**
 * Shared Playwright helper: remove/close cursor handbook overlays that
 * intercept clicks in CI smoke/regression suites.
 */
async function dismissExplainClouds(page) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const cloud = page.locator("[data-explain-cloud-root]").first();
    if ((await cloud.count()) === 0) {
      return;
    }

    const closeButton = cloud.getByRole("button", { name: "Schließen" });
    if ((await closeButton.count()) === 0) {
      await page.evaluate(() => {
        document
          .querySelectorAll("[data-explain-cloud-root]")
          .forEach((node) => node.remove());
      });
      return;
    }

    await closeButton.click({ timeout: 2_000 }).catch(async () => {
      await page.evaluate(() => {
        document
          .querySelectorAll("[data-explain-cloud-root]")
          .forEach((node) => node.remove());
      });
    });
    await page.waitForTimeout(150);
  }
}

module.exports = { dismissExplainClouds };
