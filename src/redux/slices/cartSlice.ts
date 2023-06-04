import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calcTotalSum } from "../../utils/calcTotalSum";
import { CartPizza } from "../../@types/componentsTypes";
import { RootState } from "../store";
import { SinglePizza } from "../../@types/componentsTypes";
import { getCartLS } from "../../utils/getCartLS";


type CartState = {
  items: CartPizza[];
  totalSum: number;
}

const initialState: CartState = {
  items: getCartLS(),
  totalSum: calcTotalSum(getCartLS()),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(obj) or addItem({id})
    addItem: (state, action: PayloadAction<SinglePizza>) => {
      const pizza = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });
      //console.log(pizza);
      if (pizza) {
        pizza.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      //console.log(action);
      state.totalSum = calcTotalSum(state.items);
    },
    // minusItem({id, type, size})
    minusItem: (state, action: PayloadAction<{id:number; type: string; size: number}>) => {
      const pizza = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (pizza && pizza.count > 1) {
        pizza.count--;
      }
      state.totalSum = calcTotalSum(state.items);
    },
    // removeItem({id, type, size})
    removeItem: (state,  action: PayloadAction<{id:number; type: string; size: number}>) => {
      const pizza = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      state.items = state.items.filter((obj) => obj !== pizza);
      state.totalSum = calcTotalSum(state.items);
    },
    // clearCart()
    clearCart: (state) => {
      state.items = [];
      state.totalSum = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;
export const cartSelector = (state: RootState)  => state.cart;

export default cartSlice.reducer;
