import { createResource } from 'solid-js'

export default () => {
  const [name, loadName] = createResource('', { name: 'user' })

  loadName(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const json = await response.json()
    return json.name
  })

  return <pre>{name()}</pre>
}
