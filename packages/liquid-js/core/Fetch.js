import { createComputed, createResource, untrack } from 'solid-js'
import isFunction from 'lodash/isFunction'

export const createFetcher = (fn) => (name, ...args) => {
  const [resource, loadResource] = createResource(undefined, { name })

  createComputed(async () => {
    const _args = args.map((arg) => (isFunction(arg) ? arg() : arg))
    loadResource(() => untrack(() => fn(..._args)))
  })

  return resource
}

export const useFetch = (url, opts) => {
  return {
    json: () => {
      const fetcher = createFetcher(async (url, opts) => {
        const response = await fetch(url, opts)
        const json = await response.json()
        return json
      })

      return fetcher(url, url, opts)
    },
  }
}
