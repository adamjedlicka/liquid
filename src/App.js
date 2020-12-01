import { lazy, onError } from 'solid-js'
import { isServer } from 'solid-js/web'
import { Router, Route, Link, Routes } from './router.js'

const Home = lazy(() => import('./pages/Home.js'))
const About = lazy(() => import('./pages/About.js'))
const Profile = lazy(() => import('./pages/Profile.js'))

export default (props) => {
  if (isServer) {
    onError((error) => {
      props.ctx.error = error
    })
  }

  return (
    <Router url={props.ctx.url}>
      <Link path="/">Home</Link>
      <Link path="/about">About</Link>
      <Link path="/profile">Profile</Link>

      <Routes>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Routes>
    </Router>
  )
}
