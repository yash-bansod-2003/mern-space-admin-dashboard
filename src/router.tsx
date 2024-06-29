import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";

export const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <div>Hello World</div>,
  },
]);
