import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}`,
        method: "PUT",
        body: payload.userData,
      }),
      invalidatesTags: ["users", "profile"],
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;
