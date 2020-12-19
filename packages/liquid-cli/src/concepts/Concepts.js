const Concept = require('../core/Concept')

/**
 * @typedef { import('../core/Liquid') } Liquid
 * @typedef { import('../core/Package') } Package
 */

module.exports = class Concepts extends Concept {
  /**
   * @param {Liquid} liquid
   */
  constructor(liquid) {
    super(liquid)

    this._concepts = []
  }

  /**
   * @param {Package} pkg
   */
  async run(pkg) {
    const files = await pkg.getFiles('concepts')

    for (const file of files) {
      this._concepts.push(require(pkg.pathJoin('concepts', file)))
    }
  }

  afterAll() {
    this._liquid._concepts = this._concepts
  }
}
