import { For } from 'solid-js'
import { fetchCategoryById } from '../repositories/CategoryRepository'
import Tile from '../components/product/Tile'

export default (props) => {
  const category = fetchCategoryById('categoryDetail', () => props.id)

  return (
    <section class="text-gray-700 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          <For each={category.products}>{(product) => <Tile product={product} />}</For>
        </div>
      </div>
    </section>
  )
}
