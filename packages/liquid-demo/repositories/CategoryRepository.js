import { useQuery } from '../GraphQL'
import categoryListQuery from '../gql/queries/categoryList.gql'
import categoryDetailQuery from '../gql/queries/categoryDetail.gql'
import { toCategory } from '../mappers/CategoryMapper'
import { toProduct } from '../mappers/ProductMapper'
import { createRepository } from './Repository'

export const fetchCategoryById = createRepository({
  fetcher: (name, idFactory) =>
    useQuery(name, () => [
      categoryDetailQuery,
      {
        id: idFactory(),
      },
    ]),
  mapper: (data) => ({
    ...toCategory(data.categoryList?.[0] ?? {}),
    products: (data.products?.items ?? []).map(toProduct),
    productsTotal: Number(data.total_count) || 0,
  }),
})

export const fetchCategoriesByParentId = createRepository({
  fetcher: (name, parentIdFactory) =>
    useQuery(name, () => [
      categoryListQuery,
      {
        ids: parentIdFactory(),
      },
    ]),
  mapper: (data) => ({
    list: (data.categoryList?.[0]?.children ?? []).map(toCategory),
  }),
})
