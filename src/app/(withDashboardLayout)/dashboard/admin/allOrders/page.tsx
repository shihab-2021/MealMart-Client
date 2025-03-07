"use client";
import dynamic from "next/dynamic";

const AllOrders = dynamic(
  () => import("@/components/modules/Dashboard/Admin/AllOrders"),
  { ssr: false }
);

export default function page() {
  return (
    <div>
      <AllOrders />
    </div>
  );
}
