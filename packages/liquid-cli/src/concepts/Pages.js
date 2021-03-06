const _ = require('lodash')
const path = require('path')
const Concept = require('../core/Concept')

/**
 * @typedef { import('../core/Liquid') } Liquid
 * @typedef { import('../core/Package') } Package
 */

module.exports = class Pages extends Concept {
  /**
   * @param {Liquid} liquid
   */
  constructor(liquid) {
    super(liquid)

    this._pages = []
  }

  /**
   * @param {Package} pkg
   */
  async run(pkg) {
    const files = await pkg.getFiles('pages')

    for (const file of files) {
      const ident = file.replace(/\.js$/, '')
      const component = pkg.pathJoin('pages', file)

      this._pages.push({
        ident,
        name: this._getName(ident),
        path: this._getPath(ident),
        component,
      })
    }

    this._pages.sort((a, b) => sortRoutes(a, b))
  }

  afterAll() {
    this._liquid.addFile({
      name: 'Pages',
      src: path.resolve(__dirname, '..', 'templates', 'Pages.js.tmpl'),
      dst: 'Pages.js',
      data: {
        pages: this._pages,
      },
    })
  }

  _getName(ident) {
    if (ident === 'index') return 'Index'
    if (ident === '_404') return '_404'

    return _.startCase(_.camelCase(ident)).replace(/ /g, '')
  }

  _getPath(ident) {
    if (ident === 'index') return /^\/$/
    if (ident === '_404') return /^\/.*$/

    return new RegExp(`^/${ident}/?$`)
  }
}

const sortRoutes = (a, b) => {
  if (a.name === 'Index') return -1
  if (b.name === 'Index') return 1

  if (a.name === '_404') return 1
  if (b.name === '_404') return -1

  return a.ident.localeCompare(b.ident)
}
