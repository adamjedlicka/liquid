const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const alias = require('@rollup/plugin-alias')
const { terser } = require('rollup-plugin-terser')
const postcss = require('rollup-plugin-postcss')

const production = process.env.NODE_ENV === 'production'

const client = {
  input: 'build/client.js',
  output: {
    dir: 'build/client',
    format: 'esm',
    sourcemap: !production,
  },
  preserveEntrySignatures: false,
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [['solid', { generate: 'dom', hydratable: true }]],
    }),
    commonjs(),
    postcss({
      extract: true,
      minimize: production,
    }),
    alias({
      entries: [{ find: 'build', replacement: path.resolve(process.cwd(), 'build') }],
    }),
    production && terser(),
  ],
}

const server = {
  input: 'build/server.js',
  output: {
    dir: 'build/server',
    format: 'cjs',
    sourcemap: !production,
  },
  plugins: [
    nodeResolve({ exportConditions: ['node'] }),
    babel({
      babelHelpers: 'bundled',
      presets: [['solid', { generate: 'ssr', hydratable: true, async: true }]],
    }),
    commonjs(),
    postcss({
      extract: false,
      inject: false,
    }),
    alias({
      entries: [{ find: 'build', replacement: path.resolve(process.cwd(), 'build') }],
    }),
  ],
}

module.exports = [client, server]
