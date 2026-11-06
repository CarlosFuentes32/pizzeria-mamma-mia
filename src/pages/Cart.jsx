import { useState } from 'react'
import { pizzaCart } from '../data/pizzas.js'
import fallbackPizza from '../assets/Header.jpg'

const Cart = () => {
  const [cart, setCart] = useState(() => pizzaCart.map((pizza) => ({ ...pizza })))

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count + change } : pizza,
        )
        .filter((pizza) => pizza.count > 0),
    )
  }

  const total = cart.reduce((sum, pizza) => sum + pizza.price * pizza.count, 0)

  const useFallbackImage = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackPizza
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
                    onClick={() => updateQuantity(pizza.id, -1)}
                    aria-label={`Quitar una pizza ${pizza.name}`}
                  >
                    −
                  </button>
                  <span>{pizza.count}</span>
                  <button
                    type="button"
                    className="quantity-button quantity-button--add"
                    onClick={() => updateQuantity(pizza.id, 1)}
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
          <button type="button" className="button button--pay">Pagar</button>
        </div>
      </section>
    </main>
  )
}

export default Cart
