"use client";
import dynamic from "next/dynamic";

const ManageProviderOrders = dynamic(
  () => import("@/components/modules/Dashboard/Provider/ManageProviderOrders"),
  { ssr: false }
);

export default function ProviderOrders() {
  return (
    <>
      <ManageProviderOrders />
    </>
  );
}
