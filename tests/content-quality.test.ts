import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Content Quality Test Suite
 *
 * Verifies that the learning content follows quality standards.
 * Hard Fails:
 * - STUB markers > 0
 * - Tags without tasks or solutions
 * Soft Reports:
 * - Counts of PREMIUM and PRÜFUNGSTAUGLICH content
 * - Missing caseStudy reports
 */

const DATA_DIR = path.resolve(process.cwd(), 'apps/web/src/data');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

describe('Content Quality Suite', () => {
  let contentFiles: { path: string, content: string }[] = [];

  beforeAll(() => {
    const files = getAllFiles(DATA_DIR);
    contentFiles = files
      .filter(f => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.md'))
      .map(f => ({
        path: f,
        content: fs.readFileSync(f, 'utf-8')
      }));
  });

  it('should not contain any STUB markers (Hard Fail)', () => {
    const stubs: string[] = [];
    contentFiles.forEach(file => {
      const matches = file.content.match(/STUB/g);
      if (matches) {
        stubs.push(`${file.path}: ${matches.length} found`);
      }
    });

    if (stubs.length > 0) {
      console.error('❌ Found STUB markers:', stubs);
    }
    expect(stubs.length, `Found STUB markers in: ${stubs.join(', ')}`).toBe(0);
  });

  it('should ensure all Tags have tasks and solutions (Hard Fail)', () => {
    const failures: string[] = [];

    // Tag detection: looking for patterns like "Tag 1", "Tag: 1", etc.
    // or sections in markdown/comments starting with "Tag"
    const tagRegex = /(?:^|\n|#|[\/*])\s*Tag\s*[:\d].*?(?=(?:\n\s*Tag\s*[:\d])|$)/gs;

    contentFiles.forEach(file => {
      const matches = file.content.match(tagRegex);
      if (matches) {
        matches.forEach(tagBlock => {
          const hasTasks = /task|aufgaben/i.test(tagBlock);
          const hasSolutions = /solution|lösung|lösungen/i.test(tagBlock);

          if (!hasTasks || !hasSolutions) {
            const tagName = tagBlock.split('\n')[0].trim();
            failures.push(`${file.path} -> ${tagName} (Tasks: ${hasTasks}, Solutions: ${hasSolutions})`);
          }
        });
      }
    });

    if (failures.length > 0) {
      console.error('❌ Found Tags without tasks or solutions:', failures);
    }
    expect(failures.length, `Tags missing tasks or solutions: ${failures.join(', ')}`).toBe(0);
  });

  it('should report PREMIUM and PRÜFUNGSTAUGLICH counts (Soft Report)', () => {
    let premiumCount = 0;
    let pruefungstauglichCount = 0;

    contentFiles.forEach(file => {
      const premiumMatches = file.content.match(/PREMIUM/g);
      if (premiumMatches) premiumCount += premiumMatches.length;

      // Also check for isPremium: true in TS files
      const isPremiumMatches = file.content.match(/isPremium:\s*true/g);
      if (isPremiumMatches) premiumCount += isPremiumMatches.length;

      const pruefungsMatches = file.content.match(/PRÜFUNGSTAUGLICH/g);
      if (pruefungsMatches) pruefungstauglichCount += pruefungsMatches.length;
    });

    console.log('--- Content Report ---');
    console.log(`PREMIUM count: ${premiumCount}`);
    console.log(`PRÜFUNGSTAUGLICH count: ${pruefungstauglichCount}`);
  });

  it('should report missing caseStudy count (Soft Report)', () => {
    let caseStudyCount = 0;
    contentFiles.forEach(file => {
      const matches = file.content.match(/caseStudy/g);
      if (matches) caseStudyCount += matches.length;
    });

    console.log(`caseStudy count: ${caseStudyCount}`);
    if (caseStudyCount === 0) {
      console.warn('⚠️ No caseStudies found in content.');
    }
  });
});
