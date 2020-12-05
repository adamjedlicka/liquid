const yargs = require('yargs')

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
          default: 'localhost',
        })
        .option('port', {
          desc: 'Server port',
          type: 'number',
          default: '3000',
        })
    },
    handler: async () => {
      try {
        const Dev = require('./src/cli/Dev')

        const dev = new Dev({})

        await dev.run()
      } catch (e) {
        console.error(e)
      }
    },
  })
  .command({
    command: 'build',
    desc: 'Builds production bundle',
    handler: async () => {
      try {
        process.env.NODE_ENV = 'production'

        const Build = require('./src/cli/Build')

        const build = new Build({})

        await build.run()
      } catch (e) {
        console.error(e)
      }
    },
  })
  .command({
    command: 'serve',
    desc: 'Serves production bundle',
    handler: async () => {
      try {
        process.env.NODE_ENV = 'production'

        const Serve = require('./src/cli/Serve')

        const serve = new Serve({})

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
