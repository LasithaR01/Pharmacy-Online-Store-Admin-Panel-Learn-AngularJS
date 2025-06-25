// src/app/core/services/order-item.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrderItem } from "../models/order-item.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class OrderItemService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<OrderItem[]>("order-items");
  }

  getById(id: number) {
    return this.get<OrderItem>(`order-items/${id}`);
  }

  create(orderItem: Partial<OrderItem>) {
    return this.post("order-items", orderItem);
  }

  update(id: number, orderItem: Partial<OrderItem>) {
    return this.put(`order-items/${id}`, orderItem);
  }

  updateQuantity(id: number, quantity: number) {
    return this.put(`order-items/${id}/quantity`, { quantity });
  }

  remove(id: number) {
    return this.delete(`order-items/${id}`);
  }
}
