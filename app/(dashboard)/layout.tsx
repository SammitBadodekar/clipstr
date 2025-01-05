import React from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getMyWorkspaces } from "@/lib/db-queries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const workspaces = await getMyWorkspaces(session?.user.id!);
  console.log(workspaces);

  if (workspaces.length === 0) {
    redirect("/onboarding/workspaces");
  }
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar workspaces={workspaces} />
        <SidebarInset>
          <Separator orientation="vertical" className="h-4" />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
