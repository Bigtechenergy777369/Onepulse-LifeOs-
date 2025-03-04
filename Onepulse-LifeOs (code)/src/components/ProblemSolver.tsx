import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, MessageSquare, Star, Target, ChevronRight, Lightbulb, Flame, Cog, 
         Waves, Wind, Trophy, Crown, Zap, Shield, History, Award, Gift, Users, Clock, 
         ArrowRight, CheckCircle2, Sword, UserPlus, TrendingUp, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Problem {
  id: string;
  title: string;
  description: string;
  category: 'fire' | 'metal' | 'water' | 'air';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ProblemCategory {
  id: 'fire' | 'metal' | 'water' | 'air';
  name: string;
  description: string;
  icon: any;
  color: string;
  questions: string[];
}

interface HistoricalStrategy {
  mentor: string;
  quote: string;
  strategy: string;
}

const ProblemSolver = () => {
  const [userProblem, setUserProblem] = useState('');
  const [problemCategory, setProblemCategory] = useState<ProblemCategory | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [outcomes, setOutcomes] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState('Novice Strategist');
  const [badge, setBadge] = useState('');
  const [streak, setStreak] = useState(0);
  const [showMentorAdvice, setShowMentorAdvice] = useState(false);
  const [actionPlan, setActionPlan] = useState<{
    immediate: string;
    weekly: string[];
    longTerm: string;
  } | null>(null);

  const categories: ProblemCategory[] = [
    {
      id: 'fire',
      name: 'Fire',
      description: 'Urgent & Emotional – Love, conflict, betrayal',
      icon: Flame,
      color: 'from-red-500 to-orange-500',
      questions: [
        "What exactly triggered this?",
        "What emotions are controlling your thoughts?",
        "What do you wish would happen?"
      ]
    },
    {
      id: 'metal',
      name: 'Metal',
      description: 'Logical & Strategic – Money, career, decision-making',
      icon: Cog,
      color: 'from-gray-600 to-gray-700',
      questions: [
        "What is the real challenge here?",
        "What is the worst outcome?",
        "What data do you need?"
      ]
    },
    {
      id: 'water',
      name: 'Water',
      description: 'Flow & Adaptation – Personal growth, health, mindset',
      icon: Waves,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        "What is stopping you from changing?",
        "What is your ideal outcome?",
        "What tiny habit could move you forward?"
      ]
    },
    {
      id: 'air',
      name: 'Air',
      description: 'Creative & Social – Relationships, networking, influence',
      icon: Wind,
      color: 'from-indigo-500 to-purple-500',
      questions: [
        "Who do you need to connect with?",
        "What is a new way to look at this?",
        "What power moves could you make?"
      ]
    }
  ];

  const paths = {
    safe: {
      name: 'The Safe Route',
      description: 'Low risk, steady results',
      icon: Shield,
      badge: 'Safe Planner 🏆'
    },
    bold: {
      name: 'The Bold Move',
      description: 'Risky, but big rewards',
      icon: Zap,
      badge: 'Risk Taker ⚡'
    },
    mastermind: {
      name: 'The Mastermind Play',
      description: 'Requires creativity & patience',
      icon: Brain,
      badge: 'Mastermind 🤯'
    }
  };

  const historicalStrategies: HistoricalStrategy[] = [
    {
      mentor: "Sun Tzu",
      quote: "Supreme excellence consists of breaking the enemy's resistance without fighting.",
      strategy: "Look for ways to achieve your goal without direct confrontation."
    },
    {
      mentor: "Marcus Aurelius",
      quote: "The impediment to action advances action. What stands in the way becomes the way.",
      strategy: "Transform obstacles into opportunities for growth and learning."
    },
    {
      mentor: "Martin Luther King Jr.",
      quote: "Faith is taking the first step even when you don't see the whole staircase.",
      strategy: "Start with small, confident steps while keeping the larger vision in mind."
    }
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        disableForReducedMotion: true
      });
    } catch (error) {
      console.warn('Confetti animation failed:', error);
    }
  };

  const analyzeProblem = () => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    setProblemCategory(category);
    setBadge(`${category.name}-Master`);
    setXp(prev => prev + 50);
    triggerConfetti();
  };

  const generateOutcomes = () => {
    setOutcomes({
      shortTerm: "In the next 30 days, you will see initial progress...",
      longTerm: "Within 1-5 years, this decision could lead to...",
      unexpected: "Watch out for hidden opportunities in..."
    });
    setXp(prev => prev + 100);
    setStreak(prev => prev + 1);

    setActionPlan({
      immediate: "Schedule a focused work session for tomorrow morning",
      weekly: [
        "Review progress every Sunday",
        "Adjust approach based on feedback",
        "Share updates with accountability partner"
      ],
      longTerm: "Develop expertise in this area through continuous learning"
    });
  };

  useEffect(() => {
    if (streak > 0 && streak % 5 === 0) {
      triggerConfetti();
    }
  }, [streak]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="dashboard-card bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/10 rounded-xl">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Mission: Solve It</h2>
            <p className="text-indigo-200">Welcome to the Orb Arena! Every problem is a puzzle waiting to be solved.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-yellow-400" />
            <div>
              <span className="font-medium">{rank}</span>
              <div className="text-xs text-indigo-200">{xp} XP</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <div>
              <span className="font-medium">{streak} Day Streak</span>
              <div className="text-xs text-indigo-200">Keep it going!</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-purple-400" />
            <div>
              <span className="font-medium">{badge || 'No Badge Yet'}</span>
              <div className="text-xs text-indigo-200">Latest Achievement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Input */}
      {!problemCategory && (
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">What challenge are you facing today?</h3>
          </div>
          <div className="space-y-4">
            <textarea
              value={userProblem}
              onChange={(e) => setUserProblem(e.target.value)}
              placeholder="Describe your problem..."
              className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <button
                onClick={analyzeProblem}
                className="flex-1 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  <span>Analyze with Orb AI</span>
                </div>
              </button>
              <button
                onClick={() => setShowMentorAdvice(true)}
                className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <History className="w-5 h-5" />
                  <span>Get Mentor Advice</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Historical Mentor Advice */}
      {showMentorAdvice && (
        <div className="dashboard-card bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
          <div className="flex items-center gap-3 mb-6">
            <History className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold">Wisdom from Great Minds</h3>
          </div>
          <div className="space-y-4">
            {historicalStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium">{strategy.mentor}</span>
                </div>
                <p className="text-indigo-200 italic mb-2">"{strategy.quote}"</p>
                <p className="text-sm text-gray-300">{strategy.strategy}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Display */}
      {problemCategory && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Questions */}
          <div className="dashboard-card">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${problemCategory.color}`}>
                <problemCategory.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{problemCategory.name} Path</h3>
                <p className="text-sm text-gray-600">{problemCategory.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {problemCategory.questions.map((question, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 mb-2">{question}</p>
                  <textarea
                    value={answers[`q${index}`] || ''}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [`q${index}`]: e.target.value }))}
                    placeholder="Your answer..."
                    className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Paths and Outcomes */}
          <div className="space-y-6">
            <div className="dashboard-card">
              <h3 className="font-semibold text-gray-800 mb-4">Choose Your Path</h3>
              <div className="space-y-4">
                {Object.entries(paths).map(([id, path]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedPath(id);
                      generateOutcomes();
                    }}
                    className={`w-full p-4 rounded-xl transition-all ${
                      selectedPath === id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <path.icon className={`w-5 h-5 ${
                        selectedPath === id ? 'text-white' : 'text-gray-600'
                      }`} />
                      <div className="text-left">
                        <h4 className={selectedPath === id ? 'text-white' : 'text-gray-900'}>
                          {path.name}
                        </h4>
                        <p className={`text-sm ${
                          selectedPath === id ? 'text-indigo-100' : 'text-gray-600'
                        }`}>
                          {path.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {outcomes && (
              <>
                <div className="dashboard-card bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  <h3 className="font-semibold mb-4">The Oracle's Prediction</h3>
                  <div className="space-y-4">
                    {Object.entries(outcomes).map(([key, value]) => (
                      <div key={key} className="p-4 bg-white/5 rounded-xl">
                        <h4 className="text-indigo-300 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-gray-300">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {actionPlan && (
                  <div className="dashboard-card bg-gradient-to-br from-green-900 to-emerald-900 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-semibold">Action Plan</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h4 className="text-emerald-300 mb-2">Do It Now</h4>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <p className="text-gray-300">{actionPlan.immediate}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h4 className="text-emerald-300 mb-2">Next 7 Days</h4>
                        <div className="space-y-2">
                          {actionPlan.weekly.map((action, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-emerald-400" />
                              <p className="text-gray-300">{action}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h4 className="text-emerald-300 mb-2">Long-Term Habit</h4>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-emerald-400" />
                          <p className="text-gray-300">{actionPlan.longTerm}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSolver;