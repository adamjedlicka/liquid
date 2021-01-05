import { createMemo, For } from 'solid-js'
import { Title, Meta } from 'solid-meta'
import { fetchCategoryById } from '../repositories/CategoryRepository'
import Tile from '../components/product/Tile'
import Pagination from '../components/Pagination'

export default (props) => {
  const category = fetchCategoryById('categoryDetail', () => props.id)

  const pages = createMemo(() => Math.ceil(category.productsTotal / 20))

  return (
    <>
      <Title>{category.name}</Title>
      <Meta name="description" content="Category description" />

      <section class="text-gray-700 body-font">
        <div class="container px-5 py-5 mx-auto">
          <h2 class="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">{category.name}</h2>
          <hr class="py-2" />
          <div class="flex flex-wrap -m-4">
            <For each={category.products}>{(product) => <Tile product={product} />}</For>
          </div>

          <Pagination pages={pages()} />
        </div>
      </section>
    </>
  )
}
