import { For, Show } from 'solid-js'
import { Link } from 'liquid-js'
import { fetchProductByUrlKey } from '../repositories/ProductRepository'
import LazyImage from '../components/LazyImage'
import AddToCart from '../components/AddToCart'

export default (props) => {
  const product = fetchProductByUrlKey('productDetail', () => props.url)

  return (
    <section class="text-gray-700 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <LazyImage
            alt="ecommerce"
            class="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
            src={product.thumbnail}
            w="500"
            h="600"
            fit="contain"
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              <For each={product.categories}>
                {(category, i) => (
                  <>
                    <Show when={i() > 0}>, </Show>
                    <Link to={category.urlPath}>{category.name}</Link>
                  </>
                )}
              </For>
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
            <div class="leading-relaxed" innerHTML={product.description} />
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">$58.00</span>
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
