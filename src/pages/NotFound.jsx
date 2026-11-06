import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className="simple-page">
    <section className="simple-card" aria-labelledby="not-found-title">
      <span className="not-found-code" aria-hidden="true">404</span>
      <h1 id="not-found-title">Página no encontrada</h1>
      <p className="simple-card__lead">
        Parece que esta pizza tomó una ruta equivocada.
      </p>
      <Link className="button button--dark" to="/">Volver al inicio</Link>
    </section>
  </main>
)

export default NotFound
