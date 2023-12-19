import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cardReducer from "./slices/cardSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    card: cardReducer,
  },
});
