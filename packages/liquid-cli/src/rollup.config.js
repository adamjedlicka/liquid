const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
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
  external: (path) => {
    if (/\.css$/.test(path)) return false

    try {
      return require.resolve(path).includes('node_modules')
    } catch {
      return false
    }
  },
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    babel({
      babelHelpers: 'bundled',
      presets: [['solid', { generate: 'ssr', hydratable: true, async: true }]],
    }),
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
