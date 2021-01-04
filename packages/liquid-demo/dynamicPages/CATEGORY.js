import { createMemo, For } from 'solid-js'
import { Title, Meta } from 'solid-meta'
import { useRouter } from 'liquid-js'
import { fetchCategoryById } from '../repositories/CategoryRepository'
import Tile from '../components/product/Tile'
import Pagination from '../components/Pagination'

export default (props) => {
  const { query } = useRouter()

  const category = fetchCategoryById('categoryDetail', () => props.id, {
    pageFactory: () => query.page,
  })

  const pages = createMemo(() => Math.ceil(category.productsTotal / 20))

  return (
    <>
      <Title>{category.category.name}</Title>
      <Meta name="description" content="Category description" />

      <section class="text-gray-700 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <For each={category.products}>{(product) => <Tile product={product} />}</For>
          </div>

          <Pagination pages={pages()} />
        </div>
      </section>
    </>
  )
}
