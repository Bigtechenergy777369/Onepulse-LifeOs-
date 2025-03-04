import React from 'react';
import { 
  Bell, Settings, Search, TrendingUp, TrendingDown, 
  Activity, Heart, Brain, Wallet, Shield, Zap, 
  Calendar, CheckCircle2, User, Dumbbell
} from 'lucide-react';

interface DashboardHomeProps {
  userName?: string;
  level?: number;
  rank?: string;
  streak?: number;
  orbPower?: number;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({
  userName = "Orb User",
  level = 10,
  rank = "Rising Star",
  streak = 14,
  orbPower = 1250
}) => {
  return (
    <div className="p-6 space-y-8">
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 blur-md opacity-70"></div>
            <div className="relative w-full h-full rounded-full border-4 border-emerald-500 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white">{userName}</h2>
          <p className="text-sm text-emerald-400">Level {level} - {rank}</p>
          
          <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              style={{ width: '65%' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">2450/3000 XP</p>
          
          <div className="mt-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white">{orbPower} Orb Power</span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="col-span-2 grid gap-4">
          {/* Streak Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Daily Streak</h3>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400">{streak} days 🔥</span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                style={{ width: '85%' }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Next milestone: 15 days</p>
          </div>
          
          {/* Finances Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Finances</h3>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Account Balance:</p>
                <p className="text-lg font-semibold text-white">$5,120</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Savings:</p>
                <p className="text-lg font-semibold text-white">$3,210</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-emerald-400">Home</span>
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-emerald-400">Stocks</span>
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-emerald-400">Crypto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Health & Activity Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Physical Health</h3>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            <span className="text-sm text-rose-400">Good</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Steps Today:</p>
              <p className="text-sm font-semibold text-white">7,500 / 10,000</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                style={{ width: '75%' }}
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Heart Rate:</p>
              <p className="text-sm font-semibold text-white">72 bpm</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                style={{ width: '65%' }}
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Sleep:</p>
              <p className="text-sm font-semibold text-white">7.5 hrs</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                style={{ width: '85%' }}
              />
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">Workout Schedule:</p>
            <div className="space-y-2">
              <div className="p-2 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <p className="text-sm text-white">Upper Body (Chest & Triceps)</p>
                </div>
                <p className="text-xs text-gray-400 ml-6">Completed Yesterday</p>
              </div>
              <div className="p-2 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-cyan-400" />
                  <p className="text-sm text-white">Lower Body (Legs & Glutes)</p>
                </div>
                <p className="text-xs text-gray-400 ml-6">Scheduled Today</p>
              </div>
              <div className="p-2 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <p className="text-sm text-white">Doctor Appointment</p>
                </div>
                <p className="text-xs text-gray-400 ml-6">March 12, 2025</p>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">AI Suggestions:</p>
            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-sm text-white mb-2">Suggested Meal Plan:</p>
              <p className="text-xs text-emerald-400">High Protein & Greens 🥗</p>
              <ul className="mt-2 text-xs text-gray-400 space-y-1">
                <li>• Increase water intake</li>
                <li>• Add 30 min cardio session</li>
                <li>• Consider vitamin D supplement</li>
              </ul>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-gray-400">Connected Devices:</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-cyan-400">Apple Watch</span>
                <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-cyan-400">Fitbit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Actions & Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Daily To-Do List</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white">Morning Workout</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-cyan-400"></div>
              <span className="text-sm text-white">Read 10 Pages</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-purple-400"></div>
              <span className="text-sm text-white">Drink 8 Glasses of Water</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Top 3 Goals</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 text-xs">1</div>
              <span className="text-sm text-white">Earn $10K this month</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-900 flex items-center justify-center text-cyan-400 text-xs">2</div>
              <span className="text-sm text-white">Meditate Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-900 flex items-center justify-center text-purple-400 text-xs">3</div>
              <span className="text-sm text-white">Run 50 Miles</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-3">AI Insights</h3>
          <div className="p-3 bg-gray-700 rounded-lg">
            <p className="text-sm text-emerald-400">"You're close to a new fitness milestone! Keep it up!"</p>
          </div>
          <div className="mt-3 p-3 bg-gray-700 rounded-lg">
            <p className="text-sm text-cyan-400">"Your sleep quality has improved by 15% this week."</p>
          </div>
          <div className="mt-3 p-3 bg-gray-700 rounded-lg">
            <p className="text-sm text-purple-400">"Consider increasing your water intake on workout days."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;