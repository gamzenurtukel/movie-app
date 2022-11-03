import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";

export const rootReducer = {
  movies: moviesReducer,
};
export const store = configureStore({
  reducer: rootReducer,
});
