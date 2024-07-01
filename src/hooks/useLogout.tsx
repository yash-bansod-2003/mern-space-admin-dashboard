import { useMutation } from "@tanstack/react-query";
import { logout } from "@/http/api";
import { useAuthStore } from "@/store/auth";

const handleLogout = async () => {
  const { data } = await logout();
  return data;
};

export const useLogout = () => {
  const { removeUser } = useAuthStore();
  return useMutation({
    mutationKey: ["auth/logout"],
    mutationFn: handleLogout,
    onSuccess: () => {
      removeUser();
    },
  });
};
