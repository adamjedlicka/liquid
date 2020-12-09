import { Link } from 'liquid-js'

export default (props) => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
      <main>{props.children}</main>
    </>
  )
}
