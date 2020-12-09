const { rollup } = require('rollup')
const Liquid = require('../core/Liquid')
const configs = require('../rollup.config')

module.exports = class Build extends Liquid {
  async run() {
    await this._cleanDistDirectory()
    await this._executeConcepts()
    await this._copyTemplates()

    for (const config of configs) {
      process.stdout.write(`Building "${config.input}"`)

      const bundle = await rollup(config)

      await bundle.write(config.output)

      process.stdout.write('\tdone\n')
    }
  }
}
