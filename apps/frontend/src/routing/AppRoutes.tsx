import AccountsRef from "@/features/accounts/AccountsReference";
import { AccountsPage, Dashboard, LoginPage } from "@/pages";
import { Route, Routes } from "react-router";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
      <Route path="/accountsref" element={<AccountsRef />} />
    </Routes>
  );
}

export default AppRoutes;
