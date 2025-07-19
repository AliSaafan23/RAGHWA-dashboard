import { raghwaApi } from "./api";

export const companyApi = raghwaApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => ({
        url: `/companies`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCompaniesQuery } = companyApi;
