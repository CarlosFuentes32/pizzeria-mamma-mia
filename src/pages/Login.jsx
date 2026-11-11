import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittingRef = useRef(false)
  const navigate = useNavigate()
  const { login } = useUser()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submittingRef.current) return
    setMessage({ type: '', text: '' })

    if (!email.trim() || !password) {
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

    submittingRef.current = true
    setIsSubmitting(true)

    try {
      await login({ email: email.trim(), password })
      navigate('/', { replace: true })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <main className="form-page">
      <section className="form-card" aria-labelledby="login-title">
        <h1 id="login-title">Inicia sesión</h1>
        <p className="form-card__intro">Ingresa tus datos para continuar.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="button button--submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
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

export default Login
