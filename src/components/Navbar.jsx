const Navbar = ({ onNavigate, currentView }) => {
  const total = 25000
  const token = false

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar__content">
        <span className="navbar__brand">Pizzería Mamma Mia!</span>

        <div className="navbar__links">
          <button
            type="button"
            className={`button button--nav ${currentView === 'home' ? 'button--active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            🍕 Home
          </button>

          {token ? (
            <>
              <button type="button" className="button button--nav">🔓 Profile</button>
              <button type="button" className="button button--nav">🔒 Logout</button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={`button button--nav ${currentView === 'login' ? 'button--active' : ''}`}
                onClick={() => onNavigate('login')}
              >
                🔐 Login
              </button>
              <button
                type="button"
                className={`button button--nav ${currentView === 'register' ? 'button--active' : ''}`}
                onClick={() => onNavigate('register')}
              >
                🔐 Register
              </button>
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
