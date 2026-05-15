import { AppSidebar } from "@/components/common/AppSidebar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2" />
          </div>
          <AnimatedThemeToggler className="ml-auto mr-5 cursor-pointer border flex items-center justify-center rounded-full w-9 h-9" />
        </header>
        <div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
