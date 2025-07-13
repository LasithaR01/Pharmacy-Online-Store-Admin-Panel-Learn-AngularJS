// src/app/core/models/employee.models.ts
export class Employee {
  id: number;
  userId: number;
  branchId: number;
  position: string;
  salary: number;
  hireDate: Date;
  createdAt: Date;

  // Additional display fields
  username?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  branchName?: string;
  branchLocation?: string;
}
