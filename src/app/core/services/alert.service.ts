// src/app/core/services/alert.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert.models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class AlertService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Alert[]> {
    return this.get<Alert[]>('alerts');
  }

  getById(id: number): Observable<Alert> {
    return this.get<Alert>(`alerts/${id}`);
  }

  create(alert: Partial<Alert>): Observable<Alert> {
    return this.post('alerts', alert);
  }

  update(id: number, alert: Partial<Alert>): Observable<Alert> {
    return this.put(`alerts/${id}`, alert);
  }

  resolve(id: number, resolvedById: number): Observable<Alert> {
    return this.post(`alerts/${id}/resolve`, { resolvedById });
  }

  resolveMultiple(alertIds: number[], resolvedById: number): Observable<void> {
    return this.post('alerts/resolve-multiple', { alertIds, resolvedById });
  }

  getUnresolved(): Observable<Alert[]> {
    return this.get<Alert[]>('alerts/unresolved');
  }

  getCritical(): Observable<Alert[]> {
    return this.get<Alert[]>('alerts/critical');
  }

  cleanupResolved(cutoffDate: Date): Observable<void> {
    return this.delete(`alerts/cleanup?cutoffDate=${cutoffDate.toISOString()}`);
  }
}
