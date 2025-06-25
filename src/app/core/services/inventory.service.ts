// src/app/core/services/inventory.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class InventoryService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Inventory[]> {
    return this.get<Inventory[]>('inventory');
  }

  getById(id: number): Observable<Inventory> {
    return this.get<Inventory>(`inventory/${id}`);
  }

  create(inventory: Partial<Inventory>): Observable<Inventory> {
    return this.post<Inventory>('inventory', inventory);
  }

  update(id: number, inventory: Partial<Inventory>): Observable<Inventory> {
    return this.put<Inventory>(`inventory/${id}`, inventory);
  }

  // @ts-ignore
  delete(id: number): Observable<void> {
    // @ts-ignore
    return this.delete<void>(`inventory/${id}`);
  }
}
