import { Link } from 'liquid-js'

export default (props) => {
  return (
    <>
      <Link to="/">Home</Link>
      {props.children}
    </>
  )
}
