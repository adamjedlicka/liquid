module.exports.rules = {
  'jsx-uses-vars': require('./rules/jsx-uses-vars'),
}

module.exports.configs = {
  recommended: {
    plugins: ['liquid-js'],
    rules: {
      'liquid-js/jsx-uses-vars': ['error'],
    },
  },
}
