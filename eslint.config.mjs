import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: [
      'files/*/app/**/*.js',
      'files-override/**/*.mjs',
      'files-override/*/app/**/*.js',
      'files-override/*/tests/**/*.js',
    ],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['tests/fixture/*', 'tests/fixture-ts/*'],
  },
];
