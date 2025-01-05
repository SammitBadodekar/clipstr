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
import { Rubik_Vinyl } from "next/font/google";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { workspace } from "@/db/schema";

const rubikVinyl = Rubik_Vinyl({
  variable: "--font-rubik-vinyl",
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
  const [currentWorkspace, setCurrentWorkspace] = React.useState<workspace>(
    workspaces[0],
  );
  return (
    <Sidebar variant="inset" className="bg-muted/50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Clapperboard className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span
                    className={`${rubikVinyl.className} truncate text-2xl font-black`}
                  >
                    ClipStr
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
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
