"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
import OrderDetailsDialog from "@/components/shared/OrderDetailsDialog";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/shared/Pagination";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}
export interface Product {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  images: string[];
}
export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  products: [
    {
      product: Product;
      quantity: number;
      _id: string;
    }
  ];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

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

export default function MyOrders() {
  const [page, setPage] = useState<number>(1);
  const {
    data: orders,
    isFetching,
    isLoading,
  } = useGetMyOrdersQuery(
    [
      { name: "sort", value: "-createdAt" },
      { name: "limit", value: 10 },
      { name: "page", value: page },
      { name: "searchTerm", value: "" },
    ],
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const orderData: any = orders?.data?.data;

  return (
    <div>
      <div className="">
        <div>
          <div className="border shadow-lg rounded-lg mt-1 mb-2 py-4 px-1 sm:px-2 lg:px-3 xl:px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold">
                  Order List Table
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  Showing order information
                </h3>
              </div>
              <div className="flex items-center justify-end flex-1">
                <div className="flex space-x-4">
                  {/* <Input
                    type="text"
                    placeholder="Search by name or brand"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  /> */}
                </div>
              </div>
            </div>
            <div className="mt-4 w-full grid grid-cols-1 h-[70vh] relative border rounded ">
              {(isLoading || isFetching) && (
                <div className="w-full h-full flex items-center justify-center mx-auto left-[1%] top-[1%] absolute">
                  <Loader className=" text-gray-400 animate-[spin_1.5s_linear_infinite] h-16 w-16" />
                </div>
              )}
              <Table className="">
                <TableHeader className="bg-gray-100 sticky top-0">
                  <TableRow>
                    <TableHead className="min-w-[100px]">Actions</TableHead>
                    <TableHead className="min-w-[180px]">User</TableHead>
                    <TableHead className="min-w-[130px]">Total Price</TableHead>
                    <TableHead className="min-w-[140px]">Status</TableHead>
                    <TableHead className="min-w-[250px]">Products</TableHead>
                    <TableHead className="min-w-[200px]">Order Date</TableHead>
                  </TableRow>
                </TableHeader>
                {/* <TableBody>
                  {!isLoading && orderData?.length > 0 ? (
                    orderData?.map((order: any) => (
                      <TableRow key={order?._id}>
                        <TableCell>
                          <OrderDetailsDialog order={order} />
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {order?.user?.name}
                          </span>
                          <br />
                          <span className="text-gray-500">
                            {order?.user?.email}
                          </span>
                        </TableCell>
                        <TableCell>{order?.totalPrice?.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            // variant={
                            //   order?.shippingStatus === "Pending"
                            //     ? "outline"
                            //     : "default"
                            // }
                            variant="outline"
                            className={`px-4 py-1 ${getStatusColor(
                              order.shippingStatus
                            )}`}
                          >
                            {order?.shippingStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-500">
                            {order?.products?.map((product: any, i: number) => (
                              <li key={i}>
                                Name: {product?.product?.mealName}, Quantity:{" "}
                                {product?.quantity}
                              </li>
                            ))}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {new Date(order?.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <div></div>
                  )}
                </TableBody> */}
                <TableBody>
                  {!isLoading && orderData?.length > 0 ? (
                    orderData?.map((order: any) => (
                      <TableRow key={order?._id}>
                        <TableCell>
                          <OrderDetailsDialog order={order} />
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {order?.user?.name}
                          </span>
                          <br />
                          <span className="text-gray-500">
                            {order?.user?.email}
                          </span>
                        </TableCell>
                        <TableCell>{order?.totalPrice?.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`px-4 py-1 ${getStatusColor(
                              order.shippingStatus
                            )}`}
                          >
                            {order?.shippingStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-500">
                            {order?.products?.map((product: any, i: number) => (
                              <li key={i}>
                                Name: {product?.product?.mealName}, Quantity:{" "}
                                {product?.quantity}
                              </li>
                            ))}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {new Date(order?.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        {isLoading ? (
                          <Loader className="text-gray-400 animate-[spin_1.5s_linear_infinite] h-16 w-16" />
                        ) : (
                          "No orders available"
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination
              totalPages={orders?.data?.meta?.totalPage}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
