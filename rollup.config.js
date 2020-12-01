const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')

const client = {
  input: 'src/client.js',
  output: {
    dir: 'dist/public',
    format: 'esm',
    sourcemap: true,
  },
  preserveEntrySignatures: false,
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [['solid', { generate: 'dom', hydratable: true }]],
    }),
  ],
}

const server = {
  input: 'src/server.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  external: (path) => {
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
  ],
}

module.exports = [client, server]
