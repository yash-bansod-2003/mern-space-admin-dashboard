import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";
import { NonAuthenticatedRoutes } from "@/layouts/nonAuthenticatedRoutes";
import { Dashboard } from "@/layouts/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <div>Hello World</div>,
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
]);

// non authenticated routes
