const walkSync = require('walk-sync');
const fs = require('fs');
const _ = require('lodash');
const { join, dirname } = require('path');

module.exports = function copyWithTemplate(
  sourceFolder,
  destinationFolder,
  templateContext,
) {
  const files = walkSync(sourceFolder, { directories: false });

  for (let file of files) {
    let content = _.template(
      fs.readFileSync(join(sourceFolder, file), 'utf-8'),
    )(templateContext);
    let destinationFile = join(destinationFolder, file);
    fs.mkdirSync(dirname(destinationFile), { recursive: true });
    fs.writeFileSync(destinationFile, content);
  }
};
