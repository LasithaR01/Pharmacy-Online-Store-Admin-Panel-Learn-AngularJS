// src/app/core/models/order.models.ts
export class Order {
  id: number;
  userId: number;
  branchId: number;
  orderDate: Date;
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes: string;
  processedById: number;
  orderItems: OrderItem[];
  userName: string;
  branchName: string;
  processedByName: string;
}

export class OrderItem {
  // id: number;
  // orderId: number;
  productId: number;
  quantity: number;
  price: number;
  discountAmount: number;
  productBarcode: string;
  totalPrice: number;
  productName: string;
}

export enum OrderStatus {
  CART = 'CART',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}
