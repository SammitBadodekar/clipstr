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

const rubikVinyl = Rubik_Vinyl({
  variable: "--font-rubik-vinyl",
  subsets: ["latin"],
  weight: ["400"],
});

const data = {
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
      hideArrow: true,
      items: [],
    },
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

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className="bg-muted/50">
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
    </Sidebar>
  );
}
