import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  value: "rating ↑"
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeSort } = sortSlice.actions;
export const sortSelector = (state: RootState) => state.sort.value

export default sortSlice.reducer;
