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
    addReview: builder.mutation({
      query: (payload) => ({
        url: `/meals/review/${payload.id}`,
        method: "PUT",
        body: payload.reviewData,
      }),
      invalidatesTags: ["reviews", "review"],
    }),
    getSingleMealReviews: builder.query({
      query: (id: string) => ({
        url: `/meals/review/${id}`,
        method: "GET",
      }),
      providesTags: ["reviews", "review"],
    }),
    getAllMealReviews: builder.query({
      query: () => ({
        url: `/meals/allReviews`,
        method: "GET",
      }),
      providesTags: ["reviews", "review"],
    }),
    deleteMeal: builder.mutation({
      query: (id: string) => ({
        url: `/meals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["meals", "meal"],
    }),
    searchMeals: builder.query({
      query: (query: string) => ({
        url: `/meals/searchMeal?query=${query}`,
        method: "GET",
      }),
      providesTags: ["search-meals"],
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
  useGetSingleMealReviewsQuery,
  useGetAllMealReviewsQuery,
  useAddReviewMutation,
  useDeleteMealMutation,
  useSearchMealsQuery,
} = mealApi;
