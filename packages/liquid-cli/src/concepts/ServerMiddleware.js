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
    const files = await pkg.getFiles('serverMiddleware')

    for (const file of files) {
      const serverMiddleware = await this._liquid._bundler.import(pkg.pathJoin('serverMiddleware', file))

      this._liquid.addServerMiddleware((server) => server.use(serverMiddleware))
    }
  }
}
