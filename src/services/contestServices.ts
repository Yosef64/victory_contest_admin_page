import { Rank } from "@/types/contestTypes";
import api from "./api";
import { APIContest, Contest } from "@/types/models";

export const getContests = async (): Promise<Contest[]> => {
  const response = await api.get("/api/contest/");
  return response.data.contests;
};

export const getContestById = async (id: string) => {
  const response = await api.get(`/api/contest/${id}`);
  return response.data;
};
export const getRankings = async (): Promise<{ leaderboard: Rank[] }> => {
  const res = await api.get("/api/submission/leaderboard?timeFrame=all");
  return res.data;
};
export async function addContest(contest: APIContest) {
  const res = await api.post(`/api/contest/add`, contest);
  return res.data;
}
