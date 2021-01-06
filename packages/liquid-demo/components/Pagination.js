import { useRouter } from 'liquid-js'
import { createMemo, For, Show } from 'solid-js'
import Link from './Link'

export default (props) => {
  const { path } = useRouter()

  const pages = createMemo(() => Array.from({ length: props.pages }, (_, i) => i + 1))

  return (
    <Show when={props.pages > 1}>
      <nav class="relative inline-flex shadow-sm -space-x-px mt-8" aria-label="Pagination">
        <For each={pages()}>
          {(page) => (
            <Link
              to={page === 1 ? path() : `?page=${page}`}
              class="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {page}
            </Link>
          )}
        </For>
      </nav>
    </Show>
  )
}
