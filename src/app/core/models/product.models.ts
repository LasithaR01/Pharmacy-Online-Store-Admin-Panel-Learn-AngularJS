// src/app/core/models/product.models.ts
export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  expiryDate: Date;
  batchNumber: string;
  barcode: string;
  isPrescriptionRequired: boolean;
  categoryId: number;
  createdAt: Date;
}
