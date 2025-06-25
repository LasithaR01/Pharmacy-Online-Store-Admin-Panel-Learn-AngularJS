// src/app/core/models/order-item.models.ts
export class OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  discountAmount: number;
  productName?: string;
  productBarcode?: string;
  totalPrice?: number;
}
