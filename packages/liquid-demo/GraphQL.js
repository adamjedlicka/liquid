import { isServer } from 'solid-js/web'
import { queryObjectToString, createFetcher } from 'liquid-js'

export const useQuery = createFetcher(async (query, variables) => {
  const url = isServer ? 'https://venia.magento.com/graphql' : '/graphql'

  const body = queryObjectToString({ query: query.replace(/\s\s+/g, ' ').replace(/\n/g, ' '), variables })
  const response = await fetch(`${url}?${body}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await response.json()

  if (json.errors) {
    for (const error of json.errors) {
      console.error(error.message)
    }

    throw new Error(json.errors[0].message)
  }

  json.data._variables = variables

  return json.data
})

export const useMutation = createFetcher(async (mutation, variables) => {
  const url = isServer ? 'https://venia.magento.com/graphql' : '/graphql'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation.replace(/\s\s+/g, ' ').replace(/\n/g, ' '), variables }),
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
})
