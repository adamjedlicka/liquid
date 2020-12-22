import { query } from '../GraphQL'
import categoryListQuery from '../gql/queries/categoryList.gql'
import categoryDetailQuery from '../gql/queries/categoryDetail.gql'
import { createRepository } from './Repository'
import { toCategory } from '../mappers/CategoryMapper'
import { toProduct } from '../mappers/ProductMapper'

export const fetchCategoryById = (name, idFactory) =>
  createRepository({
    name,
    args: [idFactory],
    fetcher: async (id) => {
      const { categoryList, products } = await query(categoryDetailQuery, { id })

      return {
        category: categoryList[0],
        products: products.items,
      }
    },
    mapper: (data) => ({
      category: toCategory(data.category ?? {}),
      products: (data.products ?? []).map(toProduct),
    }),
  })

export const fetchCategoriesByParentId = (name, parentIdFactory) =>
  createRepository({
    name,
    args: [parentIdFactory],
    fetcher: async (parentId) => {
      const { categoryList } = await query(categoryListQuery, { ids: parentId })

      return {
        list: categoryList[0].children,
      }
    },
    mapper: (data) => ({
      list: (data.list ?? []).map(toCategory),
    }),
  })
