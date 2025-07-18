import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://octohub.myddns.me:3020',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    const uiKey = import.meta.env.VITE_REACT_APP_API_KEY;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (uiKey) {
      headers.set('UserInterfaceKey', uiKey);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (mobile) => ({
        url: `/PatientUser/RegisterByMobile/2${mobile}`,
        method: 'GET',
      }),
      providesTags: [],
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/Token',
        method: 'POST',
        body: { username: `2${username}`, password },
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/Token/Refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    logOut: builder.mutation({
      query: (refreshToken) => ({
        url: '/Token/Logout',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    getOperations: builder.mutation({
      query: ({ page, recordPerPage }) => ({
        url: '/Operation/Search',
        method: 'POST',
        body: { page, recordPerPage },
      }),
    }),
    getDoctors: builder.mutation({
      query: ({ page, recordPerPage }) => ({
        url: '/Doctor/Search',
        method: 'POST',
        body: { page, recordPerPage },
      }),
    }),
    getClinicBranches: builder.mutation({
      query: () => ({
        url: '/ClinicBranch/GetAll',
        method: 'GET',
      }),
    }),
    getAvailableTimeSlots: builder.mutation({
      query: ({ targetDate, doctorId, operationId }) => ({
        url: `/Booking/GetAvailableTimeSlots?targetDate=${targetDate}&doctorId=${doctorId}&operationId=${operationId}`,
        method: 'GET',
      }),
    }),
    createBooking: builder.mutation({
      query: ({
        doctorId,
        operationId,
        date,
        timeSlot,
        clinicBranchId,
        notes,
      }) => ({
        url: '/Booking/Insert',
        method: 'POST',
        body: { doctorId, operationId, date, timeSlot, clinicBranchId, notes },
      }),
    }),
    // getBundles: builder.mutation({
    //   query: ({ page, recordPerPage }) => ({
    //     url: '/Bundle/Search',
    //     method: 'POST',
    //     body: { page, recordPerPage },
    //   }),
    // }),
    // getAllBookings: builder.mutation({
    //   query: () => ({
    //     url: '/Booking/Search',
    //     method: 'POST',
    //   }),
    // }),
    // getBookingById: builder.mutation({
    //   query: (id) => ({
    //     url: `/Booking/GetById/${id}`,
    //     method: 'GET',
    //   }),
    // }),
    // changePassword: builder.mutation({
    //   query: ({ oldPassword, newPassword }) => ({
    //     url: `/PatientUser/ChangePassword `,
    //     method: 'POST',
    //     body: { oldPassword, newPassword },
    //   }),
    // }),
    // updatePhoto: builder.mutation({
    //   query: ({ photoBase64 }) => ({
    //     url: '/PatientUser/UpdatePhoto',
    //     method: 'POST',
    //     body: { photoBase64 },
    //   }),
    // }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetOperationsMutation,
  useGetDoctorsMutation,
  useGetClinicBranchesMutation,
  useGetAvailableTimeSlotsMutation,
  useCreateBookingMutation,
} = apiSlice;
