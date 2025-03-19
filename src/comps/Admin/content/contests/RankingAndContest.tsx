import { Box, Grid } from "@mui/material";
import { ListOfContest, Rankings } from "./ListOfConAndUser.tsx";

type RankingAndContestProps = {
  grade: { title: string; year: number | JSX.Element }[];
  school: { title: string; year: number | JSX.Element }[];
};
export default function RankingAndContest({
  grade,
  school,
}: RankingAndContestProps) {
  console.log(school);
  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={7.8}>
          <ListOfContest grade={grade} />
        </Grid>
        <Grid item xs={4.2}>
          <Rankings />
        </Grid>
      </Grid>
    </Box>
  );
}
