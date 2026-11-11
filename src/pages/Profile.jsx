import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext.js'

const Profile = () => {
  const { email, getProfile, logout } = useUser()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadProfile = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getProfile()
        if (active) setProfile(data)
      } catch (requestError) {
        if (active) setError(requestError.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProfile()

    return () => {
      active = false
    }
  }, [getProfile])

  return (
    <main className="simple-page">
      <section className="simple-card" aria-labelledby="profile-title">
        <span className="simple-card__icon" aria-hidden="true">👤</span>
        <h1 id="profile-title">Mi perfil</h1>
        {loading && <p className="simple-card__lead">Cargando perfil...</p>}
        {!loading && error && (
          <p className="form-message form-message--error" role="alert">{error}</p>
        )}
        {!loading && !error && (
          <>
            <p className="simple-card__lead">Sesión iniciada como</p>
            <p className="profile-email">{profile?.email || email}</p>
          </>
        )}
        <button type="button" className="button button--dark" onClick={logout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  )
}

export default Profile
