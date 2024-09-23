import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { existsSync } from 'fs';
import { newProjectWithFixtures } from './helpers.mjs';

describe('typescript', function () {
  let project = newProjectWithFixtures({
    fixturePath: join(__dirname, 'fixture-ts'),
    flags: ['--typescript'],
  });

  it('verify files', async function () {
    expect(
      existsSync(join(project.dir(), 'tsconfig.json')),
      'the root tsconfig.json has been added',
    );
  });

  it('glint passes', async function () {
    let result = await project.execa('pnpm', ['glint']);

    console.log(result.stdout);
  });
});
