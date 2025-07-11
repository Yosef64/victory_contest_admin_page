import { Contest, Question, Student, Submission } from "@/types/models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
const VITE_API_LINK = import.meta.env.VITE_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//Student Action
export async function getAllStudents(): Promise<Student[]> {
  const res = await axios.get(`${VITE_API_LINK}/api/student/`);
  const { message }: { message: Student[] } = res.data;
  return message;
}
export async function deleteContest(contest_id: string) {
  const res = await axios.delete(
    `${VITE_API_LINK}/api/contest/delete/${contest_id}`
  );
  return res.data;
}
export async function getContests(): Promise<Contest[]> {
  const res = await axios.get(`${VITE_API_LINK}/api/contest`);
  const { contests } = res.data;
  return contests;
}
export async function addContest(contest: Contest) {
  const res = await axios.post(`${VITE_API_LINK}/api/contest/add`, { contest });
  return res.data;
}
export async function getContestById(contest_id: string): Promise<Contest> {
  const res = await axios.get(`${VITE_API_LINK}/api/contest/${contest_id}`);
  const { contest }: { contest: Contest } = res.data;
  return contest;
}
export async function announceContest(
  contest: Contest,
  data: { file: File | null; message: string }
) {
  const formData = new FormData();
  formData.append("file", data.file!);
  formData.append("contest", JSON.stringify(contest));
  formData.append("message", data.message);
  const res = await axios.post(
    `${VITE_API_LINK}/api/contest/announce`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    }
  );
  return res.data;
}
export async function updateContest(contest: Contest, data: Object) {
  const { id } = contest;
  const res = await axios.patch(`${VITE_API_LINK}/api/contest/${id}`, { data });
  return res.data;
}

//Action question

export async function addOneQuestion(question: Question): Promise<void> {
  const res = await axios.post(`${VITE_API_LINK}/api/question/addquestion`, {
    question,
  });
  return res.data;
}
export async function addMultipleQuestions(questions: Question[]) {
  const res = await axios.post(`${VITE_API_LINK}/api/question/addQuestions`, {
    questions,
  });
  return res.data;
}
export async function getQuestions(): Promise<Question[]> {
  const res = await axios.get(`${VITE_API_LINK}/api/question/`);
  const { questions } = res.data;
  return questions;
}
export async function updateQuestion(question: Question) {
  const { id } = question;
  if (!id) {
    throw new Error("Id not found");
  }
  const res = await axios.put(
    `${VITE_API_LINK}/api/question/updatequestion/${id}`,
    {
      question,
    }
  );
  return res.data;
}
export async function deleteQusetion(id: string) {
  const res = await axios.delete(
    `${VITE_API_LINK}/api/question/deletequestion/${id}`
  );
  return res.data;
}

//Action Submission
export async function getSubmissionByContest(
  id: string
): Promise<Submission[]> {
  const res = await axios.get(
    `${VITE_API_LINK}/api/submission/contest_id/${id}`
  );
  const { submissions }: { submissions: Submission[] } = res.data;
  return submissions;
}

//Admin

export async function loginUser(email: string, password: string) {
  const res = await axios.post(
    `${VITE_API_LINK}/api/admin/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return res.data;
}
export async function registerUser(data: {
  name: string;
  password: string;
  email: string;
}) {
  const res = await axios.post(`${VITE_API_LINK}/api/admin/register`, {
    data,
  });
  return res.data;
}
export async function approveAdmin(
  email: string,
  data: { isApproved: boolean }
) {
  const res = await axios.put(`${VITE_API_LINK}/api/admin/${email}`, { data });
  return res.data;
}
export async function getAllAdmins() {
  const res = await axios.get(`${VITE_API_LINK}/api/admin`);
  return res.data;
}
//Third Party

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dud4t1ptn/image/upload",
    formData
  );
  const { url } = res.data;
  return url;
}
