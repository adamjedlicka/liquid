import { createEffect, createResource } from 'solid-js'
import { isServer } from 'solid-js/web'

export const useRepository = (name, repository) => {
  const [resource, loadResource] = createResource(undefined, { name })

  if (isServer) {
    loadResource(repository)
  } else {
    createEffect(() => loadResource(repository))
  }

  return resource
}
