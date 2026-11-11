import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fallbackPizza from '../assets/Header.jpg'
import { API_URL } from '../config/api.js'

const Pizza = () => {
  const { id } = useParams()
  const [requestState, setRequestState] = useState({
    id: null,
    pizza: null,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()
    const pizzaUrl = `${API_URL}/api/pizzas/${id}`

    const loadPizza = async () => {
      try {
        const response = await fetch(pizzaUrl, { signal: controller.signal })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('NOT_FOUND')
          }
          throw new Error(`La API respondió con el estado ${response.status}.`)
        }

        const data = await response.json()
        setRequestState({ id, pizza: data, error: '' })
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setRequestState({
            id,
            pizza: null,
            error:
              requestError.message === 'NOT_FOUND'
                ? 'No encontramos una pizza con ese identificador.'
                : 'No pudimos cargar la pizza. Comprueba que la API esté disponible.',
          })
        }
      }
    }

    loadPizza()

    return () => controller.abort()
  }, [id])

  const isCurrentRequest = requestState.id === id
  const loading = !isCurrentRequest
  const pizza = isCurrentRequest ? requestState.pizza : null
  const error = isCurrentRequest ? requestState.error : ''

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
