// src/app/core/services/prescription.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription, PrescriptionStatus } from '../models/prescription.models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class PrescriptionService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Prescription[]> {
    return this.get<Prescription[]>('prescriptions');
  }

  getById(id: number): Observable<Prescription> {
    return this.get<Prescription>(`prescriptions/${id}`);
  }

  create(prescription: Partial<Prescription>): Observable<Prescription> {
    return this.post<Prescription>('prescriptions', prescription);
  }

  update(id: number, prescription: Partial<Prescription>): Observable<Prescription> {
    return this.put<Prescription>(`prescriptions/${id}`, prescription);
  }

  approve(id: number, approvedById: number): Observable<Prescription> {
    return this.post<Prescription>(`prescriptions/${id}/approve`, { approvedById });
  }

  reject(id: number, rejectedById: number): Observable<Prescription> {
    return this.post<Prescription>(`prescriptions/${id}/reject`, { rejectedById });
  }

 // @ts-ignore
  delete(id: number): Observable<void> {
    return super.delete(`prescriptions/${id}`);
  }

  getByUser(userId: number): Observable<Prescription[]> {
    return this.get<Prescription[]>(`prescriptions/user/${userId}`);
  }

  getByStatus(status: PrescriptionStatus): Observable<Prescription[]> {
    return this.get<Prescription[]>(`prescriptions/status/${status}`);
  }
}
