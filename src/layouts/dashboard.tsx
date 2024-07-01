import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};
