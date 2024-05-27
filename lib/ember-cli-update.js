const fs = require('fs');
const { join } = require('path');

module.exports = async function ({
  projectDir,
  projectName,
  version,
  options = [],
} = {}) {
  fs.writeFileSync(
    join(projectDir, 'config', 'ember-cli-update.json'),
    JSON.stringify(
      {
        schemaVersion: '1.0.0',
        projectName,
        packages: [
          {
            name: '@embroider/app-blueprint',
            version,
            blueprints: [
              {
                name: '@embroider/app-blueprint',
                isBaseBlueprint: true,
                // TODO pass more of the original options through
                options: [`--package-manager ${options.packageManager}`],
              },
            ],
          },
        ],
      },
      null,
      { spaces: 2 },
    ),
  );
};
