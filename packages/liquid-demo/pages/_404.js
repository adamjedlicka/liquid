import { useRouter, Link } from 'liquid-js'
import { createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { dynamicPages } from 'build/DynamicPages'
import { fetchUrlResolver } from '../repositories/Repository'

export default () => {
  const { path } = useRouter()

  const urlResolver = fetchUrlResolver(path)

  const component = createMemo(() => dynamicPages[urlResolver.type] ?? NotFound)

  return <Dynamic component={component()} id={urlResolver.id} url={urlResolver.url} />
}

const NotFound = () => {
  return (
    <section class="text-gray-700 body-font">
      <div class="container flex flex-wrap px-5 py-24 mx-auto items-center">
        <div class="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-300">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">404 - Page not found</h1>
          <p class="leading-relaxed text-base">
            Locavore cardigan small batch roof party blue bottle blog meggings sartorial jean shorts kickstarter migas
            sriracha church-key synth succulents. Actually taiyaki neutra, distillery gastropub pok pok ugh.
          </p>
          <Link to="/" class="text-indigo-500 inline-flex items-center mt-4">
            Go to homepage
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div class="flex flex-col md:w-1/2 md:pl-12">
          <h2 class="title-font font-medium text-gray-800 tracking-widest text-sm mb-3">CATEGORIES</h2>
          <nav class="flex flex-wrap list-none -mb-1">
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">First Link</a>
            </li>
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">Second Link</a>
            </li>
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">Third Link</a>
            </li>
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
            </li>
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">Fifth Link</a>
            </li>
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">Sixth Link</a>
            </li>
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">Seventh Link</a>
            </li>
            <li class="lg:w-1/3 mb-1 w-1/2">
              <a class="text-gray-600 hover:text-gray-800">Eighth Link</a>
            </li>
          </nav>
        </div>
      </div>
    </section>
  )
}
