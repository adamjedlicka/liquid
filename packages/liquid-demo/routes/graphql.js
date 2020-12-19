import { createProxyMiddleware } from 'http-proxy-middleware'

export default createProxyMiddleware({
  target: 'https://venia.magento.com',
  changeOrigin: true,
})
