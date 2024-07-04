import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { join } from 'path';
import tmp from 'tmp-promise';
import { execa } from 'execa';
import copyWithTemplate from '../lib/copy-with-template';

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

    // apply the fixture on top of the generated app
    copyWithTemplate(join(__dirname, 'fixture'), join(tmpDir.path, appName), {
      name: appName,
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
    let result;

    try {
      result = await execa('pnpm', ['test:ember'], {
        cwd: join(tmpDir.path, appName),
      });
    } catch (err) {
      console.log(err.stdout, err.stderr);
      throw err;
    }

    // make sure that each of the tests that we expect actually show up
    // alternatively we can change this to search for `pass 3`
    expect(result.stdout).to.contain(
      'Acceptance | welcome page: visiting /index shows the welcome page',
    );
    expect(result.stdout).to.contain('Acceptance | styles: visiting /styles');

    console.log(result.stdout);
  });

  it('successfully optimizes deps', function () {
    return execa('pnpm', ['vite', 'optimize', '--force'], {
      cwd: join(tmpDir.path, appName),
    });
  });
});
