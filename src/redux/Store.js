import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./Slices/theme.slice";
import { corApi } from "./Slices/corApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { raghwaApi } from "./Slices/api";
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    driction: themeSlice.reducer,
    [corApi.reducerPath]: corApi.reducer,
    [raghwaApi.reducerPath]: raghwaApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(corApi.middleware, raghwaApi.middleware),
});

setupListeners(store.dispatch);
