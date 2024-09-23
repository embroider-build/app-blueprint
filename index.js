const Blueprint = require('ember-cli/lib/models/blueprint');
const fs = require('fs');
const { join } = require('path');
const emberCliUpdate = require('./lib/ember-cli-update');
const copyWithTemplate = require('./lib/copy-with-template');
const { rm, rmdir, readFile, lstat } = require('fs/promises');

const appBlueprint = Blueprint.lookup('app');

async function isDirectory(path) {
  try {
    let stat = await lstat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

module.exports = {
  locals(options) {
    return appBlueprint.locals(options);
  },

  /**
   * NOTE: we can't have a "shared" file here,
   *       as we can with files-override
   *       (so shared things should go in files-override/shared)
   */
  filesPath(options) {
    if (options.typescript) {
      return join(this.path, 'files/ts');
    }

    return join(this.path, 'files/js');
  },

  beforeInstall(options) {
    if (!appBlueprint) {
      throw new Error('Cannot find app blueprint for generating test-app!');
    }

    return appBlueprint.install({
      ...options,
      skipGit: true,
    });
  },

  async updateDeps(options) {
    let manifestPath = join(options.target, 'package.json');
    let manifestBuffer = await readFile(manifestPath);
    let manifest = JSON.parse(manifestBuffer.toString());

    let existingDeps = [
      ...Object.keys(manifest.dependencies || {}),
      ...Object.keys(manifest.devDependencies || {}),
    ];

    // this.addPackagesToProject doesn't respect the packageManager that the blueprint specified 🙈 so we're skipping a level here
    let installTask = this.taskFor('npm-install');
    let uninstallTask = this.taskFor('npm-uninstall');

    await uninstallTask.run({
      'save-dev': true,
      verbose: false,
      packages: [
        // Not needed anymore
        'ember-fetch',
        'broccoli-asset-rev',
        'ember-cli-app-version',
        'ember-cli-clean-css',
        'ember-cli-dependency-checker',
        'ember-cli-inject-live-reload',
        'ember-cli-sri',
        'ember-cli-terser',
        // Linting
        '@babel/plugin-proposal-decorators',

        // Upstream TypeScript blueprint is out of date, but
        // There is concensus on removing all this from the upstream blueprint as well.
        '@types/ember',
        '@types/ember-data',
        '@types/ember-data__adapter',
        '@types/ember-data__model',
        '@types/ember-data__serializer',
        '@types/ember-data__store',
        '@types/ember__application',
        '@types/ember__array',
        '@types/ember__component',
        '@types/ember__controller',
        '@types/ember__debug',
        '@types/ember__destroyable',
        '@types/ember__engine',
        '@types/ember__error',
        '@types/ember__helper',
        '@types/ember__modifier',
        '@types/ember__object',
        '@types/ember__owner',
        '@types/ember__polyfills',
        '@types/ember__routing',
        '@types/ember__runloop',
        '@types/ember__service',
        '@types/ember__string',
        '@types/ember__template',
        '@types/ember__test',
        '@types/ember__utils',
      ].filter((depToRemove) => existingDeps.includes(depToRemove)),
      packageManager: options.packageManager,
    });

    await installTask.run({
      'save-dev': true,
      verbose: false,
      packages: [
        '@embroider/core@unstable',
        '@embroider/vite@unstable',
        '@embroider/compat@unstable',
        '@embroider/test-setup@unstable',
        '@embroider/config-meta-loader@unstable',
        'vite',
        '@rollup/plugin-babel',
        'decorator-transforms',

        // Dependencies out of date from upstream
        // (or waiting for the release train to catch up)
        'eslint@latest',
        'eslint-plugin-ember@latest',
        'eslint-plugin-n@latest',
        '@babel/eslint-parser@latest',
        '@babel/plugin-transform-runtime@latest',
        '@babel/runtime@latest',
        'ember-template-lint@latest',

        '@ember/string@latest',
        'ember-resolver@latest',
        'ember-load-initializers@latest',
        'qunit@latest',
        'qunit-dom@latest',
        'concurrently@latest',

        // Needed for eslint
        'globals',
        'babel-plugin-ember-template-compilation',
        'prettier-plugin-ember-template-tag',

        // TypeScript
        // Note that Vite supports TypeScript with 0 configuration on the user's part
        ...(options.typescript
          ? [
              // See RFC: https://github.com/emberjs/rfcs/pull/1046
              'ember-route-template',

              '@babel/plugin-transform-typescript',
              // TODO: see if there is a better way we can
              //       sync these libraries' versions
              // typescript-eslint doesn't support typescript 5.6 yet
              'typescript@~5.5.0',
              '@glint/core@unstable',
              '@glint/environment-ember-loose@unstable', // currently required :(
              '@glint/environment-ember-template-imports@unstable',
              '@glint/template@unstable',
              '@types/eslint__js',
              'typescript-eslint@latest',
              '@typescript-eslint/eslint-plugin@latest',
              '@typescript-eslint/parser@latest',
            ]
          : []),
      ],
      packageManager: options.packageManager,
    });
  },

  async afterInstall(options) {
    const filesToDelete = [
      // now in the project root
      'app/index.html',
      // replaced with .eslintrc.cjs
      '.eslintrc.js',
      // This file is not supported in ESLint 9
      '.eslintignore',
      // replaced with .prettierrc.cjs
      '.prettierrc.js',
      // ember-data / warp-drive doesn't want folks using models
      'app/models/.gitkeep',

      // We don't need these with gjs/gts
      'app/helpers/.gitkeep',

      // Delete if empty, kept otherwise
      'app/models',
      'app/helpers',

      ...(options.typescript
        ? [
            // Until we add application.gjs
            'app/templates/application.hbs',
            // If folks are using models, they have this file.
            // New projects should not be using it though
            // 'types/ember-data/types/registries/model.d.ts',
            'types/global.d.ts',
          ]
        : []),
    ];

    // TODO: we should probably keep this because enabling TS for JS dev
    //       is actually very nice.
    //       Only difference would be that we don't have a lint:types
    //       or in-editor type-checking
    if (!options.typescript) {
      filesToDelete.push('tsconfig.json');
    }

    for (let file of filesToDelete) {
      let targetFile = join(options.target, file);

      // Don't try to delete TS files (for example) in a JS project
      if (!fs.existsSync(targetFile)) continue;

      let isDir = await isDirectory(targetFile);

      if (isDir) {
        await rmdir(targetFile);
      } else {
        await rm(targetFile);
      }
    }

    // there doesn't seem to be a way to tell ember-cli to not prompt to override files that were added in the beforeInstall
    // so I'm just copying a few over at this stage
    copyWithTemplate(
      join(__dirname, 'files-override/shared'),
      options.target,
      options,
    );

    if (options.typescript) {
      copyWithTemplate(
        join(__dirname, 'files-override/ts'),
        options.target,
        options,
      );
    } else {
      copyWithTemplate(
        join(__dirname, 'files-override/js'),
        options.target,
        options,
      );
    }

    let packageJson = join(options.target, 'package.json');
    let json = JSON.parse(fs.readFileSync(packageJson));

    json.scripts = {
      ...json.scripts,
      build: 'vite build',
      start: 'vite',
      'test:ember': 'vite build --mode test && ember test --path dist',
    };

    json.scripts['test'] += ' --prefixColors auto';
    json.scripts['lint'] += ' --prefixColors auto';
    json.scripts['lint:fix'] += ' --prefixColors auto';

    if (json.scripts['lint:types']) {
      json.scripts['lint:types'] = 'glint';
    }

    json['ember-addon'] = {
      type: 'app',
      version: 2,
    };

    json.exports = {
      './tests/*': './tests/*',
      './*': './app/*',
    };

    fs.writeFileSync(packageJson, JSON.stringify(json, null, 2));

    await emberCliUpdate({
      projectDir: options.target,
      projectName: options.projectName,
      version: require('./package.json').version,
      options,
    });

    await this.updateDeps(options);

    if (!options.skipLint) {
      const lintFix = require('ember-cli/lib/utilities/lint-fix');

      await lintFix.run({
        // Mock Project
        pkg: {
          scripts: { 'lint:fix': true },
        },
        ui: this.ui,
        root: options.target,
      });
    }
  },
};
