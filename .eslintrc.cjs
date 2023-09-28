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
  },
  rules: {
    "no-console": "off"
  },

};
