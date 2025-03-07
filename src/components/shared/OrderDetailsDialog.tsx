import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface OrderDetailsDialogProps {
  order: any; // Replace with proper type
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ order }) => {
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

  const getTransactionIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" bg-green-200 text-green-800 font-bold hover:bg-green-300 my-0.5"
          variant="outline"
          size="sm"
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto font-arima">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Order Details
          </DialogTitle>
        </DialogHeader>

        {/* Order Header */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <Badge
              variant="outline"
              className={`px-4 py-1 ${getStatusColor(order.shippingStatus)}`}
            >
              {order.shippingStatus}
            </Badge>
          </div>

          <Separator />

          {/* Transaction Details Card */}
          <Card className="border border-gray-200">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                  Transaction Information
                </h3>
                {getTransactionIcon(order.transaction?.bank_status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium">{order.transaction?.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <p className="font-medium">{order.transaction?.method}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Transaction Status</p>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(
                      order.transaction?.bank_status
                    )}`}
                  >
                    {order.transaction?.bank_status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Transaction Date</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <p className="font-medium">
                      {order.transaction?.date_time}
                    </p>
                  </div>
                </div>
              </div>

              {order.transaction?.sp_message && (
                <div
                  className={`mt-4 p-3 rounded-lg ${getStatusColor(
                    order.transaction?.bank_status
                  )}`}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className={`w-5 h-5 `} />
                    <p className={`text-sm `}>{order.transaction.sp_message}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="space-y-4">
              {order?.products?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {/* Add car image here */}
                      <Image
                        src={item?.product?.images[0]}
                        alt="Meal"
                        className="w-12 h-12 object-cover rounded"
                        width={500}
                        height={500}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item?.product?.mealName}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <Badge
                        variant="outline"
                        className={`px-4 py-1 ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between items-center text-lg font-semibold">
              <p>Total Amount</p>
              <p>${order.totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
