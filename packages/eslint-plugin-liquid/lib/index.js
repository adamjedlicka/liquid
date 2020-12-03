module.exports.rules = {
  'jsx-uses-vars': require('./rules/jsx-uses-vars'),
}

module.exports.configs = {
  recommended: {
    plugins: ['liquid'],
    rules: {
      'liquid/jsx-uses-vars': ['error'],
    },
  },
}
