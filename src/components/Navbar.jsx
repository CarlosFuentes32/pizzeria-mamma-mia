import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.js'

const Navbar = () => {
  const { total } = useCart()
  const token = false

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar__content">
        <span className="navbar__brand">Pizzería Mamma Mia!</span>

        <div className="navbar__links">
          <Link className="button button--nav" to="/">
            🍕 Home
          </Link>

          {token ? (
            <>
              <Link className="button button--nav" to="/profile">🔓 Profile</Link>
              <button type="button" className="button button--nav">🔒 Logout</button>
            </>
          ) : (
            <>
              <Link className="button button--nav" to="/login">
                🔐 Login
              </Link>
              <Link className="button button--nav" to="/register">
                🔐 Register
              </Link>
            </>
          )}

          <Link className="button button--total" to="/cart">
            🛒 Total: ${total.toLocaleString('es-CL')}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
