const express = require('express')
const Concept = require('../core/Concept')

/**
 * @typedef { import('../core/Liquid') } Liquid
 * @typedef { import('../core/Package') } Package
 */

module.exports = class Public extends Concept {
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
    const files = await pkg.getFiles('public')

    if (files.length === 0) return

    this._liquid.addServerMiddleware((server) => server.use(express.static(pkg.pathJoin('public'))))
  }
}
