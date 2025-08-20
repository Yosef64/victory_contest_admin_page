import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserStats } from "../../types/dashboard";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Activity, BarChart3, Eye } from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

interface SessionsChartProps {
  userStats: UserStats;
}

// 🎨 Enhanced Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[220px]">
        <p className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
          📅 {label}
        </p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div
              key={`item-${index}`}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium text-slate-600 capitalize">
                  {entry.name}
                </span>
              </span>
              <span className="font-bold text-slate-800">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function SessionsChart({ userStats }: SessionsChartProps) {
  const generateLabels = (dataLength: number) => {
    const labels = [];
    const currentDate = new Date();

    for (let i = dataLength - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      labels.push(label);
    }
    return labels;
  };

  const totalUsers =
    userStats.by_gender.male +
    userStats.by_gender.female +
    userStats.by_gender.other;

  const growthTrend = userStats.growth_trend;

  // Convert daily registration data to cumulative growth data
  const displayData = growthTrend.reduce(
    (acc: number[], current: number, index: number) => {
      const cumulative = index === 0 ? current : acc[index - 1] + current;
      acc.push(cumulative);
      return acc;
    },
    []
  );

  // If all trend data is zero but we have users, show the total at the end
  const hasAnyTrendData = displayData.some((val) => val > 0);
  if (!hasAnyTrendData && totalUsers > 0) {
    // Set the last day to show the total users (assuming they were all registered before the 30-day window)
    displayData[displayData.length - 1] = totalUsers;
  }

  const labels = generateLabels(displayData.length);

  const chartData = displayData.map((total, i) => {
    const femaleRatio = totalUsers
      ? userStats.by_gender.female / totalUsers
      : 0;
    const maleRatio = totalUsers ? userStats.by_gender.male / totalUsers : 0;
    const otherRatio = totalUsers ? userStats.by_gender.other / totalUsers : 0;

    return {
      date: labels[i],
      female: Math.round(total * femaleRatio),
      male: Math.round(total * maleRatio),
      other: Math.round(total * otherRatio),
    };
  });

  // Calculate growth percentage with proper handling of edge cases
  const calculateGrowthPercentage = () => {
    if (growthTrend.length < 2) return 0;

    const firstValue = growthTrend[0];
    const lastValue = growthTrend[growthTrend.length - 1];

    // If first value is 0, calculate based on whether we have growth
    if (firstValue === 0) {
      return lastValue > 0 ? 100 : 0; // 100% growth from 0, or 0% if still 0
    }

    // Normal percentage calculation
    const percentage = ((lastValue - firstValue) / firstValue) * 100;

    // Handle infinity and NaN cases
    if (!isFinite(percentage)) return 0;

    return Math.round(percentage);
  };

  const growthPercentage = calculateGrowthPercentage();

  return (
    <Card className="w-full rounded-3xl shadow-lg group relative overflow-hidden transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2">
      {/* Enhanced Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/70 backdrop-blur-xl border border-white/30 rounded-3xl" />
      
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-blue-400/30 to-purple-400/30 animate-pulse delay-1000" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 right-6 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-6 left-8 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Content */}
      <CardContent className="relative z-10 p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-500/50">
              <Users className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                Contestant Growth
              </h2>
              <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                User registration trends & analytics
              </p>
            </div>
          </div>
          
          {/* Enhanced Growth Badge */}
          <Badge 
            className={cn(
              "px-4 py-2 text-sm font-semibold border shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl",
              growthPercentage >= 0
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-200/50"
                : "bg-rose-50 text-rose-700 border-rose-200 shadow-rose-200/50"
            )}
          >
            <span className="flex items-center gap-2">
              {growthPercentage >= 0 ? (
                <TrendingUp className="w-4 h-4 animate-pulse" />
              ) : (
                <TrendingDown className="w-4 h-4 animate-pulse" />
              )}
              {growthPercentage >= 0 ? "+" : ""}
              {growthPercentage}%
            </span>
          </Badge>
        </div>

        {/* Enhanced Stats Summary */}
        <div className="grid grid-cols-1 gap-4">
          <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
            <p className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-purple-600 transition-all duration-500">
              {totalUsers.toLocaleString()}
            </p>
            <p className="text-sm text-slate-600 font-medium mt-1">Total contestants</p>
          </div>
        </div>

        {/* Enhanced Chart */}
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="female" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="male" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="other" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e40af" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#e2e8f0"
                opacity={0.6}
              />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="female"
                stroke="#60a5fa"
                fill="url(#female)"
                stackId="1"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:stroke-width-4"
              />
              <Area
                type="monotone"
                dataKey="male"
                stroke="#3b82f6"
                fill="url(#male)"
                stackId="1"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:stroke-width-4"
              />
              <Area
                type="monotone"
                dataKey="other"
                stroke="#1e40af"
                fill="url(#other)"
                stackId="1"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:stroke-width-4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Enhanced Legend */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2 group/legend transform transition-all duration-300 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-slate-600 font-medium group-hover/legend:text-blue-600 transition-colors duration-300">Female</span>
          </div>
          <div className="flex items-center gap-2 group/legend transform transition-all duration-300 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm text-slate-600 font-medium group-hover/legend:text-blue-700 transition-colors duration-300">Male</span>
          </div>
          <div className="flex items-center gap-2 group/legend transform transition-all duration-300 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-blue-800 animate-pulse" />
            <span className="text-sm text-slate-600 font-medium group-hover/legend:text-blue-800 transition-colors duration-300">Other</span>
          </div>
        </div>
      </CardContent>
      
      {/* Enhanced Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl scale-110" />
    </Card>
  );
}
