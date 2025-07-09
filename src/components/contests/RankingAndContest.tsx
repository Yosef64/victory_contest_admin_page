import { Box, Grid } from "@mui/material";
import { ListOfContest, Rankings } from "./ListOfConAndUser.tsx";

type RankingAndContestProps = {
  grade: { title: string; year: number | JSX.Element }[];
  subject: { title: string; year: number | JSX.Element }[];
};
export default function RankingAndContest({
  grade,
  subject,
}: RankingAndContestProps) {
  console.log(subject);
  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={7.8}>
          <ListOfContest subject={subject} grade={grade} />
        </Grid>
        <Grid item xs={4.2}>
          <Rankings />
        </Grid>
      </Grid>
    </Box>
  );
}
