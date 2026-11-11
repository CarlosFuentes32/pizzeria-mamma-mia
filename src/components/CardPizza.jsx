import fallbackPizza from '../assets/Header.jpg'
import { useCart } from '../context/CartContext.js'

const CardPizza = ({ id, name, price, ingredients, img }) => {
  const { addPizza } = useCart()

  const useFallbackImage = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackPizza
  }

  return (
    <article className="pizza-card">
      <img
        className="pizza-card__image"
        src={img}
        alt={`Pizza ${name}`}
        onError={useFallbackImage}
      />

      <div className="pizza-card__body">
        <h2>Pizza {name}</h2>
        <div className="pizza-card__ingredients">
          <p>Ingredientes:</p>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={`${name}-${ingredient}`}>🍕 {ingredient}</li>
            ))}
          </ul>
        </div>
        <p className="pizza-card__price">Precio: ${price.toLocaleString('es-CL')}</p>

        <div className="pizza-card__actions">
          <button type="button" className="button button--outline">Ver más 👀</button>
          <button
            type="button"
            className="button button--dark"
            onClick={() => addPizza({ id, name, price, ingredients, img })}
            aria-label={`Añadir pizza ${name} al carrito`}
          >
            Añadir 🛒
          </button>
        </div>
      </div>
    </article>
  )
}

export default CardPizza
