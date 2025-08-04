export type PaymentStatus = "pending" | "approved" | "rejected" | "expired";

export interface PaymentRequest {
  id: string;
  userId: string;
  fullName: string;
  bankName: string;
  billScreenshotUrl: string;
  status: PaymentStatus;
  rejectionReason?: string;
  createdAt: string; // Using string for simplicity, can be Date object
  updatedAt: string;
  expirationDate?: string;
}