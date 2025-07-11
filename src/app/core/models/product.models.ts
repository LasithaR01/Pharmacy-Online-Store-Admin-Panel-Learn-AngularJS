// tslint:disable-next-line: class-name
export class arrayModel {
  key: string;
  value: string;
}

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
  category: string;
  ratings = 0;
  reviewCount = 0;
  discount?: number;
  oriRate: number;
  disRate: number;
  feature: string[];
  images: string[];
  colorVariant: arrayModel[];
}
