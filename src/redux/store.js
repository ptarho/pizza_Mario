import { configureStore } from "@reduxjs/toolkit"

import searchReducer from "./slices/searchSlice"
import filterReducer from "./slices/filterSlice"
import sortSlice from "./slices/sortSlice"
import pageSlice from "./slices/pageSlice"

export default configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    sort: sortSlice,
    page: pageSlice,
  },
})