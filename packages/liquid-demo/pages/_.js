import { useRouter } from 'liquid-js'
import { lazy, Switch, Match } from 'solid-js'
import { resolveUrl } from '../GraphQL'
import { useRepository } from '../repositories'

const Category = lazy(() => import('../dynamicPages/Category'))
const Product = lazy(() => import('../dynamicPages/Product'))

export default () => {
  const { location } = useRouter()
  const urlResolver = useRepository('urlResolver', () => resolveUrl(location()))

  return (
    <Switch>
      <Match when={urlResolver()?.type === 'CATEGORY'}>
        <Category id={urlResolver()?.id} url={urlResolver()?.url} />
      </Match>
      <Match when={urlResolver()?.type === 'PRODUCT'}>
        <Product id={urlResolver()?.id} url={urlResolver()?.url} />
      </Match>
    </Switch>
  )
}
