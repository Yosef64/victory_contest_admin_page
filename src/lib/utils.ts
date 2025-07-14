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
   if (!contest_id) {
    throw new Error("Contest ID is missing");
  }
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
export async function getContestById(id: string): Promise<Contest> {
  const res = await axios.get(`${VITE_API_LINK}/api/contest/${id}`);
  const { contest } = res.data;
  return contest;
}

// Updated updateContest function to send data directly
export async function updateContest(contest: Contest, data: { start_time?: string; end_time?: string }) {
  // Ensure the data is sent directly as the request body, not wrapped in another 'data' object
  const res = await axios.patch(`${VITE_API_LINK}/api/contest/${contest.id}`, data);
  return res.data;
}

export async function announceContest(contest: Contest, data: { file: File | null; message: string }) {
  const formData = new FormData();
  formData.append('contest', JSON.stringify(contest)); // Stringify contest object
  formData.append('message', data.message);
  if (data.file) {
    formData.append('file', data.file);
  }

  const res = await axios.post(`${VITE_API_LINK}/api/contest/announce`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}


//Question Action
export async function getQuestions() {
  const res = await axios.get(`${VITE_API_LINK}/api/question/`);
  const { questions } = res.data;
  return questions;
}
export async function addQuestion(question: Question) {
  // This function is used for adding a single question
  const res = await axios.post(`${VITE_API_LINK}/api/question/addquestion`, {
    question,
  });
  return res.data;
}

// New function to add multiple questions
export async function addMultipleQuestions(questions: Question[]) {
  // Assuming your backend's /api/question/addquestion endpoint can handle single questions
  // We will iterate and send each question individually.
  // If you have a dedicated bulk upload endpoint on your backend, this logic should be changed.
  const results = [];
  for (const question of questions) {
    try {
      // Create a FormData for each question if it contains files (images)
      // Otherwise, send as JSON.
      // For simplicity, assuming question objects might contain image files,
      // and the backend's addquestion endpoint expects FormData for images.
      // If your backend expects JSON for questions without images, adjust this.

      const formData = new FormData();
      // Append all question fields
      Object.entries(question).forEach(([key, value]) => {
        if (key === "multiple_choice" && Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== null && v !== undefined) {
              formData.append(`multiple_choice`, v.toString());
            }
          });
        } else if (value !== null && value !== undefined) {
          // Assuming 'question_image' and 'explanation_image' are directly on the question object
          if (key === "question_image" && value instanceof File) {
            formData.append("question_image", value);
          } else if (key === "explanation_image" && value instanceof File) {
            formData.append("explanation_image", value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // If the question object itself has image properties (e.g., question.question_image),
      // ensure they are appended as File objects. The ProcessFile function should handle this.
      // If ProcessFile gives you a Question object *with* File objects for images,
      // the above loop will handle it. If it gives base64 or URLs, you'd need different logic.

      const res = await axios.post(`${VITE_API_LINK}/api/question/addquestion`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type for FormData
        },
      });
      results.push(res.data);
    } catch (error) {
      console.error("Error adding single question in bulk upload:", error);
      // Depending on requirements, you might want to throw an error,
      // or collect failed results. For now, just log and continue.
      results.push({ status: 'failed', error: error });
    }
  }
  return results; // Return results for all additions
}


export async function updateQuestion(question: Question) {
  // Assuming question.id exists for updates
  if (!question.id) {
    throw new Error("Question ID is missing for update.");
  }

  const formData = new FormData();
  // Append all question fields, similar to addQuestion
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
      } else if (key !== "id") { // Don't append the ID itself to the form data for a PUT/PATCH body
        formData.append(key, value.toString());
      }
    }
  });

  const res = await axios.put(
    `${VITE_API_LINK}/api/question/updatequestion/${question.id}`,
    formData, // Send as FormData
    {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct content type for FormData
      },
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
  const res = await axios.get(`${VITE_API_LINK}/api/admin/`);
  const { admins } = res.data;
  return admins;
}
export async function deleteAdmin(email: string) {
  const res = await axios.delete(`${VITE_API_LINK}/api/admin/${email}`);
  return res.data;
}
