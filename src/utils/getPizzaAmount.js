import store from "../redux/store"

const getPizzaAmount = (pizzaId) => {
  const state = store.getState()
  const pizzaSelector = state.cart.items.filter(item => item.id === pizzaId)
  const amount = pizzaSelector.reduce((sum, item) => sum + item.count, 0)
  console.log(pizzaSelector)
  console.log(amount)
  return amount
}

export default getPizzaAmount