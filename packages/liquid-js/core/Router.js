import { createContext, createSignal, createState, useContext } from 'solid-js'
import { isServer } from 'solid-js/web'
import { queryStringToObject } from '../utils/UrlUtils'

const RouterContext = createContext()

export const useRouter = () => {
  return useContext(RouterContext)
}

export const Router = (props) => {
  const url = (props.url || window.location.pathname + (window.location.search || '') || '/').split('?')

  const [path, setPath] = createSignal(url[0])
  const [query, setQuery] = createState(queryStringToObject(url[1]))

  if (!isServer) {
    window.onpopstate = () => setPath(window.location.pathname)
  }

  return <RouterContext.Provider value={{ path, setPath, query, setQuery }}>{props.children}</RouterContext.Provider>
}

export const Link = (props) => {
  const { path, setPath, setQuery } = useContext(RouterContext)

  const navigate = (e) => {
    if (e) e.preventDefault()

    if (props.to.startsWith('?')) {
      setQuery(queryStringToObject(props.to.slice(1)))
      window.history.pushState('', '', path() + props.to)
    } else {
      window.history.pushState('', '', props.to)
      setPath(props.to)
    }
  }

  return (
    <a href={props.to} class={props.class} onClick={navigate}>
      {props.children}
    </a>
  )
}
