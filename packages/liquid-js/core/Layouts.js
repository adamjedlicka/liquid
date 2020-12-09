import { createContext, createResource, untrack, useContext } from 'solid-js'

const LayoutContext = createContext()

export const Provider = (props) => {
  const [layout, loadLayout] = createResource('default', { name: 'liquid-layout' })

  const setLayout = (_layout) => {
    if (untrack(() => layout()) === _layout) return

    loadLayout(() => new Promise((resolve) => resolve(_layout)))
  }

  return <LayoutContext.Provider value={{ layout, setLayout }}>{props.children}</LayoutContext.Provider>
}

export const useLayout = () => useContext(LayoutContext)
