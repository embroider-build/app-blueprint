import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { join } from 'path';
import tmp from 'tmp-promise';
import { execa } from 'execa';
import copyWithTemplate from '../lib/copy-with-template';
import { existsSync, writeFileSync } from 'fs';

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

  it('verify files', async function () {
    expect(
      !existsSync(join(tmpDir.path, 'app/index.html')),
      'the app index.html has been removed',
    );
    expect(
      existsSync(join(tmpDir.path, 'index.html')),
      'the root index.html has been added',
    );
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

  it('successfully runs tests in dev mode', async function () {
    await execa({
      cwd: join(tmpDir.path, appName),
    })`pnpm install --save-dev testem http-proxy`;
    let appURL;

    let server;

    try {
      server = execa('pnpm', ['start'], {
        cwd: join(tmpDir.path, appName),
      });

      await new Promise((resolve) => {
        server.stdout.on('data', (line) => {
          let result = /Local:\s+(https?:\/\/.*)\//g.exec(line.toString());

          if (result) {
            appURL = result[1];
            resolve();
          }
        });
      });

      writeFileSync(
        join(tmpDir.path, appName, 'testem-dev.js'),
        `module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: ['Chrome'],
  launch_in_dev: ['Chrome'],
  browser_start_timeout: 120,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
  },
  middleware: [
    require(__dirname + '/testem-proxy.js')('${appURL}')
  ],
};
`,
      );

      let testResult = await execa(
        'pnpm',
        ['testem', '--file', 'testem-dev.js', 'ci'],
        {
          cwd: join(tmpDir.path, appName),
        },
      );
      expect(testResult.exitCode).to.eq(0, testResult.output);
    } finally {
      server?.kill('SIGINT');
    }
  });

  it('successfully optimizes deps', function () {
    return execa('pnpm', ['vite', 'optimize', '--force'], {
      cwd: join(tmpDir.path, appName),
    });
  });
});
