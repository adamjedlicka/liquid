import { useRouter } from 'liquid-js'
import { createComputed, createResource, lazy, Switch, Match } from 'solid-js'
import { resolveUrl } from '../GraphQL'

const Category = lazy(() => import('../dynamicPages/Category'))
const Product = lazy(() => import('../dynamicPages/Product'))

export default () => {
  const { location } = useRouter()
  const [urlResolver, loadUrlResolver] = createResource({}, { name: 'urlResolver' })

  createComputed(() => {
    const _location = location()
    loadUrlResolver(() => resolveUrl(_location + '.html'))
  })

  return (
    <Switch>
      <Match when={urlResolver()?.type === 'CATEGORY'}>
        <Category id={urlResolver()?.id} />
      </Match>
      <Match when={urlResolver()?.type === 'PRODUCT'}>
        <Product id={urlResolver()?.id} />
      </Match>
    </Switch>
  )
}
