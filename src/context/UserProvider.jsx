import { useCallback, useRef, useState } from 'react'
import { UserContext } from './UserContext.js'
import { API_URL } from '../config/api.js'

const ERROR_MESSAGES = {
  'Email and password are required': 'El correo y la contraseña son obligatorios.',
  'Invalid email': 'El correo no tiene un formato válido.',
  'Password must be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
  'User not found': 'No existe una cuenta con ese correo.',
  'Invalid password': 'La contraseña es incorrecta.',
  'User already exists': 'Ya existe una cuenta con ese correo.',
  'No token provided': 'Debes iniciar sesión para continuar.',
  'Invalid token': 'Tu sesión no es válida o ha vencido.',
  'Server error': 'El servidor no pudo completar la solicitud.',
}

const readResponse = async (response) => {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(
      ERROR_MESSAGES[data.error] || data.error || 'No se pudo completar la solicitud.',
    )
    error.status = response.status
    throw error
  }

  return data
}

const UserProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const sessionVersion = useRef(0)

  const clearSession = useCallback(() => {
    sessionVersion.current += 1
    setToken('')
    setEmail('')
  }, [])

  const authenticate = useCallback(async (path, credentials) => {
    clearSession()
    let response

    try {
      response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
    } catch {
      throw new Error('No se pudo conectar con el servidor. Inténtalo nuevamente.')
    }

    const data = await readResponse(response)

    if (typeof data.token !== 'string' || !data.token || typeof data.email !== 'string') {
      throw new Error('El servidor devolvió una respuesta de autenticación incompleta.')
    }

    sessionVersion.current += 1
    setToken(data.token)
    setEmail(data.email)
    return data
  }, [clearSession])

  const login = useCallback(
    (credentials) => authenticate('/api/auth/login', credentials),
    [authenticate],
  )

  const register = useCallback(
    (credentials) => authenticate('/api/auth/register', credentials),
    [authenticate],
  )

  const logout = clearSession

  const getProfile = useCallback(async () => {
    if (!token) {
      const error = new Error('Debes iniciar sesión para consultar el perfil.')
      error.status = 401
      throw error
    }

    const requestedToken = token
    const requestedVersion = sessionVersion.current
    let response

    try {
      response = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${requestedToken}` },
      })
    } catch {
      throw new Error('No se pudo conectar con el servidor. Tu sesión se mantiene activa.')
    }

    try {
      const data = await readResponse(response)

      if (typeof data.email !== 'string' || !data.email) {
        throw new Error('El servidor devolvió un perfil incompleto.')
      }

      if (
        requestedVersion === sessionVersion.current &&
        requestedToken === token
      ) {
        setEmail(data.email)
      }

      return data
    } catch (error) {
      if (error.status === 401 && requestedVersion === sessionVersion.current) {
        clearSession()
      }
      throw error
    }
  }, [clearSession, token])

  return (
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
