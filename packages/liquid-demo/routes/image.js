import sharp from 'sharp'

const cache = {}

export default async (req, res) => {
  try {
    await resizeImage(req, res)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const resizeImage = async (req, res) => {
  const cached = cache[req.originalUrl]

  if (cached) {
    return res
      .set({
        'Content-Type': `image/jpeg`,
      })
      .send(cached)
  }

  const path = req.query.path

  const response = await fetch(path, {
    responseType: 'arraybuffer',
  })

  if (response.status === 404) {
    throw new Error('Source image not found')
  }

  const data = await response.arrayBuffer()

  const image = sharp(Buffer.from(data))

  image.resize({
    width: parseInt(req.query.w) || undefined,
    height: parseInt(req.query.h) || undefined,
    fit: req.query.fit || 'cover',
    background: '#FFFFFF',
  })

  image.toFormat('jpeg', {
    quality: 80,
  })

  const buffer = await image.toBuffer()

  cache[req.originalUrl] = buffer

  return res
    .set({
      'Content-Type': `image/jpeg`,
    })
    .send(buffer)
}
