export interface Credentials {
  email: string;
  password: string;
  remember: boolean;
}

export enum Roles {
  CUSTOMER = "customer",
  MANAGER = "manager",
  ADMIN = "admin",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
}
