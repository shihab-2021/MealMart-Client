import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div>
        <DashboardSidebar />
        <div className="w-full px-4 sm:px-6 lg:px-8 font-arima">
          <DashboardHeader />
          <div>{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
