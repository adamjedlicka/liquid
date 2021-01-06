import { createContext, createEffect, createSignal, createState, useContext, useTransition } from 'solid-js'
import { isServer } from 'solid-js/web'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { queryStringToObject } from '../utils/UrlUtils'
import { useServerContext } from './ServerContext'
import { clearState } from '../utils/SolidUtils'

const RouterContext = createContext()

export const useRouter = () => {
  return useContext(RouterContext)
}

export const Router = (props) => {
  const [pending, start] = useTransition()
  const ctx = useServerContext()

  const url = (ctx.url || window.location.pathname + (window.location.search || '') || '/').split('?')

  const [path, _setPath] = createSignal(url[0])
  const [query, _setQuery] = createState(queryStringToObject(url[1]))

  createEffect(() => {
    if (pending()) {
      Nprogress.start()
    } else {
      Nprogress.done()

      window.scrollTo(0, 0)
    }
  })

  const setPath = (value) => start(() => (_setPath(value), _setQuery(clearState(query))))

  const setQuery = (value) => start(() => _setQuery(value))

  if (!isServer) {
    window.onpopstate = () => setPath(window.location.pathname)
  }

  return (
    <RouterContext.Provider value={{ path, setPath, query, setQuery, pending }}>
      {props.children}
    </RouterContext.Provider>
  )
}

export const Link = (props) => {
  const { path, setPath, setQuery } = useContext(RouterContext)

  const navigate = (e) => {
    if (e) e.preventDefault()

    if (props.to.startsWith('?')) {
      window.history.pushState('', '', path() + props.to)
      setQuery(queryStringToObject(props.to.slice(1)))
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
