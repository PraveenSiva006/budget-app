import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

function AppProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster />
    </TooltipProvider>
  );
}
export default AppProvider;
