import React, { useState } from 'react';
import { Activity, Brain, Heart, Wallet, Bell, Settings, Lightbulb } from 'lucide-react';
import ProblemSolver from './components/ProblemSolver';
import AppIntegration from './components/AppIntegration';

function LifeDashboard() {
  const [activeTab, setActiveTab] = useState('physical');
  const [showProblemSolver, setShowProblemSolver] = useState(false);

  const dashboardSections = {
    physical: {
      title: 'Physical Health',
      items: [
        {
          icon: Activity,
          title: 'Daily Activity',
          value: '7,532 steps',
          target: '10,000 steps',
          progress: 75,
          className: 'col-span-2 bg-gradient-to-br from-green-50 to-emerald-50'
        },
        {
          icon: Heart,
          title: 'Heart Rate',
          value: '72 bpm',
          status: 'Normal',
          history: [65, 72, 68, 75, 70, 72],
          className: 'bg-gradient-to-br from-rose-50 to-pink-50'
        }
      ]
    },
    mental: {
      title: 'Mental Wellness',
      items: [
        {
          icon: Brain,
          title: 'Mood Tracking',
          value: 'Good',
          details: 'Better than yesterday',
          className: 'col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50'
        }
      ]
    },
    financial: {
      title: 'Financial Health',
      items: [
        {
          icon: Wallet,
          title: 'Net Worth',
          value: '$45,234',
          details: '+8.5% this month',
          className: 'bg-gradient-to-br from-emerald-50 to-green-50'
        }
      ]
    }
  };

  const renderCard = (card) => {
    return (
      <div className={`dashboard-card ${card.className || ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <card.icon className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-semibold text-gray-800">{card.title}</h3>
        </div>
        {card.value && <p className="text-2xl font-bold text-gray-900">{card.value}</p>}
        {card.details && <p className="text-sm text-gray-600 mt-1">{card.details}</p>}
        {card.target && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{card.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                style={{ width: `${card.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Life Pulse</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowProblemSolver(!showProblemSolver)}
              className={`p-2 rounded-lg transition-colors ${
                showProblemSolver 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Lightbulb className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showProblemSolver ? (
          <div className="mb-8">
            <ProblemSolver />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
              {Object.entries(dashboardSections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === key
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <AppIntegration
              category={activeTab}
              onConnect={(appId) => console.log('Connecting:', appId)}
              onDisconnect={(appId) => console.log('Disconnecting:', appId)}
              onSync={(appId) => console.log('Syncing:', appId)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              {dashboardSections[activeTab].items?.map((item, index) => (
                <div
                  key={index}
                  className={item.className || 'col-span-2'}
                >
                  {renderCard(item)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LifeDashboard;