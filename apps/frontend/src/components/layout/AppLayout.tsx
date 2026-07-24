import AppHeader from "@/components/common/AppHeader";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <AppHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
