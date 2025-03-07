import { baseApi } from "../../api/baseApi";

const orgApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrg: builder.mutation({
      query: (orgData) => ({
        url: "/orgs",
        method: "POST",
        body: orgData,
      }),
      invalidatesTags: ["orgs"],
    }),
    getSingleOrg: builder.query({
      query: (id: string) => ({
        url: `/orgs/${id}`,
        method: "GET",
      }),
      providesTags: ["profile", "orgs"],
    }),
    updateOrg: builder.mutation({
      query: (payload) => ({
        url: `/orgs/${payload.id}`,
        method: "PUT",
        body: payload.orgData,
      }),
      invalidatesTags: ["orgs", "profile"],
    }),
    getUnverifiedOrgs: builder.query({
      query: () => ({
        url: `/orgs/admin/unverifiedOrg`,
        method: "GET",
      }),
      providesTags: ["profile", "orgs"],
    }),
    verifyOrg: builder.mutation({
      query: (id: string) => ({
        url: `/orgs/verifyOrg/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["orgs"],
    }),
    deleteOrg: builder.mutation({
      query: (id: string) => ({
        url: `/orgs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orgs"],
    }),
  }),
});

export const {
  useAddOrgMutation,
  useGetSingleOrgQuery,
  useGetUnverifiedOrgsQuery,
  useVerifyOrgMutation,
  useDeleteOrgMutation,
  useUpdateOrgMutation,
} = orgApi;
