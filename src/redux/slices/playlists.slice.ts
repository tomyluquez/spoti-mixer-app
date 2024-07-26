// playlists.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistState {
  playlistsIds: string[];
  tracksIds: string[];
  language: string;
}

const initialState: PlaylistState = {
  playlistsIds: [],
  tracksIds: [],
  language: "es",
};

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    tooglePlaylistsId: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      const { id, type } = action.payload;
      if (type === "playlists") {
        const existing = state.playlistsIds.find((itemId) => itemId === id);
        if (existing) {
          state.playlistsIds = state.playlistsIds.filter(
            (itemId) => itemId !== id
          );
        } else {
          state.playlistsIds.push(id);
        }
      } else {
        const existing = state.tracksIds.find((itemId) => itemId === id);
        if (existing) {
          state.tracksIds = state.tracksIds.filter((itemId) => itemId !== id);
        } else {
          state.tracksIds.push(id);
        }
      }
    },
    setAllPlaylists: (
      state,
      action: PayloadAction<{ ids: string[]; type: string }>
    ) => {
      const { ids, type } = action.payload;
      if (type === "playlists") {
        state.playlistsIds = ids;
      } else {
        state.tracksIds = ids;
      }
    },

    setLanguageSelected: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    clearState: () => {
      return initialState; // Retorna el estado inicial
    },
  },
});

export const {
  tooglePlaylistsId,
  setAllPlaylists,
  setLanguageSelected,
  clearState,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
export type { PlaylistState }; // Exporta el tipo de estado
