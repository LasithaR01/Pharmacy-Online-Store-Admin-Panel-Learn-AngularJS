// src/app/core/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Order, OrderItem, OrderStatus, PaymentMethod, PaymentStatus } from '../models/order.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Order[]>('orders');
  }

  getById(id: number) {
    return this.get<Order>(`orders/${id}`);
  }

  create(order: Partial<Order>) {
    return this.post('orders', order);
  }

  updateStatus(id: number, status: OrderStatus) {
    return this.put(`orders/${id}/status`, { status });
  }

  updatePaymentStatus(id: number, paymentStatus: PaymentStatus) {
    return this.put(`orders/${id}/payment-status`, { paymentStatus });
  }

  checkout(id: number, paymentMethod: PaymentMethod) {
    return this.post(`orders/${id}/checkout`, { paymentMethod });
  }

  // Option 1: Rename the method to avoid conflict
  deleteOrder(id: number): Observable<any> {
    return super.delete(`orders/${id}`);
  }

  // Option 2: Properly override with the same signature
  /*
  override delete<T>(url: string): Observable<T> {
    return super.delete<T>(url);
  }
  */

  getOrderItems(orderId: number) {
    return this.get<OrderItem[]>(`orders/${orderId}/items`);
  }
}
