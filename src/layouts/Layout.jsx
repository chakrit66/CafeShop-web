import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/navbar/AppSidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-1 sm:flex-row pt-2">
          <SidebarTrigger />
          <Navbar />
        </header>
        <div className="p-4 pt-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
