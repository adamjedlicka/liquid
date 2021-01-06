import { useQuery } from '../GraphQL'
import categoryListQuery from '../gql/queries/categoryList.gql'
import categoryDetailQuery from '../gql/queries/categoryDetail.gql'
import { toCategory } from '../mappers/CategoryMapper'
import { toProduct } from '../mappers/ProductMapper'
import { createRepository } from './Repository'

export const fetchCategoryDetail = createRepository({
  fetcher: (name, optsFactory) => useQuery(name, categoryDetailQuery, optsFactory),
  mapper: (data) => ({
    ...toCategory(data.categoryList?.[0] ?? {}),
    products: (data.products?.items ?? []).map(toProduct),
    productsTotal: Number(data.products?.total_count) || 0,
  }),
})

export const fetchCategoriesByParentId = createRepository({
  fetcher: (name, parentIdFactory) =>
    useQuery(name, categoryListQuery, () => ({
      ids: parentIdFactory(),
    })),
  mapper: (data) => ({
    list: (data.categoryList?.[0]?.children ?? []).map(toCategory),
  }),
})
