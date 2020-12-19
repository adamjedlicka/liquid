const Concept = require('../core/Concept')

/**
 * @typedef { import('../core/Liquid') } Liquid
 * @typedef { import('../core/Package') } Package
 */

module.exports = class Routes extends Concept {
  /**
   * @param {Liquid} liquid
   */
  constructor(liquid) {
    super(liquid)
  }

  /**
   * @param {Package} pkg
   */
  async run(pkg) {
    const files = await pkg.getFiles('routes')

    for (const file of files) {
      const path = file.replace(/\.js$/, '')
      const route = await this._liquid._bundler.import(pkg.pathJoin('routes', file))

      this._liquid.addServerMiddleware((server) => server.use(`/${path}`, route))
    }
  }
}
