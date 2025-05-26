import { toast } from "sonner";
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react"; // Import getSession

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API,
  credentials: "include",
  prepareHeaders: async (headers) => {
    try {
      const session = await getSession(); // Get session from NextAuth

      if (session?.accessToken) {
        headers.set("authorization", `Bearer ${session.accessToken}`);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // More comprehensive error handling
  if (result?.error) {
    switch (result.error.status) {
      case 404:
        toast.error(`404: Server not found!`);
        break;
      case 401:
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
            {
              method: "POST",
              credentials: "include",
            }
          );

          const data = await res.json();

          if (data?.data?.accessToken) {
            // Dispatch token update
            // api.dispatch(
            //   setUser({
            //     user: (await getSession())?.user,
            //     token: data.data.accessToken,
            //   })
            // );

            // Retry the original request
            result = await baseQuery(args, api, extraOptions);
          } else {
            // Logout if refresh fails
            api.dispatch(signOut());
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          api.dispatch(signOut());
        }
        break;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "users",
    "profile",
    "orgs",
    "meals",
    "org",
    "meal",
    "bookings",
    "provider-orders",
    "pending-orders",
    "review",
    "reviews",
    "search-meals",
  ],
  endpoints: () => ({}),
  keepUnusedDataFor: 30, // Keep unused data for 30 seconds
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});
