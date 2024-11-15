export interface Student {
  name: string;
  telegram_id: string;
  gender: string;
  age: number;
  grade: number;
  school?: string;
  woreda?: string;
  city?: string;
  region?: string;
  image?: string;
  contests: Contest[];
}
export interface ExtendedContestSubmission extends Student {}

export interface Contest {
  contest_id: string;
  date: Date;
  title: string;
  description: string;
  questions?: Question[];
  start_time?: string;
  total_time:string;
  active_contenstants?: Student[];
  Submissions?: Submission[];
  grade: string;
  subject: string;
}

export interface Question {
  question_text: string;
  multiple_choice: string[];
  answer: string;
  explanation: string;
  grade: string;
  chapter: number;
}
export interface Submission {
  submission_id: string;
  student_id: string;
  contest_id: string;
  submission_time: string;
  score: number;
  wrongAnswer: string[];
}
