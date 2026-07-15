#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, 'apps', 'web', 'src', 'data');
const webPackage = path.join(repoRoot, 'apps', 'web', 'package.json');
const requireFromWeb = createRequire(pathToFileURL(webPackage));
const ts = requireFromWeb('typescript');

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), 'ki-lernportal-source-check-')
);

const failures = [];
const maxReviewAgeDays = 366;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

function check(condition, message) {
  if (!condition) failures.push(message);
}

function transpileDataFile(filename) {
  const input = path.join(dataDir, filename);
  const output = path.join(
    tempDir,
    filename.replace(/\.ts$/, '.js')
  );

  const source = fs.readFileSync(input, 'utf8');

  const result = ts.transpileModule(source, {
    fileName: input,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    }
  });

  fs.writeFileSync(output, result.outputText, 'utf8');
}

function validateDate(value, label) {
  check(
    typeof value === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(value),
    `${label}: lastReviewed must use YYYY-MM-DD`
  );

  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return;
  }

  const reviewed = new Date(`${value}T00:00:00Z`);

  check(
    !Number.isNaN(reviewed.getTime()) &&
      reviewed.toISOString().slice(0, 10) === value,
    `${label}: invalid lastReviewed date ${value}`
  );

  if (Number.isNaN(reviewed.getTime())) return;

  const now = new Date();
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const ageDays = Math.floor(
    (todayUtc - reviewed.getTime()) /
      millisecondsPerDay
  );

  check(
    ageDays >= 0,
    `${label}: lastReviewed is in the future`
  );

  check(
    ageDays <= maxReviewAgeDays,
    `${label}: review is stale (${ageDays} days)`
  );
}

