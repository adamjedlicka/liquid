const path = require('path')
const yargs = require('yargs')

const config = require(path.resolve(process.cwd(), 'liquid.config.js'))

yargs
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'dev',
    desc: 'Starts development server',
    builder: (yargs) => {
      yargs
        .option('host', {
          desc: 'Server host',
          type: 'string',
        })
        .option('port', {
          desc: 'Server port',
          type: 'number',
        })
    },
    handler: async (args) => {
      try {
        const Dev = require('./src/cli/Dev')

        const dev = new Dev({ config, args })

        await dev.run()
      } catch (e) {
        console.error(e)
      }
    },
  })
  .command({
    command: 'build',
    desc: 'Builds production bundle',
    handler: async (args) => {
      try {
        process.env.NODE_ENV = 'production'

        const Build = require('./src/cli/Build')

        const build = new Build({ config, args })

        await build.run()
      } catch (e) {
        console.error(e)
      }
    },
  })
  .command({
    command: 'serve',
    desc: 'Serves production bundle',
    builder: (yargs) => {
      yargs
        .option('host', {
          desc: 'Server host',
          type: 'string',
        })
        .option('port', {
          desc: 'Server port',
          type: 'number',
        })
    },
    handler: async (args) => {
      try {
        process.env.NODE_ENV = 'production'

        const Serve = require('./src/cli/Serve')

        const serve = new Serve({ config, args })

        await serve.run()
      } catch (e) {
        console.error(e)
      }
    },
  })
  .demandCommand()
  .strict()
  .help()
  .parse()
