const path = require('path')
const Concept = require('../core/Concept')

/**
 * @typedef { import('../core/Liquid') } Liquid
 * @typedef { import('../core/Package') } Package
 */

module.exports = class Layouts extends Concept {
  /**
   * @param {Liquid} liquid
   */
  constructor(liquid) {
    super(liquid)

    this._layouts = []
  }

  /**
   * @param {Package} pkg
   */
  async run(pkg) {
    const files = await pkg.getFiles('layouts')

    for (const file of files) {
      const ident = file.replace(/\.js$/, '')
      const component = pkg.pathJoin('layouts', file)

      this._layouts.push({
        ident,
        component,
      })
    }
  }

  afterAll() {
    this._liquid.addFile({
      name: 'Layouts',
      src: path.resolve(__dirname, '..', 'templates', 'Layouts.js.tmpl'),
      dst: 'Layouts.js',
      data: {
        layouts: this._layouts,
      },
    })
  }
}
