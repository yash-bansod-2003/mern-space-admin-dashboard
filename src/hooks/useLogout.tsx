import { useMutation } from "@tanstack/react-query";
import { logout } from "@/http/api";

const handleLogout = async () => {
  const { data } = await logout();
  return data;
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["auth/logout"],
    mutationFn: handleLogout,
  });
};
