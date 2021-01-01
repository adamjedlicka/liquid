import { createContext, createState, useContext } from 'solid-js'
import { createEmptyCart, addSimpleProductToCart } from '../repositories/CartRepository'

const CartContext = createContext()

export const CartContextProvider = (props) => {
  const [state, setState] = createState({
    cartId: null,
    items: [],
  })

  const addItem = async (product) => {
    if (!state.cartId) {
      const cartId = await createEmptyCart()

      setState('cartId', cartId)
    }

    const items = await addSimpleProductToCart(state.cartId, product.sku)

    setState('items', items)
  }

  return <CartContext.Provider value={{ state, addItem }}>{props.children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
