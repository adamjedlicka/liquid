export const queryStringToObject = (queryString) => {
  if (!queryString) return {}

  const transformed = decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')

  return JSON.parse(`{"${transformed}"}`)
}

export const queryObjectToString = (queryObject) => {
  if (!queryObject) return ''

  return Object.entries(queryObject)
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
