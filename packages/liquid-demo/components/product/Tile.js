import { Link } from 'liquid-js'
import LazyImage from '../LazyImage'

export default (props) => {
  return (
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link to={'/' + props.product.url_key} class="block relative h-48 rounded overflow-hidden">
        <LazyImage
          alt="ecommerce"
          class="object-cover object-center w-full h-full block"
          src={props.product.thumbnail.url}
        />
      </Link>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          {props.product.categories.map((category) => (
            <Link to={`/${category.url_path}`} class="mr-1">
              {category.name}
            </Link>
          ))}
        </h3>
        <h2 class="text-gray-900 title-font text-lg font-medium">{props.product.name}</h2>
        <p class="mt-1">${props.product.price_range.minimum_price.final_price.value}</p>
      </div>
    </div>
  )
}
