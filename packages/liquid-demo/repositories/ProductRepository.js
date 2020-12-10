import productQuery from '../gql/queries/product.gql'
import { query } from '../GraphQL'

export const getProductByUrlKey = async (urlKey) => {
  const { products } = await query(productQuery, { urlKey })

  return products.items[0]
}
