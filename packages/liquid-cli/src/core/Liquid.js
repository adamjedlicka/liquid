const ejs = require('ejs')
const path = require('path')
const express = require('express')
const FS = require('../support/FS')
const Bundler = require('../support/Bundler')
const Package = require('./Package')

module.exports = class Liquid {
  constructor({ config, args, fs }) {
    this._config = config ?? {}
    this._args = args ?? {}
    this._fs = fs ?? new FS()
    this._bundler = new Bundler()

    this._coreConcepts = [
      require('../concepts/Concepts'),
      require('../concepts/Layouts'),
      require('../concepts/Pages'),
      require('../concepts/Public'),
      require('../concepts/Routes'),
      require('../concepts/ServerMiddleware'),
    ]
    this._concepts = []
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

    // Load core concepts concepts
    for (const Concept of this._coreConcepts) {
      const concept = new Concept(this)

      for (const pkg of packages) {
        await concept.run(pkg)
      }

      await concept.afterAll()
    }

    // Load regular concepts concepts
    for (const Concept of this._concepts) {
      const concept = new Concept(this)

      for (const pkg of packages) {
        await concept.run(pkg)
      }

      await concept.afterAll()
    }
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

  async _generateManifest(output) {
    const manifest = {}

    for (const out of output) {
      manifest[out.facadeModuleId] = out.fileName
    }

    await this._fs.writeFile(
      path.resolve(this._getDistDirectoryPath(), 'client', 'manifest.json'),
      JSON.stringify(manifest)
    )
  }

  async _getManifest() {
    const manifest = await this._fs.readFile(path.resolve(this._getDistDirectoryPath(), 'client', 'manifest.json'))
    return JSON.parse(manifest)
  }

  _applyMiddlewares(server) {
    server.use('/', express.static(path.resolve(this._getDistDirectoryPath(), 'client')))

    for (const serverMiddleware of this._serverMiddleware) {
      serverMiddleware(server)
    }
  }

  async _handleRequest(req, res, next, { entry, manifest }) {
    const { ctx, string, head, script } = await entry(req)

    let preload = '<link rel="preload" href="/client.js" as="script" crossorigin="anonymous">'

    if (manifest) {
      const layout = manifest[ctx.layout]
      const page = manifest[ctx.page]

      preload += `<link rel="preload" href="/${layout}" as="script" crossorigin="anonymous">`
      preload += `<link rel="preload" href="/${page}" as="script" crossorigin="anonymous">`
    }

    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${head}
      ${preload}
      <link rel="stylesheet" href="/client.css">
      <script>${script}</script>
  </head>
  <body>
      <div id="app">${string}</div>
      <script type="module" src="/client.js" async></script>
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
    try {
      const resolved = require.resolve(path.resolve(this._getDistDirectoryPath(), 'server', 'server.js'))

      delete require.cache[resolved]

      return require(resolved)
    } catch {
      return {}
    }
  }

  _getStyles() {
    const styles = []

    for (const style of this._config.styles ?? []) {
      try {
        styles.push(require.resolve(style).replace(/\\/g, '/'))
      } catch {
        styles.push(path.resolve(this._getRootDirectoryPath(), style).replace(/\\/g, '/'))
      }
    }

    return styles
  }

  _getRollupConfig() {
    const configs = require('../rollup.config.js')

    if (!this._config.rollup) return configs

    for (const config of configs) {
      this._config.rollup({ config })
    }

    return configs
  }

  _getServerHost() {
    return this._args.host ?? this._config.server?.host ?? 'localhost'
  }

  _getServerPort() {
    return this._args.port ?? this._config.server?.port ?? '8080'
  }

  _getRootDirectoryPath() {
    return process.cwd()
  }

  _getDistDirectoryPath() {
    return path.resolve(this._getRootDirectoryPath(), 'build')
  }
}
