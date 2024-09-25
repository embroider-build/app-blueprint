import globals from 'globals';
import js from '@eslint/js';

import ember from 'eslint-plugin-ember';
import emberRecommended from 'eslint-plugin-ember/configs/recommended';
import gjsRecommended from 'eslint-plugin-ember/configs/recommended-gjs';

import prettier from 'eslint-plugin-prettier/recommended';
import qunit from 'eslint-plugin-qunit';
import n from 'eslint-plugin-n';

import emberParser from 'ember-eslint-parser';
import babelParser from '@babel/eslint-parser';

const esmParserOptions = {
  ecmaFeatures: { modules: true },
  ecmaVersion: 'latest',
  requireConfigFile: false,
  babelOptions: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ],
  },
};

export default [
  js.configs.recommended,
  prettier,
  {
    ignores: ['vendor/', 'dist/', 'node_modules/', 'coverage/', '!**/.*'],
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: esmParserOptions,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      ember: ember,
    },
    rules: {
      ...emberRecommended.rules,
      ...gjsRecommended.rules,
    },
  },
  {
    files: ['**/*.gjs'],
    languageOptions: {
      parser: emberParser,
      parserOptions: esmParserOptions,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      ember: ember,
    },
    rules: {
      ...emberRecommended.rules,
      ...gjsRecommended.rules,
    },
  },
  {
    plugins: {
      qunit,
    },
    files: ['tests/**/*-test.{js,gjs}'],
  },
  /**
   * CJS node files
   */
  {
    files: ['**/*.cjs', 'config/**/*.js'],
    plugins: {
      n,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 6,
      sourceType: 'script',
    },
  },
];
