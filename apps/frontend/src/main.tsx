import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import MainLayout from "@/layout/MainLayout";
import AppRoutes from "@/routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MainLayout>
  </StrictMode>,
);
