import { awaitSuspense } from 'solid-js'
import { renderToString, generateHydrationScript } from 'solid-js/web'
import App from './App.js'

export default async (req) => {
  const ctx = {
    url: req.url,
    error: null,
  }

  const string = await renderToString(awaitSuspense(() => <App ctx={ctx} />))
  const script = generateHydrationScript({
    eventNames: ['click', 'blur', 'input'],
    resolved: true,
  })

  if (ctx.error) throw ctx.error

  return {
    string,
    script,
  }
}
