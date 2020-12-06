const production = process.env.NODE_ENV === 'production'

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    'jest/globals': true,
  },
  parserOptions: {
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
