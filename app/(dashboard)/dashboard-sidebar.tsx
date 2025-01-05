"use client";

import * as React from "react";
import {
  Bell,
  Bookmark,
  BookOpen,
  Braces,
  ChartColumnBig,
  Clapperboard,
  Clock,
  Frame,
  Home,
  KeyRound,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { MdOutlineVideoLibrary } from "react-icons/md";

// import { NavMain } from "@/components/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { Jersey_15 } from "next/font/google";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { workspace } from "@/db/schema";

const SixtyfourFont = Jersey_15({
  variable: "--font-Jersey_15",
  subsets: ["latin"],
  weight: ["400"],
});

const data = {
  navMain: [
    {
      title: "My library",
      url: "/videos",
      icon: MdOutlineVideoLibrary,
      hideArrow: true,
      items: [],
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      hideArrow: true,
      items: [],
    },
    {
      title: "Watch Later",
      url: "/watch-later",
      icon: Bookmark,
      hideArrow: true,
      items: [],
    },

    {
      title: "History",
      url: "/history",
      icon: Clock,
      hideArrow: true,
      items: [],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      hideArrow: true,
      items: [],
    },
  ],
  navSecondary: [],
  projects: [],
};

export function DashboardSidebar({ workspaces }: { workspaces: workspace[] }) {
  const getCurrentWorkspace = (): workspace => {
    const currentWorkspaceId = localStorage.getItem("currentWorkspaceId");
    if (currentWorkspaceId) {
      return (
        workspaces.find((w) => w.id === currentWorkspaceId) ?? workspaces[0]
      );
    } else {
      return workspaces[0];
    }
  };
  const [currentWorkspace, setCurrentWorkspace] = React.useState<workspace>(
    getCurrentWorkspace(),
  );

  React.useEffect(() => {
    localStorage.setItem("currentWorkspaceId", currentWorkspace.id);
  }, [currentWorkspace]);

  return (
    <Sidebar variant="inset" className="bg-muted/50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary">
                  <Clapperboard className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span
                    className={`${SixtyfourFont.className} truncate text-4xl font-black text-primary`}
                  >
                    Clipstr
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-6">
        <WorkspaceSwitcher
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
          onWorkspaceSelect={(workspace) => setCurrentWorkspace(workspace)}
          onInviteClick={() => {}}
        />
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
