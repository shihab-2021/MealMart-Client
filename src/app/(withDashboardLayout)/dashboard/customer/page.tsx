"use client";
import dynamic from "next/dynamic";

const DashboardOverview = dynamic(
  () =>
    import(
      "@/components/modules/Dashboard/DashboardOverview/DashboardOverview"
    ),
  { ssr: false }
);

export default function Dashboard() {
  return (
    <div>
      <DashboardOverview />
    </div>
  );
}
