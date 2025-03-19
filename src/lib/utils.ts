import { Contest, Question, Submission } from "@/comps/Admin/content/models";
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
  let imgurl = "";
  if (data.file) {
    imgurl = await uploadImage(data.file);
  }
  const announceData = { message: data.message, imgurl };
  const res = await axios.post(`${VITE_API_LINK}/api/contest/announce`, {
    contest,
    announceData,
  });
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
export async function getQuestions(): Promise<Question[]> {
  console.log(VITE_API_LINK);
  const res = await axios.get(`${VITE_API_LINK}/api/question/`);
  const { questions } = res.data;
  return questions;
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

//Third Party

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "victory_bot");
  formData.append("cloud_name", "dud4t1ptn");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dud4t1ptn/image/upload",
    formData
  );
  const { url } = res.data;
  return url;
}
