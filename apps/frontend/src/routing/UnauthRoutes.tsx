import { LoginPage } from "@/pages";
import { Route, Routes } from "react-router";

function UnauthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default UnauthRoutes;
