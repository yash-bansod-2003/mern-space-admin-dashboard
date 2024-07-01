import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useAuthStore = create(
  devtools<AuthStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    removeUser: () => set({ user: null }),
  })),
);
