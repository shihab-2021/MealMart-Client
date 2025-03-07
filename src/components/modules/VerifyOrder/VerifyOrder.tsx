"use client";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useVerifyOrderQuery } from "@/redux/features/order/orderApi";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  CreditCard,
  User,
  Shield,
  ArrowRight,
  Clock,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function VerifyOrder() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { isLoading, data } = useVerifyOrderQuery(searchParams[1], {
    refetchOnMountOrArgChange: true,
  });

  const orderData: OrderData = data?.data?.[0];

  useEffect(() => {
    if (orderData?.bank_status === "Success") {
      dispatch(clearCart());
    }
  }, [orderData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-arima mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center pt-5 mb-12">
          <h1 className="text-4xl font-bold mb-2">Order Verification</h1>
          <p className="text-gray-600">Order ID: {orderData?.order_id}</p>
        </div>

        {/* Status Banner */}
        <div
          className={`mb-8 p-4 rounded-lg flex items-center justify-center gap-3
          ${
            orderData?.bank_status === "Success"
              ? "bg-green-50 border border-green-200"
              : "bg-yellow-50 border border-yellow-200"
          }`}
        >
          {orderData?.bank_status === "Success" ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-500" />
          )}
          <span
            className={`text-lg font-medium ${
              orderData?.bank_status === "Success"
                ? "text-green-700"
                : "text-yellow-700"
            }`}
          >
            Payment {orderData?.bank_status}
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Order Details Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-primary/5 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <dl className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm text-gray-600 mb-1">Amount</dt>
                  <dd className="text-2xl font-bold text-primary">
                    {orderData?.currency} {orderData?.amount?.toFixed(2)}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm text-gray-600">Transaction ID</dt>
                  <dd className="font-medium">{orderData?.bank_trx_id}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm text-gray-600">Method</dt>
                  <dd className="font-medium">{orderData?.method}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm text-gray-600">Date</dt>
                  <dd className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(orderData?.date_time)?.toLocaleString()}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm text-gray-600">Status</dt>
                  <dd>
                    <Badge
                      variant={
                        orderData?.bank_status === "Success"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {orderData?.bank_status}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Customer Information Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-primary/5 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{orderData?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{orderData?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{orderData?.phone_no}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">
                      {orderData?.address}, {orderData?.city}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status Card */}
          <Card className="md:col-span-2 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-primary/5 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {orderData?.is_verify === 1 ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-green-700">
                          Order Verified
                        </p>
                        <p className="text-sm text-gray-600">
                          Your order has been successfully verified
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium text-yellow-700">
                          Verification Pending
                        </p>
                        <p className="text-sm text-gray-600">
                          Your order is awaiting verification
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <Link href="/dashboard/customer/myOrders">
                  <Button className="gap-2">
                    View Orders
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
