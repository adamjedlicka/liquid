const open = require('open')
const path = require('path')
const { rollup } = require('rollup')
const visualizer = require('rollup-plugin-visualizer')
const Liquid = require('../core/Liquid')

module.exports = class Build extends Liquid {
  async run() {
    await this._cleanDistDirectory()
    await this._executeConcepts()
    await this._copyTemplates()

    for (const config of this._getRollupConfig()) {
      process.stdout.write(`\nBuilding "${config.input}"`)

      if (this._args.analyze && config.input.includes('client')) {
        config.plugins.push(
          visualizer({
            filename: 'dist/client/stats.html',
          })
        )
      }

      const bundle = await rollup(config)

      const { output } = await bundle.write(config.output)

      process.stdout.write('\tdone\n\n')

      process.stdout.write('Output:\n')
      for (const out of output) {
        process.stdout.write(`  ${out.fileName}`)
        process.stdout.write(new Array(30 - out.fileName.length).join(' '))
        process.stdout.write(`${this._getSize(out)}\n`)
      }

      if (this._args.analyze && config.input.includes('client')) {
        open(path.resolve(this._getDistDirectoryPath(), 'client', 'stats.html'))
      }
    }
  }

  _getSize(out) {
    const bytes = (out.code || out.source).length

    if (bytes < 1000) return `${bytes}B`

    return `${(bytes / 100).toFixed(2)}kB`
  }
}
