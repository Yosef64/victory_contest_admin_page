import { User } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, TrendingUp, Award } from 'lucide-react';

interface StatsCardsProps {
  user: User;
}

export function StatsCards({ user }: StatsCardsProps) {
  const totalContests = user.contestSubmissions.length;
  const totalQuestions = user.contestSubmissions.reduce((sum, submission) => sum + submission.totalQuestions, 0);
  const totalCorrect = user.contestSubmissions.reduce((sum, submission) => sum + submission.correctAnswers, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const stats = [
    {
      title: 'Total Points',
      value: user.totalPoints.toLocaleString(),
      icon: Trophy,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-l-emerald-500'
    },
    {
      title: 'Contests Participated',
      value: totalContests.toString(),
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-500'
    },
    {
      title: 'Questions Answered',
      value: totalQuestions.toString(),
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-l-purple-500'
    },
    {
      title: 'Overall Accuracy',
      value: `${overallAccuracy}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-l-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 ${stat.borderColor}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bgColor} p-2.5 rounded-lg`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}