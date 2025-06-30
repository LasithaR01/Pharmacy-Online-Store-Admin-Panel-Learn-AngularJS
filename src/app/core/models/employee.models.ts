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
  userName?: string;
  userEmail?: string;
  branchName?: string;
  branchLocation?: string;
}
