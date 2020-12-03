const ejs = require('ejs')
const path = require('path')
const Pages = require('../concepts/Pages')
const FS = require('../support/FS')
const Package = require('./Package')

module.exports = class Liquid {
  constructor() {
    this._fs = new FS()

    this._clientExtensions = []
    this._serverExtensions = []
  }

  async addClientExtension({ name, src, dst, data }) {
    await this.addFile({ src, dst, data })

    this._clientExtensions.push({
      name,
      src: dst,
    })
  }

  async addServerExtension({ name, src, dst, data }) {
    await this.addFile({ src, dst, data })

    this._serverExtensions.push({
      name,
      src: dst,
    })
  }

  async addFile({ src, dst, data }) {
    const template = await this._fs.readFile(src)

    const rendered = ejs.render(template, data)

    await this._fs.writeFile(path.resolve(this._getDistDirectoryPath(), dst), rendered)
  }

  async _cleanDistDirectory() {
    await this._fs.rmdir(this._getDistDirectoryPath())

    await this._fs.mkdir(this._getDistDirectoryPath())
  }

  async _executeConcepts() {
    const packages = this._getPackages()

    const pages = new Pages(this)

    for (const pkg of packages) {
      await pages.run(pkg)
    }

    await pages.afterAll()
  }

  async _copyTemplates() {
    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'App.js.tmpl'),
      dst: 'App.js',
    })

    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'client.js.tmpl'),
      dst: 'client.js',
      data: {
        extensions: this._clientExtensions,
      },
    })

    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'server.js.tmpl'),
      dst: 'server.js',
      data: {
        extensions: this._serverExtensions,
      },
    })
  }

  async _handleRequest(req, res, next, { entry }) {
    const { string, script } = await entry(req)

    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script>${script}</script>
  </head>
  <body>
      <div id="app">${string}</div>
      <script async type="module" src="/client.js"></script>
  </body>
  </html>
  `

    res.status(200).send(html)
  }

  _getPackages() {
    const packages = []

    for (const module of ['liquid-demo'] || []) {
      const resolved = require.resolve(`${module}/package.json`)
      const _path = path.dirname(resolved)
      const _meta = require(resolved)

      packages.push(new Package(this, _path, _meta))
    }

    return packages
  }

  _getServerEntry() {
    const resolved = require.resolve(path.resolve(this._getDistDirectoryPath(), 'server', 'server.js'))

    delete require.cache[resolved]

    return require(resolved)
  }

  _getServerHost() {
    return 'localhost'
  }

  _getServerPort() {
    return 8080
  }

  _getRootDirectoryPath() {
    return process.cwd()
  }

  _getDistDirectoryPath() {
    return path.resolve(this._getRootDirectoryPath(), 'dist')
  }
}
