const { rollup } = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const requireFromString = require('./requireFromString')

module.exports = class Bundler {
  async import(path) {
    const build = await rollup({
      input: path,
      external: (path) => {
        try {
          return require.resolve(path).includes('node_modules')
        } catch {
          return false
        }
      },
      plugins: [nodeResolve({ preferBuiltins: true })],
    })

    const generated = await build.generate({
      format: 'cjs',
      exports: 'default',
    })

    for (const out of generated.output) {
      return requireFromString(out.code, out.facadeModuleId)
    }
  }
}
