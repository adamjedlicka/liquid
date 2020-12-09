const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
const postcss = require('rollup-plugin-postcss')

const production = process.env.NODE_ENV === 'production'

const client = {
  input: 'dist/client.js',
  output: {
    dir: 'dist/client',
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
    production && terser(),
  ],
}

const server = {
  input: 'dist/server.js',
  output: {
    dir: 'dist/server',
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
  ],
}

module.exports = [client, server]
