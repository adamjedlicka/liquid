import { createComputed, createEffect, createResource, createSignal, createState } from 'solid-js'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export const createFetcher = (fn) => (name, args) => {
  const [resource, loadResource] = createResource(undefined, { name })
  const [response, setResponse] = createState(undefined)
  const [loading, setLoading] = createSignal(false)

  let loaded = false
  createComputed(async () => {
    const _args = args()
    if (!loaded) {
      loadResource(() => fn(..._args))

      loaded = true
    } else {
      setLoading(true)
      setResponse(await fn(..._args))
      setLoading(false)
    }
  })

  createComputed(() => {
    setResponse(resource())
  })

  createEffect(() => {
    if (loading()) {
      startProgress()
    } else {
      stopProgress()
    }
  })

  return { response, loading }
}

let nProgress = 0

const startProgress = () => {
  nProgress++
  if (nProgress === 1) {
    Nprogress.start()
  } else {
    Nprogress.inc()
  }
}

const stopProgress = () => {
  nProgress--
  if (nProgress < 0) nProgress = 0
  if (nProgress == 0) {
    Nprogress.done()
  } else {
    Nprogress.inc()
  }
}
