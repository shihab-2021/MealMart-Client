"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { DashboardSidebar } from "@/components/shared/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <div className="w-full px-4 sm:px-6 lg:px-8 font-arima">
          <DashboardHeader />
          <div>{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
