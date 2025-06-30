// src/app/core/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Customer[]> {
    return this.get<Customer[]>('customers');
  }

  getById(id: number): Observable<Customer> {
    return this.get<Customer>(`customers/${id}`);
  }

  getByUserId(userId: number): Observable<Customer> {
    return this.get<Customer>(`customers/user/${userId}`);
  }

  create(customer: Partial<Customer>): Observable<Customer> {
    return this.post('customers', customer);
  }

  update(id: number, customer: Partial<Customer>): Observable<Customer> {
    return this.put(`customers/${id}`, customer);
  }

  remove(id: number): Observable<void> {
    return this.delete<void>(`customers/${id}`);
  }

  getByLoyaltyPointsRange(min: number, max: number): Observable<Customer[]> {
    return this.get<Customer[]>(`customers/loyalty?minPoints=${min}&maxPoints=${max}`);
  }

  addLoyaltyPoints(id: number, points: number): Observable<Customer> {
    return this.post(`customers/${id}/loyalty/add`, { points });
  }

  redeemLoyaltyPoints(id: number, points: number): Observable<Customer> {
    return this.post(`customers/${id}/loyalty/redeem`, { points });
  }
}
