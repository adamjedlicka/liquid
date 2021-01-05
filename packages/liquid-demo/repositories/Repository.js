import { createComputed, createState } from 'solid-js'

import { useQuery } from '../GraphQL'
import urlResolverQuery from '../gql/queries/urlResolver.gql'

export const createRepository = ({ fetcher, mapper }) => (...args) => {
  const [state, setState] = createState({})

  const { response } = fetcher(...args)

  createComputed(() => setState(mapper(response)))

  return state
}

export const fetchUrlResolver = createRepository({
  fetcher: (urlFactory) =>
    useQuery('urlResolver', () => [
      urlResolverQuery,
      {
        url: `${urlFactory()}.html`,
      },
    ]),
  mapper: (data) => ({
    type: data.urlResolver?.type,
    id: data.urlResolver?.id,
    url: data._variables?.url,
  }),
})
