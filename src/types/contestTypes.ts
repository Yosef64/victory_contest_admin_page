import { Student } from "./models";

export interface Rank extends Student {
  telegram_id: string;
  total_points: number;
  rank: number;
}
