"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, CreditCard, Package, CheckCircle } from "lucide-react";
import {
  useGetMyOrdersQuery,
  useGetUserOrderStatesQuery,
} from "@/redux/features/order/orderApi";
import MyCart from "./MyCart";

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  totalProducts: number;
  orderStatus: Record<string, number>;
}

// API Queries
export default function DashboardOverview() {
  const {
    data: states,
    isFetching,
    isLoading,
  } = useGetUserOrderStatesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: orders } = useGetMyOrdersQuery(
    [
      { name: "sort", value: "-createdAt" },
      { name: "limit", value: 2 },
      { name: "page", value: 1 },
      { name: "searchTerm", value: "" },
    ],
    { refetchOnMountOrArgChange: true }
  );

  const userStats: UserStats = states?.data?.stats ?? {};
  const orderData: any = orders?.data?.data ?? [];

  return (
    <>
      {(isFetching || isLoading) && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!isFetching && !isLoading && (
        <div className="pb-4">
          <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Orders */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Orders
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats?.totalOrders ?? 0}
                </div>
                <p className="text-xs text-gray-500">All-time orders</p>
              </CardContent>
            </Card>

            {/* Total Spent */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Spent
                </CardTitle>
                <CreditCard className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${userStats?.totalSpent?.toFixed(2) ?? "0.00"}
                </div>
                <p className="text-xs text-gray-500">Total amount spent</p>
              </CardContent>
            </Card>

            {/* Total Products */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats?.totalProducts ?? 0}
                </div>
                <p className="text-xs text-gray-500">Products purchased</p>
              </CardContent>
            </Card>

            {/* Order Status Breakdown */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Order Status
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(userStats?.orderStatus ?? {}).map(
                    ([status, count]) => (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <Badge className="bg-gray-100 text-gray-600">
                          {status}
                        </Badge>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <MyCart />

          {/* Order Progress Section */}
          <div className="mt-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Order Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Paid Orders</span>
                      <span className="text-sm font-medium">
                        {userStats?.orderStatus?.Paid ?? 0} /{" "}
                        {userStats?.totalOrders ?? 0}
                      </span>
                    </div>
                    <Progress
                      value={
                        ((userStats?.orderStatus?.Paid ?? 0) /
                          (userStats?.totalOrders ?? 1)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Pending Orders
                      </span>
                      <span className="text-sm font-medium">
                        {userStats?.orderStatus?.Pending ?? 0} /{" "}
                        {userStats?.totalOrders ?? 0}
                      </span>
                    </div>
                    <Progress
                      value={
                        ((userStats?.orderStatus?.Pending ?? 0) /
                          (userStats?.totalOrders ?? 1)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders Section */}
          <div className="mt-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData?.map((order: any, i: number) => (
                    <div key={i}>
                      {order?.products?.map((product: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <Package className="h-6 w-6 text-gray-500" />
                            <div>
                              <p className="font-medium break-all">
                                Meal: {product?.product?.mealName}
                              </p>
                              <p className="text-sm text-gray-500">
                                Status: {product?.status}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-gray-100 text-gray-600">
                            {product?.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
