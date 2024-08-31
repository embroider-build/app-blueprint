import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: [
      'files/app/**/*.js',
      'files-override/app/**/*.js',
      'files-override/tests/**/*.js',
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
  eslintPluginPrettierRecommended,
  {
    ignores: ['tests/fixture/*'],
  },
];
