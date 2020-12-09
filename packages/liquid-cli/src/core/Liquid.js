const ejs = require('ejs')
const path = require('path')
const express = require('express')
const Layouts = require('../concepts/Layouts')
const Pages = require('../concepts/Pages')
const Public = require('../concepts/Public')
const FS = require('../support/FS')
const Package = require('./Package')

module.exports = class Liquid {
  constructor({ config, fs }) {
    this._config = config ?? {}
    this._fs = fs ?? new FS()

    this._serverMiddleware = []
  }

  async addFile({ src, dst, data }) {
    const template = await this._fs.readFile(src)

    const rendered = ejs.render(template, data)

    await this._fs.writeFile(path.resolve(this._getDistDirectoryPath(), dst), rendered)
  }

  async addServerMiddleware(serverMiddleware) {
    this._serverMiddleware.push(serverMiddleware)
  }

  async _cleanDistDirectory() {
    await this._fs.rmdir(this._getDistDirectoryPath())

    await this._fs.mkdir(this._getDistDirectoryPath())
  }

  async _executeConcepts() {
    const packages = this._getPackages()

    const layouts = new Layouts(this)
    const pages = new Pages(this)
    const _public = new Public(this)

    for (const pkg of packages) {
      await layouts.run(pkg)
      await pages.run(pkg)
      await _public.run(pkg)
    }

    await layouts.afterAll()
    await pages.afterAll()
    await _public.afterAll()
  }

  async _copyTemplates() {
    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'App.js.tmpl'),
      dst: 'App.js',
      data: {
        styles: this._getStyles(),
      },
    })

    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'client.js.tmpl'),
      dst: 'client.js',
    })

    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'server.js.tmpl'),
      dst: 'server.js',
    })
  }

  _applyMiddlewares(server) {
    server.use('/', express.static(path.resolve(this._getDistDirectoryPath(), 'client')))

    for (const serverMiddleware of this._serverMiddleware) {
      server.use(serverMiddleware)
    }
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
      <link rel="stylesheet" href="/client.css">
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

    for (const module of this._config.packages ?? []) {
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

  _getStyles() {
    const styles = []

    for (const style of this._config.styles ?? []) {
      try {
        styles.push(require.resolve(style))
      } catch {
        styles.push(path.resolve(this._getRootDirectoryPath(), style))
      }
    }

    return styles
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
