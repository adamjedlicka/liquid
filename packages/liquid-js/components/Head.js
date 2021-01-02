import { isServer, Portal } from 'solid-js/web'
import { useServerContext } from '../core/ServerContext'

export default (props) => {
  if (isServer) {
    const ctx = useServerContext()

    ctx.head = <>{props.children}</>
  } else {
    document.querySelectorAll('head>[data-hk]').forEach((node) => node.remove())

    return <Portal mount={document.head}>{props.children}</Portal>
  }
}
