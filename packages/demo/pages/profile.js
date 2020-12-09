import { useLayout } from 'liquid-js'
import { createResource } from 'solid-js'

export default () => {
  const { setLayout } = useLayout()

  setLayout('default')

  const [user, loadUser] = createResource({}, { name: 'my-resource' })

  loadUser(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    return await response.json()
  })

  return (
    <>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user(), null, '  ')}</pre>
    </>
  )
}
