// src/app/core/models/notification.models.ts

export enum NotificationType {
  ORDER = 'ORDER',
  PRESCRIPTION = 'PRESCRIPTION',
  SYSTEM = 'SYSTEM',
  STOCK = 'STOCK'
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  notificationType: NotificationType;
  relatedId?: number;
  createdAt: Date;

  // Additional display fields
  userName?: string;
  relatedEntityType?: string;
}
