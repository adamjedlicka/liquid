const { rollup } = require('rollup')
const Liquid = require('../core/Liquid')
const configs = require('../rollup.config')

module.exports = class Build extends Liquid {
  async run() {
    await this._cleanDistDirectory()
    await this._executeConcepts()
    await this._copyTemplates()

    for (const config of configs) {
      const bundle = await rollup(config)

      await bundle.write(config.output)

      console.log('Built', config.input)
    }
  }
}
