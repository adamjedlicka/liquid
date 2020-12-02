import { onError } from 'solid-js'
import { Router } from 'liquid-js'

export default (props) => {
  onError(props.ctx.onError)

  return (
    <Router url={props.ctx.url}>
      <h1>Hello, World!</h1>
    </Router>
  )
}
