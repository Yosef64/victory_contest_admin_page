import { Rank } from "@/types/contestTypes";
import api from "./api";

export const getContests = async () => {
  const response = await api.get("/api/contest");
  return response.data;
};

export const getContestById = async (id: string) => {
  const response = await api.get(`/api/contest/${id}`);
  return response.data;
};
export const getRankings = async (): Promise<{ rankings: Rank[] }> => {
  const res = await api.get("/api/student/rank");
  return res.data;
};
