import { TooltipProvider } from "@/components/ui/tooltip";
import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";
import AppRoutes from "@/routing/AppRoutes";
import UnauthRoutes from "@/routing/UnauthRoutes";

function App() {
  return (
    <TooltipProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      {/* <AuthLayout>
        <UnauthRoutes />
      </AuthLayout> */}
    </TooltipProvider>
  );
}
export default App;
