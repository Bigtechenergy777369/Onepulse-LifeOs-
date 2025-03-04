import React, { useState, useEffect } from 'react';
import { 
  Gift, Star, Crown, Trophy, ShoppingBag, 
  Award, Sparkles, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import confetti from 'canvas-confetti';

interface Reward {
  id: string;
  name: string;
  description: string;
  points_required: number;
  reward_type: 'Digital' | 'Gift' | 'Exclusive' | 'Ultimate';
  available_quantity: number | null;
}

interface RewardsSystemProps {
  userId: string;
  currentPoints: number;
  onRewardRedeemed?: (points: number) => void;
}

const RewardsSystem: React.FC<RewardsSystemProps> = ({ 
  userId, 
  currentPoints,
  onRewardRedeemed 
}) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  useEffect(() => {
    loadRewards();
    loadUserRewards();
  }, [userId]);

  const loadRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('points_required', { ascending: true });

      if (error) throw error;
      setRewards(data || []);
    } catch (error) {
      console.error('Error loading rewards:', error);
    }
  };

  const loadUserRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('user_rewards')
        .select('reward_id')
        .eq('user_id', userId)
        .eq('status', 'redeemed');

      if (error) throw error;
      setRedeemedRewards(data?.map(r => r.reward_id) || []);
    } catch (error) {
      console.error('Error loading user rewards:', error);
    }
  };

  const handleRedeemReward = async (reward: Reward) => {
    try {
      if (currentPoints < reward.points_required) {
        throw new Error('Not enough points');
      }

      const { error } = await supabase
        .from('user_rewards')
        .insert({
          user_id: userId,
          reward_id: reward.id,
          status: 'redeemed'
        });

      if (error) throw error;

      // Trigger celebration animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#6366F1']
      });

      setRedeemedRewards([...redeemedRewards, reward.id]);
      
      if (onRewardRedeemed) {
        onRewardRedeemed(reward.points_required);
      }

      setSelectedReward(null);
    } catch (error) {
      console.error('Error redeeming reward:', error);
    }
  };

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'Digital':
        return Sparkles;
      case 'Gift':
        return Gift;
      case 'Exclusive':
        return Crown;
      case 'Ultimate':
        return Trophy;
      default:
        return Award;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Gift className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Rewards Store</h2>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-gray-900">{currentPoints} ORB</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map(reward => {
            const Icon = getRewardTypeIcon(reward.reward_type);
            const isRedeemed = redeemedRewards.includes(reward.id);
            const canAfford = currentPoints >= reward.points_required;

            return (
              <div
                key={reward.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isRedeemed
                    ? 'bg-gray-50 border-gray-200'
                    : canAfford
                    ? 'border-purple-200 hover:border-purple-300 cursor-pointer'
                    : 'border-gray-200'
                }`}
                onClick={() => !isRedeemed && canAfford && setSelectedReward(reward)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    isRedeemed
                      ? 'bg-gray-100'
                      : canAfford
                      ? 'bg-purple-100'
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isRedeemed
                        ? 'text-gray-500'
                        : canAfford
                        ? 'text-purple-600'
                        : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{reward.name}</h3>
                    <p className="text-sm text-gray-500">{reward.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className={`w-4 h-4 ${
                      canAfford ? 'text-yellow-500' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      canAfford ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {reward.points_required} ORB
                    </span>
                  </div>
                  {isRedeemed ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Redeemed</span>
                    </div>
                  ) : canAfford ? (
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  ) : (
                    <span className="text-sm text-gray-500">
                      Need {reward.points_required - currentPoints} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redemption Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                {getRewardTypeIcon(selectedReward.reward_type)({
                  className: "w-6 h-6 text-purple-600"
                })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedReward.name}
                </h3>
                <p className="text-gray-500">{selectedReward.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-900">
                  {selectedReward.points_required} ORB
                </span>
              </div>
              <span className="text-purple-600 font-medium">
                Your balance: {currentPoints} ORB
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleRedeemReward(selectedReward)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Redeem Reward
              </button>
              <button
                onClick={() => setSelectedReward(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsSystem;