
import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./Slices/theme.slice";
import { corApi } from "./Slices/corApi";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    [corApi.reducerPath]: corApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(corApi.middleware),
});

setupListeners(store.dispatch);