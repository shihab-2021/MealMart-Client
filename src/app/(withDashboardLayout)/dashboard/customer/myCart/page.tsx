"use client";
import dynamic from "next/dynamic";

const MyCart = dynamic(
  () => import("@/components/modules/Dashboard/DashboardOverview/MyCart"),
  { ssr: false }
);

export default function CustomerCartPage() {
  return (
    <div>
      <MyCart />
    </div>
  );
}
