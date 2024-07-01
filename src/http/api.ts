import { api } from "./client";
import type { Credentials } from "@/types";

export const login = async (values: Credentials) => {
  const { email, password } = values;
  const response = api.post("/api/auth/login", { email, password });
  return response;
};

export const self = async () => {
  const response = api.get("/api/auth/self");
  return response;
};
