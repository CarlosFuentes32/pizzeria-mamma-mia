import fallbackPizza from '../assets/Header.jpg'

const CardPizza = ({ name, price, ingredients, img }) => {
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
          <p>🍕 {ingredients.join(', ')}</p>
        </div>
        <p className="pizza-card__price">Precio: ${price.toLocaleString('es-CL')}</p>

        <div className="pizza-card__actions">
          <button type="button" className="button button--outline">Ver más 👀</button>
          <button type="button" className="button button--dark">Añadir 🛒</button>
        </div>
      </div>
    </article>
  )
}

export default CardPizza
