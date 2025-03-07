import { TQueryParam } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["meals", "bookings"],
    }),
    getMyOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value !== null)
              params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/orders/myOrders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bookings"],
    }),
    getOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value !== null)
              params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bookings"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    getUserOrderStates: builder.query({
      query: () => ({
        url: "/orders/userStates",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    getOrderStatesForAdmin: builder.query({
      query: () => ({
        url: "/orders/adminStates",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    getProviderOrders: builder.query({
      query: () => ({
        url: "/orders/providerOrders",
        method: "GET",
      }),
      providesTags: ["provider-orders", "bookings", "profile"],
    }),
    updateProductStatus: builder.mutation({
      query: (payload) => ({
        url: "/orders/updateProductStatus",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["provider-orders", "meals", "bookings"],
    }),
    getPendingOrders: builder.query({
      query: () => ({
        url: "/orders/pendingOrders",
        method: "GET",
      }),
      providesTags: ["pending-orders", "bookings", "profile"],
    }),
    updateOrderStatus: builder.mutation({
      query: (payload) => ({
        url: "/orders/updateOrderStatus",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["pending-orders", "meals", "bookings"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetMyOrdersQuery,
  useGetUserOrderStatesQuery,
  useGetOrderStatesForAdminQuery,
  useGetProviderOrdersQuery,
  useUpdateProductStatusMutation,
  useGetPendingOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
