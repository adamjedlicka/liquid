import { createContext, useContext } from 'solid-js'

export const AppContext = createContext()

export const useApp = () => {
  return useContext(AppContext)
}
