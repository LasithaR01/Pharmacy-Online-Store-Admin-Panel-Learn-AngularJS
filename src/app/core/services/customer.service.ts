import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Customer } from "../models/customer.models";

@Injectable({ providedIn: "root" })
export class CustomerService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Customer[]>("customers");
  }

  getById(id: string) {
    return this.get<Customer>(`customers/${id}`);
  }

  getByPhoneNumber(phoneNumber: string) {
    return this.get<Customer>(`customers/${phoneNumber}`);
  }

  create(branch: Partial<Customer>) {
    return this.post("customers", branch);
  }

  update(id: string, branch: Partial<Customer>) {
    return this.put(`customers/${id}`, branch);
  }

  remove(id: string) {
    return this.delete(`customers/${id}`);
  }
}
