import { PaymentRequest } from "@/types/payment";
import api from "./api";

// Simulate fetching data
export const fetchPendingPayments = async (): Promise<PaymentRequest[]> => {
  const res = await api.get("/api/payment/withstatus?status=Pending");
  return res.data.payments;
};

export const fetchExpiredPayments = async (): Promise<PaymentRequest[]> => {
  const res = await api.get("/api/payment/getexpired");
  return res.data.payments;
};

export const notifyUser = async (
  userId: string,
  paymentId: string
): Promise<{ success: boolean }> => {
  console.log(userId, paymentId);
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { success: true };
};

export const approvePaymentRequest = async (
  paymentId: string
): Promise<{ success: boolean }> => {
  await api.post(`/api/payment/update?payment_id=${paymentId}&status=Approved`);
  return { success: true };
};

// Simulate rejecting a payment
export const rejectPaymentRequest = async (
  paymentId: string,
  reason: string
): Promise<{ success: boolean }> => {
  await api.post(
    `/api/payment/update?payment_id=${paymentId}&status=Rejected`,
    { reason }
  );
  return { success: true };
};
export const pendPaymentRequest = async (
  paymentId: string
): Promise<{ success: boolean }> => {
  await api.post(`/api/payment/update?payment_id=${paymentId}&status=Pending`);
  return { success: true };
};

export const fetchApprovedPayments = async (): Promise<PaymentRequest[]> => {
  const res = await api.get("/api/payment/withstatus?status=Approved");
  return res.data.payments;
};

export const fetchRejectedPayments = async (): Promise<PaymentRequest[]> => {
  const res = await api.get("/api/payment/withstatus?status=Rejected");
  return res.data.payments;
};
