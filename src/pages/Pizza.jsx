import { useEffect, useState } from 'react'
import fallbackPizza from '../assets/Header.jpg'
import { API_URL } from '../config/api.js'

const PIZZA_URL = `${API_URL}/api/pizzas/p001`

const Pizza = () => {
  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadPizza = async () => {
      try {
        const response = await fetch(PIZZA_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`La API respondió con el estado ${response.status}.`)
        }

        const data = await response.json()
        setPizza(data)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('No pudimos cargar la pizza. Comprueba que la API esté disponible.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadPizza()

    return () => controller.abort()
  }, [])

  const useFallbackImage = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackPizza
  }

  if (loading) {
    return <main className="pizza-detail-page"><p className="catalog-status">Cargando pizza...</p></main>
  }

  if (error) {
    return (
      <main className="pizza-detail-page">
        <p className="catalog-status catalog-status--error">{error}</p>
      </main>
    )
  }

  if (!pizza) {
    return <main className="pizza-detail-page"><p className="catalog-status">Pizza no disponible.</p></main>
  }

  return (
    <main className="pizza-detail-page">
      <article className="pizza-detail">
        <img
          className="pizza-detail__image"
          src={pizza.img}
          alt={`Pizza ${pizza.name}`}
          onError={useFallbackImage}
        />

        <div className="pizza-detail__body">
          <h1>Pizza {pizza.name}</h1>
          <p className="pizza-detail__description">{pizza.desc}</p>

          <div className="pizza-detail__ingredients">
            <h2>Ingredientes</h2>
            <ul>
              {pizza.ingredients.map((ingredient) => (
                <li key={`${pizza.id}-${ingredient}`}>🍕 {ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="pizza-detail__footer">
            <p>Precio: ${pizza.price.toLocaleString('es-CL')}</p>
            <button type="button" className="button button--dark">Añadir al carrito 🛒</button>
          </div>
        </div>
      </article>
    </main>
  )
}

export default Pizza
