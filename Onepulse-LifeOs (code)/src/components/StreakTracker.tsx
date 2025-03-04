import React from 'react';
import { Trophy, Star, Calendar, Flame, Award, Crown, Gift, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  nextMilestone: number;
  streakHistory: number[];
  achievements: {
    id: string;
    title: string;
    description: string;
    milestone: number;
    unlocked: boolean;
  }[];
}

const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak,
  longestStreak,
  nextMilestone,
  streakHistory,
  achievements
}) => {
  const calculateHeatmapColor = (value: number) => {
    if (value === 0) return 'bg-gray-100';
    if (value < 3) return 'bg-indigo-100';
    if (value < 5) return 'bg-indigo-200';
    if (value < 7) return 'bg-indigo-300';
    return 'bg-indigo-400';
  };

  const progressToNextMilestone = (currentStreak / nextMilestone) * 100;

  return (
    <div className="space-y-6">
      {/* Current Streak Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="dashboard-card bg-gradient-to-br from-amber-50 to-yellow-50">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-gray-800">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold text-amber-600">{currentStreak} days</p>
        </div>
        
        <div className="dashboard-card bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-gray-800">Longest Streak</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{longestStreak} days</p>
        </div>

        <div className="dashboard-card bg-gradient-to-br from-emerald-50 to-green-50">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-gray-800">Next Milestone</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{nextMilestone} days</p>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-indigo-500" />
            <h3 className="font-semibold text-gray-800">Milestone Progress</h3>
          </div>
          <span className="text-sm text-gray-500">{progressToNextMilestone.toFixed(1)}% complete</span>
        </div>
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${progressToNextMilestone}%` }}
          />
        </div>
      </div>

      {/* Streak History Heatmap */}
      <div className="dashboard-card">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-800">Activity History</h3>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {streakHistory.map((value, index) => (
            <div
              key={index}
              className={`aspect-square rounded-md ${calculateHeatmapColor(value)}`}
              title={`${value} activities`}
            />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="dashboard-card">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-800">Streak Achievements</h3>
        </div>
        <div className="space-y-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-amber-50 to-yellow-50'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {achievement.unlocked ? (
                    <Trophy className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Gift className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`font-medium ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {achievement.milestone} days
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <div className="mt-2 flex items-center gap-2 text-sm text-amber-600">
                  <Sparkles className="w-4 h-4" />
                  <span>Achievement Unlocked!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;