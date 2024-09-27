import { sync as resolveBinSync } from 'resolve-bin';
import { execa } from 'execa';

import assert from 'node:assert';
import { join } from 'node:path';

import { beforeAll, afterAll } from 'vitest';
import tmp from 'tmp-promise';
import { execa } from 'execa';
import copyWithTemplate from '../lib/copy-with-template';

function findEmber() {
  return resolveBinSync('ember-cli', { executable: 'ember' });
}

export const emberCli = findEmber();

const blueprintPath = join(__dirname, '..');
const appName = 'fancy-app-in-test';

export function newProjectWithFixtures({
  flags = [],
  fixturePath,
  name = appName,
} = {}) {
  let tmpDir;

  assert(fixturePath, `a fixturePath is required`);

  beforeAll(async () => {
    tmpDir = await tmp.dir({ unsafeCleanup: true });

    let emberCliArgs = [
      'new',
      name,
      '-b',
      blueprintPath,
      '--pnpm',
      '--skip-git',
      ...flags,
    ];

    await execa(emberCli, emberCliArgs, {
      cwd: tmpDir.path,
      preferLocal: true,
    });

    // apply the fixture on top of the generated app
    copyWithTemplate(join(__dirname, 'fixture'), join(tmpDir.path, name), {
      name,
    });

    // Sync the lints for the fixtures with the project's config
    await execa(`pnpm`, ['lint:fix'], {
      cwd: join(tmpDir.path, name),
    });
  });

  afterAll(async () => {
    try {
      await tmpDir.cleanup();
    } catch {
      // if it fails to cleaup we don't want to break CI
    }
  });

  return {
    tmpDir: () => tmpDir.path,
    appName: () => name,
    dir: () => join(tmpDir.path, name),
    $: (...args) => execa({ cwd: join(tmpDir.path, name) })(...args),
    execa: (program, args, options = {}) =>
      execa(program, args, {
        cwd: join(tmpDir.path, name),
        ...options,
      }),
  };
}
