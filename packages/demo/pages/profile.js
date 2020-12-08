import { useLayout } from 'liquid-js'

export default () => {
  const { setLayout } = useLayout()

  setLayout('default')

  return <h1>Profile</h1>
}
