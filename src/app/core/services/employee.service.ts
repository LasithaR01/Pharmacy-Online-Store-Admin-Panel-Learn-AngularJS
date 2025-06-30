// src/app/core/services/employee.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class EmployeeService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Employee[]>("employees");
  }

  getById(id: number) {
    return this.get<Employee>(`employees/${id}`);
  }

  getByBranch(branchId: number) {
    return this.get<Employee[]>(`employees/branch/${branchId}`);
  }

  getByPosition(position: string) {
    return this.get<Employee[]>(`employees/position/${position}`);
  }

  getByUserId(userId: number) {
    return this.get<Employee>(`employees/user/${userId}`);
  }

  create(employee: Partial<Employee>) {
    return this.post("employees", employee);
  }

  update(id: number, employee: Partial<Employee>) {
    return this.put(`employees/${id}`, employee);
  }

  remove(id: number) {
    return this.delete(`employees/${id}`);
  }
}
