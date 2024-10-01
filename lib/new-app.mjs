import assert from 'node:assert';
import { join } from 'node:path';
import { execa } from 'execa';
import tmp from 'tmp-promise';
import { sync as resolveBinSync } from 'resolve-bin';

function findEmber() {
  return resolveBinSync('ember-cli', { executable: 'ember' });
}

export const emberCli = findEmber();

const blueprintPath = join(import.meta.dirname, '..');

export async function newApp(options) {
  const name = options.name;
  const flags = options.flags ?? [];

  assert(name, `newApp({ name }) is required`);
  assert(Array.isArray(flags), `Option, flags, must be an array`);

  let tmpDir = await tmp.dir({ unsafeCleanup: true });

  let emberCliArgs = ['new', name, '-b', blueprintPath, '--pnpm', ...flags];

  await execa(emberCli, emberCliArgs, {
    cwd: tmpDir.path,
    preferLocal: true,
  });

  return {
    /**
     * Result from tmp-promise
     * (used for cleanup, later)
     */
    tmp: tmpDir,
    /**
     * The actual tmp path
     */
    tmpDir: tmpDir.path,
    /**
     * The name of the app
     */
    appName: name,
    /**
     * The directory of the app
     */
    dir: join(tmpDir.path, name),
  };
}
