import { raghwaApi } from "./api";

export const branchApi = raghwaApi.injectEndpoints({
  endpoints: (builder) => ({
    createBranch: builder.mutation({
      query: (formData) => ({
        url: `/companies/${formData.get("companyId")}/branches`,
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Branches"],
    }),
    getAllBranches: builder.query({
      query: () => ({
        url: `/branches`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),
  }),
});

export const { useCreateBranchMutation, useGetAllBranchesQuery } = branchApi;
