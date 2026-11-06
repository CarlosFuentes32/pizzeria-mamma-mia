import Navbar from './components/Navbar.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="app">
      <Navbar currentView="cart" />
      <Cart />
      <Footer />
    </div>
  )
}

export default App
