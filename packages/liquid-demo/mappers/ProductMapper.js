import { toCategory } from './CategoryMapper'

export const toProduct = (data) => ({
  name: data.name ?? '',
  urlPath: '/' + (data.url_key ?? ''),
  thumbnail: data.thumbnail?.url ?? '',
  description: data.description?.html ?? '',
  finalPrice: data.price_range?.minimum_price?.final_price?.value ?? 0,
  categories: (data.categories ?? []).map(toCategory),
})