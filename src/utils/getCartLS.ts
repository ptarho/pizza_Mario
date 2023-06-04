export const getCartLS = () => {
  const data = localStorage.getItem('cart')
  return data ? JSON.parse(data) : [] 
}