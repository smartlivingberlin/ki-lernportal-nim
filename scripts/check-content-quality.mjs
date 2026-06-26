#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, 'apps', 'web', 'src', 'data');

const hardPatterns = [
  { label: 'STUB marker', regex: /\bSTUB\b/g },
  { label: 'TODO_CONTENT marker', regex: /\bTODO_CONTENT\b/g },
  { label: 'PLACEHOLDER_CONTENT marker', regex: /\bPLACEHOLDER_CONTENT\b/g },
  { label: 'Lorem ipsum placeholder text', regex: /lorem ipsum/gi },
];

const softPatterns = [
  { label: 'PREMIUM', regex: /\bPREMIUM\b/g },
  { label: 'isPremium: true', regex: /isPremium:\s*true/g },
  { label: 'PRÜFUNGSTAUGLICH', regex: /PRÜFUNGSTAUGLICH/g },
  { label: 'caseStudy', regex: /caseStudy/g },
  { label: 'source/quellen terms', regex: /\b(source|sourceUrl|sources|quelle|quellen)\b/gi },
];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    if (entry.isFile() && ['.ts', '.tsx', '.md', '.mdx', '.json'].includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function count(content, regex) {
  return (content.match(regex) || []).length;
}

console.log('===== Content Quality Check =====');
console.log(`Data directory: ${path.relative(repoRoot, dataDir)}`);

if (!fs.existsSync(dataDir)) {
  console.error(`ERROR: Data directory not found: ${dataDir}`);
  process.exit(1);
}

const files = walk(dataDir).sort();
console.log(`Scanned files: ${files.length}`);

if (files.length === 0) {
  console.error('ERROR: No content files found.');
  process.exit(1);
}

const hardFindings = [];
const softCounts = Object.fromEntries(softPatterns.map((p) => [p.label, 0]));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(repoRoot, file);

  for (const pattern of hardPatterns) {
    const matches = count(content, pattern.regex);
    if (matches > 0) hardFindings.push(`${rel}: ${pattern.label} (${matches})`);
  }

  for (const pattern of softPatterns) {
    softCounts[pattern.label] += count(content, pattern.regex);
  }
}

console.log('');
console.log('Soft report:');
for (const [label, matches] of Object.entries(softCounts)) {
  console.log(`- ${label}: ${matches}`);
}

if (hardFindings.length > 0) {
  console.error('');
  console.error('Hard findings:');
  for (const finding of hardFindings) console.error(`- ${finding}`);
  console.error('');
  console.error('Content quality check failed.');
  process.exit(1);
}

console.log('');
console.log('Content quality check passed.');
