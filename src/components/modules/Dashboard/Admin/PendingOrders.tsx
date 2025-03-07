"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Box, Clock, DollarSign, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  useGetPendingOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import Image from "next/image";
import { toast } from "sonner";

export default function PendingOrders() {
  const {
    data: data,
    isFetching,
    isLoading,
    refetch,
  } = useGetPendingOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const orders: any = data?.data;
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "accepted":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "prepared":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const handleUpdateProductStatus = async (payload: any) => {
    try {
      const res = await updateOrderStatus(payload).unwrap();
      if (res.success) toast.success("Order status updated successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update stock!");
    }
  };

  return (
    <div className="">
      <div className="mb-6 flex items-center gap-2">
        <Box className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 gap-6 mb-20">
        {orders?.map((order: any) => (
          <Card key={order._id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-sm">
                  #{order._id.slice(-6).toUpperCase()}
                </Badge>
                <Select
                  value={order.shippingStatus}
                  onValueChange={(e: any) => {
                    handleUpdateProductStatus({
                      orderId: order?._id,
                      status: e,
                    });
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem disabled value="Pending">
                      Pending
                    </SelectItem>
                    <SelectItem
                      disabled={
                        order.shippingStatus === "Preparing" ||
                        order.shippingStatus === "Delivered" ||
                        order.shippingStatus === "Cancelled"
                      }
                      value="Preparing"
                    >
                      Preparing
                    </SelectItem>
                    <SelectItem
                      disabled={
                        order.shippingStatus === "Delivered" ||
                        order.shippingStatus === "Cancelled"
                      }
                      value="Delivered"
                    >
                      Delivered
                    </SelectItem>
                    <SelectItem
                      disabled={
                        order.shippingStatus === "Delivered" ||
                        order.shippingStatus === "Cancelled"
                      }
                      value="Cancelled"
                    >
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* <Badge
                  variant="outline"
                  className={`px-4 py-1 ${getStatusColor(
                    order.shippingStatus
                  )}`}
                >
                  {order.shippingStatus}
                </Badge> */}
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{order.userDetails.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.userDetails.email}
                  </p>
                </div>
              </div>

              {/* Products List */}
              <div className="space-y-2">
                {order.products.map((product: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image
                            src={product?.mealDetails?.images[0]}
                            alt="Meal"
                            className="w-12 h-12 object-cover rounded"
                            width={500}
                            height={500}
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {product.mealDetails.mealName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {product.quantity}x ${product.mealDetails.price}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`px-4 py-1 ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </Badge>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">
                    Total: ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.transaction.method} • {order.paymentStatus}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Loading State */}
      {isFetching ||
        (isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ))}

      {/* Empty State */}
      {orders?.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <p className="text-xl text-muted-foreground">No orders found</p>
          <Button variant="outline">Refresh Orders</Button>
        </div>
      )}
    </div>
  );
}
