import { hydrate } from 'solid-js/web'
import App from './App.js'

const ctx = {
  onError: (err) => console.error(err),
}

hydrate(() => <App ctx={ctx} />, document.getElementById('app'))
