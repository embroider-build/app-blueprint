const Blueprint = require('ember-cli/lib/models/blueprint');
const fs = require('fs');
const { join } = require('path');
const emberCliUpdate = require('./lib/ember-cli-update');
const copyWithTemplate = require('./lib/copy-with-template');
const { rm } = require('fs/promises');

const appBlueprint = Blueprint.lookup('app');

module.exports = {
  locals(options) {
    return appBlueprint.locals(options);
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
    // this.addPackagesToProject doesn't respect the packageManager that the blueprint specified 🙈 so we're skipping a level here
    let installTask = this.taskFor('npm-install');
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
        '@babel/plugin-transform-runtime',
        'babel-plugin-ember-template-compilation',
      ],
      packageManager: options.packageManager,
    });

    let uninstallTask = this.taskFor('npm-uninstall');
    const packages = [
      'ember-fetch',
      'broccoli-asset-rev',
      'ember-cli-app-version',
      'ember-cli-clean-css',
      'ember-cli-dependency-checker',
      'ember-cli-sri',
      'ember-cli-terser',
    ];

    for (const package of packages) {
      try {
        await uninstallTask.run({
          'save-dev': true,
          verbose: false,
          packages: [package],
          packageManager: options.packageManager,
        });
      } catch {
        console.log(`Could not uninstall ${package}`);
      }
    }
  },

  async afterInstall(options) {
    const filesToDelete = ['app/index.html'];

    for (let file of filesToDelete) {
      await rm(join(options.target, file));
    }

    // there doesn't seem to be a way to tell ember-cli to not prompt to override files that were added in the beforeInstall
    // so I'm just copying a few over at this stage
    copyWithTemplate(
      join(__dirname, 'files-override'),
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
  },
};
