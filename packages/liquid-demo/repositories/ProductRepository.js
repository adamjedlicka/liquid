import { useQuery } from '../GraphQL'
import productQuery from '../gql/queries/product.gql'
import { toProduct } from '../mappers/ProductMapper'
import { createRepository } from './Repository'

export const fetchProductByUrlKey = createRepository({
  fetcher: (name, urlKeyFactory) =>
    useQuery(name, () => [
      productQuery,
      {
        urlKey: urlKeyFactory()
          .replace(/\.html$/, '')
          .slice(1),
      },
    ]),
  mapper: (data) => toProduct(data.products?.items?.[0]),
})
