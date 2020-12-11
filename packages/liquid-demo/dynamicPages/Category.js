import { createEffect, createResource, For } from 'solid-js'
import { getCategoryDetailById } from '../repositories/CategoryRepository'
import Tile from '../components/product/Tile'
import { isServer } from 'solid-js/web'

export default (props) => {
  const [categoryDetail, loadCategoryDetail] = createResource({}, { name: 'categoryDetail' })

  if (isServer) {
    loadCategoryDetail(() => getCategoryDetailById(props.id))
  } else {
    createEffect(() => {
      loadCategoryDetail(() => getCategoryDetailById(props.id))
    })
  }

  return (
    <section class="text-gray-700 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          <For each={categoryDetail().products}>{(product) => <Tile product={product} />}</For>
        </div>
      </div>
    </section>
  )
}