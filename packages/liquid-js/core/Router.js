import { createContext, createSignal, useContext, Match } from 'solid-js'
import { isServer } from 'solid-js/web'

const RouterContext = createContext()

export const useRouter = () => {
  const { location, setLocation } = useContext(RouterContext)

  return {
    location,
    setLocation,
  }
}

export const Router = (props) => {
  const [location, setLocation] = createSignal(props.url || window.location.pathname || '/')

  if (!isServer) {
    window.onpopstate = () => setLocation(window.location.pathname)
  }

  return <RouterContext.Provider value={{ location, setLocation }}>{props.children}</RouterContext.Provider>
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
    <a href={props.to} class={props.class} onClick={navigate}>
      {props.children}
    </a>
  )
}
