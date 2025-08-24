"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { PageViewStats } from "../../types/dashboard";
import { TrendingUp, TrendingDown, Eye, Users } from "lucide-react";

interface PageViewsBarChartProps {
  pageViewStats: PageViewStats;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[180px]">
        <p className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
          {payload[0].payload.day}
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Views:</span>
            <span className="text-sm font-bold text-blue-600">
              {payload[0].value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function PageViewsBarChart({
  pageViewStats,
}: PageViewsBarChartProps) {
  // Calculate total views and growth
  const totalViews = pageViewStats.total_views;
  const viewsByDay = pageViewStats.views_by_day;

  // Calculate growth percentage (comparing first and last week)
  const firstWeekViews = viewsByDay
    .slice(0, 7)
    .reduce((sum, val) => sum + val, 0);
  const lastWeekViews = viewsByDay.slice(-7).reduce((sum, val) => sum + val, 0);

  const viewsGrowth =
    firstWeekViews > 0
      ? Math.round(((lastWeekViews - firstWeekViews) / firstWeekViews) * 100)
      : lastWeekViews > 0
      ? 100
      : 0;

  // Generate day labels for the last 30 days
  const generateDayLabels = (dataLength: number) => {
    const labels = [];
    const currentDate = new Date();
    for (let i = dataLength - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      labels.push(
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    }
    return labels;
  };

  const dayLabels = generateDayLabels(viewsByDay.length);

  // Build chart data - group by weeks for better visualization
  const chartData = [];
  for (let i = 0; i < viewsByDay.length; i += 7) {
    const weekViews = viewsByDay
      .slice(i, i + 7)
      .reduce((sum, val) => sum + val, 0);
    const weekStart = dayLabels[i];
    const weekEnd = dayLabels[Math.min(i + 6, dayLabels.length - 1)];

    chartData.push({
      week: `${weekStart} - ${weekEnd}`,
      views: weekViews,
      day: `Week ${Math.floor(i / 7) + 1}`,
    });
  }

  return (
    <Card className="w-full rounded-3xl shadow-lg group relative overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/30 rounded-3xl" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Content */}
      <div className="relative z-10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  Page Views
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Visitor engagement metrics
                </CardDescription>
              </div>
            </div>
            
            {/* Growth Badge */}
            <Badge
              className={cn(
                "px-3 py-1 text-sm font-semibold border transition-all duration-300 group-hover:scale-110",
                viewsGrowth >= 0
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              )}
            >
              <span className="flex items-center gap-1">
                {viewsGrowth >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {viewsGrowth >= 0 ? "+" : ""}
                {viewsGrowth}%
              </span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                {totalViews.toLocaleString()}
              </p>
              <p className="text-sm text-blue-600 font-medium">Total Views</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
                {pageViewStats.unique_visitors.toLocaleString()}
              </p>
              <p className="text-sm text-purple-600 font-medium">Unique Visitors</p>
            </div>
          </div>

          {/* Enhanced Chart */}
          <div className="w-full h-[280px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ left: 20, right: 10, top: 20, bottom: 20 }}
              >
                <XAxis 
                  dataKey="day" 
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
                <Bar
                  dataKey="views"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  className="transition-all duration-300 hover:opacity-80"
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Additional Info */}
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
            <p className="text-sm text-slate-600">
              <span className="font-semibold">Last 30 days</span> • {pageViewStats.unique_visitors} unique visitors
            </p>
          </div>
        </CardContent>
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    </Card>
  );
}
