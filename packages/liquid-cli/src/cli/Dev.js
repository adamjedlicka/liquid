const express = require('express')
const { watch } = require('rollup')
const Youch = require('youch')
const Liquid = require('../core/Liquid')
const rollup = require('../rollup.config')

module.exports = class Dev extends Liquid {
  async run() {
    await this._cleanDistDirectory()
    await this._executeConcepts()
    await this._copyTemplates()

    const watcher = watch(rollup)

    watcher.on('event', (event) => {
      switch (event.code) {
        case 'BUNDLE_END':
          console.log(`built ${event.input} in ${event.duration}ms`)
          break
        case 'ERROR':
          console.log()
          console.error(event.error.message)
          console.log()
          break
      }
    })

    const server = express()

    this._applyMiddlewares(server)

    server.get('*', async (req, res, next) => {
      try {
        const { entry } = await this._getServerEntry()

        await this._handleRequest(req, res, next, {
          entry,
        })
      } catch (e) {
        const youch = new Youch(e, req)

        const html = await youch.toHTML()

        res.status(500).send(html)
      }
    })

    server.listen(this._getServerPort(), this._getServerHost(), () => {
      console.log()
      console.log('Server listening at http://%s:%d', this._getServerHost(), this._getServerPort())
      console.log()
    })
  }
}
