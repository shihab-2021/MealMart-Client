"use client";
import dynamic from "next/dynamic";

const MealListingPage = dynamic(
  () => import("@/components/modules/Dashboard/MealList/MealList"),
  { ssr: false }
);

export default function page() {
  return (
    <>
      <MealListingPage />
    </>
  );
}
