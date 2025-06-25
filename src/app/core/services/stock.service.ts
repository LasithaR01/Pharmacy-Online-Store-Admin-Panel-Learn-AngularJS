// src/app/core/services/stock.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Stock } from "../models/stock.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class StockService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Stock[]>("stocks");
  }

  getById(id: number) {
    return this.get<Stock>(`stocks/${id}`);
  }

  getByProduct(productId: number) {
    return this.get<Stock[]>(`stocks/product/${productId}`);
  }

  getByBranch(branchId: number) {
    return this.get<Stock[]>(`stocks/branch/${branchId}`);
  }

  create(stock: Partial<Stock>) {
    return this.post("stocks", stock);
  }

  update(id: number, stock: Partial<Stock>) {
    return this.put(`stocks/${id}`, stock);
  }

  remove(id: number) {
    return this.delete(`stocks/${id}`);
  }
}
