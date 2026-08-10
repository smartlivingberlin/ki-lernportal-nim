/**
 * Shared Playwright helper: remove cursor handbook overlays that intercept
 * clicks in CI smoke/regression suites.
 */
async function dismissExplainClouds(page) {
  await page.evaluate(() => {
    document
      .querySelectorAll("[data-explain-cloud-root]")
      .forEach((node) => node.remove());
  });

  // Best-effort UI close if a new cloud appears immediately.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const cloud = page.locator("[data-explain-cloud-root]").first();
    if ((await cloud.count()) === 0) {
      return;
    }

    const closeButton = cloud.getByRole("button", { name: "Schließen" });
    if ((await closeButton.count()) > 0) {
      await closeButton.click({ force: true, timeout: 1_000 }).catch(() => {});
    }

    await page.evaluate(() => {
      document
        .querySelectorAll("[data-explain-cloud-root]")
        .forEach((node) => node.remove());
    });
    await page.waitForTimeout(50);
  }
}

module.exports = { dismissExplainClouds };
