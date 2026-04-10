import AccountsRef from "@/features/accounts/AccountsReference";
import AppLayout from "@/components/layout/AppLayout";
import { AccountsPage, Dashboard, LoginPage } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "@/components/layout/AuthLayout";
import { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      Component: AppLayout,
      children: [
        { index: true, Component: Dashboard },
        { path: "accounts", Component: AccountsPage },
        {
          path: "auth",
          Component: AuthLayout,
          children: [{ path: "login", Component: LoginPage }],
        },
        {
          path: "accountsref",
          Component: AccountsRef,
        },
      ],
    },
  ]);

function AppRouter() {
  const queryClient = new QueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
