import { query } from '../GraphQL'
import categoryListQuery from '../gql/queries/categoryList.gql'
import categoryDetailQuery from '../gql/queries/categoryDetail.gql'
import { createRepository } from './Repository'
import { toCategory } from '../mappers/CategoryMapper'
import { toProduct } from '../mappers/ProductMapper'

export const fetchCategoryById = (name, idFactory, { pageFactory } = {}) =>
  createRepository({
    name,
    args: [idFactory, pageFactory],
    fetcher: async (id, page = 1) => {
      const { categoryList, products } = await query(categoryDetailQuery, { id, page })

      return {
        category: categoryList[0],
        products: products.items,
        productsTotal: products.total_count,
      }
    },
    mapper: (data) => ({
      category: toCategory(data.category ?? {}),
      products: (data.products ?? []).map(toProduct),
      productsTotal: Number(data.productsTotal) || 0,
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
