const path = require('path')
const Concept = require('liquid-cli/src/core/Concept')

module.exports = class DynamicPages extends Concept {
  constructor(liquid) {
    super(liquid)

    this._dynamicPages = []
  }

  async run(pkg) {
    const files = await pkg.getFiles('dynamicPages')

    for (const file of files) {
      const ident = file.replace(/\.js$/, '')
      const component = pkg.pathJoin('dynamicPages', file)

      this._dynamicPages.push({
        ident,
        component,
      })
    }
  }

  afterAll() {
    this._liquid.addFile({
      name: 'DynamicPages',
      src: path.resolve(__dirname, '..', 'templates', 'DynamicPages.js.tmpl'),
      dst: 'DynamicPages.js',
      data: {
        dynamicPages: this._dynamicPages,
      },
    })
  }
}
