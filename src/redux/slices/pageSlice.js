import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  amount: 3, 
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = Number(action.payload)
    },
    changePageAmount: (state, action) => {
      state.amount = Number(action.payload)
    }
  }
})

export const { changePage, changePageAmount} = pageSlice.actions
export const pageSelector = (state) => state.page.page

export default pageSlice.reducer