// src/app/core/models/supplier.models.ts
export class Supplier {
  id: number;
  userId: number;
  companyName: string;
  address: string;
  taxId: string;
  createdAt: Date;
  totalStockItems?: number;
  userEmail?: string;
}
