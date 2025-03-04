import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Flame, Shield, Trophy, Award, 
  DollarSign, UserMinus, Lock, Zap, CheckCircle2 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import confetti from 'canvas-confetti';

interface PenaltySystemProps {
  userId: string;
  onPenaltyApplied?: (penalties: string[]) => void;
}

export interface Penalty {
  id: string;
  type: 'xp' | 'financial' | 'social' | 'challenge' | 'custom';
  description: string;
  severity: number;
  icon: any;
  color: string;
}

const PenaltySystem: React.FC<PenaltySystemProps> = ({ userId, onPenaltyApplied }) => {
  const [streak, setStreak] = useState(0);
  const [penaltyLevel, setPenaltyLevel] = useState(0);
  const [customPenalties, setCustomPenalties] = useState<Penalty[]>([]);
  const [accountabilityPartner, setAccountabilityPartner] = useState<string | null>(null);
  const [financialPenalty, setFinancialPenalty] = useState(0);
  const [redemptionChallenge, setRedemptionChallenge] = useState<string | null>(null);

  const presetPenalties: Penalty[] = [
    {
      id: 'xp-loss',
      type: 'xp',
      description: 'Lose 50 XP Points',
      severity: 1,
      icon: Zap,
      color: 'text-yellow-500'
    },
    {
      id: 'financial',
      type: 'financial',
      description: 'Financial Penalty',
      severity: 2,
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      id: 'social',
      type: 'social',
      description: 'Social Media Restriction',
      severity: 3,
      icon: Lock,
      color: 'text-red-500'
    },
    {
      id: 'challenge',
      type: 'challenge',
      description: 'Redemption Challenge',
      severity: 4,
      icon: Trophy,
      color: 'text-purple-500'
    }
  ];

  useEffect(() => {
    loadUserPenaltyData();
  }, [userId]);

  const loadUserPenaltyData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_penalties')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setStreak(data.streak || 0);
        setPenaltyLevel(data.penalty_level || 0);
        setCustomPenalties(data.custom_penalties || []);
        setAccountabilityPartner(data.accountability_partner);
        setFinancialPenalty(data.financial_penalty || 0);
      }
    } catch (error) {
      console.error('Error loading penalty data:', error);
    }
  };

  const handleMissedTask = async () => {
    const newPenaltyLevel = penaltyLevel + 1;
    const newStreak = 0;

    try {
      const appliedPenalties = applyPenalties(newPenaltyLevel);
      
      await supabase
        .from('user_penalties')
        .upsert({
          user_id: userId,
          streak: newStreak,
          penalty_level: newPenaltyLevel,
          last_penalty_date: new Date().toISOString()
        });

      setPenaltyLevel(newPenaltyLevel);
      setStreak(newStreak);

      if (onPenaltyApplied) {
        onPenaltyApplied(appliedPenalties);
      }
    } catch (error) {
      console.error('Error applying penalties:', error);
    }
  };

  const applyPenalties = (level: number): string[] => {
    const penalties: string[] = [];

    if (level >= 1) penalties.push('Lost 50 XP');
    if (level >= 2 && accountabilityPartner) {
      penalties.push('Notified accountability partner');
      notifyAccountabilityPartner();
    }
    if (level >= 3 && financialPenalty > 0) {
      penalties.push(`Financial penalty: $${financialPenalty}`);
      processFinancialPenalty();
    }
    if (level >= 4) {
      penalties.push('Social media restriction activated');
      activateSocialRestriction();
    }
    if (level >= 5) {
      penalties.push('Redemption challenge assigned');
      assignRedemptionChallenge();
    }

    return penalties;
  };

  const notifyAccountabilityPartner = async () => {
    if (!accountabilityPartner) return;

    try {
      await supabase
        .from('notifications')
        .insert({
          user_id: accountabilityPartner,
          type: 'penalty',
          message: `Your partner missed their task! Current penalty level: ${penaltyLevel}`,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error notifying partner:', error);
    }
  };

  const processFinancialPenalty = async () => {
    if (financialPenalty <= 0) return;

    try {
      // In a real implementation, integrate with Stripe/PayPal
      console.log(`Processing financial penalty: $${financialPenalty}`);
    } catch (error) {
      console.error('Error processing financial penalty:', error);
    }
  };

  const activateSocialRestriction = async () => {
    try {
      // In a real implementation, integrate with screen time APIs
      console.log('Activating social media restrictions');
    } catch (error) {
      console.error('Error activating restrictions:', error);
    }
  };

  const assignRedemptionChallenge = () => {
    const challenges = [
      'Complete 100 push-ups within 24 hours',
      'Read a book chapter and write a summary',
      'Meditate for 30 minutes straight',
      'Complete a 5km run'
    ];

    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    setRedemptionChallenge(challenge);
  };

  const handleRedemption = async () => {
    try {
      const newPenaltyLevel = Math.max(0, penaltyLevel - 1);
      
      await supabase
        .from('user_penalties')
        .update({
          penalty_level: newPenaltyLevel,
          last_redemption_date: new Date().toISOString()
        })
        .eq('user_id', userId);

      setPenaltyLevel(newPenaltyLevel);
      setRedemptionChallenge(null);

      // Celebrate redemption
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#6366F1']
      });
    } catch (error) {
      console.error('Error processing redemption:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Penalty System</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-medium">Level {penaltyLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">{streak} Streak</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {presetPenalties.map(penalty => (
            <div
              key={penalty.id}
              className={`p-4 rounded-lg border-2 ${
                penaltyLevel >= penalty.severity
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <penalty.icon className={`w-5 h-5 ${penalty.color}`} />
                <div>
                  <h3 className="font-medium text-gray-900">{penalty.description}</h3>
                  <p className="text-sm text-gray-500">
                    Activates at Level {penalty.severity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {redemptionChallenge && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-purple-900">Redemption Challenge</h3>
            </div>
            <p className="text-purple-700 mb-4">{redemptionChallenge}</p>
            <button
              onClick={handleRedemption}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Complete Challenge
            </button>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleMissedTask}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Record Missed Task
          </button>
          {penaltyLevel > 0 && (
            <button
              onClick={() => setRedemptionChallenge(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Penalties
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PenaltySystem;