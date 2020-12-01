import { createResource } from 'solid-js'

export default () => {
  const [user, loadUser] = createResource({}, { name: 'user' })

  loadUser(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const json = await response.json()
    return json
  })

  return <h2>{user().name}</h2>
}
