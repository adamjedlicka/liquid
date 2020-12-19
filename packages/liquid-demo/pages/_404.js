import { useRouter } from 'liquid-js'
import { createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { resolveUrl } from '../GraphQL'
import { useRepository } from '../repositories'

// TODO: Improve import path
import { dynamicPages } from '../../../dist/DynamicPages'

export default () => {
  const { location } = useRouter()
  const urlResolver = useRepository('urlResolver', () => resolveUrl(location()), [location])

  const component = createMemo(() => dynamicPages[urlResolver()?.type])

  return <Dynamic component={component()} id={urlResolver()?.id} url={urlResolver()?.url} />
}
