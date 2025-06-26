// src/app/core/models/product-alternative.models.ts
export class ProductAlternative {
  id: number;
  productId: number;
  alternativeProductId: number;
  reason: string;
  createdAt: Date;

  // Additional display fields
  productName: string;
  alternativeProductName: string;
  productCategory: string;
  alternativeProductCategory: string;
  sameCategory: boolean;
  cheaperAlternative: boolean;
  inStock: boolean;
}
