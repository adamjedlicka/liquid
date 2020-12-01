import { createSignal } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(0)

  const increment = () => {
    setCount(count() + 1)
  }

  return (
    <>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Click me!</button>
    </>
  )
}
