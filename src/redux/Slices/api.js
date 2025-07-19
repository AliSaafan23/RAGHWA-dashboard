/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const raghwaApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL2,
  }),
  tagTypes: ["Branches", "Storages"],
  endpoints: () => ({}),
});
