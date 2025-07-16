export enum RoleType {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_PHARMACIST = "ROLE_PHARMACIST",
  ROLE_CASHIER = "ROLE_CASHIER",
  ROLE_CUSTOMER = "ROLE_CUSTOMER",
  ROLE_SUPPLIER = "ROLE_SUPPLIER",
}

export const RoleOptions = [
  {
    label: "Admin",
    value: RoleType.ROLE_ADMIN,
  },
  {
    label: "Pharmacist",
    value: RoleType.ROLE_PHARMACIST,
  },
  {
    label: "Cashier",
    value: RoleType.ROLE_CASHIER,
  },
  {
    label: "Customer",
    value: RoleType.ROLE_CUSTOMER,
  },
  {
    label: "Supplier",
    value: RoleType.ROLE_SUPPLIER,
  },
];
