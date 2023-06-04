export type pizzaInfo = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  types: number[];
  sizes: number[];
  category?: number
}

export type SinglePizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
};

export type CartPizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};