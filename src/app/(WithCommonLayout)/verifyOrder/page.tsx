"use client";
import dynamic from "next/dynamic";

const VerifyOrder = dynamic(
  () => import("@/components/modules/VerifyOrder/VerifyOrder"),
  { ssr: false }
);

export default function OrderVerification() {
  return (
    <>
      <VerifyOrder />
    </>
  );
}