try {
  for (const filename of [
    'types.ts',
    'sources.ts',
    'lessons.ts',
    'practice.ts'
  ]) {
    transpileDataFile(filename);
  }

  const requireTemp = createRequire(
    pathToFileURL(path.join(tempDir, 'entry.js'))
  );

  const {
    ApprovalStatus,
    ReviewStatus
  } = requireTemp('./types.js');

  const {
    seedSources,
    publicSources
  } = requireTemp('./sources.js');

  const {
    seedLessons
  } = requireTemp('./lessons.js');

  const {
    practiceByLessonId
  } = requireTemp('./practice.js');

  check(Array.isArray(seedSources), 'seedSources must be an array');
  check(Array.isArray(publicSources), 'publicSources must be an array');
  check(Array.isArray(seedLessons), 'seedLessons must be an array');
  check(
    practiceByLessonId &&
      typeof practiceByLessonId === 'object' &&
      !Array.isArray(practiceByLessonId),
    'practiceByLessonId must be an object'
  );

  const sourceIds = new Set();
  const sourceUrls = new Set();
  const sourceById = new Map();

  for (const source of seedSources) {
    const label = `source ${source.id || '<missing-id>'}`;

    check(
      typeof source.id === 'string' &&
        source.id.length > 0,
      `${label}: id missing`
    );

    check(
      !sourceIds.has(source.id),
      `${label}: duplicate source id`
    );

    sourceIds.add(source.id);
    sourceById.set(source.id, source);

    check(
      typeof source.name === 'string' &&
        source.name.trim().length > 0,
      `${label}: name missing`
    );

    check(
      typeof source.publisher === 'string' &&
        source.publisher.trim().length > 0,
      `${label}: publisher missing`
    );

    try {
      const parsedUrl = new URL(source.url);

      check(
        parsedUrl.protocol === 'https:',
        `${label}: URL must use HTTPS`
      );

      check(
        !sourceUrls.has(parsedUrl.href),
        `${label}: duplicate URL`
      );

      sourceUrls.add(parsedUrl.href);
    } catch {
      failures.push(`${label}: invalid URL`);
    }

    validateDate(source.lastReviewed, label);

    check(
      typeof source.publicDisplayAllowed === 'boolean',
      `${label}: publicDisplayAllowed must be boolean`
    );

    if (source.publicDisplayAllowed) {
      check(
        source.approvalStatus ===
          ApprovalStatus.Approved,
        `${label}: public source is not approved`
      );

      check(
        source.reviewStatus ===
          ReviewStatus.Published,
        `${label}: public source is not published`
      );
    }
  }

  const expectedPublicIds = seedSources
    .filter(
      (source) =>
        source.publicDisplayAllowed &&
        source.approvalStatus ===
          ApprovalStatus.Approved &&
        source.reviewStatus ===
          ReviewStatus.Published
    )
    .map((source) => source.id)
    .sort();

  const exportedPublicIds = publicSources
    .map((source) => source.id)
    .sort();

  check(
    JSON.stringify(exportedPublicIds) ===
      JSON.stringify(expectedPublicIds),
    'publicSources export does not match approval rules'
  );

  check(
    !exportedPublicIds.includes('nvidia-nim-docs'),
    'NVIDIA NIM must not be publicly displayed'
  );

  check(
    seedLessons.length === 12,
    `expected 12 beginner lessons, found ${seedLessons.length}`
  );

  const lessonIds = new Set();
  const lessonOrders = new Set();
  let sourceReferenceCount = 0;

  const requiredContentSections = [
    'Lernziel:',
    'Einfach erklärt:',
    'Mini-Beispiel:',
    'Sicher arbeiten:',
    'Typischer Fehler:'
  ];

  for (const lesson of seedLessons) {
    const label = `lesson ${lesson.id || '<missing-id>'}`;

    check(
      typeof lesson.id === 'string' &&
        lesson.id.length > 0,
      `${label}: id missing`
    );

    check(
      !lessonIds.has(lesson.id),
      `${label}: duplicate lesson id`
    );

    lessonIds.add(lesson.id);

    check(
      Number.isInteger(lesson.order),
      `${label}: order must be an integer`
    );

    check(
      !lessonOrders.has(lesson.order),
      `${label}: duplicate order ${lesson.order}`
    );

    lessonOrders.add(lesson.order);

    check(
      lesson.pathId === 'path-beginner',
      `${label}: unexpected pathId ${lesson.pathId}`
    );

    check(
      lesson.reviewStatus ===
        ReviewStatus.Published,
      `${label}: lesson is not published`
    );

    validateDate(lesson.lastReviewed, label);

    check(
      Array.isArray(lesson.sourceIds) &&
        lesson.sourceIds.length > 0,
      `${label}: no direct sourceIds`
    );

    const uniqueLessonSources = new Set(
      lesson.sourceIds || []
    );

    check(
      uniqueLessonSources.size ===
        (lesson.sourceIds || []).length,
      `${label}: duplicate sourceIds`
    );

    for (const sourceId of uniqueLessonSources) {
      sourceReferenceCount += 1;

      const source = sourceById.get(sourceId);

      check(
        Boolean(source),
        `${label}: unknown source ${sourceId}`
      );

      if (!source) continue;

      check(
        source.publicDisplayAllowed,
        `${label}: source ${sourceId} is not public`
      );

      check(
        source.approvalStatus ===
          ApprovalStatus.Approved,
        `${label}: source ${sourceId} is not approved`
      );

      check(
        source.reviewStatus ===
          ReviewStatus.Published,
        `${label}: source ${sourceId} is not published`
      );
    }

    check(
      typeof lesson.title === 'string' &&
        lesson.title.trim().length > 0,
      `${label}: title missing`
    );

    check(
      typeof lesson.description === 'string' &&
        lesson.description.trim().length > 0,
      `${label}: description missing`
    );

    check(
      typeof lesson.content === 'string' &&
        lesson.content.trim().length > 0,
      `${label}: content missing`
    );

    for (const section of requiredContentSections) {
      check(
        lesson.content.includes(section),
        `${label}: content section missing: ${section}`
      );
    }

    check(
      !lesson.content.includes('\n\nÜbung:') &&
        !lesson.content.includes('\n\nMini-Check:'),
      `${label}: interactive practice must not be duplicated in lesson content`
    );

    const practice = practiceByLessonId?.[lesson.id];

    check(
      Boolean(practice),
      `${label}: interactive practice missing`
    );

    if (practice) {
      for (const field of [
        'task',
        'hint',
        'sampleAnswer'
      ]) {
        check(
          typeof practice[field] === 'string' &&
            practice[field].trim().length > 0,
          `${label}: practice ${field} missing`
        );
      }

      for (const field of [
        'checkQuestions',
        'selfCheck'
      ]) {
        check(
          Array.isArray(practice[field]) &&
            practice[field].length === 3 &&
            practice[field].every(
              (item) =>
                typeof item === 'string' &&
                item.trim().length > 0
            ),
          `${label}: practice ${field} must contain exactly three non-empty items`
        );
      }
    }

    check(
      Number.isInteger(lesson.estimatedMinutes) &&
        lesson.estimatedMinutes > 0,
      `${label}: estimatedMinutes must be positive`
    );
  }

  check(
    JSON.stringify(
      Object.keys(practiceByLessonId ?? {}).sort()
    ) === JSON.stringify(
      [...lessonIds].sort()
    ),
    'practiceByLessonId keys must exactly match lesson ids'
  );

  const expectedOrders = Array.from(
    { length: 12 },
    (_, index) => index + 1
  );

  check(
    JSON.stringify(
      [...lessonOrders].sort((a, b) => a - b)
    ) === JSON.stringify(expectedOrders),
    'lesson orders must be exactly 1 through 12'
  );

  console.log('===== Source and Lesson Integrity Check =====');
  console.log(`Sources total: ${seedSources.length}`);
  console.log(`Approved public sources: ${publicSources.length}`);
  console.log(`Lessons total: ${seedLessons.length}`);
  console.log(`Direct source references: ${sourceReferenceCount}`);
  console.log(`Maximum review age: ${maxReviewAgeDays} days`);

  if (failures.length > 0) {
    console.error('');
    console.error('Integrity failures:');

    for (const failure of failures) {
      console.error(`- ${failure}`);
    }

    console.error('');
    console.error('SOURCE_CONTENT_INTEGRITY=FAIL');
    process.exitCode = 1;
  } else {
    console.log('');
    console.log('SOURCE_CONTENT_INTEGRITY=PASS');
  }
} finally {
  fs.rmSync(tempDir, {
    recursive: true,
    force: true
  });
}
