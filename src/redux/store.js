import { configureStore } from "@reduxjs/toolkit"

import searchReducer from "./slices/searchSlice"
import filterReducer from "./slices/filterSlice"
import sortSlice from "./slices/sortSlice"

export default configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    sort: sortSlice
  },
})