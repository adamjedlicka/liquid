const production = process.env.NODE_ENV === 'production'

module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:liquid/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': [production ? 'error' : 'warn'],
  },
}
