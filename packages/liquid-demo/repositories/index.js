import { createEffect, createResource } from 'solid-js'
import { isServer } from 'solid-js/web'

export const useRepository = (name, repository, args = []) => {
  const [resource, loadResource] = createResource(undefined, { name })

  if (isServer) {
    loadResource(repository)
  } else {
    createEffect(() => {
      for (const arg of args) arg()

      loadResource(repository)
    })
  }

  return resource
}
