import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import assert from 'node:assert';

import { packageUpSync } from 'package-up';

const require = createRequire(import.meta.url);

/**
 * require.resolve finds the *entrypoint*
 * we then need to find the package directory,
 * read the package.json
 * see what the bin entries are,
 * grab the path for the bin (by name),
 * and then return that path (absolute path to that bin)
 */
export function resolveBin(packageName, binName = packageName) {
  // NOTE: will fail if there is no '.' export.
  //       (or main)
  let entrypoint = require.resolve(packageName);

  let manifestPath = packageUpSync({ cwd: entrypoint });
  let buffer = readFileSync(manifestPath);
  let manifest = JSON.parse(buffer.toString());
  let packageDir = dirname(manifestPath);

  assert(
    manifest.name === packageName,
    `Found package manifest at ${manifestPath}, but it was not for ${packageName}. Cannot continue.`,
  );

  assert(
    manifest.bin,
    `The specified (and found) package, ${packageName}, does not specify a 'bin' entry in its package.json`,
  );

  let binPath;

  if (typeof manifest.bin === 'string') {
    assert(
      packageName === binName,
      `The 'bin' entry for ${packageName} can only be the same as the packageName. The requested bin ${binName} is not availabel.`,
    );

    binPath = manifest.bin;
  }

  if (!binPath) {
    assert(
      typeof manifest.bin === 'object' &&
        !Array.isArray(manifest.bin) &&
        manifest.bin !== null,
      `The 'bin' entry for ${packageName} must be an object.`,
    );

    binPath = manifest.bin?.[binName];
  }

  assert(
    binPath,
    `Could not determine 'bin', ${binName}, for package: ${packageName}.`,
  );

  return join(packageDir, binPath);
}

export function emberCLI() {
  return resolveBin('ember-cli', 'ember');
}
