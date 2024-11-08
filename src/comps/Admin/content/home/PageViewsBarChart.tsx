// import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%", borderRadius: 3 }}>
      <CardContent>
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
        >
          Passed Contestants
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="h5"
              component="p"
              sx={{ fontWeight: 600, fontFamily: "'Public Sans',sans-serif" }}
            >
              1.3M
            </Typography>
            <Chip
              size="small"
              sx={{
                backgroundColor: "#fff0f0",
                color: "red",
                fontFamily: "'Public Sans',sans-serif",
                fontWeight: 600,
              }}
              label="-8%"
            />
          </Stack>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              fontFamily: "'Public Sans',sans-serif",
            }}
          >
            Number of student passed for the last 6 contests
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: "band",
                categoryGapRatio: 0.5,
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              },
            ] as any
          }
          series={[
            {
              id: "page-views",
              label: "Page views",
              data: [2234, 3872, 2998, 4125, 3357, 2789, 2998],
              stack: "A",
            },
            {
              id: "downloads",
              label: "Downloads",
              data: [3098, 4215, 2384, 2101, 4752, 3593, 2384],
              stack: "A",
            },
            {
              id: "conversions",
              label: "Conversions",
              data: [4051, 2275, 3129, 4693, 3904, 2038, 2275],
              stack: "A",
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
