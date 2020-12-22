import { createComputed, createResource, createState } from 'solid-js'
import { query } from '../GraphQL'
import urlResolverQuery from '../gql/queries/urlResolver.gql'

export const createRepository = ({ name, args = [], fetcher, mapper = (data) => data }) => {
  const [resource, loadResource] = createResource(undefined, { name })
  const [state, setState] = createState(undefined)

  createComputed(() => {
    const _args = args.map((arg) => arg())
    loadResource(() => fetcher(..._args))
  })

  createComputed(() => {
    setState(mapper(resource() ?? {}))
  })

  return state
}

export const fetchResolvedUrl = (urlFactory) =>
  createRepository({
    name: 'urlResolver',
    args: [urlFactory],
    fetcher: async (url) => {
      const { urlResolver } = await query(urlResolverQuery, { url: `${url}.html` })

      return {
        ...urlResolver,
        url,
      }
    },
  })
