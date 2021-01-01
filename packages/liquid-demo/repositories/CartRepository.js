import { mutate } from '../GraphQL'
import createEmtyCartMutation from '../gql/mutations/createEmptyCart.gql'
import addSimpleProductsToCartMutation from '../gql/mutations/addSimpleProductsToCart.gql'

export const createEmptyCart = async () => {
  const response = await mutate(createEmtyCartMutation)

  return response.createEmptyCart
}

export const addSimpleProductToCart = async (cartId, sku, quantity = 1) => {
  const response = await mutate(addSimpleProductsToCartMutation, { cartId, sku, quantity })

  return response.addSimpleProductsToCart.cart.items
}
