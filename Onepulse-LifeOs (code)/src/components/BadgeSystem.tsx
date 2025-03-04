import React from 'react';
import {
  Award, Star, Heart, Brain, Wallet, Target, 
  Trophy, Zap, Sun, Moon, Coffee, Dumbbell,
  Smile, Users, Sparkles, Calendar, TrendingUp
} from 'lucide-react';

export interface Badge {
  id: string;
  category: 'health' | 'finance' | 'productivity' | 'goals' | 'social' | 'seasonal' | 'special';
  title: string;
  description: string;
  icon: any;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  orbBonus?: number;
  dateEarned?: string;
  color: string;
}

const BadgeDisplay: React.FC<{
  badge: Badge;
  onBadgeClick?: (badge: Badge) => void;
}> = ({ badge, onBadgeClick }) => {
  const rarityColors = {
    common: 'from-blue-500 to-blue-600',
    rare: 'from-purple-500 to-purple-600',
    epic: 'from-pink-500 to-pink-600',
    legendary: 'from-amber-500 to-amber-600'
  };

  return (
    <div
      onClick={() => onBadgeClick?.(badge)}
      className={`relative group cursor-pointer transform transition-all duration-300 ${
        badge.unlocked ? 'hover:scale-105' : 'opacity-50 hover:opacity-60'
      }`}
    >
      <div className={`
        w-20 h-20 rounded-2xl bg-gradient-to-br ${rarityColors[badge.rarity]}
        flex items-center justify-center relative overflow-hidden
        ${badge.unlocked ? 'shadow-lg' : 'grayscale'}
      `}>
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
        <badge.icon className={`w-10 h-10 text-white ${badge.unlocked ? 'animate-pulse' : ''}`} />
        {!badge.unlocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/50 rounded-full flex items-center justify-center">
              <span className="text-white/70 text-sm">{Math.round((badge.progress / badge.maxProgress) * 100)}%</span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 text-center">
        <h4 className="text-sm font-medium text-gray-900">{badge.title}</h4>
        <p className="text-xs text-gray-500">{badge.rarity}</p>
      </div>
      {badge.orbBonus && badge.unlocked && (
        <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
          +{badge.orbBonus} orb
        </div>
      )}
    </div>
  );
};

export const BadgeCollection: React.FC<{
  badges: Badge[];
  onBadgeClick?: (badge: Badge) => void;
}> = ({ badges, onBadgeClick }) => {
  const categories = {
    health: { title: 'Health & Wellness', icon: Heart },
    finance: { title: 'Financial Mastery', icon: Wallet },
    productivity: { title: 'Productivity', icon: Zap },
    goals: { title: 'Goal Achievement', icon: Target },
    social: { title: 'Social & Community', icon: Users },
    seasonal: { title: 'Seasonal Events', icon: Calendar },
    special: { title: 'Special Achievements', icon: Star }
  };

  return (
    <div className="space-y-8">
      {Object.entries(categories).map(([category, info]) => {
        const categoryBadges = badges.filter(b => b.category === category);
        if (categoryBadges.length === 0) return null;

        return (
          <div key={category}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <info.icon className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{info.title}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categoryBadges.map(badge => (
                <BadgeDisplay
                  key={badge.id}
                  badge={badge}
                  onBadgeClick={onBadgeClick}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const BadgeModal: React.FC<{
  badge: Badge;
  onClose: () => void;
}> = ({ badge, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-4 mb-4">
          <div className={`
            w-16 h-16 rounded-xl bg-gradient-to-br
            ${badge.unlocked ? badge.color : 'from-gray-400 to-gray-500'}
            flex items-center justify-center
          `}>
            <badge.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{badge.title}</h3>
            <p className="text-sm text-gray-500 capitalize">{badge.rarity} Badge</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{badge.description}</p>
        
        {badge.unlocked ? (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Earned on {new Date(badge.dateEarned!).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round((badge.progress / badge.maxProgress) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
              />
            </div>
          </div>
        )}

        {badge.orbBonus && (
          <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>+{badge.orbBonus} Orb Power Bonus</span>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BadgeDisplay;