const fs = require('fs/promises')
const path = require('path')

module.exports = class Liquid {
  async addFile({ src, dst }) {
    const template = await fs.readFile(src, {
      encoding: 'utf-8',
    })

    await fs.writeFile(path.resolve(this._getDistDirectoryPath(), dst), template, {
      encoding: 'utf-8',
    })
  }

  async _cleanDistDirectory() {
    await fs.rmdir(this._getDistDirectoryPath(), {
      recursive: true,
    })

    await fs.mkdir(this._getDistDirectoryPath(), {
      recursive: true,
    })
  }

  async _copyTemplates() {
    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'App.js'),
      dst: 'App.js',
    })

    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'client.js'),
      dst: 'client.js',
    })

    await this.addFile({
      src: path.resolve(__dirname, '..', 'templates', 'server.js'),
      dst: 'server.js',
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
