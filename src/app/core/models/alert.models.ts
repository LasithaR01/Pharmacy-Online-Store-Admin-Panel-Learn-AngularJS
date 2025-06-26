// src/app/core/models/alert.models.ts

export enum AlertType {
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  EXPIRY_WARNING = 'EXPIRY_WARNING',
  EXPIRY_CRITICAL = 'EXPIRY_CRITICAL',
  TRANSFER_REQUEST = 'TRANSFER_REQUEST',
  SYSTEM_ISSUE = 'SYSTEM_ISSUE',
  OTHER = 'OTHER'
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  RESOLVED = 'RESOLVED',
  REOPENED = 'REOPENED'
}

export interface Alert {
  id: number;
  productId: number;
  branchId: number;
  alertType: AlertType;
  message: string;
  triggeredById: number;
  resolved: boolean;
  resolvedById?: number;
  createdAt: Date;
  resolvedAt?: Date;
  status: AlertStatus;

  // Display fields
  productName?: string;
  branchName?: string;
  triggeredByName?: string;
  resolvedByName?: string;
  critical?: boolean;
}
