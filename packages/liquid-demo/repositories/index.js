import { createComputed, createResource } from 'solid-js'

export const useRepository = (name, repository, args = []) => {
  const [resource, loadResource] = createResource(undefined, { name })

  createComputed(() => {
    // Register the arguments
    for (const arg of args) arg()

    loadResource(repository)
  })

  return resource
}
