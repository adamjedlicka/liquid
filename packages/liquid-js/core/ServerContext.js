import { createContext, useContext } from 'solid-js'

const ServerContext = createContext()

export const useServerContext = () => useContext(ServerContext)

export const ServerContextProvider = (props) => {
  return <ServerContext.Provider value={props.ctx}>{props.children}</ServerContext.Provider>
}
