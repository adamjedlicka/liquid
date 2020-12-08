import { Link } from 'liquid-js'

export default (props) => {
  console.log('layuts/default')

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
      {props.children}
    </>
  )
}
