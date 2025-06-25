// src/app/core/models/stock.models.ts
export class Stock {
  id: number;
  productId: number;
  supplierId: number;
  quantityAdded: number;
  unitCost: number;
  dateAdded: Date;
  expiryDate: Date;
  batchNumber: string;
  branchId: number;
  approvedById: number;

  // Optional display fields
  productName?: string;
  supplierName?: string;
  branchName?: string;
  approvedByName?: string;
  totalCost?: number; // Calculated field: quantityAdded * unitCost

  // Status fields
  expired?: boolean; // Calculated based on expiryDate
  expiringSoon?: boolean; // Calculated based on expiryDate
}
