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

export interface Tenant {
  id: number;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  tenantId?: number;
  tenant?: Tenant;
}
