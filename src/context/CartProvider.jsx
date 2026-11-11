import { useState } from 'react'
import { CartContext } from './CartContext.js'

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addPizza = (pizzaToAdd) => {
    setCart((currentCart) => {
      const pizzaExists = currentCart.some((pizza) => pizza.id === pizzaToAdd.id)

      if (pizzaExists) {
        return currentCart.map((pizza) =>
          pizza.id === pizzaToAdd.id
            ? { ...pizza, count: pizza.count + 1 }
            : pizza,
        )
      }

      return [...currentCart, { ...pizzaToAdd, count: 1 }]
    })
  }

  const increasePizza = (id) => {
    setCart((currentCart) =>
      currentCart.map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza,
      ),
    )
  }

  const decreasePizza = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza,
        )
        .filter((pizza) => pizza.count > 0),
    )
  }

  const total = cart.reduce(
    (sum, pizza) => sum + pizza.price * pizza.count,
    0,
  )

  return (
    <CartContext.Provider
      value={{ cart, addPizza, increasePizza, decreasePizza, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
