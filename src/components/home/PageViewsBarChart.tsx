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
import { ContestStats } from "../../types/dashboard";

interface PageViewsBarChartProps {
  contestStats: ContestStats;
}
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-2 text-sm">
        <p className="font-semibold text-gray-800">{payload[0].payload.day}</p>
        <p className="text-blue-500">Value: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};
export default function PageViewsBarChart({
  contestStats,
}: PageViewsBarChartProps) {
  // Calculate total participation and growth
  const totalParticipation = contestStats.participation_data.reduce(
    (sum, val) => sum + val,
    0
  );

  const participationGrowth =
    contestStats.participation_data.length > 1 &&
    contestStats.participation_data[0] > 0
      ? Math.round(
          ((contestStats.participation_data[
            contestStats.participation_data.length - 1
          ] -
            contestStats.participation_data[0]) /
            contestStats.participation_data[0]) *
            100
        )
      : 0;

  // Generate month labels
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].slice(
    0,
    contestStats.participation_data.length
  );

  // Build chart data
  const chartData = monthLabels.map((month, i) => ({
    month,
    active: Math.round(contestStats.participation_data[i] * 0.3),
    completed: Math.round(contestStats.participation_data[i] * 0.5),
    total: contestStats.participation_data[i],
  }));

  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Contest Participation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {totalParticipation.toLocaleString()}
          </span>
          <Badge
            className={cn(
              "text-xs font-semibold",
              participationGrowth >= 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {participationGrowth >= 0 ? "+" : ""}
            {participationGrowth}%
          </Badge>
        </div>
        <CardDescription>
          Contest participation for the last{" "}
          {contestStats.participation_data.length} months
        </CardDescription>

        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ left: 20, right: 10, top: 20, bottom: 20 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="active"
                stackId="A"
                fill="hsl(var(--primary))"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="completed"
                stackId="A"
                fill="hsl(var(--primary) / 0.7)"
              />
              <Bar
                dataKey="total"
                stackId="A"
                fill="hsl(var(--primary) / 0.5)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
