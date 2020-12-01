import { awaitSuspense } from 'solid-js'
import { renderToString, generateHydrationScript } from 'solid-js/web'
import App from './App.js'

export const entry = async (req) => {
  let error = null

  const ctx = {
    url: req.url,
    onError: (err) => (error = err),
  }

  const string = await renderToString(awaitSuspense(() => <App ctx={ctx} />))
  const script = generateHydrationScript({
    eventNames: ['click', 'blur', 'input'],
    resolved: true,
  })

  if (error) throw error

  return {
    string,
    script,
  }
}
