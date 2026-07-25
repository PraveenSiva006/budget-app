import AccountsRef from "@/features/accounts/AccountsReference";
import AppLayout from "@/components/layout/AppLayout";
import {
  Accounts,
  Dashboard,
  LoginPage,
  Categories,
  Transactions,
} from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "@/components/layout/AuthLayout";

const createAppRouter = () =>
  createBrowserRouter([
    {
      Component: AppLayout,
      children: [
        { index: true, Component: Dashboard },
        { path: "accounts", Component: Accounts },
        { path: "categories", Component: Categories },
        { path: "transactions", Component: Transactions },
        {
          path: "accountsref",
          Component: AccountsRef,
        },
      ],
    },
    {
      path: "auth",
      Component: AuthLayout,
      children: [{ path: "login", Component: LoginPage }],
    },
  ]);

function AppRouter() {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
}

export default AppRouter;
