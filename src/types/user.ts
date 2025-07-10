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
  sex: "male" | "female";
  telegram_id: string;
  totalPoints: number;
  payment: Payment;
  contestSubmissions: ContestSubmission[];
}
export interface Payment {
  paymentStatus: "active" | "overdue" | "pending" | "unpaid" | "inactive";
  lastPayment: Date | string;
  nextPayment: Date;
}
export interface ContestSubmission {
  id: string;
  contest: { title: string; subject: string; grade: number };
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
