import { CartPizza } from "../@types/componentsTypes";

export const calcTotalSum = (obj: CartPizza[]) => {
  return obj.reduce((sum: number, obj) => sum + obj.price * obj.count, 0);
}