import { toProduct } from './ProductMapper'

export const toCategory = (data = {}) => ({
  name: data.name ?? '',
  urlPath: '/' + (data.url_path ?? ''),
  products: (data.products ?? []).map(toProduct),
})
