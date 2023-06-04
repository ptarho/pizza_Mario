import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { changePageAmount } from "./pageSlice";
import axios from "axios";
import { pizzaInfo } from "../../@types/componentsTypes";
import { RootState } from "../store";

export type Params = {
  searchValue: string;
  sortBy: string;
  activeCategory: number;
  pizzasOnPage: number;
};

export const fetchPizzas = createAsyncThunk<pizzaInfo[], Params>(
  "pizza/fetchPizzas",
  async (params, thunkAPI) => {
    const { searchValue, activeCategory, sortBy, pizzasOnPage } = params;
    const [sortName, sortOrder] = sortBy.split(" ");
    let { data } = await axios.get<pizzaInfo[]>("pizzas.json");
    if (searchValue) {
      data = data.filter((e) => e.title.toLowerCase().includes(searchValue));
    }
    if (activeCategory) {
      data = data.filter((e) => {
        return e.category === Number(activeCategory);
      });
    }
    if (sortBy) {
      data.sort((a: any, b: any) => {
        if (typeof a[sortName] === "number") {
          return sortOrder === "↑"
            ? a[sortName] - b[sortName]
            : b[sortName] - a[sortName];
        } else {
          return sortOrder === "↑"
            ? a[sortName].localeCompare(b[sortName])
            : b[sortName].localeCompare(a[sortName]);
        }
      });
    }
    thunkAPI.dispatch(changePageAmount(Math.ceil(data.length / pizzasOnPage)));

    return data;
  }
);

type pizzaSliceState = {
  items: pizzaInfo[];
  status: "pending" | "fulfilled" | "rejected";
};

const initialState: pizzaSliceState = {
  items: [],
  status: "pending",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<pizzaInfo[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = "pending";
    });

    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<pizzaInfo[]>) => {
        //console.log(action)
        state.items = action.payload;
        state.status = "fulfilled";
      }
    );

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = "rejected";
    });
  },
});

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzaSlice.actions;
export const pizzaSelector = (state: RootState) => state.pizza.items;

export default pizzaSlice.reducer;
