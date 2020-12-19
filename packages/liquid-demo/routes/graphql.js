const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = createProxyMiddleware({
  target: 'https://venia.magento.com',
  changeOrigin: true,
})
