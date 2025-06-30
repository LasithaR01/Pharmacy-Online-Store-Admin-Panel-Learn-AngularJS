// src/app/core/services/supplier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class SupplierService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Supplier[]> {
    return this.get<Supplier[]>('suppliers');
  }

  getById(id: number): Observable<Supplier> {
    return this.get<Supplier>(`suppliers/${id}`);
  }

  create(supplier: Partial<Supplier>): Observable<Supplier> {
    return this.post('suppliers', supplier);
  }

  update(id: number, supplier: Partial<Supplier>): Observable<Supplier> {
    return this.put(`suppliers/${id}`, supplier);
  }

  remove(id: number): Observable<void> {
    return this.delete(`suppliers/${id}`);
  }
}
