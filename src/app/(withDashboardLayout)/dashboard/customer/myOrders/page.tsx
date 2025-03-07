"use client";
import dynamic from "next/dynamic";

const MyOrders = dynamic(
  () => import("@/components/modules/Dashboard/DashboardOverview/MyOrders"),
  { ssr: false }
);

export default function CustomerOrders() {
  return (
    <>
      <MyOrders />
    </>
  );
}
