import { createSignal } from 'solid-js'
import { useCart } from '../contexts/CartContext'

export default (props) => {
  const { addItem } = useCart()
  const [loading, setLoading] = createSignal(false)

  const onClick = async () => {
    setLoading(true)
    await addItem(props.product)
    setLoading(false)
  }

  return (
    <button
      onClick={onClick}
      class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
      disabled={loading()}
    >
      Add to cart
    </button>
  )
}
