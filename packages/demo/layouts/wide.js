import { Link } from 'liquid-js'

export default (props) => {
  console.log('layuts/wide')

  return (
    <>
      <Link to="/">Home</Link>
      {props.children}
    </>
  )
}
