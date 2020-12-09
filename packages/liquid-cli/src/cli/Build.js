const { rollup } = require('rollup')
const Liquid = require('../core/Liquid')
const configs = require('../rollup.config')

module.exports = class Build extends Liquid {
  async run() {
    await this._cleanDistDirectory()
    await this._executeConcepts()
    await this._copyTemplates()

    for (const config of configs) {
      process.stdout.write(`\nBuilding "${config.input}"`)

      const bundle = await rollup(config)

      const { output } = await bundle.write(config.output)

      process.stdout.write('\tdone\n\n')

      process.stdout.write('Output:\n')
      for (const out of output) {
        process.stdout.write(`  ${out.fileName}`)
        process.stdout.write(new Array(30 - out.fileName.length).join(' '))
        process.stdout.write(`${this._getSize(out)}\n`)
      }
    }
  }

  _getSize(out) {
    const bytes = (out.code || out.source).length

    if (bytes < 1000) return `${bytes}B`

    return `${(bytes / 100).toFixed(2)}kB`
  }
}
