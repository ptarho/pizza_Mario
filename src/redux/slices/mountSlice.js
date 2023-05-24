import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const mountSlice = createSlice({
  name: "mount",
  initialState,
  reducers: {
    changeMount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeMount } = mountSlice.actions;
export const mountSelector = (state) => state.mount.value

export default mountSlice.reducer;
