export interface Student {
  name: string;
  telegram_id: string;
  sex: string;
  age: number;
  grade: number;
  school?: string;
  woreda?: string;
  city?: string;
  region?: string;
  imgurl?: string;
  contests: Contest[];
  payment?: Payment;
}
export interface Admin {
  name: string;
  password?: string;
  email: string;
  imgurl?: string;
  is_approved?: boolean;
}
export interface ExtendedContestSubmission extends Student {}

export interface Contest {
  id?: string;
  date: string | Date;
  title: string;
  description?: string;
  questions: string[];
  start_time: string;
  end_time: string;
  active_contenstants?: Student[];
  submissions?: Submission[];
  grade: string;
  subject: string;
  prize: string;
  status: string;
  type: "free" | "premium";
}
export interface Payment {
  id?: string;
  student: {
    student_id: string;
    imgurl: string;
    name: string;
  };
  contest_id: string;
  payment_date: string;
  amount: number;
  payment_status: "active" | "overdue" | "pending" | "unpaid" | "inactive";
  payment_method?: "cash" | "bank_transfer" | "mobile_money";
  transaction_id?: string;
  receipt_url?: string;
  notes?: string;
}
export interface Question {
  id?: string;
  question_text: string;
  multiple_choice: string[];
  answer: number | null;
  explanation: string;
  grade: string;
  chapter: string;
  subject: string;
  question_image?: string;
  explanation_image?: string;
}

export interface Submission {
  id?: string;
  student: {
    student_id: string;
    imgurl: string;
    name: string;
  };
  contest_id: string;
  submission_time: string;
  score: number;
  missed_questions: Question[];
}
