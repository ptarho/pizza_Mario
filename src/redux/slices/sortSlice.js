import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "rating ↑",
  order: "ASC",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSort: (state, action) => {
      console.log(action);
      state.value = action.payload.value;
      state.order = action.payload.order;
    },
  },
});

export const { changeSort } = sortSlice.actions;

export default sortSlice.reducer;
