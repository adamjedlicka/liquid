import { createContext, createResource, useContext } from 'solid-js'

const LayoutContext = createContext()

export const Provider = (props) => {
  const [layout, loadLayout] = createResource(undefined, { name: 'liquid-layout' })

  const setLayout = (_layout) => {
    if (layout() === _layout) return

    loadLayout(() => _layout)
  }

  return <LayoutContext.Provider value={{ layout, setLayout }}>{props.children}</LayoutContext.Provider>
}

export const useLayout = () => useContext(LayoutContext)
