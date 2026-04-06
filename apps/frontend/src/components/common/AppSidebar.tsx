import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Landmark, WalletCards } from "lucide-react";
import { Link } from "react-router";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link to="/" className="w-full flex flex-row gap-x-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Landmark />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Budget</span>
                  <span className="truncate text-xs">Friendly</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarMenu className="px-2">
          <SidebarMenuButton asChild tooltip={"Accounts"}>
            <Link to="/accounts">
              <WalletCards />
              <span>Accounts</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-center border-t pt-2">
          <div className="font-mono text-sm text-stone-400">v1.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
