const express = require('express')
const { watch } = require('rollup')
const Youch = require('youch')
const Liquid = require('../core/Liquid')

module.exports = class Dev extends Liquid {
  async run() {
    await this._cleanDistDirectory()
    await this._executeConcepts()
    await this._copyTemplates()

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

      const watcher = watch(this._getRollupConfig())

      watcher.on('event', (event) => {
        switch (event.code) {
          case 'START':
            break
          case 'BUNDLE_START':
            process.stdout.write(`Building "${event.input}"`)
            break
          case 'BUNDLE_END':
            process.stdout.write(`\tdone - ${event.duration}ms\n`)
            break
          case 'END':
            process.stdout.write('\n')
            break
          case 'ERROR':
            process.stderr.write(`\n${event.error.message}\n`)
            break
        }
      })
    })
  }
}
