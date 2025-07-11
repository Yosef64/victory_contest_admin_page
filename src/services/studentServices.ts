import { User } from "@/types/user";
import api from "./api";

export async function getUserProfile(userId: string): Promise<User> {
  const res = await api.get(`/api/student/profile/${userId}`);

  return res.data.user;
}
export async function updateUserInfo(student: any) {
  const res = await api.put(`/api/student/${student.student_id}`, { student });

  return res.data;
}
