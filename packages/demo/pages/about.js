import { useApp } from 'liquid-js'
import WideLayout from '../layouts/WideLayout'

export default () => {
  const { setLayout } = useApp()
  setLayout(WideLayout)

  return <h1>About</h1>
}
