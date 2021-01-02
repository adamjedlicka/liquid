import { createMemo, For } from 'solid-js'
import Link from './Link'

export default (props) => {
  const pages = createMemo(() => Array.from({ length: props.pages }, (_, i) => i + 1))

  return (
    <nav class="relative inline-flex shadow-sm -space-x-px mt-8" aria-label="Pagination">
      <For each={pages()}>
        {(page) => (
          <Link
            to={`?page=${page}`}
            class="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {page}
          </Link>
        )}
      </For>
    </nav>
  )
}
