const { string } = require('rollup-plugin-string')

module.exports = {
  packages: ['liquid-demo'],

  styles: ['tailwindcss/tailwind.css', './packages/liquid-demo/styles/index.css'],

  rollup: ({ config }) => {
    config.plugins.push(
      string({
        include: '**/*.gql',
      })
    )
  },
}
