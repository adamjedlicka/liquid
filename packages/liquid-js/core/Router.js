import { createContext, createSignal, Match, Suspense, useContext } from 'solid-js'
import { isServer } from 'solid-js/web'

const RouterContext = createContext()

export const Router = (props) => {
  const [location, setLocation] = createSignal(props.url || window.location.pathname || '/')

  if (!isServer) {
    window.onpopstate = () => setLocation(window.location.pathname)
  }

  return <RouterContext.Provider value={{ location, setLocation }}>{props.children}</RouterContext.Provider>
}

export const Routes = (props) => {
  return (
    <Suspense>
      <Switch>{props.children}</Switch>
    </Suspense>
  )
}

export const Route = (props) => {
  const { location } = useContext(RouterContext)

  return <Match when={props.path.test(location())}>{props.children}</Match>
}

export const Link = (props) => {
  const { setLocation } = useContext(RouterContext)

  const navigate = (e) => {
    if (e) e.preventDefault()
    window.history.pushState('', '', props.to)
    setLocation(props.to)
  }

  return (
    <a href={props.to} onClick={navigate}>
      {props.children}
    </a>
  )
}