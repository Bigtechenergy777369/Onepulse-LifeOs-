import React, { useState, useEffect } from 'react';
import { 
  Activity, User, Brain, Clock, Settings, Star, Crown, 
  Sparkles, Zap, Heart, Shield, Users, ArrowRight, 
  CheckCircle2, XCircle, Trophy, Award, Gift, Flame,
  Palette, Shirt, Camera, Scale, Ruler, Eye, Volume2
} from 'lucide-react';
import AIAssistant from './AIAssistant';
import StreakTracker from './StreakTracker';
import RewardsSystem from './RewardsSystem';
import PenaltySystem from './PenaltySystem';
import { BadgeCollection, BadgeModal, type Badge } from './BadgeSystem';
import confetti from 'canvas-confetti';

interface AvatarCustomization {
  height: number;
  weight: number;
  bodyType: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  facialHair: string;
  outfit: string;
  accessories: string[];
}

function AvatarDashboard() {
  const [level, setLevel] = useState(24);
  const [xp, setXp] = useState(2450);
  const [nextLevelXp] = useState(3000);
  const [orbPower, setOrbPower] = useState(1250);
  const [rank, setRank] = useState('Adept');
  const [streakBonus, setStreakBonus] = useState(1.5);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [avatarVoice, setAvatarVoice] = useState<string>('friendly');

  const [avatarCustomization, setAvatarCustomization] = useState<AvatarCustomization>({
    height: 180,
    weight: 75,
    bodyType: 'athletic',
    skinTone: 'medium',
    hairStyle: 'short',
    hairColor: 'black',
    facialHair: 'none',
    outfit: 'business',
    accessories: ['glasses']
  });

  const [streakStats] = useState({
    currentStreak: 7,
    longestStreak: 14,
    nextMilestone: 10,
    streakHistory: Array(28).fill(0).map(() => Math.floor(Math.random() * 8)),
    achievements: [
      {
        id: '1',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        milestone: 7,
        unlocked: true
      },
      {
        id: '2',
        title: 'Fortnight Champion',
        description: 'Keep your streak for 14 days',
        milestone: 14,
        unlocked: false
      },
      {
        id: '3',
        title: 'Monthly Master',
        description: 'Complete a 30-day streak',
        milestone: 30,
        unlocked: false
      }
    ]
  });

  const [stats] = useState({
    physical: {
      strength: 75,
      endurance: 65,
      flexibility: 80
    },
    mental: {
      focus: 85,
      creativity: 70,
      resilience: 90
    },
    social: {
      charisma: 60,
      empathy: 85,
      leadership: 75
    }
  });

  const handleCustomizationChange = (key: keyof AvatarCustomization, value: any) => {
    setAvatarCustomization(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleVoiceChange = (voice: string) => {
    setAvatarVoice(voice);
    // In a real implementation, this would update the voice synthesis settings
  };

  useEffect(() => {
    if (streakStats.achievements.some(a => a.unlocked)) {
      const timer = setTimeout(() => {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            disableForReducedMotion: true
          });
        } catch (error) {
          console.warn('Confetti animation failed to load:', error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Avatar and Stats */}
      <div className="lg:col-span-5 space-y-6">
        {/* Avatar Preview with Orb Status */}
        <div className="dashboard-card">
          <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),rgba(6,182,212,0.1))]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-4/5 h-4/5">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                  alt="Professional Avatar"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 blur-2xl opacity-40 animate-pulse" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">O</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-4 top-4 flex justify-between">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-gray-900">Lvl {level}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-gray-900">{orbPower}</span>
              </div>
            </div>
            <div className="absolute inset-x-4 bottom-4">
              <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-sm text-gray-900">{rank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs text-gray-600">{xp}/{nextLevelXp} XP</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full">
                  <div 
                    className="h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-300"
                    style={{ width: `${(xp/nextLevelXp) * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-emerald-600">
                  <Flame className="w-3 h-3" />
                  <span>{streakBonus}x Streak Bonus Active!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Controls */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Palette className="w-4 h-4" />
              <span>Customize</span>
            </button>
            <button
              onClick={() => {/* Toggle voice settings */}}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Voice</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Physical Stats */}
          <div className="dashboard-card bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h3 className="font-medium">Physical</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(stats.physical).map(([stat, value]) => (
                <div key={stat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{stat}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-1.5 bg-emerald-100 rounded-full">
                    <div
                      className="h-1.5 bg-emerald-500 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mental Stats */}
          <div className="dashboard-card bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium">Mental</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(stats.mental).map(([stat, value]) => (
                <div key={stat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{stat}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-1.5 bg-purple-100 rounded-full">
                    <div
                      className="h-1.5 bg-purple-500 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Stats */}
          <div className="dashboard-card bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium">Social</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(stats.social).map(([stat, value]) => (
                <div key={stat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{stat}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-1.5 bg-blue-100 rounded-full">
                    <div
                      className="h-1.5 bg-blue-500 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <StreakTracker
          currentStreak={streakStats.currentStreak}
          longestStreak={streakStats.longestStreak}
          nextMilestone={streakStats.nextMilestone}
          streakHistory={streakStats.streakHistory}
          achievements={streakStats.achievements}
        />
      </div>

      {/* Customization Panel */}
      {showCustomization && (
        <div className="lg:col-span-7">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Palette className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold">Avatar Customization</h2>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Physical Attributes */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Physical Attributes</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="range"
                    min="150"
                    max="200"
                    value={avatarCustomization.height}
                    onChange={(e) => handleCustomizationChange('height', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>150cm</span>
                    <span>{avatarCustomization.height}cm</span>
                    <span>200cm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Type
                  </label>
                  <select
                    value={avatarCustomization.bodyType}
                    onChange={(e) => handleCustomizationChange('bodyType', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="slim">Slim</option>
                    <option value="athletic">Athletic</option>
                    <option value="muscular">Muscular</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
              </div>

              {/* Appearance */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Appearance</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hair Style
                  </label>
                  <select
                    value={avatarCustomization.hairStyle}
                    onChange={(e) => handleCustomizationChange('hairStyle', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                    <option value="bald">Bald</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outfit Style
                  </label>
                  <select
                    value={avatarCustomization.outfit}
                    onChange={(e) => handleCustomizationChange('outfit', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="casual">Casual</option>
                    <option value="business">Business</option>
                    <option value="formal">Formal</option>
                    <option value="sporty">Sporty</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Voice Settings */}
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Voice Settings</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleVoiceChange('friendly')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    avatarVoice === 'friendly'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                    <span>Friendly</span>
                  </div>
                </button>
                <button
                  onClick={() => handleVoiceChange('professional')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    avatarVoice === 'professional'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                    <span>Professional</span>
                  </div>
                </button>
                <button
                  onClick={() => handleVoiceChange('energetic')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    avatarVoice === 'energetic'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                    <span>Energetic</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedBadge && (
        <BadgeModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </div>
  );
}

export default AvatarDashboard;