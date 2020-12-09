import { useLayout } from 'liquid-js'

export default () => {
  const { setLayout } = useLayout()

  setLayout('wide')

  return (
    <>
      <h1>About</h1>
      <p class="text">This is some about page.</p>
    </>
  )
}
