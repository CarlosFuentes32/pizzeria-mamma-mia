const Navbar = () => {
  const total = 25000
  const token = false

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar__content">
        <span className="navbar__brand">Pizzería Mamma Mia!</span>

        <div className="navbar__links">
          <button type="button" className="button button--nav">🍕 Home</button>

          {token ? (
            <>
              <button type="button" className="button button--nav">🔓 Profile</button>
              <button type="button" className="button button--nav">🔒 Logout</button>
            </>
          ) : (
            <>
              <button type="button" className="button button--nav">🔐 Login</button>
              <button type="button" className="button button--nav">🔐 Register</button>
            </>
          )}

          <button type="button" className="button button--total">
            🛒 Total: ${total.toLocaleString('es-CL')}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
