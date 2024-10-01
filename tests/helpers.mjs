import assert from 'node:assert';

import { beforeAll, afterAll } from 'vitest';
import { sync as resolveBinSync } from 'resolve-bin';
import { execa } from 'execa';
import tmp from 'tmp-promise';

import copyWithTemplate from '../lib/copy-with-template.js';
import { newApp } from '../lib/new-app.mjs';

function findEmber() {
  return resolveBinSync('ember-cli', { executable: 'ember' });
}

export const emberCli = findEmber();

const appName = 'fancy-app-in-test';

export function newProjectWithFixtures({
  flags = [],
  fixturePath,
  name = appName,
} = {}) {
  let info;

  assert(fixturePath, `a fixturePath is required`);

  beforeAll(async () => {
    info = await newApp({ name, flags: ['--skip-git', ...flags] });

    // apply the fixture on top of the generated app
    copyWithTemplate(fixturePath, info.dir, {
      name,
    });

    // Sync the lints for the fixtures with the project's config
    await execa(`pnpm`, ['lint:fix'], {
      cwd: info.dir,
    });
  });

  afterAll(async () => {
    try {
      await tmp.cleanup();
    } catch {
      // if it fails to cleaup we don't want to break CI
    }
  });

  return {
    tmp: () => info.tmpDir,
    appName: () => name,
    dir: () => info.dir,
    $: (...args) => execa({ cwd: info.dir })(...args),
    execa: (program, args, options = {}) => {
      return execa(program, args, {
        cwd: info.dir,
        ...options,
      });
    },
  };
}
