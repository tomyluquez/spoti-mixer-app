import { configureStore } from "@reduxjs/toolkit";
import playlistsReducer from "./slices/playlists.slice";

// Configura la tienda
export const store = configureStore({
  reducer: {
    global: playlistsReducer,
  },
});

// Exporta el tipo RootState
export type RootState = ReturnType<typeof store.getState>;
