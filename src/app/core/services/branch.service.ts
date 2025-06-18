import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Branch } from "../models/branch.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class BranchService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Branch[]>("branches");
  }

  getById(id: string) {
    return this.get<Branch>(`branches/${id}`);
  }

  create(branch: Partial<Branch>) {
    return this.post("branches", branch);
  }

  update(id: string, branch: Partial<Branch>) {
    return this.put(`branches/${id}`, branch);
  }

  remove(id: string) {
    return this.delete(`branches/${id}`);
  }
}
