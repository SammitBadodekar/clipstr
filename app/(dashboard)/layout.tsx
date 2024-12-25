import React from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
      </SidebarProvider>
      {children}
    </div>
  );
};

export default DashboardLayout;
