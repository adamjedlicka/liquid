import { For } from 'solid-js'
import { fetchCategoriesByParentId } from '../repositories/CategoryRepository'
import Link from './Link'

export default () => {
  const categories = fetchCategoriesByParentId('headerCategories', () => 2)

  return (
    <header class="text-gray-700 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <span class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <Link to="/" class="ml-3 text-xl">
            LiquidJS
          </Link>
        </span>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <For each={categories.list}>
            {(category) => (
              <Link to={category.urlPath} class="mr-5 cursor-pointer hover:text-gray-900">
                {category.name}
              </Link>
            )}
          </For>
        </nav>
        <Link
          to="/cart"
          class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
        >
          Cart
        </Link>
      </div>
    </header>
  )
}
