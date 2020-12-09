import { createEffect, createSignal, onCleanup } from 'solid-js'

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

  return <img ref={img} alt={props.alt} class={props.class} src={visible() ? props.src : placeholder} />
}
