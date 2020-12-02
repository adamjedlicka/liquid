#!/usr/bin/env node

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
        const Dev = require('./cli/Dev')

        const dev = new Dev()

        await dev.run()
      } catch (e) {
        console.error(e)
      }
    },
  })
  .demandCommand()
  .strict()
  .help()
  .parse()
