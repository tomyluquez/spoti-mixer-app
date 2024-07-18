import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  name: "laguage",
  initialState: {
    value: "es",
  },
  reducers: {
    SET_LANGUAGE: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { SET_LANGUAGE } = languageSlice.actions;
export default languageSlice.reducer;
