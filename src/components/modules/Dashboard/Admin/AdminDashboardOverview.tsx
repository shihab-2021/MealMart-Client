import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Package,
  Clock,
  DollarSign,
  AlertCircle,
  Truck,
  XCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useGetOrdersQuery,
  useGetOrderStatesForAdminQuery,
} from "@/redux/features/order/orderApi";
// import { Order } from "../../pages/UserDashboard/MyOrders";
// import {
//   useGetOrdersQuery,
//   useGetOrderStatesForAdminQuery,
// } from "../../redux/features/order/orderApi";

interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  lowStockProducts: number;
  paymentStatus: {
    Pending: { count: number; revenue: number };
    Paid: { count: number; revenue: number };
    Failed: { count: number; revenue: number };
  };
  shippingStatus: {
    Pending: number;
    Accepted: number;
    Preparing: number;
    Delivered: number;
    Cancelled: number;
  };
  salesData: {
    month: string;
    year: number;
    revenue: number;
    ordersCount: number;
  }[];
}

export default function AdminDashboardOverview() {
  const {
    data: states,
    isFetching,
    isLoading,
  } = useGetOrderStatesForAdminQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: orders } = useGetOrdersQuery(
    [
      { name: "sort", value: "-createdAt" },
      { name: "limit", value: 2 },
      { name: "page", value: 1 },
      { name: "searchTerm", value: "" },
    ],
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const adminStats: AdminStats = states?.data?.stats;
  const orderData: any = orders?.data?.data;

  return (
    <>
      {(isFetching || isLoading) && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!isFetching && !isLoading && (
        <div className="">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard Overview</h1>

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
                  {adminStats?.totalOrders}
                </div>
                <p className="text-xs text-gray-500">All-time orders</p>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${adminStats?.totalRevenue?.toFixed(2)}
                </div>
                <p className="text-xs text-gray-500">Total revenue generated</p>
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
                  {adminStats?.totalProducts}
                </div>
                <p className="text-xs text-gray-500">Products in inventory</p>
              </CardContent>
            </Card>

            {/* Low Stock Products */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Low Stock Products
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {adminStats?.lowStockProducts}
                </div>
                <p className="text-xs text-gray-500">Products with low stock</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Status Breakdown */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {Object.entries(adminStats?.paymentStatus || {}).map(
              ([status, data]) => (
                <Card
                  key={status}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex justify-between">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {status} Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.count}</div>
                    <p className="text-xs text-gray-500">
                      Revenue: ${data.revenue?.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Shipping Status Breakdown */}
          <div className="mt-8 grid gap-6 md:grid-cols-5">
            {Object.entries(adminStats?.shippingStatus || {}).map(
              ([status, count]) => (
                <Card
                  key={status}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex justify-between">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {status}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{count}</div>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Sales Chart */}
          <div className="mt-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Sales Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adminStats?.salesData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
