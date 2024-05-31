import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: ['files/app/**/*.js'],
    languageOptions: { sourceType: 'module' },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ['tests/fixture/*'],
  },
];
