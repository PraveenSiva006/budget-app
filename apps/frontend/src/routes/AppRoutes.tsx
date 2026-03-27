import AccountsRef from "@/features/accounts/AccountsReference";
import { Accounts, Dashboard } from "@/pages";
import { Route, Routes } from "react-router";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/accountsref" element={<AccountsRef />} />
    </Routes>
  );
}

export default AppRoutes;
