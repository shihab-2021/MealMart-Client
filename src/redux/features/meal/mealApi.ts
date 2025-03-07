import { baseApi } from "../../api/baseApi";

const mealApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMeal: builder.mutation({
      query: (mealData) => ({
        url: "/meals",
        method: "POST",
        body: mealData,
      }),
      invalidatesTags: ["meals", "meal"],
    }),
    getAllMeals: builder.query({
      query: () => ({
        url: `/meals`,
        method: "GET",
      }),
      providesTags: ["meals", "meal"],
    }),
    getProviderMeals: builder.query({
      query: () => ({
        url: `/meals/providerMeals`,
        method: "GET",
      }),
      providesTags: ["meals", "meal"],
    }),
    updateStock: builder.mutation({
      query: (data) => ({
        url: `/meals/updateStock/${data?.mealId}`,
        method: "PUT",
        body: { inStock: !data?.inStock },
      }),
      invalidatesTags: ["meals", "meal"],
    }),
    getSingleMeal: builder.query({
      query: (id: string) => ({
        url: `/meals/${id}`,
        method: "GET",
      }),
      providesTags: ["meals", "meal"],
    }),
    updateMeal: builder.mutation({
      query: (payload) => ({
        url: `/meals/${payload.id}`,
        method: "PUT",
        body: payload.mealData,
      }),
      invalidatesTags: ["meals", "meal"],
    }),
    deleteMeal: builder.mutation({
      query: (id: string) => ({
        url: `/meals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["meals", "meal"],
    }),
  }),
});

export const {
  useAddMealMutation,
  useGetAllMealsQuery,
  useGetProviderMealsQuery,
  useUpdateStockMutation,
  useGetSingleMealQuery,
  useUpdateMealMutation,
  useDeleteMealMutation,
} = mealApi;
