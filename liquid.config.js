import { string } from 'rollup-plugin-string'

export default {
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
