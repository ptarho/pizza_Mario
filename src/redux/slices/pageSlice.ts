import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  page: 0,
  amount: 3, 
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    changePageAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload
    }
  }
})

export const { changePage, changePageAmount} = pageSlice.actions
export const pageSelector = (state: RootState): {page: number, amount: number} => state.page

export default pageSlice.reducer