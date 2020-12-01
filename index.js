require('source-map-support').install()

global.fetch = require('node-fetch')

const path = require('path')
const Youch = require('youch')
const express = require('express')

const port = 8080

const server = express()

server.use(express.static(path.join(__dirname, 'dist', 'public')))

server.get('*', async (req, res) => {
  try {
    const entry = require('./dist/server.js')

    const { string, script } = await entry(req)

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>${script}</script>
</head>
<body>
    <div id="app">${string}</div>
    <script async type="module" src="/client.js"></script>
</body>
</html>
`

    res.send(html)
  } catch (e) {
    const youch = new Youch(e, req)

    const html = await youch.toHTML()

    res.status(500).send(html)
  }
})

server.listen(port, () => console.log(`Server listening on port http://localhost:${port}!`))
