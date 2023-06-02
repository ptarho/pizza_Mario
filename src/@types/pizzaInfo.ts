export interface pizzaInfo {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  types: number[];
  sizes: number[];
}