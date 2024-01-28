'use strict';

module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es2021: true
  },
  extends: 'airbnb-base/legacy',
  overrides: [],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        '@babel/plugin-syntax-import-assertions'
      ],
    },
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  rules: {
    "no-console": "off",
    "await-in-loop": "off",
    "no-restricted-syntax": "off",
    "consistent-return": "off",
    "no-promise-executor-return": "off",
    "no-await-in-loop": "off",
  }
};
