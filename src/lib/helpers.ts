import { Submission } from "@/types/models";

export function transformSubmission(submissions: Submission[]) {
  submissions.sort((a: Submission, b: Submission) =>
    b.score !== a.score
      ? b.score - a.score
      : parseInt(a.submission_time, 10) - parseInt(b.submission_time, 10)
  );

  const leaderboard = submissions.map((sub, index) => {
    return {
      name: sub.student.name,
      rank: index + 1,
      penalty: sub.missed_question.length,
      solved: sub.score,
    };
  });
  return leaderboard;
}
