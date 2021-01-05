import { createComputed, createResource, createSignal, createState } from 'solid-js'

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

  return { response, loading }
}
