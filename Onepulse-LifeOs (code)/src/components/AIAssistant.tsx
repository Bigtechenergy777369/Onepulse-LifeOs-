import React, { useState } from 'react';
import { MessageSquare, Brain, Lightbulb, ChevronRight } from 'lucide-react';

interface Suggestion {
  id: string;
  area: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  impact: number;
}

const generateSuggestions = (skills: any[], recentActivities: string[]): Suggestion[] => {
  // In a real implementation, this would be an API call to an AI service
  // For now, we'll simulate suggestions based on skill levels and recent activities
  return [
    {
      id: '1',
      area: 'Physical Health',
      title: 'Optimize Sleep Schedule',
      description: 'Based on your sleep patterns, adjusting your bedtime by 30 minutes could improve sleep quality.',
      difficulty: 'easy',
      estimatedTime: '7 days',
      impact: 85
    },
    {
      id: '2',
      area: 'Nutrition',
      title: 'Increase Protein Intake',
      description: 'Your workout intensity suggests a need for more protein. Consider adding 20g to your daily intake.',
      difficulty: 'medium',
      estimatedTime: 'Ongoing',
      impact: 90
    },
    {
      id: '3',
      area: 'Mental Wellness',
      title: 'Morning Meditation',
      description: 'Start your day with 10 minutes of meditation to improve focus and reduce stress.',
      difficulty: 'easy',
      estimatedTime: '10 mins',
      impact: 75
    }
  ];
};

function AIAssistant({ skills, recentActivities = [] }) {
  const [suggestions] = useState<Suggestion[]>(generateSuggestions(skills, recentActivities));
  const [showInsights, setShowInsights] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-900 rounded-lg">
            <Brain className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">AI Health Coach</h2>
        </div>
        <button
          onClick={() => setShowInsights(!showInsights)}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          {showInsights ? 'Hide Insights' : 'Show Insights'}
        </button>
      </div>

      <div className="space-y-4">
        {suggestions.map(suggestion => (
          <div
            key={suggestion.id}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-900 rounded-lg">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                  <span className="text-sm text-gray-400">{suggestion.area}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{suggestion.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded ${
                      suggestion.difficulty === 'easy' ? 'bg-green-900 text-green-300' :
                      suggestion.difficulty === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {suggestion.difficulty}
                    </span>
                    <span className="text-gray-400">{suggestion.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">Impact Score: {suggestion.impact}%</span>
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showInsights && (
        <div className="mt-6 bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Health Insights
          </h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Your sleep quality has improved by 15% this week</p>
            <p>• Consider increasing water intake on workout days</p>
            <p>• Your stress levels tend to peak on Wednesdays</p>
            <p>• Recommended focus: Mindfulness exercises</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;