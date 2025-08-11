import { Contest, Question, Submission } from "@/types/models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
const VITE_API_LINK = import.meta.env.VITE_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//Student Action

export async function deleteContest(contest_id: string) {
  if (!contest_id) {
    throw new Error("Contest ID is missing");
  }
  const res = await axios.delete(
    `${VITE_API_LINK}/api/contest/delete/${contest_id}`
  );
  return res.data;
}

export async function getContestById(id: string): Promise<Contest> {
  const res = await axios.get(`${VITE_API_LINK}/api/contest/${id}`);
  const { contest } = res.data;
  return contest;
}
export async function updateContest(
  contest: Contest,
  data: { start_time?: string; end_time?: string }
) {
  const res = await axios.patch(
    `${VITE_API_LINK}/api/contest/${contest.id}`,
    data
  );
  return res.data;
}

export async function announceContest(contest: Contest) {
  const finalContest = {
    ...contest,
    questions: contest.questions.map((question) => question.id),
  };
  const res = await axios.post(
    `${VITE_API_LINK}/api/notification/contest-announce`,
    finalContest
  );
  return res.data;
}
export async function getQuestions() {
  const res = await axios.get(`${VITE_API_LINK}/api/question/`);
  const { questions } = res.data;
  return questions;
}
export async function addQuestion(question: Question) {
  const res = await axios.post(`${VITE_API_LINK}/api/question/addquestion`, {
    question,
  });
  return res.data;
}
export async function addMultipleQuestions(questions: Question[]) {
  const results = [];
  for (const question of questions) {
    try {
      const formData = new FormData();
      Object.entries(question).forEach(([key, value]) => {
        if (key === "multiple_choice" && Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== null && v !== undefined) {
              formData.append(`multiple_choice`, v.toString());
            }
          });
        } else if (value !== null && value !== undefined) {
          if (key === "question_image" && value instanceof File) {
            formData.append("question_image", value);
          } else if (key === "explanation_image" && value instanceof File) {
            formData.append("explanation_image", value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const res = await axios.post(
        `${VITE_API_LINK}/api/question/addquestion`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      results.push(res.data);
    } catch (error) {
      results.push({ status: "failed", error: error });
    }
  }
  return results;
}

export async function updateQuestion(question: Question) {
  if (!question.id) {
    throw new Error("Question ID is missing for update.");
  }
  const formData = new FormData();
  Object.entries(question).forEach(([key, value]) => {
    if (key === "multiple_choice" && Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== null && v !== undefined) {
          formData.append(`multiple_choice`, v.toString());
        }
      });
    } else if (value !== null && value !== undefined) {
      if (key === "question_image" && value instanceof File) {
        formData.append("question_image", value);
      } else if (key === "explanation_image" && value instanceof File) {
        formData.append("explanation_image", value);
      } else if (key !== "id") {
        formData.append(key, value.toString());
      }
    }
  });

  const res = await axios.put(
    `${VITE_API_LINK}/api/question/updatequestion/${question.id}`,
    formData, // Send as FormData
    {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure correct content type for FormData
      },
    }
  );
  return res.data;
}
export async function deleteQusetion(id: string) {
  const res = await axios.delete(`${VITE_API_LINK}/api/question/delete/${id}`);
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
  const res = await axios.get(`${VITE_API_LINK}/api/admin/`);
  const { admins } = res.data;
  return admins;
}
export async function deleteAdmin(email: string) {
  const res = await axios.delete(`${VITE_API_LINK}/api/admin/${email}`);
  return res.data;
}
