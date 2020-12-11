import { isServer } from 'solid-js/web'
import urlResolverQuery from './gql/queries/urlResolver.gql'

export const query = async (query, variables = {}) => {
  const url = isServer ? 'https://venia.magento.com/graphql' : '/graphql'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query.replace(/\s\s+/g, ' ').replace(/\n/g, ' '), variables }),
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

export const resolveUrl = async (url) => {
  const { urlResolver } = await query(urlResolverQuery, { url })

  return urlResolver
}
