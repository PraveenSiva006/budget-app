import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import MainLayout from "@/layout/MainLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  </StrictMode>,
);
