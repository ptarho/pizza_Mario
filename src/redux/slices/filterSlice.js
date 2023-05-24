import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.value = Number(action.payload);
    },
  },
});

export const { changeCategory } = filterSlice.actions;
export const categorySelector = (state) => state.filter.value

export default filterSlice.reducer;
