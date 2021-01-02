import { createMemo, For } from 'solid-js'
import { useRouter, Head } from 'liquid-js'
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
      <Head>
        <title>{category.category.name}</title>
      </Head>

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
