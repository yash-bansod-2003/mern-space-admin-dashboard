import { Layout } from "antd";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

export const NonAuthenticatedRoutes: React.FC = () => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Outlet />
    </Layout>
  );
};
