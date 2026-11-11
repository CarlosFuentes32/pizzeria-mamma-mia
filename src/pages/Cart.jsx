import { useRef, useState } from 'react'
import fallbackPizza from '../assets/Header.jpg'
import { useCart } from '../context/CartContext.js'
import { useUser } from '../context/UserContext.js'
import { API_URL } from '../config/api.js'

const Cart = () => {
  const { cart, increasePizza, decreasePizza, total } = useCart()
  const { token, logout } = useUser()
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isPaying, setIsPaying] = useState(false)
  const payingRef = useRef(false)

  const useFallbackImage = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackPizza
  }

  const handleCheckout = async () => {
    if (payingRef.current || !token || cart.length === 0) return

    payingRef.current = true
    setIsPaying(true)
    setMessage({ type: '', text: '' })

    try {
      const checkoutCart = cart.map(({ id, name, price, count }) => ({
        id,
        name,
        price,
        count,
      }))
      const response = await fetch(`${API_URL}/api/checkouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: checkoutCart }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (response.status === 401) {
          logout()
          throw new Error('Tu sesión no es válida o ha vencido. Inicia sesión nuevamente.')
        }
        throw new Error(data.error || 'No se pudo procesar la compra simulada.')
      }

      setMessage({
        type: 'success',
        text: '¡Compra simulada realizada con éxito!',
      })
    } catch (error) {
      const text = error instanceof TypeError
        ? 'No se pudo conectar con el servidor. El carrito se conservó.'
        : error.message
      setMessage({ type: 'error', text })
    } finally {
      payingRef.current = false
      setIsPaying(false)
    }
  }

  return (
    <main className="cart-page">
      <section className="cart" aria-labelledby="cart-title">
        <h1 id="cart-title">Detalles del pedido:</h1>

        {cart.length > 0 ? (
          <div className="cart__items">
            {cart.map((pizza) => (
              <article className="cart-item" key={pizza.id}>
                <img
                  className="cart-item__image"
                  src={pizza.img}
                  alt={`Pizza ${pizza.name}`}
                  onError={useFallbackImage}
                />

                <h2>Pizza {pizza.name}</h2>
                <p className="cart-item__price">${pizza.price.toLocaleString('es-CL')}</p>

                <div className="cart-item__controls" aria-label={`Cantidad de pizza ${pizza.name}`}>
                  <button
                    type="button"
                    className="quantity-button quantity-button--remove"
                    onClick={() => decreasePizza(pizza.id)}
                    aria-label={`Quitar una pizza ${pizza.name}`}
                  >
                    −
                  </button>
                  <span>{pizza.count}</span>
                  <button
                    type="button"
                    className="quantity-button quantity-button--add"
                    onClick={() => increasePizza(pizza.id)}
                    aria-label={`Agregar una pizza ${pizza.name}`}
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="cart__empty">Tu carrito está vacío.</p>
        )}

        <div className="cart__summary">
          <p>Total: ${total.toLocaleString('es-CL')}</p>
          <button
            type="button"
            className="button button--pay"
            disabled={!token || cart.length === 0 || isPaying}
            onClick={handleCheckout}
          >
            {isPaying ? 'Procesando...' : 'Pagar'}
          </button>
          {message.text && (
            <p
              className={`form-message form-message--${message.type}`}
              role="status"
              aria-live="polite"
            >
              {message.text}
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Cart
