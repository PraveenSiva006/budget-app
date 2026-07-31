import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/react-query").QueryClient;
  }
}

function AppProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster />
    </TooltipProvider>
  );
}
export default AppProvider;
