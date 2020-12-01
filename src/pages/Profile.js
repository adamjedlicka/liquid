import { createResource } from 'solid-js'

export default () => {
  const [user, loadUser] = createResource({}, { name: 'user' })

  loadUser(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    return await response.json()
  })

  return <h2>{user().name}</h2>
}
