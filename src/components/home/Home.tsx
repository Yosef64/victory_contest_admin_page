import { useState, useEffect } from "react";
import StatCard, { StatCardProps } from "./StatCard";
<<<<<<< HEAD
import { Box, Typography } from "@mui/material";
=======
import Grid from "@mui/material/Grid2";

import { Box, Stack, Typography, CircularProgress } from "@mui/material";
>>>>>>> f8e9239435faf1a35dc8fa998a7b7130b3b92e22
import HighlightedCard from "./HighlightedCard";
import ChartUserByCountry from "./ChartUserByCountry";
<<<<<<< HEAD
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";

const data: StatCardProps[] = [
  {
    title: "Users",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "Revenue",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
  {
    title: "Contest count",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

=======
import CustomizedDataGrid from "./CustomizedDataGrid";
import { columns } from "./gridData";
import { getDashboardStats } from "../../services/api";
import { DashboardStatsResponse } from "../../types/dashboard";

>>>>>>> f8e9239435faf1a35dc8fa998a7b7130b3b92e22
export default function Home() {
  const [dashboardData, setDashboardData] =
    useState<DashboardStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !dashboardData) {
    return (
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
        <Typography color="error" variant="h6">
          {error || "No data available"}
        </Typography>
      </Box>
    );
  }

  // Transform dashboard data to StatCard format
  const statCards: StatCardProps[] = [
    {
      title: "Users",
      value: dashboardData.overview.total_users.value,
      interval: "Last 30 days",
      trend: dashboardData.overview.total_users.trend,
      data: dashboardData.overview.total_users.data,
      change: dashboardData.overview.total_users.change,
    },
    {
      title: "Revenue",
      value: dashboardData.overview.revenue.value,
      interval: "Last 30 days",
      trend: dashboardData.overview.revenue.trend,
      data: dashboardData.overview.revenue.data,
      change: dashboardData.overview.revenue.change,
    },
    {
      title: "Contest count",
      value: dashboardData.overview.total_contests.value,
      interval: "Last 30 days",
      trend: dashboardData.overview.total_contests.trend,
      data: dashboardData.overview.total_contests.data,
      change: dashboardData.overview.total_contests.change,
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
      {/* Welcome Section */}
      <Box sx={{ 
        mb: 4, 
        p: 4, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{ 
            mb: 2, 
            fontFamily: "'Public Sans',sans-serif", 
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Welcome to Victory Contest Admin
        </Typography>
        <Typography
          component="p"
          variant="h6"
          sx={{ 
            opacity: 0.9,
            fontWeight: 400,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          Manage your contests, questions, and user feedback with ease
        </Typography>
      </Box>

      <Typography
        component="h2"
        variant="h6"
        sx={{ mb: 2, fontFamily: "'Public Sans',sans-serif", fontWeight: 700 }}
      >
        Overview
      </Typography>
<<<<<<< HEAD
      
      {/* Stat Cards Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4
      }}>
        {data.map((card, index) => (
          <Box key={index}>
=======
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {statCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
>>>>>>> f8e9239435faf1a35dc8fa998a7b7130b3b92e22
            <StatCard {...card} />
          </Box>
        ))}
        <Box>
          <HighlightedCard />
<<<<<<< HEAD
        </Box>
      </Box>

      {/* Analytics Charts Section */}
=======
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart userStats={dashboardData.user_stats} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart pageViewStats={dashboardData.page_view_stats} />
        </Grid>
      </Grid>
>>>>>>> f8e9239435faf1a35dc8fa998a7b7130b3b92e22
      <Typography
        component="h2"
        variant="h6"
        sx={{ mb: 2, fontFamily: "'Public Sans',sans-serif", fontWeight: 700 }}
      >
        Analytics
      </Typography>
<<<<<<< HEAD
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 3,
        mb: 4
      }}>
        <ChartUserByCountry />
        <PageViewsBarChart />
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <SessionsChart />
      </Box>

      {/* Quick Actions Section */}
      <Box sx={{ 
        p: 3, 
        borderRadius: 3, 
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 3, fontFamily: "'Public Sans',sans-serif", fontWeight: 700 }}
        >
          Quick Actions
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2
        }}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'primary.main', 
            color: 'primary.contrastText',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Create Contest
            </Typography>
          </Box>
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'secondary.main', 
            color: 'secondary.contrastText',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Add Questions
            </Typography>
          </Box>
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'success.main', 
            color: 'success.contrastText',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              View Feedback
            </Typography>
          </Box>
        </Box>
      </Box>
=======
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid
            value={{ rows: dashboardData.recent_activity, columns }}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <ChartUserByCountry userStats={dashboardData.user_stats} />
          </Stack>
        </Grid>
      </Grid>
>>>>>>> f8e9239435faf1a35dc8fa998a7b7130b3b92e22
    </Box>
  );
}
