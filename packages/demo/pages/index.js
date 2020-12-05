import { useApp } from 'liquid-js'
import DefaultLayout from '../layouts/DefaultLayout'

export default () => {
  const { setLayout } = useApp()

  setLayout(DefaultLayout)

  return <h1>Home</h1>
}
