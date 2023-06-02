import store from "../redux/store"

const getPizzaAmount = (pizzaId: number) => {
  const state = store.getState()
  const cartSelector = state.cart.items.filter(item => item.id === pizzaId)
  const amount = cartSelector.reduce((sum, item) => sum + item.count, 0)
  return amount
}

export default getPizzaAmount