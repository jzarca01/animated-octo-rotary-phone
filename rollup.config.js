'use strict';
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

module.exports = {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'dist/server.bundle.js',
  },
  plugins: [
    commonjs(),
    json()
  ]
};
