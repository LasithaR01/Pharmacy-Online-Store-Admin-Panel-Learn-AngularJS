// src/app/core/models/inventory.models.ts

export class Inventory {
  id: number;
  productId: number;
  branchId: number;
  shelfLocation: string;
  stockLevel: number = 0;
  minimumStockLevel: number;
  maximumStockLevel: number;
  lastRestocked: Date;
  lastUpdated: Date;
  expiryAlert: boolean = false;
  lowStockAlert: boolean = false;
  createdAt: Date;
}
