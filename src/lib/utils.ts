import { Contest, Question } from "@/comps/Admin/content/models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
const VITE_API_LINK = import.meta.env.VITE_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  const res = await axios.post(`${VITE_API_LINK}/api/contest`, { contest });
  return res.data;
}
//Action question

export async function addOneQuestion(question: Question): Promise<void> {
  const res = await axios.post(`${VITE_API_LINK}/api/question/addquestion`, {
    question,
  });
  return res.data;
}
export async function getQuestions(): Promise<Question[]> {
  console.log(VITE_API_LINK);
  const res = await axios.get(`${VITE_API_LINK}/api/question/`);
  const { questions } = res.data;
  return questions;
}
