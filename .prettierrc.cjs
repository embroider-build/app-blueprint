'use strict';

module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: ['*.js', '*.ts', '*.cjs', '.mjs', '.cts', '.mts', '.cts'],
      options: {
        singleQuote: true,
      },
    },
  ],
};
