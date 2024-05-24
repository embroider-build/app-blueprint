import { describe, it, beforeAll, afterAll } from 'vitest';
import { join } from 'path';
import tmp from 'tmp-promise';
import { execa } from 'execa';

const blueprintPath = join(__dirname, '..');
const appName = 'fancy-app-in-test';

describe('basic functionality', function () {
  let tmpDir;

  beforeAll(async () => {
    tmpDir = await tmp.dir({ unsafeCleanup: true });

    let emberCliArgs = [
      'new',
      appName,
      '-b',
      blueprintPath,
      '--pnpm',
      '--skip-git',
    ];

    await execa('ember', emberCliArgs, {
      cwd: tmpDir.path,
      preferLocal: true,
    });
  });

  afterAll(async () => {
    return tmpDir.cleanup();
  });

  it('successfully builds', async function () {
    let result = await execa('pnpm', ['build'], {
      cwd: join(tmpDir.path, appName),
    });

    console.log(result.stdout);
  });

  it('successfully runs tests', async function () {
    let result = await execa('pnpm', ['test'], {
      cwd: join(tmpDir.path, appName),
    });

    console.log(result.stdout);
  });
});
