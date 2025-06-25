// src/app/core/models/prescription.models.ts

export enum PrescriptionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export class Prescription {
  id: number;
  userId: number;
  doctorName: string;
  doctorContact: string;
  prescriptionDate: Date;
  status: PrescriptionStatus;
  notes: string;
  documentUrl: string;
  approvedById?: number;
  createdAt?: Date;
  approvedAt?: Date;

  // Additional display fields
  userName?: string;
  approvedByName?: string;
}
