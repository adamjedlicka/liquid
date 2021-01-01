import { isServer } from 'solid-js/web'

export const query = async (query, variables) => {
  const url = isServer ? 'https://venia.magento.com/graphql' : '/graphql'

  const body = objectToQuery({ query: query.replace(/\s\s+/g, ' ').replace(/\n/g, ' '), variables })

  const response = await fetch(`${url}?${body}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

export const mutate = async (mutation, variables) => {
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
}

const objectToQuery = (object) => {
  return Object.entries(object)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${key}=${JSON.stringify(value)}`
      } else {
        return `${key}=${value}`
      }
    })
    .join('&')
}
