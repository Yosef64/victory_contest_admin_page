import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Zap, Activity, BarChart3 } from "lucide-react";

export type StatCardProps = {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: number[];
  change?: string;
};

export default function StatCard({
  title,
  value,
  interval,
  trend,
  data,
  change,
}: StatCardProps) {
  // Generate last N days labels
  const generateDailyLabels = (dataLength: number) => {
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

  const safeData =
    Array.isArray(data) && data.length
      ? data.map((val) =>
          Number.isFinite(Number(val)) && Number(val) >= 0 ? Math.floor(val) : 0
        )
      : Array(30).fill(0);

  const labels = generateDailyLabels(safeData.length);
  const chartData = safeData.map((val, i) => ({ date: labels[i], value: val }));
  const hasNonZeroData = chartData.some((p) => p.value > 0);

  const trendColors = {
    up: "text-emerald-600",
    down: "text-rose-600",
    neutral: "text-slate-500",
  };

  const badgeColors = {
    up: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-200/50",
    down: "bg-rose-50 text-rose-700 border-rose-200 shadow-rose-200/50",
    neutral: "bg-slate-50 text-slate-700 border-slate-200 shadow-slate-200/50",
  };

  const defaultTrendValues = { up: "+25%", down: "-25%", neutral: "+5%" };

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getGradientColors = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return {
          stroke: "#10b981",
          fillStart: "#10b981",
          fillEnd: "#d1fae5"
        };
      case "down":
        return {
          stroke: "#f43f5e",
          fillStart: "#f43f5e",
          fillEnd: "#fecdd3"
        };
      default:
        return {
          stroke: "#64748b",
          fillStart: "#64748b",
          fillEnd: "#e2e8f0"
        };
    }
  };

  const getTitleIcon = (title: string) => {
    if (title.toLowerCase().includes('user')) return <Activity className="w-4 h-4" />;
    if (title.toLowerCase().includes('revenue')) return <BarChart3 className="w-4 h-4" />;
    if (title.toLowerCase().includes('contest')) return <Zap className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const gradientColors = getGradientColors(trend);

  return (
    <Card className="h-full flex flex-col group relative overflow-hidden transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2">
      {/* Enhanced Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl border border-white/30 rounded-xl" />
      
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-blue-400/30 to-purple-400/30 animate-pulse delay-1000" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-3 right-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-4 left-6 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2 group-hover:text-slate-800 transition-colors duration-300">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            {getTitleIcon(title)}
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-col justify-between flex-grow gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-purple-600 transition-all duration-500">
                {value || "0"}
              </span>
              <Badge className={cn(
                "text-xs font-semibold border shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl",
                badgeColors[trend]
              )}>
                <span className="flex items-center gap-1">
                  {getTrendIcon(trend)}
                  {change || defaultTrendValues[trend]}
                </span>
              </Badge>
            </div>
            
            <CardDescription className="text-slate-500 font-medium group-hover:text-slate-600 transition-colors duration-300">
              {interval}
            </CardDescription>
          </div>

          {/* Enhanced Chart */}
          <div className="w-full h-16 relative">
            {hasNonZeroData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id={`grad-${title}-${trend}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={gradientColors.fillStart}
                        stopOpacity={0.6}
                      />
                      <stop
                        offset="100%"
                        stopColor={gradientColors.fillEnd}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <Tooltip 
                    cursor={false}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 p-3">
                            <p className="text-xs text-slate-500 mb-1 font-medium">{label}</p>
                            <p className="text-sm font-semibold text-slate-800">
                              {payload[0].value?.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={gradientColors.stroke}
                    fill={`url(#grad-${title}-${trend})`}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300 group-hover:stroke-width-4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-full bg-slate-100 flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">No activity</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </div>
      
      {/* Enhanced Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl scale-110" />
    </Card>
  );
}
