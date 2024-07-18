import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/language.slice";

export default configureStore({
  reducer: {
    language: languageReducer,
  },
});
