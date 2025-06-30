import { corApi } from "./corApi";


export const productApi = corApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `client/products`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `client/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});



export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;