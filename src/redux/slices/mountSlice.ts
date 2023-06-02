import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  value: false,
};

export const mountSlice = createSlice({
  name: "mount",
  initialState,
  reducers: {
    changeMount: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { changeMount } = mountSlice.actions;
export const mountSelector = (state:RootState) => state.mount.value

export default mountSlice.reducer;
