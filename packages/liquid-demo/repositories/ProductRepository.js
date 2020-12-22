import { createRepository } from './Repository'
import { query } from '../GraphQL'
import productQuery from '../gql/queries/product.gql'
import { toProduct } from '../mappers/ProductMapper'

export const fetchProductByUrlKey = (name, urlKeyFactory) =>
  createRepository({
    name,
    args: [urlKeyFactory],
    fetcher: async (urlKey) => {
      const { products } = await query(productQuery, { urlKey: urlKey.replace(/^\//, '') })

      return products.items[0]
    },
    mapper: toProduct,
  })
