"use client";

import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import CompanyHeader from "./company-header";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

const data = {
  projects: [
    {
      name: "My Videos",
      url: "/dashboard/my-videos",
      icon: Frame,
    },
    {
      name: "My Audios",
      url: "/dashboard/my-audios",
      icon: PieChart,
    },
    {
      name: "My Automations",
      url: "/dashboard/my-automations",
      icon: Map,
    },
  ],
  navMain: [
    {
      title: "Ai",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Voiceovers",
          url: "#",
        },
        {
          title: "Video generations",
          url: "#",
        },
        {
          title: "Thumbnails",
          url: "#",
        },
      ],
    },
    {
      title: "Automation Channels",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Youtube",
          url: "#",
        },
        {
          title: "Tiktok",
          url: "#",
        },
        {
          title: "Instagram",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
