import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js'

const observe = (el, onObserved) => {
  if (typeof IntersectionObserver === 'undefined') return

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting === false) continue

      onObserved(entry)

      observer.unobserve(entry.target)
    }
  })

  createEffect(() => observer.observe(el()))

  onCleanup(() => observer.disconnect())
}

const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

export default (props) => {
  const [visible, setVisible] = createSignal(false)

  let img

  observe(
    () => img,
    () => setVisible(true)
  )

  const src = createMemo(() => {
    if (!visible()) return placeholder

    return `/image?path=${props.src}&w=${props.w || 0}&h=${props.h || 0}&fit=${props.fit || 'cover'}`
  })

  return <img ref={img} alt={props.alt} class={props.class} src={src()} />
}
