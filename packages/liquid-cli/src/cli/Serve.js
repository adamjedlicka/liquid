const express = require('express')
const compression = require('compression')
const Liquid = require('../core/Liquid')

module.exports = class Serve extends Liquid {
  async run() {
    await this._executeConcepts()

    const server = express()

    server.use(compression())

    this._applyMiddlewares(server)

    const { entry } = await this._getServerEntry()
    const manifest = await this._getManifest()
    const style = await this._getStyle()

    server.get('*', async (req, res, next) => {
      try {
        await this._handleRequest(req, res, next, {
          entry,
          manifest,
          style,
        })
      } catch (e) {
        res.status(500).send(e.message)
      }
    })

    server.listen(this._getServerPort(), this._getServerHost(), () => {
      console.log()
      console.log('Server listening on http://%s:%d', this._getServerHost(), this._getServerPort())
      console.log()
    })
  }
}
