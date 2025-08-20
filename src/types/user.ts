export interface User {
  id?: string;
  name: string;
  age: number;
  city: string;
  imgurl?: string; // Optional field for user profile image URL
  grade: number;
  phoneNumber: string;
  region: string;
  school: string;
  gender: "male" | "female";
  telegram_id: string;
  totalPoints: number;
  payment: Payment;
  contestSubmissions: ContestSubmission[];
}
export type PaymentStatus = "Approved" | "Pending" | "Rejected" | "Expired";

export interface Payment {
  id: string;
  userId: string;
  fullName: string;
  bankName: string;
  billScreenshotUrl: string;
  status: PaymentStatus;
  rejectionReason?: string;
  createdAt: string; // ISO String
  updatedAt: string;
  expirationDate: string;
}
export interface ContestSubmission {
  id: string;
  contest: { title: string; subject: string; grade: string };
  totalQuestions: number;
  correctAnswers: number;
  missedQuestions: number;
  score: number;
  submittedAt: Date;
}

export interface SubjectAnalysis {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  missedQuestions: number;
  accuracy: number;
}

export interface GradeAnalysis {
  grade: number;
  totalQuestions: number;
  correctAnswers: number;
  missedQuestions: number;
  accuracy: number;
}
