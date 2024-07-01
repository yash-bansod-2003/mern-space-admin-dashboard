import * as React from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { self } from "@/http/api";
import { useAuthStore } from "@/store/auth";

const handleGetSelfDetails = async () => {
  const { data } = await self();
  return data;
};
export const RootLayout = () => {
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["auth/self"],
    queryFn: handleGetSelfDetails,
  });

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
