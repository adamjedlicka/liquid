import { CartContextProvider } from '../contexts/CartContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default (props) => {
  return (
    <CartContextProvider>
      <div class="flex flex-col min-h-screen">
        <Header />
        <main class="flex-1">{props.children}</main>
        <Footer />
      </div>
    </CartContextProvider>
  )
}
