import { User, SubjectAnalysis, GradeAnalysis } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Target,
} from "lucide-react";

interface ContestStatisticsProps {
  user: User;
}

export function ContestStatistics({ user }: ContestStatisticsProps) {
  const getSubjectAnalysis = (): SubjectAnalysis[] => {
    const subjectMap = new Map<
      string,
      { total: number; correct: number; missed: number }
    >();

    user.contestSubmissions.forEach((submission) => {
      const existing = subjectMap.get(submission.contest.subject) || {
        total: 0,
        correct: 0,
        missed: 0,
      };
      subjectMap.set(submission.contest.subject, {
        total: existing.total + submission.totalQuestions,
        correct: existing.correct + submission.correctAnswers,
        missed: existing.missed + submission.missedQuestions,
      });
    });

    return Array.from(subjectMap.entries()).map(([subject, data]) => ({
      subject,
      totalQuestions: data.total,
      correctAnswers: data.correct,
      missedQuestions: data.missed,
      accuracy: Math.round((data.correct / data.total) * 100),
    }));
  };

  const getGradeAnalysis = (): GradeAnalysis[] => {
    const gradeMap = new Map<
      number,
      { total: number; correct: number; missed: number }
    >();

    user.contestSubmissions.forEach((submission) => {
      const existing = gradeMap.get(submission.contest.grade) || {
        total: 0,
        correct: 0,
        missed: 0,
      };
      gradeMap.set(submission.contest.grade, {
        total: existing.total + submission.totalQuestions,
        correct: existing.correct + submission.correctAnswers,
        missed: existing.missed + submission.missedQuestions,
      });
    });

    return Array.from(gradeMap.entries()).map(([grade, data]) => ({
      grade,
      totalQuestions: data.total,
      correctAnswers: data.correct,
      missedQuestions: data.missed,
      accuracy: Math.round((data.correct / data.total) * 100),
    }));
  };

  const subjectAnalysis = getSubjectAnalysis();
  const gradeAnalysis = getGradeAnalysis();

  const subjectColors = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
  ];
  const pieData = subjectAnalysis.map((item, index) => ({
    name: item.subject,
    value: item.missedQuestions,
    color: subjectColors[index % subjectColors.length],
  }));

  const performanceData = user.contestSubmissions.map((submission) => ({
    contest: submission.contest.title.substring(0, 15) + "...",
    accuracy: Math.round(
      (submission.correctAnswers / submission.totalQuestions) * 100
    ),
    score: submission.score,
  }));

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100 bg-gray-50">
        <CardTitle className="flex items-center space-x-3 text-gray-900">
          <div className="">
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-lg font-semibold">
            Contest Performance Analytics
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="subjects" className="w-full">
          <TabsList className="bg-gray-100 p-1 rounded-lg mb-6">
            <TabsTrigger
              value="subjects"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 font-medium"
            >
              Subject Analysis
            </TabsTrigger>
            <TabsTrigger
              value="grades"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 font-medium"
            >
              Grade Analysis
            </TabsTrigger>
            <TabsTrigger
              value="missed"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 font-medium"
            >
              Areas for Improvement
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 font-medium"
            >
              Performance Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance by Subject
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectAnalysis}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="subject"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value} questions`,
                        name === "correctAnswers" ? "Correct" : "Missed",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="correctAnswers"
                      fill="#10b981"
                      name="Correct"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="missedQuestions"
                      fill="#ef4444"
                      name="Missed"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectAnalysis.map((subject) => (
                <div
                  key={subject.subject}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-5"
                >
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">
                    {subject.subject}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium text-emerald-600">
                        {subject.accuracy}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Correct:</span>
                      <span className="font-medium text-gray-900">
                        {subject.correctAnswers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium text-gray-900">
                        {subject.totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance by Grade Level
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={gradeAnalysis}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="grade"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value} questions`,
                        name === "correctAnswers" ? "Correct" : "Missed",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="correctAnswers"
                      fill="#10b981"
                      name="Correct"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="missedQuestions"
                      fill="#f59e0b"
                      name="Missed"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="missed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-emerald-600" />
                  <span>Missed Questions Distribution</span>
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent! * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [
                          `${value} questions`,
                          "Missed",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Focus Areas</span>
                </h3>
                <div className="space-y-4">
                  {subjectAnalysis
                    .sort((a, b) => b.missedQuestions - a.missedQuestions)
                    .map((subject) => (
                      <div
                        key={subject.subject}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">
                            {subject.subject}
                          </span>
                          <span className="text-sm text-red-600 font-medium">
                            {subject.missedQuestions} missed
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-400 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (subject.missedQuestions /
                                  subject.totalQuestions) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {Math.round(
                            (subject.missedQuestions / subject.totalQuestions) *
                              100
                          )}
                          % error rate
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Performance Over Time</span>
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="contest"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "accuracy" ? `${value}%` : value,
                        name === "accuracy" ? "Accuracy" : "Score",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                      name="accuracy"
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                      name="score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
