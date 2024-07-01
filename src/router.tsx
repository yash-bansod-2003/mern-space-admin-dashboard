import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";
import { NonAuthenticatedRoutes } from "@/layouts/nonAuthenticatedRoutes";
import { Dashboard } from "@/layouts/dashboard";
import { RootLayout } from "./layouts/root";

import { HomePage } from "@/pages/home";
import { UsersPage } from "./pages/users";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuthenticatedRoutes />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

// non authenticated routes
