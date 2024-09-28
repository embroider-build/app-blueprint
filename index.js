const Blueprint = require('ember-cli/lib/models/blueprint');
const fs = require('fs');
const { join } = require('path');
const emberCliUpdate = require('./lib/ember-cli-update');
const copyWithTemplate = require('./lib/copy-with-template');
const { cp, rm, readFile } = require('fs/promises');

const appBlueprint = Blueprint.lookup('app');

module.exports = {
  locals(options) {
    return appBlueprint.locals(options);
  },

  /**
   * NOTE: we can't have a "shared" file here,
   *       as we can with files-override
   */
  filesPath(options) {
    if (options.typescript) {
      throw new Error(`TypeScript is not yet supported`);
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
        // Too many warnings
        'ember-data',
        // Not needed anymore
        'ember-fetch',
        'broccoli-asset-rev',
        'ember-cli-app-version',
        'ember-cli-clean-css',
        'ember-cli-dependency-checker',
        'ember-cli-sri',
        'ember-cli-terser',
        // Linting
        '@babel/plugin-proposal-decorators',
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

        'eslint@latest',
        'eslint-plugin-ember@latest',
        'eslint-plugin-n@latest',
        '@babel/eslint-parser@latest',
        'ember-resolver@latest',
        'ember-load-initializers@latest',
        // Needed for eslint
        'globals',
        'babel-plugin-ember-template-compilation',
        'prettier-plugin-ember-template-tag',
      ],
      packageManager: options.packageManager,
    });
  },

  async afterInstall(options) {
    const filesToDelete = [
      'app/index.html',
      // replaced with the new ESLint flat config
      '.eslintrc.js',
      // This file is not supported in ESLint 9
      '.eslintignore',
      // replaced with .prettierrc.cjs
      '.prettierrc.js',
      // CJS (needs renamed)
      'testem.js',
      'ember-cli-build.js',
    ];

    for (let file of filesToDelete) {
      await rm(join(options.target, file));
    }

    const filesToSetAsCJS = [
      'config/environment.js',
      'config/targets.js',
      '.stylelintrc.js',
    ];

    for (let file of filesToSetAsCJS) {
      await cp(
        join(options.target, file),
        join(options.target, file.replace(/\.js$/, '.cjs')),
      );
      await rm(join(options.target, file));
    }

    // there doesn't seem to be a way to tell ember-cli to not prompt to override files that were added in the beforeInstall
    // so I'm just copying a few over at this stage
    copyWithTemplate(
      join(__dirname, 'files-override/js'),
      options.target,
      options,
    );

    copyWithTemplate(
      join(__dirname, 'files-override/shared'),
      options.target,
      options,
    );

    let packageJson = join(options.target, 'package.json');
    let json = JSON.parse(fs.readFileSync(packageJson));

    json.scripts = {
      ...json.scripts,
      build: 'vite build',
      start: 'vite',
      'test:ember': 'vite build --mode test && ember test --path dist',
    };

    json['ember-addon'] = {
      type: 'app',
      version: 2,
    };

    json.type = 'module';
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

    const lintFix = require('ember-cli/lib/utilities/lint-fix');

    await lintFix.run({
      // Mock Project
      pkg: {
        scripts: { 'lint:fix': true },
      },
      ui: this.ui,
      root: options.target,
    });
  },
};
