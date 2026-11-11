import { useUser } from '../context/UserContext.js'

const Profile = () => {
  const { logout } = useUser()
  const email = 'usuario@mammamia.cl'

  return (
    <main className="simple-page">
      <section className="simple-card" aria-labelledby="profile-title">
        <span className="simple-card__icon" aria-hidden="true">👤</span>
        <h1 id="profile-title">Mi perfil</h1>
        <p className="simple-card__lead">Sesión iniciada como</p>
        <p className="profile-email">{email}</p>
        <button type="button" className="button button--dark" onClick={logout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  )
}

export default Profile
