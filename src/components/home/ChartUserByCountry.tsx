import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, TrendingUp, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserStats } from "../../types/dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ChartUserByCountryProps {
  userStats: UserStats;
}

// Enhanced color palette with better contrast
const colors = [
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#84cc16", // Lime
  "#f97316", // Orange
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[180px]">
        <p className="text-sm font-semibold text-slate-800 mb-2 border-b border-slate-100 pb-2">
          🏙️ {data.name}
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Users:</span>
            <span className="font-bold text-slate-800">{data.value.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Percentage:</span>
            <span className="font-bold text-slate-800">{data.percentage}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function ChartUserByCountry({
  userStats,
}: ChartUserByCountryProps) {
  // Transform city data for the pie chart
  const chartData = userStats.by_city.map((city, index) => ({
    name: city.city,
    value: city.count,
    percentage: city.percentage,
    color: colors[index % colors.length],
  }));

  // Calculate total users
  const totalUsers = userStats.by_city.reduce(
    (sum, city) => sum + city.count,
    0
  );

  // Get top city
  const topCity = userStats.by_city.reduce((max, city) => 
    city.percentage > max.percentage ? city : max
  );

  return (
    <Card className="w-full rounded-3xl shadow-lg group relative overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl">
      {/* Enhanced Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/70 backdrop-blur-xl border border-white/30 rounded-3xl" />
      
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-emerald-400/30 animate-pulse delay-1000" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 right-6 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-6 left-8 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Content */}
      <CardContent className="relative z-10 p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-emerald-500/50">
            <Globe className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
              Users by City
            </h2>
            <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
              Geographic distribution & analytics
            </p>
          </div>
        </div>

        {/* Enhanced Total Users Badge */}
        <div className="text-center">
          <Badge className="px-6 py-3 text-xl font-bold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:-translate-y-1">
            <span className="flex items-center gap-3">
              <Users className="w-6 h-6 animate-pulse" />
              {totalUsers >= 1000
                ? `${(totalUsers / 1000).toFixed(1)}K`
                : totalUsers.toString()}
              <span className="text-sm font-medium">Total Users</span>
            </span>
          </Badge>
        </div>

        {/* Responsive Pie Chart */}
        <div className="chart-container w-full h-80 relative">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                margin={{
                  top: 30,
                  right: 30,
                  bottom: 30,
                  left: 30
                }}
              >
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                  labelLine={true}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 1000 }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            /* Fallback when no data */
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">No city data available</p>
                <p className="text-sm text-slate-400">Check back later for updates</p>
              </div>
            </div>
          )}
          
          {/* Center Label - Only show when chart has data */}
          {chartData.length > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">
                  {totalUsers >= 1000
                    ? `${(totalUsers / 1000).toFixed(1)}K`
                    : totalUsers.toString()}
                </p>
                <p className="text-sm text-slate-600 font-medium">Total</p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Progress Bars */}
        <div className="space-y-4">
          {chartData.map((city, index) => (
            <div
              key={index}
              className="group/item relative p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 shadow-lg hover:from-slate-100 hover:to-slate-200 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: city.color }}
                  />
                  <span className="font-semibold text-slate-700 group-hover/item:text-slate-800 transition-colors duration-300">
                    {city.name}
                  </span>
                </div>
                <Badge 
                  className="px-3 py-1 text-sm font-semibold bg-white/90 text-slate-700 border border-slate-200 shadow-md"
                >
                  {city.percentage}%
                </Badge>
              </div>
              
              <div className="relative">
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out group-hover/item:scale-x-105"
                    style={{
                      width: `${city.percentage}%`,
                      background: `linear-gradient(90deg, ${city.color} 0%, ${city.color}dd 100%)`,
                      boxShadow: `0 0 15px ${city.color}40`
                    }}
                  />
                </div>
                
                {/* Enhanced Progress Indicator */}
                <div
                  className="absolute top-0 left-0 h-full w-2 bg-white/80 rounded-full animate-pulse shadow-lg"
                  style={{
                    left: `${city.percentage}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
            <p className="text-2xl font-bold text-blue-700">
              {chartData.length}
            </p>
            <p className="text-sm text-blue-600 font-medium">Cities</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
            <p className="text-2xl font-bold text-purple-700">
              {topCity.percentage}%
            </p>
            <p className="text-sm text-purple-600 font-medium">Top City</p>
          </div>
        </div>
      </CardContent>
      
      {/* Enhanced Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl scale-110" />
    </Card>
  );
}
