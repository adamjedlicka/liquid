import productQuery from '../gql/queries/product.gql'
import { query } from '../GraphQL'

export const getProductByUrlKey = async (urlKey) => {
  const { products } = await query(productQuery, { urlKey: urlKey.replace(/^\//, '') })

  const product = products.items[0]

  // Fix for Solid serialization bug
  product.description.html = product.description.html.replace(/'/g, '')
  product.description.html = product.description.html.replace(/"/g, '')

  return product
}
