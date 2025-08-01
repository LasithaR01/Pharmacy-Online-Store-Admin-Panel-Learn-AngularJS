// src/app/core/models/customer.models.ts
export class Customer {
  id: number;
  userId: number;
  address: string;
  dateOfBirth: Date;
  loyaltyPoints: number;
  name: string;
  phoneNumber: string;
  createdAt: Date;

  // Additional display fields
  userName?: string;
  userEmail?: string;
  userContactNumber?: string;
}
