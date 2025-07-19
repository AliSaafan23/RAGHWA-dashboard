import { raghwaApi } from "./api";

export const storageApi = raghwaApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStorages: builder.query({
      query: () => ({
        url: `/storages`,
        method: "GET",
      }),
      providesTags: ["Storages"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched storages:", data);
        } catch (err) {
          console.error("Failed to fetch storages:", err);
        }
      },
    }),
    createStorage: builder.mutation({
      query: (formData) => {
        return {
          url: `/branches/${formData.branchId}/storages`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Storages"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("Storage created successfully, invalidating Storages tag");
        } catch (err) {
          console.error("Storage creation failed:", err);
        }
      },
    }),
    updateStorage: builder.mutation({
      query: (formData) => {
        const id = formData.get("id");
        return {
          url: `/storages/${id}`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Storages"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("Storage updated successfully, invalidating Storages tag");
        } catch (err) {
          console.error("Storage update failed:", err);
        }
      },
    }),
    deleteStorage: builder.mutation({
      query: (id) => ({
        url: `/storages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Storages"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("Storage deleted successfully, invalidating Storages tag");
        } catch (err) {
          console.error("Storage deletion failed:", err);
        }
      },
    }),
  }),
});

export const { useGetAllStoragesQuery, useCreateStorageMutation, useUpdateStorageMutation, useDeleteStorageMutation } =
  storageApi;
