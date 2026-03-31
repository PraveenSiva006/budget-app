import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";
import AppRoutes from "@/routing/AppRoutes";
import UnauthRoutes from "@/routing/UnauthRoutes";

function App() {
  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      {/* <AuthLayout>
        <UnauthRoutes />
      </AuthLayout> */}
    </>
  );
}
export default App;
