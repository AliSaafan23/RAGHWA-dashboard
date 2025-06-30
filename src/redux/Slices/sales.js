import { corApi } from "./corApi";


export const salesApi = corApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverallStat: builder.query({
      query: () => ({
        url: `sales/overallStat`,
        method: "GET",
      }),
      providesTags: ["OverallStat"],
    }),
  }),
});

export const { useGetOverallStatQuery } = salesApi;