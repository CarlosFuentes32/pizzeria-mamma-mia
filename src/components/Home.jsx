import Header from './Header.jsx'
import CardPizza from './CardPizza.jsx'
import { pizzas } from '../data/pizzas.js'

const Home = () => {
  return (
    <main>
      <Header />

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
    </main>
  )
}

export default Home
