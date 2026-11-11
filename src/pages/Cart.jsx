import fallbackPizza from '../assets/Header.jpg'
import { useCart } from '../context/CartContext.js'

const Cart = () => {
  const { cart, increasePizza, decreasePizza, total } = useCart()

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
          <button type="button" className="button button--pay">Pagar</button>
        </div>
      </section>
    </main>
  )
}

export default Cart
