import { query } from '../GraphQL'
import categoryListQuery from '../gql/queries/categoryList.gql'
import categoryDetailQuery from '../gql/queries/categoryDetail.gql'

export const getCategoriesByParentId = async (parentId) => {
  const { categoryList } = await query(categoryListQuery, { ids: parentId })

  return categoryList[0].children
}

export const getCategoryDetailById = async (categoryId) => {
  const { categoryList, products } = await query(categoryDetailQuery, { id: categoryId })

  return {
    category: categoryList[0],
    products: products.items,
  }
}
