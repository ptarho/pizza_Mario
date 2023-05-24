export const calcTotalSum = (obj) => {
  return obj.reduce((sum, obj) => sum + obj.price * obj.count, 0);
}