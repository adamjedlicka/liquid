import { createMemo } from 'solid-js'
import { useRepository } from './index'
import { query } from '../GraphQL'
import productQuery from '../gql/queries/product.gql'

const getProductByUrlKey = async (urlKey) => {
  const { products } = await query(productQuery, { urlKey: urlKey.replace(/^\//, '') })

  const product = products.items[0]

  return product
}

export const useProductByUrlKey = (name, urlKeyFactory) => {
  const product = useRepository(name, () => getProductByUrlKey(urlKeyFactory()), [urlKeyFactory])

  return {
    name: createMemo(() => product()?.name ?? ''),
    thumbnail: createMemo(() => product()?.thumbnail?.url ?? ''),
    categories: createMemo(() => product()?.categories ?? []),
    description: createMemo(() => product()?.description?.html ?? ''),
  }
}
