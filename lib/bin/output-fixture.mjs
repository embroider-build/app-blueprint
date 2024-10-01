/**
 * Usage:
 *
 *   pnpm output:fixture $fixtureName [...flags]
 *
 * Example:
 *
 *   pnpm output:fixture fixture-ts --typescript
 *
 *
 */

import assert from 'node:assert';
import path from 'node:path';
import fs from 'node:fs';
import { newApp } from '../new-app.mjs';
import copyWithTemplate from '../copy-with-template.js';

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

const [, , fixtureName, ...args] = process.argv;
const fixturesDir = path.join(import.meta.dirname, '../../tests');

let available = getDirectories(fixturesDir);

assert(
  fixtureName,
  `Must pass a fixture name to output-fixture. Available fixtures: ${available.join(', ')}`,
);

let name = `app-with-${fixtureName}`;
let info = await newApp({ name, flags: args });

let selectedFixture = path.join(fixturesDir, fixtureName);

// apply the fixture on top of the generated app
copyWithTemplate(selectedFixture, info.dir, {
  name,
});

console.info(`

  New app created in ${info.dir}
     using fixture @ ${selectedFixture}

`);
