// src/app/core/services/restock-request.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {RestockRequest, RestockStatus} from "../models/restock-request.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class RestockRequestService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<RestockRequest[]>("restock-requests");
  }

  getById(id: number) {
    return this.get<RestockRequest>(`restock-requests/${id}`);
  }

  create(restockRequest: Partial<RestockRequest>) {
    return this.post("restock-requests", restockRequest);
  }

  update(id: number, restockRequest: Partial<RestockRequest>) {
    return this.put(`restock-requests/${id}`, restockRequest);
  }

  remove(id: number) {
    return this.delete(`restock-requests/${id}`);
  }

  approveRequest(id: number, approvedById: number) {
    return this.post(`restock-requests/${id}/approve`, { approvedById });
  }

  approveMultipleRequests(ids: number[], approvedById: number) {
    return this.post(`restock-requests/approve-multiple`, { requestIds: ids, approvedById });
  }

  getByStatus(status: RestockStatus) {
    return this.get<RestockRequest[]>(`restock-requests/status/${status}`);
  }

  getActiveRequests() {
    return this.get<RestockRequest[]>("restock-requests/active");
  }
}
