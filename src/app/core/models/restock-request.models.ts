// src/app/core/models/restock-request.models.ts
export enum RestockStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FULFILLED = 'FULFILLED'
}

export class RestockRequest {
  id: number;
  productId: number;
  branchId: number;
  requestedById: number;
  quantity: number;
  status: RestockStatus;
  supplierId?: number;
  notes?: string;
  approvedById?: number;
  createdAt: Date;
  approvedAt?: Date;

  // Additional display fields
  productName?: string;
  branchName?: string;
  requestedByName?: string;
  supplierName?: string;
  approvedByName?: string;
}
