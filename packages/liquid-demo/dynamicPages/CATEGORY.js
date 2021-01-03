import { createMemo, createSignal, For, Show } from 'solid-js'
import { useRouter } from 'liquid-js'
import { fetchCategoryById } from '../repositories/CategoryRepository'
import Tile from '../components/product/Tile'
import Pagination from '../components/Pagination'
import { Portal } from 'solid-js/web'

export default (props) => {
  const { query } = useRouter()

  const category = fetchCategoryById('categoryDetail', () => props.id, {
    pageFactory: () => query.page,
  })

  const pages = createMemo(() => Math.ceil(category.productsTotal / 20))

  const [show, setShow] = createSignal(false)

  return (
    <>
      <Show when={show()}>
        <div>Is visible</div>
        <Portal mount={document.head}>
          <title>Hello, World!</title>
        </Portal>
      </Show>

      <button onClick={() => setShow(!show())}>Click me!</button>

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
