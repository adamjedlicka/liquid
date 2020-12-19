const cache = {}

export default (req, res, next) => {
  const cached = cache[req.originalUrl]

  if (cached) return res.send(cached)

  const send = res.send

  res.send = function (string) {
    const body = string instanceof Buffer ? string.toString() : string

    cache[req.originalUrl] = body

    send.call(this, body)
  }

  return next()
}
