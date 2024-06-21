'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = async function (defaults) {
  const { setConfig } = await import('@warp-drive/build-config');
  let app = new EmberApp(defaults, {});

  setConfig(app, __dirname, {
    // WarpDrive/EmberData settings go here (if any)
  });

  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
