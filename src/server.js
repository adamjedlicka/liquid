import { awaitSuspense } from 'solid-js'
import { renderToString, generateHydrationScript } from 'solid-js/web'
import App from './App.js'

export default async (req) => {
  const string = await renderToString(awaitSuspense(() => <App url={req.url} />))
  const script = generateHydrationScript({
    eventNames: ['click', 'blur', 'input'],
    resolved: true,
  })

  return {
    string,
    script,
  }
}
