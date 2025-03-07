"use client";
import dynamic from "next/dynamic";
import React from "react";

const PendingOrders = dynamic(
  () => import("@/components/modules/Dashboard/Admin/PendingOrders"),
  { ssr: false }
);

export default function page() {
  return (
    <>
      <PendingOrders />
    </>
  );
}
