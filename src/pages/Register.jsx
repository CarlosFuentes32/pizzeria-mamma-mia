import { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Todos los campos son obligatorios.' })
      return
    }

    if (password.length < 6) {
      setMessage({
        type: 'error',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      })
      return
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' })
      return
    }

    setMessage({ type: 'success', text: '¡Registro exitoso!' })
  }

  return (
    <main className="form-page">
      <section className="form-card" aria-labelledby="register-title">
        <h1 id="register-title">Crea tu cuenta</h1>
        <p className="form-card__intro">Regístrate para disfrutar las mejores pizzas.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="register-password">Contraseña</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="form-field">
            <label htmlFor="register-confirm-password">Confirmar contraseña</label>
            <input
              id="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="button button--submit">Registrarme</button>
        </form>

        {message.text && (
          <p className={`form-message form-message--${message.type}`} role="status" aria-live="polite">
            {message.text}
          </p>
        )}
      </section>
    </main>
  )
}

export default Register
