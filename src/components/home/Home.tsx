import { useState, useEffect } from "react";
import StatCard, { StatCardProps } from "./StatCard";
import { Box, Typography, CircularProgress } from "@mui/material";
import HighlightedCard from "./HighlightedCard";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedDataGrid from "./CustomizedDataGrid";
import { columns } from "./gridData";
import { getDashboardStats } from "../../services/api";
import { DashboardStatsResponse } from "../../types/dashboard";

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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "24px",
          margin: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            color: "white",
          }}
        >
          <CircularProgress sx={{ color: "white" }} size={60} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Loading your dashboard...
          </Typography>
        </Box>
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
    <Box 
      sx={{ 
        width: "100%", 
        maxWidth: { sm: "100%", md: "1700px" }, 
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        borderRadius: "24px",
        margin: "16px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}
    >
      {/* Hero Welcome Section */}
      <Box 
        sx={{ 
          mb: 6, 
          p: { xs: 2, md: 4 }, 
          borderRadius: "24px", 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"rgba(255,255,255,0.1)\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
            opacity: 0.3,
          }
        }}
      >
        {/* Main Hero Content */}
        <div className="relative z-10 space-y-4">
          {/* Animated Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              {/* Main Icon Container */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center animate-pulse">
                <div className="text-3xl">📊</div>
              </div>
              
              {/* Rotating Rings */}
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-white/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-0 w-28 h-28 rounded-full border border-white/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-0 w-36 h-36 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '25s' }} />
              
              {/* Floating Stars */}
              <div className="absolute -top-2 -right-2 text-xl animate-bounce" style={{ animationDelay: '0s' }}>⭐</div>
              <div className="absolute -bottom-2 -left-2 text-lg animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
              <div className="absolute top-1/2 -right-5 text-base animate-bounce" style={{ animationDelay: '1s' }}>💎</div>
              <div className="absolute top-1/2 -left-5 text-base animate-bounce" style={{ animationDelay: '1.5s' }}>🚀</div>
            </div>
          </div>
          
          {/* Main Heading */}
          <Typography
            component="h1"
            variant="h2"
            sx={{ 
              mb: 3, 
              fontFamily: "'Poppins', 'Inter', sans-serif", 
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.15)',
              fontSize: { xs: '1.6rem', md: '2.4rem' },
              background: 'linear-gradient(45deg, #ffffff 30%, #f0f8ff 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
              lineHeight: 1.2
            }}
          >
            Victory Contest Administration
          </Typography>
          
          {/* Subtitle with Attractive Message */}
          <div className="space-y-3">
            <Typography
              component="p"
              variant="h5"
              sx={{ 
                opacity: 0.95,
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                fontSize: { xs: '0.95rem', md: '1.2rem' },
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.4,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.01em'
              }}
            >
              Comprehensive Contest Management & Analytics Dashboard
            </Typography>
            
            <Typography
              component="p"
              variant="h6"
              sx={{ 
                opacity: 0.9,
                fontWeight: 400,
                textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                fontSize: { xs: '0.85rem', md: '1rem' },
                maxWidth: '550px',
                margin: '0 auto',
                lineHeight: 1.5,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.005em'
              }}
            >
              Monitor contest performance, manage user registrations, analyze engagement metrics, and optimize your competition strategy with real-time insights
            </Typography>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
            <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <span className="text-white font-medium text-sm">View Analytics</span>
            </div>
            <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <span className="text-white font-medium text-sm">Manage Contests</span>
            </div>
          </div>
          
          {/* Stats Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 max-w-xl mx-auto">
            <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-xl font-bold text-white mb-1">📊</div>
              <div className="text-xs text-white/90">Performance Metrics</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-xl font-bold text-white mb-1">👥</div>
              <div className="text-xs text-white/90">User Management</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-xl font-bold text-white mb-1">📈</div>
              <div className="text-xs text-white/90">Growth Analytics</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '30px',
            left: '50px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            animation: 'float 8s ease-in-out infinite reverse',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' }
            }
          }}
        />
        
        {/* Additional Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '60px',
            left: '80px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            animation: 'float 10s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-15px)' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            animation: 'float 12s ease-in-out infinite reverse',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' }
            }
          }}
        />
      </Box>

      {/* Quick Stats Section */}
      <Box sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          sx={{ 
            mb: 4, 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 700,
            color: '#1a202c',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            '&::before': {
              content: '""',
              width: '4px',
              height: '32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '2px'
            }
          }}
        >
          📊 Dashboard Overview
        </Typography>
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {statCards.map((card, index) => (
            <div key={index}>
              <Box
                sx={{
                  transform: `translateY(${index * 20}px)`,
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: `translateY(${index * 20 - 15}px)`,
                  }
                }}
              >
                <StatCard {...card} />
              </Box>
            </div>
          ))}
        </div>
        
        {/* Highlighted Card */}
        <Box
          sx={{
            transform: 'translateY(40px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(25px)',
            }
          }}
        >
          <HighlightedCard />
        </Box>
      </Box>

      {/* Analytics Section */}
      <Box sx={{ mb: 6, mt: 8 }}>
        {/* Visual Separator */}
        <Box
          sx={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent)',
            mb: 4,
            borderRadius: '1px'
          }}
        />
        
        <Typography
          component="h2"
          variant="h4"
          sx={{ 
            mb: 4, 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 700,
            color: '#1a202c',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            '&::before': {
              content: '""',
              width: '4px',
              height: '32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '2px'
            }
          }}
        >
          📈 Analytics & Insights
        </Typography>
        
        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          <div className="lg:col-span-9">
            <Box
              sx={{
                transform: 'translateY(80px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(65px)',
                }
              }}
            >
              <CustomizedDataGrid
                value={{ rows: dashboardData.recent_activity, columns }}
              />
            </Box>
          </div>
          <div className="lg:col-span-3">
            <Box
              sx={{
                transform: 'translateY(100px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(85px)',
                }
              }}
            >
              <ChartUserByCountry userStats={dashboardData.user_stats} />
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
}