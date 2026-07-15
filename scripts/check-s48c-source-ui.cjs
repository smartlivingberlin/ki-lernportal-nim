const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createRequire } = require("node:module");
const { chromium } = require("playwright");

const axePackage = require("@axe-core/playwright");
const AxeBuilder =
  axePackage.default ??
  axePackage.AxeBuilder ??
  axePackage;

const repoRoot = process.cwd();
const baseUrl =
  process.env.BASE_URL ||
  "http://127.0.0.1:3000";

const navigationTimeout = 30_000;

function loadContentData() {
  const dataDir = path.join(
    repoRoot,
    "apps",
    "web",
    "src",
    "data",
  );

  const webPackage = path.join(
    repoRoot,
    "apps",
    "web",
    "package.json",
  );

  const requireFromWeb =
    createRequire(webPackage);

  const ts = requireFromWeb("typescript");

  const tempDir = fs.mkdtempSync(
    path.join(
      os.tmpdir(),
      "ki-lernportal-s48c-ui-",
    ),
  );

  try {
    for (const filename of [
      "types.ts",
      "sources.ts",
      "lessons.ts",
    ]) {
      const input = path.join(
        dataDir,
        filename,
      );

      const output = path.join(
        tempDir,
        filename.replace(/\.ts$/, ".js"),
      );

      const result = ts.transpileModule(
        fs.readFileSync(input, "utf8"),
        {
          fileName: input,
          compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022,
            esModuleInterop: true,
          },
        },
      );

      fs.writeFileSync(
        output,
        result.outputText,
        "utf8",
      );
    }

    const requireTemp = createRequire(
      path.join(tempDir, "entry.js"),
    );

    const {
      seedSources,
      publicSources,
    } = requireTemp("./sources.js");

    const {
      seedLessons,
    } = requireTemp("./lessons.js");

    return {
      seedSources,
      publicSources,
      seedLessons,
    };
  } finally {
    fs.rmSync(tempDir, {
      recursive: true,
      force: true,
    });
  }
}

function escapeRegExp(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}

async function main() {
  const {
    seedSources,
    publicSources,
    seedLessons,
  } = loadContentData();

  const sourceById = new Map(
    seedSources.map((source) => [
      source.id,
      source,
    ]),
  );

  const publicIds = new Set(
    publicSources.map((source) => source.id),
  );

  const lessons = [...seedLessons].sort(
    (a, b) => a.order - b.order,
  );

  assert.equal(
    lessons.length,
    12,
    "Exactly 12 lessons are required.",
  );

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: {
      width: 390,
      height: 844,
    },
  });

  const page = await context.newPage();

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

  try {
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

    for (const lesson of lessons) {
      const lessonButton = page
        .getByRole("button")
        .filter({
          hasText: new RegExp(
            escapeRegExp(lesson.title),
            "i",
          ),
        })
        .first();

      await lessonButton.waitFor({
        state: "visible",
        timeout: 10_000,
      });

      await lessonButton.click();

      await page
        .getByRole("heading", {
          name: lesson.title,
          exact: true,
        })
        .waitFor({
          state: "visible",
          timeout: 10_000,
        });

      const sourceSection =
        page.getByTestId("lesson-sources");

      await sourceSection.waitFor({
        state: "visible",
      });

      const displayedIds = await sourceSection
        .locator("a[data-source-id]")
        .evaluateAll((nodes) =>
          nodes.map((node) =>
            node.getAttribute("data-source-id"),
          ),
        );

      assert.deepEqual(
        [...displayedIds].sort(),
        [...lesson.sourceIds].sort(),
        `${lesson.id}: visible sources do not match sourceIds`,
      );

      assert.ok(
        displayedIds.length > 0,
        `${lesson.id}: no visible sources`,
      );

      for (const sourceId of lesson.sourceIds) {
        const source = sourceById.get(sourceId);

        assert.ok(
          source,
          `${lesson.id}: unknown source ${sourceId}`,
        );

        assert.ok(
          publicIds.has(sourceId),
          `${lesson.id}: non-public source ${sourceId}`,
        );

        const link = sourceSection.locator(
          `a[data-source-id="${sourceId}"]`,
        );

        assert.equal(
          await link.count(),
          1,
          `${lesson.id}: source ${sourceId} must appear once`,
        );

        assert.equal(
          await link.getAttribute("href"),
          source.url,
          `${lesson.id}: incorrect source URL ${sourceId}`,
        );

        assert.equal(
          await link.getAttribute("target"),
          "_blank",
          `${lesson.id}: target missing ${sourceId}`,
        );

        const rel =
          (
            await link.getAttribute("rel")
          )?.split(/\s+/) ?? [];

        assert.ok(
          rel.includes("noopener") &&
            rel.includes("noreferrer"),
          `${lesson.id}: safe rel missing ${sourceId}`,
        );

        const linkText =
          (
            await link.textContent()
          ) ?? "";

        assert.match(
          linkText,
          new RegExp(
            escapeRegExp(source.name),
          ),
          `${lesson.id}: source name missing`,
        );

        assert.match(
          linkText,
          new RegExp(
            escapeRegExp(source.publisher),
          ),
          `${lesson.id}: publisher missing`,
        );

        assert.match(
          linkText,
          /Geprüft am \d{2}\.\d{2}\.\d{4}/,
          `${lesson.id}: review date missing`,
        );
      }

      const axeResults =
        await new AxeBuilder({
          page,
        }).analyze();

      assert.deepEqual(
        axeResults.violations,
        [],
        `${lesson.id}: axe violations:\n${JSON.stringify(
          axeResults.violations,
          null,
          2,
        )}`,
      );

      const layout = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        documentWidth:
          document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));

      assert.equal(
        layout.documentWidth,
        layout.innerWidth,
        `${lesson.id}: document overflow`,
      );

      assert.equal(
        layout.bodyWidth,
        layout.innerWidth,
        `${lesson.id}: body overflow`,
      );

      console.log(
        [
          `LESSON=${lesson.id}`,
          `SOURCES=${displayedIds.length}`,
          "PUBLIC_ONLY=YES",
          "AXE=0",
          "OVERFLOW=NO",
          "PASS",
        ].join(" "),
      );
    }

    const sourceRoomIds = await page
      .locator(
        '#quellen a[data-source-id]',
      )
      .evaluateAll((nodes) =>
        nodes.map((node) =>
          node.getAttribute("data-source-id"),
        ),
      );

    assert.ok(
      sourceRoomIds.length > 0,
      "Public source room is empty.",
    );

    assert.ok(
      sourceRoomIds.every((sourceId) =>
        publicIds.has(sourceId),
      ),
      "Source room contains a non-public source.",
    );

    assert.equal(
      await page.locator(
        '[data-source-id="nvidia-nim-docs"]',
      ).count(),
      0,
      "NVIDIA NIM must not be publicly rendered.",
    );

    assert.deepEqual(
      consoleErrors,
      [],
      "Browser console errors found.",
    );

    assert.deepEqual(
      pageErrors,
      [],
      "Browser page errors found.",
    );

    console.log(
      `PUBLIC_SOURCE_ROOM=${sourceRoomIds.length}`,
    );

    console.log(
      "S48C_LESSON_SOURCE_UI=PASS",
    );
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(
    "S48C_LESSON_SOURCE_UI=FAIL",
  );

  console.error(error);

  process.exitCode = 1;
});
