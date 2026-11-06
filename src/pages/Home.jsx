import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import CardPizza from '../components/CardPizza.jsx'
import { API_URL } from '../config/api.js'

const PIZZAS_URL = `${API_URL}/api/pizzas`

const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadPizzas = async () => {
      try {
        const response = await fetch(PIZZAS_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`La API respondió con el estado ${response.status}.`)
        }

        const data = await response.json()
        setPizzas(data)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('No pudimos cargar las pizzas. Comprueba que la API esté disponible.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadPizzas()

    return () => controller.abort()
  }, [])

  return (
    <main>
      <Header />

      {loading && <p className="catalog-status">Cargando pizzas...</p>}
      {!loading && error && <p className="catalog-status catalog-status--error">{error}</p>}
      {!loading && !error && pizzas.length === 0 && (
        <p className="catalog-status">No hay pizzas disponibles.</p>
      )}
      {!loading && !error && pizzas.length > 0 && (
        <section className="pizza-grid" aria-label="Pizzas disponibles">
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default Home
