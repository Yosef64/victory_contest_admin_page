import { Box, Grid } from "@mui/material";
import React from "react";
import { ListOfContest, Rankings } from "./ListOfConAndUser.tsx";
export default function RankingAndContest({ grade, school }) {
  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={7.8}>
          <ListOfContest />
        </Grid>
        <Grid item xs={4.2}>
          <Rankings />
        </Grid>
      </Grid>
    </Box>
  );
}
