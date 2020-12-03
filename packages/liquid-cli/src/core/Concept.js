/**
 * @typedef { import('./Liquid') } Liquid
 * @typedef { import('./Package') } Package
 */

module.exports = class Concept {
  /**
   * @param {Liquid} liquid
   */
  constructor(liquid) {
    this._liquid = liquid
  }

  beforeAll() {
    // Do nothing...
  }

  /**
   * @param {Package} pkg
   */
  run() {
    // Do nothing...
  }

  afterAll() {
    // Do nothing...
  }
}
