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
  id?: string;
  date?: Date;
  title: string;
  description?: string;
  questions: Question[];
  start_time: string;
  end_time: string;
  active_contenstants?: Student[];
  submissions?: Submission[];
  grade: string;
  subject: string;
}

export interface Question {
  id?: string;
  question_text: string;
  multiple_choice: string[];
  answer: string;
  explanation: string;
  grade: string;
  chapter: string;
  subject: string;
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
  missed_question: Question[];
}
