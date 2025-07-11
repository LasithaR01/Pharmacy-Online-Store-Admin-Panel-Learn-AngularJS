import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Supplier } from "../models/supplier.models";

@Injectable({ providedIn: "root" })
export class SupplierService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Supplier[]>("suppliers");
  }

  getById(id: string) {
    return this.get<Supplier>(`suppliers/${id}`);
  }

  create(branch: Partial<Supplier>) {
    return this.post("suppliers", branch);
  }

  update(id: string, branch: Partial<Supplier>) {
    return this.put(`suppliers/${id}`, branch);
  }

  remove(id: string) {
    return this.delete(`suppliers/${id}`);
  }
}
