import { configureStore } from "@reduxjs/toolkit";

import search from "./slices/searchSlice";
import filter from "./slices/filterSlice";
import sort from "./slices/sortSlice";
import page from "./slices/pageSlice";
import mount from "./slices/mountSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";


const store = configureStore({
  reducer: {
    search,
    filter,
    sort,
    page,
    mount,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store