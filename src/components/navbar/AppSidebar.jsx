import React from "react";
import { CircleUser } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useCafeStore from "@/store/cafe-store";
import Menu from "./Menu";

const AppSidebar = () => {
  const user = useCafeStore((s) => s.user);
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center ">
                  <CircleUser className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user && user.role_name}
                  </span>
                  <span className="truncate text-xs">cafe shop</span>
                </div>
              </a>
            </SidebarMenuButton>
            <div className="border-b-2"></div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Menu />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;  
