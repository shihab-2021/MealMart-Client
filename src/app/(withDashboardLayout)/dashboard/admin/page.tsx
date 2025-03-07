"use client";
import dynamic from "next/dynamic";

const AdminDashboardOverview = dynamic(
  () => import("@/components/modules/Dashboard/Admin/AdminDashboardOverview"),
  { ssr: false }
);
const VerifyOrg = dynamic(
  () => import("@/components/modules/Dashboard/Admin/VerifyOrg"),
  { ssr: false }
);

export default function OrganizationVerificationDashboard() {
  return (
    <div className="pb-6">
      <VerifyOrg />
      <AdminDashboardOverview />
    </div>
  );
}
