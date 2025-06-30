/* eslint-disable no-undef */
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const corApi = createApi({
  reducerPath: "corApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: [
    "User",
    "Product",
    "Transaction",
    "Customers",
    "Geography",
    "OverallStat",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: () => ({}),
});


