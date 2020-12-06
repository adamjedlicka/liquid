import { useApp } from 'liquid-js'
import { createResource } from 'solid-js'
import WideLayout from '../layouts/WideLayout'

export default () => {
  const { setLayout } = useApp()

  setLayout(WideLayout)

  const [data, loadData] = createResource(undefined, { name: 'myData' })

  loadData(() => new Promise((resolve) => setTimeout(() => (console.log('data'), resolve('Hello, World!')), 1000)))

  return <h1>{data()}</h1>
}
