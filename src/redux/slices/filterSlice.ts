import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  value: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number | string>) => {
      state.value = Number(action.payload);
    },
  },
});

export const { changeCategory } = filterSlice.actions;
export const categorySelector = (state: RootState) => state.filter.value

export default filterSlice.reducer;
