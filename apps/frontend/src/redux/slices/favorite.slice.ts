import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../helpers/localStorage";

interface FavoriteAddState {
  id: string | number;
  title: string;
  poster: string;
  url: string;
}

interface FavoriteRemoveState {
  id: string | number;
}

const initialState: FavoriteAddState[] = getItem("favorite") || [];

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteAddState>) => {
      const { id } = action.payload;
      if (
        state.length === 0 ||
        state.filter((item) => item.id === id).length === 0
      ) {
        state.push(action.payload);
      }
    },
    removeToFavorite: (state, action: PayloadAction<FavoriteRemoveState>) => {
      const { id } = action.payload;
      if (state.some((item) => item.id === id)) {
        return (state = state.filter((item) => item.id !== id));
      }
    },
  },
});

export const { addToFavorite, removeToFavorite } = favoriteSlice.actions;
