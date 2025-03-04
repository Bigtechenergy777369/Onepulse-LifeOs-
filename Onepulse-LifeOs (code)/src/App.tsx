import React, { useState } from 'react';
import { Activity, User, Brain, Clock, Settings, Star, Crown, Sparkles } from 'lucide-react';
import LifeDashboard from './LifeDashboard';
import AvatarDashboard from './components/AvatarDashboard';
import CustomRoutines from './components/CustomRoutines';
import ProblemSolver from './components/ProblemSolver';
import DashboardHome from './components/DashboardHome';

interface Voice {
  id: string;
  name: string;
  language: string;
  accent: string;
  gender: 'male' | 'female';
  age: 'young' | 'middle' | 'mature';
  style: 'casual' | 'professional' | 'friendly';
  preview?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [streakDays, setStreakDays] = useState(30);
  const [premiumStatus, setPremiumStatus] = useState('premium');
  const [selectedVoice, setSelectedVoice] = useState<Voice>({
    id: 'en-us-sarah',
    name: 'Sarah',
    language: 'English',
    accent: 'American',
    gender: 'female',
    age: 'young',
    style: 'friendly'
  });

  const tabs = [
    { id: 'home', label: 'Dashboard', icon: Star },
    { id: 'avatar', label: 'Avatar & Orb', icon: User },
    { id: 'mission', label: 'Mission: Solve It', icon: Brain },
    { id: 'routines', label: 'Routines', icon: Clock },
    { id: 'life', label: 'Life Pulse', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] to-[#E0F2FE]">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <nav className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">O</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 text-transparent bg-clip-text">
                OnePulse
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-2xl">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                {streakDays} Day Streak
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700 capitalize">
                {premiumStatus} Member
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`glass-button flex items-center gap-2 px-6 py-3 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setActiveTab('settings')}
              className="glass-button p-3"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="space-y-8 py-6">
          {activeTab === 'home' && <DashboardHome />}
          {activeTab === 'avatar' && <AvatarDashboard />}
          {activeTab === 'mission' && <ProblemSolver />}
          {activeTab === 'routines' && <CustomRoutines />}
          {activeTab === 'life' && <LifeDashboard />}
        </div>
      </div>
    </div>
  );
}

export default App;