export interface Rank {
  telegram_id: string;
  total_points: number;
  rank: number;
  name: string;
  imgurl?: string; // Optional, in case some users don't have an image URL
}
