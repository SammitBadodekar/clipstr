"use client";

import * as React from "react";
import {
  BookOpen,
  Braces,
  ChartColumnBig,
  Clapperboard,
  Frame,
  Home,
  KeyRound,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

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
import { TiMediaFastForwardOutline } from "react-icons/ti";
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
      url: "/dashboard",
      icon: Home,
      hideArrow: true,
      isActive: true,
      items: [],
    },
    {
      title: "API Keys",
      url: "/dashboard/api-keys",
      icon: KeyRound,
      hideArrow: true,
      isActive: true,
      items: [],
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Data to JSON",
          url: "/dashboard/playground/data-to-json",
        },
        {
          title: "Website to JSON",
          url: "/dashboard/playground/website-to-json",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      hideArrow: true,
      items: [],
    },

    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      hideArrow: true,
      items: [],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
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
