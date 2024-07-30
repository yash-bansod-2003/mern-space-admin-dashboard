import { api } from "./client";
import type { Credentials, User } from "@/types";

export const login = async (values: Credentials) => {
  const { email, password } = values;
  const response = api.post("api/v1/login", { email, password });
  return response;
};

export const logout = async () => {
  const response = api.post("/api/v1/logout");
  return response;
};

export const self = async () => {
  const response = api.get("/api/v1/user");
  return response;
};

export const getUsers = async () => {
  const response = api.get("/api/v1/admin/users");
  return response;
};

export const createUser = async (user: User) => {
  const response = api.post("/api/v1/admin/users", user);
  return response;
};

export const getRestaurants = async () => {
  const response = api.get("/api/v1/tenants");
  return response;
};
