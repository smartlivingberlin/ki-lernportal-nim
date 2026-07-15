const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const baseUrl =
  process.env.S49D_BASE_URL || "http://127.0.0.1:3000";

const artifactDir =
  process.env.S49D_ARTIFACT_DIR || process.cwd();

const axePath = process.env.S49D_AXE_PATH || "";

const lessonTitles = [
  ["l1", "Was ist KI?"],
  ["l2", "Was kann KI gut — und was nicht?"],
  ["l3", "Deine erste sichere KI-Frage"],
  ["l4", "Was ist ein Prompt?"],
  ["l5", "Die einfache Prompt-Formel"],
  ["l6", "E-Mails und Texte verbessern"],
  ["l7", "Ideen sammeln, ohne blind zu übernehmen"],
  ["l8", "Halluzinationen erkennen"],
  ["l9", "Quellen prüfen"],
  ["l10", "Datenschutz im Prompt"],
  ["l11", "KI im Alltag und Beruf sinnvoll nutzen"],
  ["l12", "Abschluss-Check: Nutze KI sicherer"],
];

const viewports = [
  { width: 320, height: 800 },
  { width: 390, height: 844 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function storageSnapshot(page) {
  return page.evaluate(() => {
    const readStorage = (storage) =>
      Object.fromEntries(
        Object.keys(storage)
          .sort()
          .map((key) => [key, storage.getItem(key)])
      );

    return {
      localStorage: readStorage(window.localStorage),
      sessionStorage: readStorage(window.sessionStorage),
    };
  });
}

async function openLesson(page, lessonId, lessonTitle) {
  const button = page
    .getByRole("button", {
      name: new RegExp(escapeRegex(lessonTitle), "i"),
    })
    .first();

  assert(
    (await button.count()) === 1,
    `Lektionsbutton nicht gefunden: ${lessonId} ${lessonTitle}`
  );

  await button.scrollIntoViewIfNeeded();
  await button.click();

  await page.waitForFunction(
    (expectedLessonId) => {
      const panel = document.querySelector(
        "[data-testid=\"lesson-practice\"]"
      );

      return (
        panel &&
        panel.getAttribute("data-lesson-id") === expectedLessonId
      );
    },
    lessonId
  );
}

async function checkRenderedAccessibility(page, viewportName) {
  const result = await page.evaluate(() => {
    const duplicateIds = [];

    const idCounts = new Map();

    for (const element of document.querySelectorAll("[id]")) {
      const id = element.id;
      idCounts.set(id, (idCounts.get(id) || 0) + 1);
    }

    for (const [id, count] of idCounts.entries()) {
      if (count > 1) {
        duplicateIds.push({ id, count });
      }
    }

    const unlabeledTextareas = Array.from(
      document.querySelectorAll("textarea")
    )
      .filter((element) => element.labels.length === 0)
      .map((element) => element.id);

    const unlabeledCheckboxes = Array.from(
      document.querySelectorAll("input[type=\"checkbox\"]")
    )
      .filter((element) => element.labels.length === 0)
      .map((element) => element.id);

    const unnamedButtons = Array.from(
      document.querySelectorAll("button")
    )
      .filter(
        (element) =>
          !(element.textContent || "").trim() &&
          !element.getAttribute("aria-label")
      )
      .map((element) => element.outerHTML);

    const invalidExpanded = Array.from(
      document.querySelectorAll("[aria-expanded]")
    )
      .filter((element) => {
        const value = element.getAttribute("aria-expanded");
        return value !== "true" && value !== "false";
      })
      .map((element) => element.outerHTML);

    const practiceButtons = Array.from(
      document.querySelectorAll(
        "[data-testid=\"lesson-practice\"] button"
      )
    ).map((element) => {
      const rect = element.getBoundingClientRect();

      return {
        text: (element.textContent || "").trim(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    });

    const tooSmallPracticeButtons = practiceButtons.filter(
      (button) => button.height < 44 || button.width < 44
    );

    const overflow = {
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
    };

    return {
      duplicateIds,
      unlabeledTextareas,
      unlabeledCheckboxes,
      unnamedButtons,
      invalidExpanded,
      tooSmallPracticeButtons,
      overflow,
    };
  });

  assert(
    result.duplicateIds.length === 0,
    `${viewportName}: doppelte IDs: ${JSON.stringify(
      result.duplicateIds
    )}`
  );

  assert(
    result.unlabeledTextareas.length === 0,
    `${viewportName}: Textarea ohne Label`
  );

  assert(
    result.unlabeledCheckboxes.length === 0,
    `${viewportName}: Checkbox ohne Label`
  );

  assert(
    result.unnamedButtons.length === 0,
    `${viewportName}: Button ohne zugänglichen Namen`
  );

  assert(
    result.invalidExpanded.length === 0,
    `${viewportName}: ungültiges aria-expanded`
  );

  assert(
    result.tooSmallPracticeButtons.length === 0,
    `${viewportName}: zu kleine Übungsbuttons: ${JSON.stringify(
      result.tooSmallPracticeButtons
    )}`
  );

  assert(
    result.overflow.documentWidth <=
      result.overflow.viewportWidth + 1,
    `${viewportName}: horizontaler Dokumentüberlauf ${JSON.stringify(
      result.overflow
    )}`
  );

  assert(
    result.overflow.bodyWidth <=
      result.overflow.viewportWidth + 1,
    `${viewportName}: horizontaler Body-Überlauf ${JSON.stringify(
      result.overflow
    )}`
  );

  return result;
}

async function runAxe(page, viewportName) {
  assert(axePath, `${viewportName}: AXE-Pfad fehlt`);
  assert(
    fs.existsSync(axePath),
    `${viewportName}: AXE-Datei fehlt: ${axePath}`
  );

  await page.addScriptTag({
    path: axePath,
  });

  const results = await page.evaluate(async () => {
    return window.axe.run(document, {
      resultTypes: ["violations"],
    });
  });

  console.log(
    `AXE_VIOLATION_COUNT_${viewportName}=${results.violations.length}`
  );

  if (results.violations.length > 0) {
    console.log(
      `AXE_VIOLATIONS_${viewportName}=${JSON.stringify(
        results.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          nodes: violation.nodes.map((node) => node.target),
        }))
      )}`
    );
  }

  assert(
    results.violations.length === 0,
    `${viewportName}: Axe-Verstöße gefunden`
  );
}

async function runViewport(browser, viewport) {
  const viewportName = String(viewport.width);

  const context = await browser.newContext({
    viewport,
  });

  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];
  const interactionRequests = [];

  let trackInteractionRequests = false;

  page.on("console", (message) => {
    if (message.type() !== "error") {
      return;
    }

    const text = message.text();

    if (text.includes("favicon.ico")) {
      return;
    }

    consoleErrors.push(text);
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("request", (request) => {
    if (!trackInteractionRequests) {
      return;
    }

    interactionRequests.push(
      `${request.method()} ${request.url()}`
    );
  });

  await page.goto(baseUrl, {
    waitUntil: "networkidle",
  });

  await page
    .locator("[data-testid=\"lesson-practice\"]")
    .waitFor({
      state: "visible",
    });

  const initialPanel = page.locator(
    "[data-testid=\"lesson-practice\"]"
  );

  assert(
    (await initialPanel.getAttribute("data-lesson-id")) === "l1",
    `${viewportName}: Startlektion ist nicht l1`
  );

  assert(
    (await initialPanel.locator("textarea").count()) === 1,
    `${viewportName}: Textarea fehlt`
  );

  assert(
    (await initialPanel.locator("input[type=\"checkbox\"]").count()) ===
      3,
    `${viewportName}: Selbstprüfung hat nicht drei Checkboxen`
  );

  assert(
    (await initialPanel.locator("ol li").count()) === 3,
    `${viewportName}: Kontrollfragen sind nicht vollständig`
  );

  const textarea = initialPanel.locator(
    "[data-testid=\"lesson-practice-answer\"]"
  );

  assert(
    (await textarea.getAttribute("maxlength")) === "2000",
    `${viewportName}: maxLength ist nicht 2000`
  );

  const initialStorage = await storageSnapshot(page);

  trackInteractionRequests = true;

  const answerText =
    "Meine eigene Testantwort zur sicheren Nutzung von KI.";

  await textarea.fill(answerText);

  assert(
    (await textarea.inputValue()) === answerText,
    `${viewportName}: Texteingabe stimmt nicht`
  );

  const characterCount = await initialPanel
    .locator(
      "[data-testid=\"lesson-practice-character-count\"]"
    )
    .textContent();

  assert(
    (characterCount || "").includes(
      `${answerText.length} / 2000`
    ),
    `${viewportName}: Zeichenzähler stimmt nicht`
  );

  const clearButton = initialPanel.locator(
    "[data-testid=\"lesson-practice-clear\"]"
  );

  assert(
    !(await clearButton.isDisabled()),
    `${viewportName}: Löschen bleibt trotz Text deaktiviert`
  );

  const hintToggle = initialPanel.locator(
    "[data-testid=\"lesson-practice-hint-toggle\"]"
  );

  assert(
    (await hintToggle.getAttribute("aria-expanded")) === "false",
    `${viewportName}: Hinweis startet nicht geschlossen`
  );

  await hintToggle.click();

  assert(
    (await hintToggle.getAttribute("aria-expanded")) === "true",
    `${viewportName}: Hinweis wurde nicht geöffnet`
  );

  const hint = initialPanel.locator(
    "[data-testid=\"lesson-practice-hint\"]"
  );

  assert(
    await hint.isVisible(),
    `${viewportName}: Hinweis ist nicht sichtbar`
  );

  const hintControls = await hintToggle.getAttribute(
    "aria-controls"
  );

  assert(
    hintControls &&
      (await page.locator(`#${hintControls}`).count()) === 1,
    `${viewportName}: aria-controls des Hinweises ist ungültig`
  );

  const sampleToggle = initialPanel.locator(
    "[data-testid=\"lesson-practice-sample-toggle\"]"
  );

  assert(
    (await sampleToggle.getAttribute("aria-expanded")) === "false",
    `${viewportName}: Beispielantwort startet nicht geschlossen`
  );

  await sampleToggle.click();

  assert(
    (await sampleToggle.getAttribute("aria-expanded")) === "true",
    `${viewportName}: Beispielantwort wurde nicht geöffnet`
  );

  const sample = initialPanel.locator(
    "[data-testid=\"lesson-practice-sample\"]"
  );

  assert(
    await sample.isVisible(),
    `${viewportName}: Beispielantwort ist nicht sichtbar`
  );

  const sampleControls = await sampleToggle.getAttribute(
    "aria-controls"
  );

  assert(
    sampleControls &&
      (await page.locator(`#${sampleControls}`).count()) === 1,
    `${viewportName}: aria-controls der Beispielantwort ist ungültig`
  );

  const checkboxes = initialPanel.locator(
    "input[type=\"checkbox\"]"
  );

  await checkboxes.nth(0).check();

  assert(
    await checkboxes.nth(0).isChecked(),
    `${viewportName}: Checkbox lässt sich nicht aktivieren`
  );

  await page.screenshot({
    path: path.join(
      artifactDir,
      `practice-${viewportName}.png`
    ),
    fullPage: true,
  });

  await clearButton.click();

  assert(
    (await textarea.inputValue()) === "",
    `${viewportName}: Löschen leert Textarea nicht`
  );

  assert(
    await clearButton.isDisabled(),
    `${viewportName}: Löschen wird nach Leerung nicht deaktiviert`
  );

  await textarea.fill("Antwort vor Lektionswechsel");
  await checkboxes.nth(1).check();

  await openLesson(
    page,
    lessonTitles[1][0],
    lessonTitles[1][1]
  );

  const lessonTwoPanel = page.locator(
    "[data-testid=\"lesson-practice\"]"
  );

  assert(
    (await lessonTwoPanel
      .locator("[data-testid=\"lesson-practice-answer\"]")
      .inputValue()) === "",
    `${viewportName}: Antwort wurde in nächste Lektion übernommen`
  );

  assert(
    (await lessonTwoPanel
      .locator("input[type=\"checkbox\"]:checked")
      .count()) === 0,
    `${viewportName}: Selbstprüfung wurde in nächste Lektion übernommen`
  );

  assert(
    (await lessonTwoPanel
      .locator(
        "[data-testid=\"lesson-practice-hint-toggle\"]"
      )
      .getAttribute("aria-expanded")) === "false",
    `${viewportName}: Hinweiszustand wurde übernommen`
  );

  assert(
    (await lessonTwoPanel
      .locator(
        "[data-testid=\"lesson-practice-sample-toggle\"]"
      )
      .getAttribute("aria-expanded")) === "false",
    `${viewportName}: Beispielzustand wurde übernommen`
  );

  await openLesson(
    page,
    lessonTitles[0][0],
    lessonTitles[0][1]
  );

  const returnedPanel = page.locator(
    "[data-testid=\"lesson-practice\"]"
  );

  assert(
    (await returnedPanel
      .locator("[data-testid=\"lesson-practice-answer\"]")
      .inputValue()) === "",
    `${viewportName}: alte Antwort wurde nach Rückkehr wiederhergestellt`
  );

  assert(
    (await returnedPanel
      .locator("input[type=\"checkbox\"]:checked")
      .count()) === 0,
    `${viewportName}: alte Checkboxen wurden nach Rückkehr wiederhergestellt`
  );

  for (const [lessonId, lessonTitle] of lessonTitles) {
    await openLesson(page, lessonId, lessonTitle);

    const panel = page.locator(
      "[data-testid=\"lesson-practice\"]"
    );

    assert(
      (await panel.getAttribute("data-lesson-id")) === lessonId,
      `${viewportName}: falsche Übung bei ${lessonId}`
    );

    const taskText = (
      (await panel
        .locator("div")
        .filter({ hasText: "Deine Aufgabe" })
        .first()
        .textContent()) || ""
    ).trim();

    assert(
      taskText.length > 30,
      `${viewportName}: Aufgabe ist bei ${lessonId} zu kurz`
    );

    assert(
      (await panel.locator("ol li").count()) === 3,
      `${viewportName}: Kontrollfragen fehlen bei ${lessonId}`
    );

    assert(
      (await panel.locator("input[type=\"checkbox\"]").count()) === 3,
      `${viewportName}: Selbstprüfung fehlt bei ${lessonId}`
    );
  }

  await openLesson(
    page,
    lessonTitles[0][0],
    lessonTitles[0][1]
  );

  const finalPanel = page.locator(
    "[data-testid=\"lesson-practice\"]"
  );

  await finalPanel
    .locator("[data-testid=\"lesson-practice-hint-toggle\"]")
    .click();

  await finalPanel
    .locator("[data-testid=\"lesson-practice-sample-toggle\"]")
    .click();

  const accessibilityResult =
    await checkRenderedAccessibility(page, viewportName);

  await runAxe(page, viewportName);

  const finalStorage = await storageSnapshot(page);

  assert(
    JSON.stringify(finalStorage) ===
      JSON.stringify(initialStorage),
    `${viewportName}: Browser-Speicher wurde verändert`
  );

  await page.waitForTimeout(300);

  assert(
    interactionRequests.length === 0,
    `${viewportName}: Interaktionen lösten Netzwerkzugriffe aus: ${JSON.stringify(
      interactionRequests
    )}`
  );

  assert(
    consoleErrors.length === 0,
    `${viewportName}: Console-Fehler: ${JSON.stringify(
      consoleErrors
    )}`
  );

  assert(
    pageErrors.length === 0,
    `${viewportName}: Seitenfehler: ${JSON.stringify(
      pageErrors
    )}`
  );

  console.log(
    `STORAGE_UNCHANGED_${viewportName}=PASS`
  );

  console.log(
    `INTERACTION_REQUEST_COUNT_${viewportName}=${interactionRequests.length}`
  );

  console.log(
    `CONSOLE_ERROR_COUNT_${viewportName}=${consoleErrors.length}`
  );

  console.log(
    `PAGE_ERROR_COUNT_${viewportName}=${pageErrors.length}`
  );

  console.log(
    `DOCUMENT_WIDTH_${viewportName}=${accessibilityResult.overflow.documentWidth}`
  );

  console.log(
    `VIEWPORT_${viewportName}=PASS`
  );

  await context.close();
}

async function main() {
  fs.mkdirSync(artifactDir, {
    recursive: true,
  });

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    for (const viewport of viewports) {
      await runViewport(browser, viewport);
    }
  } finally {
    await browser.close();
  }

  console.log("VIEWPORT_COUNT=4");
  console.log("LESSON_RUNTIME_COUNT=12");
  console.log("PRACTICE_BROWSER_ASSERTION=PASS");
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});
