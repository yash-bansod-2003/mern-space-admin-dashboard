import * as React from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { self } from "@/http/api";
import { useAuthStore } from "@/store/auth";
import { AxiosError } from "axios";

const handleGetSelfDetails = async () => {
  const { data } = await self();
  return data;
};
export const RootLayout = () => {
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["auth/self"],
    queryFn: handleGetSelfDetails,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      if (failureCount < 3) {
        return true;
      }
      return false;
    },
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
