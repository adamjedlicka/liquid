import { createContext, createMemo, useContext } from 'solid-js'
import { Dynamic } from 'solid-js/web'

export const AppContext = createContext()

export const useApp = () => {
  return useContext(AppContext)
}

export const Layout = (props) => {
  const { layout } = useApp()

  const children = createMemo(() => props.children)

  return <Dynamic component={layout()}>{children}</Dynamic>
}
