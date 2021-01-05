import { createComputed, createResource, createState } from 'solid-js'

export const createFetcher = (fn) => (name, args) => {
  const [resource, loadResource] = createResource(undefined, { name })
  const [response, setResponse] = createState(undefined)

  createComputed(async () => {
    const _args = args()
    loadResource(() => fn(..._args))
  })

  createComputed(() => {
    setResponse(resource())
  })

  return { response }
}
