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

    server.get('*', async (req, res, next) => {
      try {
        await this._handleRequest(req, res, next, {
          entry,
        })
      } catch (e) {
        res.status(500).send(e.message)
      }
    })

    server.listen(this._getServerPort(), this._getServerHost(), () => {
      console.log()
      console.log('Server listening at http://%s:%d', this._getServerHost(), this._getServerPort())
      console.log()
    })
  }
}
