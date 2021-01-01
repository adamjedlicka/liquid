import { useCart } from '../contexts/CartContext'

export default (props) => {
  const { addItem } = useCart()

  const onClick = async () => {
    await addItem(props.product)
  }

  return (
    <button
      onClick={onClick}
      class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
    >
      Add to cart
    </button>
  )
}
