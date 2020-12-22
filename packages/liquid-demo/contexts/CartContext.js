import { createContext, createState, useContext } from 'solid-js'

const CartContext = createContext()

export const CartContextProvider = (props) => {
  console.log('CartContextProvider')

  const [state] = createState({
    items: [],
  })

  const addItem = (product) => {
    console.log(product)
  }

  return <CartContext.Provider value={{ state, addItem }}>{props.children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
