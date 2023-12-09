import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice } from "./slices";

export const store = configureStore({
  reducer: {
    favoriteReducer: favoriteSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
