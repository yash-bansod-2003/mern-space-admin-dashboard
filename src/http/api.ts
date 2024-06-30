import { api } from "./client";
import type { Credentials } from "@/types";

export const login = async (values: Credentials) => {
  const { email, password } = values;
  const response = api.post("/auth/login", { email, password });
  return response;
};
