import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "rating ↑"
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSort: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeSort } = sortSlice.actions;
export const sortSelector = (state) => state.sort.value

export default sortSlice.reducer;
