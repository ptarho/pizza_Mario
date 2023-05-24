import { createSlice } from "@reduxjs/toolkit";
import { calcTotalSum } from "../../utils/calcTotalSum";

const initialState = {
  items: [],
  totalSum: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(obj) or addItem({id})
    addItem: (state, action) => {
      const pizza = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });
      console.log(pizza)
      if (pizza) {
        pizza.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      console.log(action);
      state.totalSum = calcTotalSum(state.items);
    },
    // minusItem({id, type, size})
    minusItem: (state, action) => {
      const pizza = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (pizza.count > 0) {
        pizza.count--;
      }
      state.totalSum = calcTotalSum(state.items);
    },
    // removeItem({id, type, size})
    removeItem: (state, action) => {
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

export default cartSlice.reducer;
