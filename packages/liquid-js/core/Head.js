import { createContext, createEffect, createState, onCleanup, Show, splitProps, useContext } from 'solid-js'
import { Dynamic, Portal } from 'solid-js/web'

const HeadContext = createContext()

const cascadingTags = ['title', 'meta']

export const HeadProvider = (props) => {
  const indices = new Map()
  const [state, setState] = createState({})

  const ctx = {
    addClientTag: (tag, name) => {
      console.log('addClientTag')

      if (cascadingTags.includes(tag)) {
        setState((state) => {
          const names = state[tag] || []
          return { [tag]: [...names, name] }
        })

        const index = indices.has(tag) ? indices.get(tag) + 1 : 0
        indices.set(tag, index)

        return index
      } else {
        return -1
      }
    },

    removeClientTag: (tag, index) => {
      console.log('removeClientTag')

      setState((state) => {
        const names = state[tag]
        if (names) {
          names[index] = null
          return { [tag]: names }
        } else {
          return null
        }
      })
    },

    shouldRenderTag: (tag, index) => {
      if (cascadingTags.includes(tag)) {
        const names = state[tag]
        // check if the tag is the last one of similar
        return names && names.lastIndexOf(names[index]) === index
      } else {
        return true
      }
    },
  }

  return <HeadContext.Provider value={ctx}>{props.children}</HeadContext.Provider>
}

const HeadTag = (props) => {
  const { addClientTag, removeClientTag, shouldRenderTag } = useContext(HeadContext)

  let index

  createEffect(() => {
    index = addClientTag(props.tag, props.name || props.property)
    onCleanup(() => removeClientTag(props.tag, index))
  })

  const [internal, rest] = splitProps(props, ['tag'])

  return (
    <Show when={shouldRenderTag(internal.tag, index)}>
      <div>{internal.tag}</div>
      <Portal mount={document.head}>
        <Dynamic component={internal.tag} {...rest} />
      </Portal>
    </Show>
  )
}

export const Title = (props) => <HeadTag tag="title" {...props} />
